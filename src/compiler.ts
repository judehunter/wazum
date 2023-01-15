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
} from './variants';
import { match } from 'ts-pattern';

// const trimdent = (str: string) => {
//   const trimmed = str.trim();
//   const spaces =
//   return trimmed.replace(/^\s*(.*)$/gm, ' '.repeat(spaces) + '$1');
// };

const localGet = (node: LocalGet<NumericDataType>) => {
  return `
    (local.get $${node.name})
  `;
};

const localSet = (node: LocalSet) => {
  return `
    (local.set $${node.name} ${instr(node.value)})
  `;
};

const localTee = (node: LocalTee<NumericDataType>) => {
  return `
    (local.tee $${node.name} ${instr(node.value)})
  `;
};

const add = (node: Add<NumericDataType>) => {
  return `
    (${node.dataType}.add ${instr(node.left)} ${instr(node.right)})
  `;
};

const sub = (node: Sub<NumericDataType>) => {
  return `
    (${node.dataType}.sub ${instr(node.left)} ${instr(node.right)})
  `;
};

const mul = (node: Mul<NumericDataType>) => {
  return `
    (${node.dataType}.mul ${instr(node.left)} ${instr(node.right)})
  `;
};

const divSigned = (node: DivSigned<NumericDataType>) => {
  return `
    (${node.dataType}.div_s ${instr(node.left)} ${instr(node.right)})
  `;
};

const divUnsigned = (node: DivUnsigned<NumericDataType>) => {
  return `
    (${node.dataType}.div_u ${instr(node.left)} ${instr(node.right)})
  `;
};

const remSigned = (node: RemSigned<IntegerDataType>) => {
  return `
    (${node.dataType}.rem_s ${instr(node.left)} ${instr(node.right)})
  `;
};

const remUnsigned = (node: RemUnsigned<IntegerDataType>) => {
  return `
    (${node.dataType}.rem_u ${instr(node.left)} ${instr(node.right)})
  `;
};

const constant = (node: Const<NumericDataType>) => {
  return `
    (${node.dataType}.const ${node.value})
  `;
};

const call = (node: Call<DataType>) => {
  return `
    (call $${node.name}
      ${node.args.map((arg) => instr(arg)).join('\n')}
    )
  `;
};

const callIndirect = (node: CallIndirect<DataType>) => {
  return `
    (call_indirect
      $${node.tableName}
      ${node.params.map((param) => `(param ${param[0]})`).join(' ')}
      (result ${node.dataType})
      ${node.args.map((arg) => instr(arg)).join(' ')}
      ${instr(node.address)}
    )
  `;
};

const block = (node: Block<DataType>) => {
  return `
    (block
      ${node.name ? '$' + node.name : ''}
      ${node.returnType !== 'none' ? `(result ${node.returnType})` : ''}
      ${node.value.map((x) => instr(x as any)).join('\n')}
    )
  `;
};

const drop = (node: Drop) => {
  return `
    (drop
      ${instr(node.value)}
    )
  `;
};

const store = (node: Store) => {
  return `
    (${node.dataType}.store
      ${node.offset ? `offset=${node.offset}` : ''}
      ${node.align ? `align=${node.align}` : ''}
      ${instr(node.base)}
      ${instr(node.value)}
    )
  `;
};

const load = (node: Load<DataType>) => {
  return `
    (${node.dataType}.store
      ${node.offset ? `offset=${node.offset}` : ''}
      ${node.align ? `align=${node.align}` : ''}
      ${instr(node.base)}
    )
  `;
};

const instr = (node: Instr): string => {
  return match(node)
    .with({ __nodeType: 'localGet' }, localGet)
    .with({ __nodeType: 'localSet' }, localSet)
    .with({ __nodeType: 'localTee' }, localTee)
    .with({ __nodeType: 'add' }, add)
    .with({ __nodeType: 'sub' }, sub)
    .with({ __nodeType: 'mul' }, mul)
    .with({ __nodeType: 'divSigned' }, divSigned)
    .with({ __nodeType: 'divUnsigned' }, divUnsigned)
    .with({ __nodeType: 'remSigned' }, remSigned)
    .with({ __nodeType: 'remUnsigned' }, remUnsigned)
    .with({ __nodeType: 'const' }, constant)
    .with({ __nodeType: 'call' }, call)
    .with({ __nodeType: 'callIndirect' }, callIndirect)
    .with({ __nodeType: 'block' }, block)
    .with({ __nodeType: 'drop' }, drop)
    .with({ __nodeType: 'store' }, store)
    .with({ __nodeType: 'load' }, load)
    .otherwise(() => {
      throw new Error(`Unexpected ${node.__nodeType} node`);
    });
};

export const compile = (m: Module) => {
  // console.log(m.funcs);
  return `
    (module
      ${m.memories
        .map(
          (mem) =>
            `
              (memory $${mem.name} ${mem.initSize} ${mem.maxSize})
              (export "${mem.name}" (memory $${mem.name}))
            ` +
            mem.segments
              .map(
                (seg) => `
                  (data ${instr(seg.offset)} "${[...seg.data]
                  .map((d) => '\\' + d.toString(16))
                  .join('')}")
                  `,
              )
              .join('\n'),
        )
        .join('\n')}

      ${m.tables
        .map(
          (table) =>
            `
              (table $${table.name} ${table.initSize} ${table.maxSize} ${table.type})
            ` +
            table.segments.map(
              (seg) => `
                (elem (table $${table.name}) ${instr(
                seg.offset,
              )} ${seg.elems.join(' ')})
              `,
            ),
        )
        .join('\n')}

      ${m.globals.map(
        (global) => `
          (global $${global.name} (${global.mutable ? 'mut ' : ''}${
          global.dataType
        }) ${instr(global.initVal)})
        `,
      )}

      ${m.funcs
        .filter((func) => func.exportName)
        .map(
          (func) => `
            (export "${func.exportName}" (func $${func.name})
          `,
        )
        .join('\n')}

      ${m.funcs
        .map(
          (func) => `
            (func $${func.name}
              ${func.params
                .map(([dt, name]) => `(param $${name} ${dt})`)
                .join(' ')}
              (result ${func.dataType})
              ${func.locals
                .map(([dt, name]) => `(local $${name} ${dt})`)
                .join(' ')}
              ${instr(func.body)}
            )
          `,
        )
        .join('\n')}
    )
  `;
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
