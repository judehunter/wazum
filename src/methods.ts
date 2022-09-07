import { NoInfer } from './utils';
import {
  DataType,
  IntegerDataType,
  NumericDataType,
  Variant,
  VariantExpr,
  VariantInstr,
  VariantStmt,
} from './variants';

export const local = {
  get: <T extends NumericDataType>(
    dataType: T,
    name: string,
  ): Variant.LocalGet<T> => ({
    __nodeType: 'localGet',
    dataType,
    name,
    returnType: dataType,
  }),
  set: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: VariantExpr<NoInfer<T>>,
  ): Variant.LocalSet => ({
    __nodeType: 'localSet',
    dataType,
    name,
    value,
    returnType: 'none',
  }),
};

export const add = <T extends NumericDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.Add<T> => ({
  __nodeType: 'add',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const sub = <T extends NumericDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.Sub<T> => ({
  __nodeType: 'sub',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const mul = <T extends NumericDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.Mul<T> => ({
  __nodeType: 'mul',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const divSigned = <T extends NumericDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.DivSigned<T> => ({
  __nodeType: 'divSigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const divUnsigned = <T extends NumericDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.DivUnsigned<T> => ({
  __nodeType: 'divUnsigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const remSigned = <T extends IntegerDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.RemSigned<T> => ({
  __nodeType: 'remSigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const remUnsigned = <T extends IntegerDataType>(
  dataType: T,
  left: VariantExpr<NoInfer<T>>,
  right: VariantExpr<NoInfer<T>>,
): Variant.RemUnsigned<T> => ({
  __nodeType: 'remUnsigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const constant = <T extends NumericDataType>(
  dataType: T,
  value: number,
): Variant.Const<T> => ({
  __nodeType: 'const',
  value,
  dataType,
  returnType: dataType,
});

export const func = <T extends DataType>(
  name: string,
  signature: {
    params: [type: DataType, name: string][];
    locals: [type: DataType, name: string][];
    returnType: T;
  },
  body: VariantExpr<NoInfer<T>>,
): Variant.Func<T> => ({
  __nodeType: 'func',
  name,
  params: signature.params,
  locals: signature.locals,
  body,
  dataType: signature.returnType,
  exportName: null,
});

export const drop = (value: VariantExpr): Variant.Drop => ({
  __nodeType: 'drop',
  value,
  returnType: 'none',
});

export const block = <T extends DataType>(
  name: string | null,
  returnType: T,
  value: [
    ...VariantStmt[],
    Omit<VariantInstr, 'returnType'> & { returnType: NoInfer<T> },
  ],
): Variant.Block<T> => ({
  __nodeType: 'block',
  name,
  value,
  returnType,
});

export const call = <T extends DataType>(
  name: string,
  returnType: T,
  args: VariantExpr[],
): Variant.Call<T> => ({
  __nodeType: 'call',
  name,
  args,
  returnType,
});

export const callIndirect = <T extends DataType>(
  tableName: string,
  address: VariantExpr,
  signature: {
    params: [type: DataType, name?: string][];
    returnType: T;
  },
  args: VariantExpr[],
): Variant.CallIndirect<T> => ({
  __nodeType: 'callIndirect',
  tableName,
  address,
  params: signature.params,
  args: args,
  dataType: signature.returnType,
});

export const load = <T extends DataType>(
  
): Variant.Load<T> => ({
  __nodeType: 'load',

})