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
}
// type VariantReturn<V extends {returnType: DataType}> = V['returnType'];
export type VariantStmt = Variant.Drop | Variant.LocalSet;
export type VariantExpr<T extends DataType = DataType> =
  | Variant.LocalGet<T>
  | Variant.Block<T>
  | Variant.Call<T>
  | Variant.Const<T>
  | Variant.Add<T>
  | Variant.Sub<T>
  | Variant.Mul<T>
  | Variant.DivSigned<T>
  | Variant.DivUnsigned<T>
  | Variant.RemSigned<T>
  | Variant.RemUnsigned<T>;
export type VariantInstr = VariantStmt | VariantExpr;
// export type VariantMisc = ;
