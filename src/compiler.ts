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
    (local.get ${node.name})
  `;
};

const localSet = (node: Variant.LocalSet) => {
  return `
    (local.set ${node.name} ${instr(node.value)})
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
};

export const compile = (m: Module) => {
  return `
    (module
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
            .join('\n')}
          (result ${func.dataType})
          ${func.locals
            .map(([dt, name]) => `(local $${name} ${dt})`)
            .join('\n')}
          ${instr(func.body)}
        )
      `,
        )
        .join('\n')}
    )
  `;
};
