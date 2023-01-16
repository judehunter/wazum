import { Module } from './module';
import {
  Add,
  Block,
  Call,
  CallIndirect,
  Const,
  DataType,
  DivSigned,
  DivUnsigned,
  Drop,
  IntegerDataType,
  Load,
  LocalGet,
  LocalSet,
  LocalTee,
  Mul,
  NumericDataType,
  RemSigned,
  RemUnsigned,
  Store,
  Sub,
  Instr,
  GlobalGet,
  GlobalSet,
  GlobalTee,
  Expr,
} from './variants';
import { match } from 'ts-pattern';

// const trimdent = (str: string) => {
//   const trimmed = str.trim();
//   const spaces =
//   return trimmed.replace(/^\s*(.*)$/gm, ' '.repeat(spaces) + '$1');
// };

const compileSExpression = (
  sExpr: {
    fn: string;
    inlineArgs?: (string | null)[];
    blockArgs?: (string | null)[];
  },
  indent: number,
) => {
  let ret = space(indent) + `(${sExpr.fn}`;
  const filteredInlineArgs = sExpr.inlineArgs?.filter((x) => x !== null);
  const filteredBlockArgs = sExpr.blockArgs?.filter((x) => x !== null);
  if (filteredInlineArgs?.length) {
    ret += ` `;
    ret += filteredInlineArgs.join(' ');
  }
  if (filteredBlockArgs?.length) {
    ret += `\n`;
    ret += filteredBlockArgs.join('\n');
    ret += `\n` + space(indent) + `)`;
  } else {
    ret += `)`;
  }
  return ret;
};

const space = (indent: number) => ' '.repeat(indent);

const localGet = (node: LocalGet<DataType>, indent = 0) => {
  return compileSExpression(
    { fn: 'local.get', inlineArgs: [`$${node.name}`] },
    indent,
  );
};

const localSet = (node: LocalSet, indent = 0) => {
  return compileSExpression(
    {
      fn: 'local.set',
      inlineArgs: [`$${node.name}`],
      blockArgs: [instr(node.value, indent + 1)],
    },
    indent,
  );
};

const localTee = (node: LocalTee<DataType>, indent = 0) => {
  return compileSExpression(
    {
      fn: 'local.tee',
      inlineArgs: [`$${node.name}`],
      blockArgs: [instr(node.value, indent + 1)],
    },
    indent,
  );
};

const globalGet = (node: GlobalGet<DataType>, indent = 0) => {
  return compileSExpression(
    { fn: 'global.get', inlineArgs: [`$${node.name}`] },
    indent,
  );
};

const globalSet = (node: GlobalSet, indent = 0) => {
  return compileSExpression(
    {
      fn: 'global.set',
      inlineArgs: [`$${node.name}`],
      blockArgs: [instr(node.value, indent + 1)],
    },
    indent,
  );
};

const globalTee = (node: GlobalTee<DataType>, indent = 0) => {
  return compileSExpression(
    {
      fn: 'global.tee',
      inlineArgs: [`$${node.name}`],
      blockArgs: [instr(node.value, indent + 1)],
    },
    indent,
  );
};

const makeBinaryParser =
  <T extends { dataType: DataType; left: Expr; right: Expr }>(op: string) =>
  (node: T, indent = 0) => {
    return compileSExpression(
      {
        fn: `${node.dataType}.${op}`,
        blockArgs: [
          instr(node.left, indent + 1),
          instr(node.right, indent + 1),
        ],
      },
      indent,
    );
  };

const add = makeBinaryParser<Add<DataType>>('add');
const sub = makeBinaryParser<Sub<DataType>>('sub');
const mul = makeBinaryParser<Mul<DataType>>('mul');
const divSigned = makeBinaryParser<DivSigned<DataType>>('div_s');
const divUnsigned = makeBinaryParser<DivUnsigned<DataType>>('div_u');
const remSigned = makeBinaryParser<RemSigned<DataType>>('rem_s');
const remUnsigned = makeBinaryParser<RemUnsigned<DataType>>('rem_u');

const constant = (node: Const<DataType>, indent = 0) => {
  return compileSExpression(
    { fn: `${node.dataType}.const`, inlineArgs: [`${node.value}`] },
    indent,
  );
};

const call = (node: Call<DataType>, indent = 0) => {
  return compileSExpression(
    {
      fn: 'call',
      inlineArgs: [`$${node.name}`],
      blockArgs: node.args.map((arg) => instr(arg, indent + 1)),
    },
    indent,
  );
};

const callIndirect = (node: CallIndirect<DataType>, indent = 0) => {
  return compileSExpression(
    {
      fn: 'call_indirect',
      blockArgs: [
        space(indent + 1) + `$${node.tableName}`,
        ...node.params.map(
          (param) => space(indent + 1) + `(param ${param[0]})`,
        ),
        space(indent + 1) + `(result ${node.dataType})`,
        ...node.args.map((arg) => instr(arg, indent + 1)),
        instr(node.address, indent + 1),
      ],
    },
    indent,
  );
};

const block = (node: Block<DataType>, indent = 0) => {
  return compileSExpression(
    {
      fn: 'block',
      blockArgs: [
        node.name ? space(indent + 1) + `$${node.name}` : null,
        node.returnType !== 'none'
          ? space(indent + 1) + `(result ${node.returnType})`
          : null,
        ...node.value.map((x) => instr(x as any, indent + 1)),
      ],
    },
    indent,
  );
};

