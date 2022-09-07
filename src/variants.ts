import { Override } from "./utils";

export type IntegerDataType = 'i32' | 'i64';
export type FloatDataType = 'f32' | 'f64';
export type NumericDataType = IntegerDataType | FloatDataType;
export type DataType = NumericDataType | 'none';

export namespace Variant {
  // export type Local = {
  //   __nodeType: 'local';
  //   dataType: DataType;
  //   name: string;
  //   get: () => LocalGet;
  //   set: (val: VariantExpr) => LocalSet;
  // };
  export type LocalGet<T extends DataType> = {
    __nodeType: 'localGet';
    dataType: T;
    name: string;
    returnType: T;
  };
  export type LocalSet = {
    __nodeType: 'localSet';
    dataType: DataType;
    name: string;
    value: VariantExpr;
    returnType: 'none';
  };
  export type Add<T extends DataType> = {
    __nodeType: 'add';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type Sub<T extends DataType> = {
    __nodeType: 'sub';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type Mul<T extends DataType> = {
    __nodeType: 'mul';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type DivSigned<T extends DataType> = {
    __nodeType: 'divSigned';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type DivUnsigned<T extends DataType> = {
    __nodeType: 'divUnsigned';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type RemSigned<T extends DataType> = {
    __nodeType: 'remSigned';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type RemUnsigned<T extends DataType> = {
    __nodeType: 'remUnsigned';
    dataType: T;
    left: VariantExpr<T>;
    right: VariantExpr<T>;
    returnType: T;
  };
  export type Func<T extends DataType> = {
    __nodeType: 'func';
    name: string;
    params: [type: DataType, name: string][];
    locals: [type: DataType, name: string][];
    body: VariantExpr;
    dataType: T;
    exportName: string | null;
  };
  export type Call<T extends DataType> = {
    __nodeType: 'call';
    name: string;
    args: VariantExpr[];
    returnType: T;
  };
  export type CallIndirect<T extends DataType> = {
    __nodeType: 'callIndirect';
    dataType: T;
    params: [type: DataType, name?: string][];
    args: VariantExpr[];
    tableName: string;
    address: VariantExpr;
  };
  export type Drop = {
    __nodeType: 'drop';
    value: VariantExpr;
    returnType: 'none';
  };
  export type Block<T extends DataType> = {
    __nodeType: 'block';
    name: string | null;
    value: [
      ...VariantStmt[],
      Omit<VariantInstr, 'returnType'> & { returnType: T },
    ];
    returnType: T;
  };
  export type Const<T extends DataType> = {
    __nodeType: 'const';
    value: number;
    dataType: T;
    returnType: T;
  };
  export type Load<T extends DataType> = {
    __nodeType: 'load',
    offset: number,
    align: number,
    base: VariantExpr<IntegerDataType>;
    dataType: T;
    returnType: T;
  }
  export type Load8SignExt<T extends DataType> = Override<Load<T>, {__nodeType: 'load8SignExt'}>;
  export type Load16SignExt<T extends DataType> = Override<Load<T>, {__nodeType: 'load16SignExt'}>;
  export type Load32SignExt<T extends DataType> = Override<Load<T>, {__nodeType: 'load32SignExt'}>;
  export type Load8ZeroExt<T extends DataType> = Override<Load<T>, {__nodeType: 'load8ZeroExt'}>;
  export type Load16ZeroExt<T extends DataType> = Override<Load<T>, {__nodeType: 'load16ZeroExt'}>;
  export type Load32ZeroExt<T extends DataType> = Override<Load<T>, {__nodeType: 'load32ZeroExt'}>;
  export type Store<T extends DataType> = {
    __nodeType: 'store',
    offset: number,
    align: number,
    base: VariantExpr<IntegerDataType>,
    value: VariantExpr,
  }
  export type Store8SignExt<T extends DataType> = Override<Store<T>, {__nodeType: 'store8SignExt'}>;
  export type Store16SignExt<T extends DataType> = Override<Store<T>, {__nodeType: 'store16SignExt'}>;
  export type Store32SignExt<T extends DataType> = Override<Store<T>, {__nodeType: 'store32SignExt'}>;
  export type Store8ZeroExt<T extends DataType> = Override<Store<T>, {__nodeType: 'store8ZeroExt'}>;
  export type Store16ZeroExt<T extends DataType> = Override<Store<T>, {__nodeType: 'store16ZeroExt'}>;
  export type Store32ZeroExt<T extends DataType> = Override<Store<T>, {__nodeType: 'store32ZeroExt'}>;
}
// type VariantRturn<V extends {returnType: DataType}> = V['returnType'];
export type VariantStmt = Variant.Drop | Variant.LocalSet;
export type VariantExpr<T extends DataType = DataType> =
  | Variant.LocalGet<T>
  | Variant.Block<T>
  | Variant.Call<T>
  | Variant.CallIndirect<T>
  | Variant.Const<T>
  | Variant.Add<T>
  | Variant.Sub<T>
  | Variant.Mul<T>
  | Variant.DivSigned<T>
  | Variant.DivUnsigned<T>
  | Variant.RemSigned<T>
  | Variant.RemUnsigned<T>
  | Variant.Load<T>
  | Variant.Load8SignExt<T>
  | Variant.Load16SignExt<T>
  | Variant.Load32SignExt<T>
  | Variant.Load8ZeroExt<T>
  | Variant.Load16ZeroExt<T>
  | Variant.Load32ZeroExt<T>
  | Variant.Store8SignExt<T>
  | Variant.Store16SignExt<T>
  | Variant.Store32SignExt<T>
  | Variant.Store8ZeroExt<T>
  | Variant.Store16ZeroExt<T>
  | Variant.Store32ZeroExt<T>;
export type VariantInstr = VariantStmt | VariantExpr;
// export type VariantMisc = ;
