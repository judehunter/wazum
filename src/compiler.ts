import { Module } from './module';
import { DataType, NumericDataType, Variant, VariantInstr } from './variants';
import { match } from 'ts-pattern';

const localGet = (node: Variant.LocalGet<NumericDataType>) => {
  return `
    (${node.dataType}.get ${node.name})
  `;
};

const add = (node: Variant.Add<NumericDataType>) => {
  return `
    (${node.dataType}.add ${instr(node.left)} ${instr(node.right)})
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
    .with({ __nodeType: 'localGet' }, localGet)
    .with({ __nodeType: 'const' }, constant)
    .otherwise(() => {
      throw new Error(`Unexpected ${node.__nodeType} node`);
    });
};

export const compilers = {
  instr,
  localGet,
  add,
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
