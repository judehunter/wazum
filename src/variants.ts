import { Replace } from './utils';

export type IntegerDataType = 'i32' | 'i64';
export type FloatDataType = 'f32' | 'f64';
export type NumericDataType = IntegerDataType | FloatDataType;
export type DataType = NumericDataType | 'none';

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
  value: Expr;
  returnType: 'none';
};
export type LocalTee<T extends DataType> = {
  __nodeType: 'localTee';
  dataType: DataType;
  name: string;
  value: Expr;
  returnType: T;
};
export type GlobalGet<T extends DataType> = {
  __nodeType: 'globalGet';
  dataType: T;
  name: string;
  returnType: T;
};
export type GlobalSet = {
  __nodeType: 'globalSet';
  dataType: DataType;
  name: string;
  value: Expr;
  returnType: 'none';
};
export type GlobalTee<T extends DataType> = {
  __nodeType: 'globalTee';
  dataType: DataType;
  name: string;
  value: Expr;
  returnType: T;
};
export type Add<T extends DataType> = {
  __nodeType: 'add';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type Sub<T extends DataType> = {
  __nodeType: 'sub';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type Mul<T extends DataType> = {
  __nodeType: 'mul';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type DivSigned<T extends DataType> = {
  __nodeType: 'divSigned';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type DivUnsigned<T extends DataType> = {
  __nodeType: 'divUnsigned';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type RemSigned<T extends DataType> = {
  __nodeType: 'remSigned';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type RemUnsigned<T extends DataType> = {
  __nodeType: 'remUnsigned';
  dataType: T;
  left: Expr<T>;
  right: Expr<T>;
  returnType: T;
};
export type Func<T extends DataType> = {
  __nodeType: 'func';
  name: string;
  params: [type: DataType, name: string][];
  locals: [type: DataType, name: string][];
  body: Expr;
  dataType: T;
  exportName: string | null;
};
export type Call<T extends DataType> = {
  __nodeType: 'call';
  name: string;
  args: Expr[];
  returnType: T;
};
export type CallIndirect<T extends DataType> = {
  __nodeType: 'callIndirect';
  dataType: T;
  params: [type: DataType, name?: string][];
  args: Expr[];
  tableName: string;
  address: Expr;
  returnType: T;
};
export type Drop = {
  __nodeType: 'drop';
  value: Expr;
  returnType: 'none';
};
export type Block<T extends DataType> = {
  __nodeType: 'block';
  name: string | null;
  value: [...Stmt[], Omit<Instr, 'returnType'> & { returnType: T }];
  returnType: T;
};
export type Const<T extends DataType> = {
  __nodeType: 'const';
  value: number;
  dataType: T;
  returnType: T;
};
export type Load<T extends DataType> = {
  __nodeType: 'load';
  offset: number;
  align: number;
  base: Expr<IntegerDataType>;
  dataType: T;
  returnType: T;
};
export type Load8SignExt<T extends DataType> = Replace<
  Load<T>,
  { __nodeType: 'load8SignExt' }
>;
export type Load16SignExt<T extends DataType> = Replace<
  Load<T>,
  { __nodeType: 'load16SignExt' }
>;
export type Load32SignExt<T extends DataType> = Replace<
  Load<T>,
  { __nodeType: 'load32SignExt' }
>;
export type Load8ZeroExt<T extends DataType> = Replace<
  Load<T>,
  { __nodeType: 'load8ZeroExt' }
>;
export type Load16ZeroExt<T extends DataType> = Replace<
  Load<T>,
  { __nodeType: 'load16ZeroExt' }
>;
export type Load32ZeroExt<T extends DataType> = Replace<
  Load<T>,
  { __nodeType: 'load32ZeroExt' }
>;
export type Store = {
  __nodeType: 'store';
  dataType: DataType;
  offset: number;
  align: number;
  base: Expr<IntegerDataType>;
  value: Expr;
  returnType: 'none';
};
export type Store8SignExt = Replace<Store, { __nodeType: 'store8SignExt' }>;
export type Store16SignExt = Replace<Store, { __nodeType: 'store16SignExt' }>;
export type Store32SignExt = Replace<Store, { __nodeType: 'store32SignExt' }>;
export type Store8ZeroExt = Replace<Store, { __nodeType: 'store8ZeroExt' }>;
export type Store16ZeroExt = Replace<Store, { __nodeType: 'store16ZeroExt' }>;
export type Store32ZeroExt = Replace<Store, { __nodeType: 'store32ZeroExt' }>;

export type Stmt =
  | Drop
  | LocalSet
  | GlobalSet
  | Store
  | Store8SignExt
  | Store16SignExt
  | Store32SignExt
  | Store8ZeroExt
  | Store16ZeroExt
  | Store32ZeroExt;
export type Expr<T extends DataType = DataType> =
  | LocalGet<T>
  | LocalTee<T>
  | GlobalGet<T>
  | GlobalTee<T>
  | Block<T>
  | Call<T>
  | CallIndirect<T>
  | Const<T>
  | Add<T>
  | Sub<T>
  | Mul<T>
  | DivSigned<T>
  | DivUnsigned<T>
  | RemSigned<T>
  | RemUnsigned<T>
  | Load<T>
  | Load8SignExt<T>
  | Load16SignExt<T>
  | Load32SignExt<T>
  | Load8ZeroExt<T>
  | Load16ZeroExt<T>
  | Load32ZeroExt<T>;
export type Instr = Stmt | Expr;