const drop = (node: Drop, indent = 0) => {
  return compileSExpression(
    { fn: 'drop', blockArgs: [instr(node.value, indent + 1)] },
    indent,
  );
};

const store = (node: Store, indent = 0) => {
  return compileSExpression(
    {
      fn: `${node.dataType}.store`,
      blockArgs: [
        node.offset ? space(indent + 1) + `offset=${node.offset}` : null,
        node.align ? space(indent + 1) + `align=${node.align}` : null,
        instr(node.base, indent + 1),
        instr(node.value, indent + 1),
      ],
    },
    indent,
  );
};

const load = (node: Load<DataType>, indent = 0) => {
  return compileSExpression(
    {
      fn: `${node.dataType}.load`,
      blockArgs: [
        node.offset ? space(indent + 1) + `offset=${node.offset}` : null,
        node.align ? space(indent + 1) + `align=${node.align}` : null,
        instr(node.base, indent + 1),
      ],
    },
    indent,
  );
};

const instr = (node: Instr, indent = 0): string => {
  return match(node)
    .with({ __nodeType: 'localGet' }, (x) => localGet(x, indent))
    .with({ __nodeType: 'localSet' }, (x) => localSet(x, indent))
    .with({ __nodeType: 'localTee' }, (x) => localTee(x, indent))
    .with({ __nodeType: 'add' }, (x) => add(x, indent))
    .with({ __nodeType: 'sub' }, (x) => sub(x, indent))
    .with({ __nodeType: 'mul' }, (x) => mul(x, indent))
    .with({ __nodeType: 'divSigned' }, (x) => divSigned(x, indent))
    .with({ __nodeType: 'divUnsigned' }, (x) => divUnsigned(x, indent))
    .with({ __nodeType: 'remSigned' }, (x) => remSigned(x, indent))
    .with({ __nodeType: 'remUnsigned' }, (x) => remUnsigned(x, indent))
    .with({ __nodeType: 'const' }, (x) => constant(x, indent))
    .with({ __nodeType: 'call' }, (x) => call(x, indent))
    .with({ __nodeType: 'callIndirect' }, (x) => callIndirect(x, indent))
    .with({ __nodeType: 'block' }, (x) => block(x, indent))
    .with({ __nodeType: 'drop' }, (x) => drop(x, indent))
    .with({ __nodeType: 'store' }, (x) => store(x, indent))
    .with({ __nodeType: 'load' }, (x) => load(x, indent))
    .otherwise(() => {
      throw new Error(`Unexpected ${node.__nodeType} node`);
    });
};

export const compile = (m: Module) => {
  return compileSExpression(
    {
      fn: 'module',
      blockArgs: [
        ...m.memories.flatMap((mem) => [
          compileSExpression(
            {
              fn: 'memory',
              inlineArgs: [`$${mem.name}`, `${mem.initSize}`, `${mem.maxSize}`],
            },
            1,
          ),
          compileSExpression(
            {
              fn: 'export',
              inlineArgs: [`"${mem.name}"`, `(memory $${mem.name})`],
            },
            1,
          ),
          ...mem.segments.flatMap((seg) =>
            compileSExpression(
              {
                fn: 'data',
                blockArgs: [
                  instr(seg.offset, 2),
                  space(2) +
                    `"${[...seg.data]
                      .map((d) => '\\' + d.toString(16))
                      .join('')}"`,
                ],
              },
              1,
            ),
          ),
        ]),
        ...m.tables.flatMap((table) => [
          compileSExpression(
            {
              fn: 'table',
              inlineArgs: [
                `$${table.name}`,
                `${table.initSize}`,
                `${table.maxSize}`,
                `${table.type}`,
              ],
            },
            1,
          ),
          ...table.segments.flatMap((seg) =>
            compileSExpression(
              {
                fn: 'elem',
                blockArgs: [
                  space(2) + `(table $${table.name})`,
                  instr(seg.offset, 2),
                  seg.elems.join(' ') || null,
                ],
              },
              1,
            ),
          ),
        ]),
        ...m.globals.map((global) =>
          compileSExpression(
            {
              fn: 'global',
              inlineArgs: [
                `$${global.name}`,
                `(${global.mutable ? 'mut ' : ''}${global.dataType})`,
              ],
              blockArgs: [instr(global.initVal, 2)],
            },
            1,
          ),
        ),
        ...m.funcs
          .filter((func) => func.exportName)
          .map((func) =>
            compileSExpression(
              {
                fn: 'export',
                inlineArgs: [`"${func.exportName}"`, ` (func $${func.name}`],
              },
              1,
            ),
          ),
        ...m.funcs.map((func) =>
          compileSExpression(
            {
              fn: 'func',
              inlineArgs: [`$${func.name}`],
              blockArgs: [
                ...func.params.map(
                  ([dt, name]) => space(2) + `(param $${name} ${dt})`,
                ),
                space(2) + `(result ${func.dataType})`,
                ...func.locals.map(
                  ([dt, name]) => space(2) + `(local $${name} ${dt})`,
                ),
                instr(func.body, 2),
              ],
            },
            1,
          ),
        ),
      ],
    },
    0,
  );
};

export const compilers = {
  instr,
  localGet,
  localSet,
  localTee,
  add,
  sub,
  mul,
  divSigned,
  divUnsigned,
  remSigned,
  remUnsigned,
  constant,
  call,
  callIndirect,
  module: compile,
  load,
  store,
};
