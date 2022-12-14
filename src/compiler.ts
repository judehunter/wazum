import { Module } from './module';
import {
  DataType,
  IntegerDataType,
  NumericDataType,
  Variant,
  VariantInstr,
} from './variants';
import { match } from 'ts-pattern';

const localGet = (node: Variant.LocalGet<NumericDataType>) => {
  return `
    (local.get $${node.name})
  `;
};

const localSet = (node: Variant.LocalSet) => {
  return `
    (local.set $${node.name} ${instr(node.value)})
  `;
};

const add = (node: Variant.Add<NumericDataType>) => {
  return `
    (${node.dataType}.add ${instr(node.left)} ${instr(node.right)})
  `;
};

const sub = (node: Variant.Sub<NumericDataType>) => {
  return `
    (${node.dataType}.sub ${instr(node.left)} ${instr(node.right)})
  `;
};

const mul = (node: Variant.Mul<NumericDataType>) => {
  return `
    (${node.dataType}.mul ${instr(node.left)} ${instr(node.right)})
  `;
};

const divSigned = (node: Variant.DivSigned<NumericDataType>) => {
  return `
    (${node.dataType}.div_s ${instr(node.left)} ${instr(node.right)})
  `;
};

const divUnsigned = (node: Variant.DivUnsigned<NumericDataType>) => {
  return `
    (${node.dataType}.div_u ${instr(node.left)} ${instr(node.right)})
  `;
};

const remSigned = (node: Variant.RemSigned<IntegerDataType>) => {
  return `
    (${node.dataType}.rem_s ${instr(node.left)} ${instr(node.right)})
  `;
};

const remUnsigned = (node: Variant.RemUnsigned<IntegerDataType>) => {
  return `
    (${node.dataType}.rem_u ${instr(node.left)} ${instr(node.right)})
  `;
};

const constant = (node: Variant.Const<NumericDataType>) => {
  return `
    (${node.dataType}.const ${node.value})
  `;
};

const call = (node: Variant.Call<DataType>) => {
  return `
    (call $${node.name}
      ${node.args.map((arg) => instr(arg)).join('\n')}
    )
  `;
};

const callIndirect = (node: Variant.CallIndirect<DataType>) => {
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

const instr = (node: VariantInstr): string => {
  return match(node)
    .with({ __nodeType: 'add' }, add)
    .with({ __nodeType: 'sub' }, sub)
    .with({ __nodeType: 'mul' }, mul)
    .with({ __nodeType: 'divSigned' }, divSigned)
    .with({ __nodeType: 'divUnsigned' }, divUnsigned)
    .with({ __nodeType: 'remSigned' }, remSigned)
    .with({ __nodeType: 'remUnsigned' }, remUnsigned)
    .with({ __nodeType: 'localGet' }, localGet)
    .with({ __nodeType: 'const' }, constant)
    .with({ __nodeType: 'call' }, call)
    .with({ __nodeType: 'callIndirect' }, callIndirect)
    .otherwise(() => {
      throw new Error(`Unexpected ${node.__nodeType} node`);
    });
};

export const compilers = {
  instr,
  localGet,
  localSet,
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
};

export const compile = (m: Module) => {
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
