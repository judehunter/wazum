import { w } from '../index';

// define where the data part starts
const DATA_START = 64;

// our switch case
const instrMap = {
  '>': [
    // C equivalent:
    // dataPtr = dataPtr + 1
    //
    // compiles to:
    // (local.set $dataPtr
    //  (i32.add
    //   (local.get $dataPtr)
    //   (i32.const 1)
    //  )
    // )
    w.local.set(
      'i32',
      'dataPtr',
      w.add('i32', w.local.get('i32', 'dataPtr'), w.constant('i32', 1)),
    ),
  ],
  '<': [
    // C equivalent:
    // dataPtr = dataPtr - 1
    //
    // compiles to:
    // (local.set $dataPtr
    //  (i32.sub
    //   (local.get $dataPtr)
    //   (i32.const 1)
    //  )
    // )
    w.local.set(
      'i32',
      'dataPtr',
      w.sub('i32', w.local.get('i32', 'dataPtr'), w.constant('i32', 1)),
    ),
  ],
  '+': [
    // C equivalent:
    // *dataPtr = *dataPtr + 1
    //
    // compiles to:
    // (i32.store8
    //  (local.get $dataPtr)
    //  (i32.add
    //   (i32.load8_u
    //    (local.get $dataPtr)
    //   )
    //   (i32.const 1)
    //  )
    // )
    w.store8(
      'i32',
      0,
      null,
      w.local.get('i32', 'dataPtr'),
      w.add(
        'i32',
        w.load8ZeroExt('i32', 0, null, w.local.get('i32', 'dataPtr')),
        w.constant('i32', 1),
      ),
    ),
  ],
  '-': [
    // C equivalent:
    // *dataPtr = *dataPtr - 1
    //
    // compiles to:
    // (i32.store8
    //  (local.get $dataPtr)
    //  (i32.sub
    //   (i32.load8_u
    //    (local.get $dataPtr)
    //   )
    //   (i32.const 1)
    //  )
    // )
    w.store8(
      'i32',
      0,
      null,
      w.local.get('i32', 'dataPtr'),
      w.sub(
        'i32',
        w.load8ZeroExt('i32', 0, null, w.local.get('i32', 'dataPtr')),
        w.constant('i32', 1),
      ),
    ),
  ],
  '.': [
    // C equivalent:
    // *outputPtr = *dataPtr
    // outputPtr = outputPtr + 1
    //
    // compiles to:
    // (i32.store8
    //  (local.get $outputPtr)
    //  (i32.load8_u
    //   (local.get $dataPtr)
    //  )
    // )
    // (local.set $outputPtr
    //  (i32.add
    //   (local.get $outputPtr)
    //   (i32.const 1)
    //  )
    // )
    w.store8(
      'i32',
      0,
      null,
      w.local.get('i32', 'outputPtr'),
      w.load8ZeroExt('i32', 0, null, w.local.get('i32', 'dataPtr')),
    ),
    w.local.set(
      'i32',
      'outputPtr',
      w.add('i32', w.local.get('i32', 'outputPtr'), w.constant('i32', 1)),
    ),
  ],
};

const compile = (input: string) => {
  // track which character in the input we're currently on
  let idx = 0;

  // convert input string to array of chars
  const chars = [...input];

  // this function either parses our whole program, or a loop.
  // the difference is that parsing a loop should end on a `]`,
  // while parsing the whole program should end at the end of our input string
  const compileBlock = (isLoop: boolean): w.Instr<'none'>[] => {
    // we will assemble a list of compiled instructions for this block (loop or program)
    const instrs: w.Instr<'none'>[] = [];
    // loop through the whole program
    while (idx < input.length) {
      // get the current character
      const ch = chars[idx];
      idx++;

      // if the character is a `[`,
      // we start a new loop inside of the current block
      if (ch === '[') {
        instrs.push(
          // to mimic a while loop,
          // we need to wrap the loop in a block
          // so that we can break out of the loop early
          w.block(null, 'none', [
            w.loop(null, [
              // if the value at the data pointer is zero,
              // break out of the loop by branching to the block
              w.branchIf(
                1,
                w.eqz(
                  'i32',
                  w.load8ZeroExt('i32', 0, null, w.local.get('i32', 'dataPtr')),
                ),
              ),
              // recursively compile the loop instructions
              ...compileBlock(true),
              // go to the next iteration by branching to the loop
              w.branch(0),
            ]),
          ]),
        );
        continue;
      }
      // end the block if `]` is found
      else if (ch === ']') {
        if (!isLoop) {
          throw new Error('Unexpected ]');
        }
        return instrs;
      }
      // otherwise, get the nodes from the instruction map
      const instr = instrMap[ch as keyof typeof instrMap] ?? null;
      // if no matching character, ignore
      if (!instr) {
        continue;
      }
      instrs.push(...instr);
    }
    if (isLoop) {
      throw new Error('Unclosed loop');
    } else {
      return instrs;
    }
  };

  const instrs = [
    // initialize the data pointer
    w.local.set('i32', 'dataPtr', w.constant('i32', DATA_START)),
    // and then add all the nodes
    ...compileBlock(false),
  ];

  // create our main function
  const main = w.func(
    'main',
    {
      params: [],
      returnType: 'none',
      locals: [
        ['i32', 'dataPtr'],
        ['i32', 'outputPtr'],
      ],
    },
    w.block(null, 'none', instrs as [...w.Instr<'none'>[], w.Instr<'none'>]),
  );
  const m = new w.Module();
  m.addMemory('0', 1, 1, []);
  // add the function to the module
  m.addFunc(main);
  m.setStart('main');
  // compile to WAT string
  return m.compile();
};

const runProgram = async (program: string) => {
  const wabt = await (require('wabt') as typeof import('wabt'))();
  const compiled = compile(program);
  // console.log(compiled);
  const m = wabt.parseWat('', compiled);
  const inst = await WebAssembly.instantiate(m.toBinary({}).buffer);
  const memory = inst.instance.exports['0'] as any;
  const dataView = new DataView(memory.buffer);
  return { dataView };
};

const getMemoryArray = (dataView: DataView) => {
  const arr: number[] = [];
  for (let i = 0; i < DATA_START; i += 1) {
    arr.push(dataView.getInt8(i));
  }
  return arr;
};

const getOutputString = (dataView: DataView) => {
  const memArr = getMemoryArray(dataView);
  const outputStr = memArr
    .slice(0, memArr.indexOf(0))
    .reduce((acc, cur) => acc + String.fromCharCode(cur), '');
  return outputStr;
};

test('Basic loop', async () => {
  const { dataView } = await runProgram(`
    ++++++[-->+<]>.
  `);
  expect(dataView.getInt8(0)).toBe(3);
});

test.skip('Hello world', async () => {
  const { dataView } = await runProgram(`
    >++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<+
    +.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-
    ]<+.
  `);
  const outputStr = getOutputString(dataView);
  expect(outputStr).toBe('Hello, World!');
});
