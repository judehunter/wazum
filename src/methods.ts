import { NoInfer } from './utils';
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
  Func,
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
  Expr,
  Instr,
  Stmt,
  GlobalGet,
  GlobalSet,
  GlobalTee,
} from './variants';

export const local = {
  get: <T extends NumericDataType>(dataType: T, name: string): LocalGet<T> => ({
    __nodeType: 'localGet',
    dataType,
    name,
    returnType: dataType,
  }),
  set: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Expr<NoInfer<T>>,
  ): LocalSet => ({
    __nodeType: 'localSet',
    dataType,
    name,
    value,
    returnType: 'none',
  }),
  tee: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Expr<NoInfer<T>>,
  ): LocalTee<T> => ({
    __nodeType: 'localTee',
    dataType,
    name,
    returnType: dataType,
    value,
  }),
};

export const global = {
  get: <T extends NumericDataType>(
    dataType: T,
    name: string,
  ): GlobalGet<T> => ({
    __nodeType: 'globalGet',
    dataType,
    name,
    returnType: dataType,
  }),
  set: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Expr<NoInfer<T>>,
  ): GlobalSet => ({
    __nodeType: 'globalSet',
    dataType,
    name,
    value,
    returnType: 'none',
  }),
  tee: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Expr<NoInfer<T>>,
  ): GlobalTee<T> => ({
    __nodeType: 'globalTee',
    dataType,
    name,
    returnType: dataType,
    value,
  }),
};

export const add = <T extends NumericDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): Add<T> => ({
  __nodeType: 'add',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const sub = <T extends NumericDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): Sub<T> => ({
  __nodeType: 'sub',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const mul = <T extends NumericDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): Mul<T> => ({
  __nodeType: 'mul',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const divSigned = <T extends NumericDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): DivSigned<T> => ({
  __nodeType: 'divSigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const divUnsigned = <T extends NumericDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): DivUnsigned<T> => ({
  __nodeType: 'divUnsigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const remSigned = <T extends IntegerDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): RemSigned<T> => ({
  __nodeType: 'remSigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const remUnsigned = <T extends IntegerDataType>(
  dataType: T,
  left: Expr<NoInfer<T>>,
  right: Expr<NoInfer<T>>,
): RemUnsigned<T> => ({
  __nodeType: 'remUnsigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

export const constant = <T extends NumericDataType>(
  dataType: T,
  value: number,
): Const<T> => ({
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
  body: Expr<NoInfer<T>>,
): Func<T> => ({
  __nodeType: 'func',
  name,
  params: signature.params,
  locals: signature.locals,
  body,
  dataType: signature.returnType,
  exportName: null,
});

export const drop = (value: Expr): Drop => ({
  __nodeType: 'drop',
  value,
  returnType: 'none',
});

export const block = <T extends DataType>(
  name: string | null,
  returnType: T,
  value: [...Stmt[], Omit<Instr, 'returnType'> & { returnType: NoInfer<T> }],
): Block<T> => ({
  __nodeType: 'block',
  name,
  value,
  returnType,
});

export const call = <T extends DataType>(
  name: string,
  returnType: T,
  args: Expr[],
): Call<T> => ({
  __nodeType: 'call',
  name,
  args,
  returnType,
});

export const callIndirect = <T extends DataType>(
  tableName: string,
  address: Expr,
  signature: {
    params: [type: DataType, name?: string][];
    returnType: T;
  },
  args: Expr[],
): CallIndirect<T> => ({
  __nodeType: 'callIndirect',
  tableName,
  address,
  params: signature.params,
  args: args,
  dataType: signature.returnType,
  returnType: signature.returnType,
});

export const load = <T extends DataType>(
  dataType: T,
  offset: number,
  align: number,
  base: Expr<IntegerDataType>,
): Load<T> => ({
  __nodeType: 'load',
  returnType: dataType,
  dataType,
  align,
  base,
  offset,
});

export const store = (
  dataType: DataType,
  offset: number,
  align: number,
  base: Expr<IntegerDataType>,
  value: Expr,
): Store => ({
  __nodeType: 'store',
  dataType,
  align,
  base,
  offset,
  value,
  returnType: 'none',
});
