import { Replace } from './utils';

export type IntegerDataType = 'i32' | 'i64';
export type FloatDataType = 'f32' | 'f64';
export type NumericDataType = IntegerDataType | FloatDataType;
export type PresentDataType = NumericDataType;
export type DataType = NumericDataType | 'none';

/**
 * The node representing the `local.get` instruction.
 */
export type LocalGet<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'localGet';
  dataType: T;
  name: string;
  returnType: T;
};
/**
 * The node representing the `local.set` instruction.
 */
export type LocalSet = {
  __nodeType: 'localSet';
  dataType: NumericDataType;
  name: string;
  value: Instr;
  returnType: 'none';
};
/**
 * The node representing the `local.tee` instruction.
 */
export type LocalTee<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'localTee';
  dataType: T;
  name: string;
  value: Instr;
  returnType: T;
};
/**
 * The node representing the `global.get` instruction.
 */
export type GlobalGet<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'globalGet';
  dataType: T;
  name: string;
  returnType: T;
};
/**
 * The node representing the `global.set` instruction.
 */
export type GlobalSet = {
  __nodeType: 'globalSet';
  dataType: NumericDataType;
  name: string;
  value: Instr;
  returnType: 'none';
};
/**
 * The node representing the `global.tee` instruction.
 */
export type GlobalTee<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'globalTee';
  dataType: T;
  name: string;
  value: Instr;
  returnType: T;
};
/**
 * The node representing the `clz` instruction.
 */
export type Clz<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'clz';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `ctz` instruction.
 */
export type Ctz<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'ctz';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `popcnt` instruction.
 */
export type Popcnt<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'popcnt';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `add` instruction.
 */
export type Add<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'add';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `sub` instruction.
 */
export type Sub<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'sub';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `mul` instruction.
 */
export type Mul<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'mul';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `div_s` instruction.
 */
export type DivSigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'divSigned';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `div_u` instruction.
 */
export type DivUnsigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'divUnsigned';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `rem_s` instruction.
 */
export type RemSigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'remSigned';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `rem_u` instruction.
 */
export type RemUnsigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'remUnsigned';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `and` instruction.
 */
export type And<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'and';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `or` instruction.
 */
export type Or<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'or';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `xor` instruction.
 */
export type Xor<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'xor';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `shl` instruction.
 */
export type ShiftLeft<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'shl';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `shr_s` instruction.
 */
export type ShiftRightSigned<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'shrSigned';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `shr_u` instruction.
 */
export type ShiftRightUnsigned<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'shrUnsigned';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `rotl` instruction.
 */
export type RotateLeft<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'rotl';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `rotr` instruction.
 */
export type RotateRight<T extends IntegerDataType = IntegerDataType> = {
  __nodeType: 'rotr';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
  returnType: T;
};
/**
 * The node representing the `func` declaration.
 * Note: This is not an instruction node.
 */
export type Func<T extends DataType = DataType> = {
  __nodeType: 'func';
  name: string;
  params: [type: NumericDataType, name: string][];
  locals: [type: NumericDataType, name: string][];
  body: Instr<T>;
  dataType: T;
  exportName: string | null;
};
/**
 * The node representing the `func` declaration.
 * Note: This is not an instruction node.
 */
export type FuncImport<T extends DataType = DataType> = {
  __nodeType: 'funcImport';
  name: string;
  params: [type: NumericDataType, name: string][];
  dataType: T;
  importPath: string;
  importName: string;
};
/**
 * The node representing the `call` instruction.
 */
export type Call<T extends DataType = DataType> = {
  __nodeType: 'call';
  name: string;
  args: Instr[];
  returnType: T;
};
/**
 * The node representing the `call_indirect` instruction.
 */
export type CallIndirect<T extends DataType = DataType> = {
  __nodeType: 'callIndirect';
  dataType: T;
  params: [type: DataType, name?: string][];
  args: Instr[];
  tableName: string;
  address: Instr;
  returnType: T;
};
/**
 * The node representing the `drop` instruction.
 */
export type Drop = {
  __nodeType: 'drop';
  value: Instr;
  returnType: 'none';
};
/**
 * The node representing the `block` instruction.
 */
export type Block<T extends DataType = DataType> = {
  __nodeType: 'block';
  name: string | null;
  body: [...Instr<'none'>[], Instr<T>] | [Instr<T>] | [];
  returnType: T;
};
/**
 * The node representing the `const` instruction.
 */
export type Const<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'constant';
  value: number;
  dataType: T;
  returnType: T;
};
/**
 * The node representing the `load` instruction.
 */
export type Load<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'load';
  offset: number;
  align: number | null;
  base: Instr<IntegerDataType>;
  dataType: T;
  returnType: T;
};
/**
 * The node representing the `load8_s` instruction.
 */
export type Load8SignExt<T extends NumericDataType = NumericDataType> = Replace<
  Load<T>,
  { __nodeType: 'load8SignExt' }
>;
/**
 * The node representing the `load16_s` instruction.
 */
export type Load16SignExt<T extends NumericDataType = NumericDataType> =
  Replace<Load<T>, { __nodeType: 'load16SignExt' }>;
/**
 * The node representing the `load32_s` instruction.
 */
export type Load32SignExt<T extends NumericDataType = NumericDataType> =
  Replace<
    Load<T>,
    { __nodeType: 'load32SignExt'; dataType: 'i64'; returnType: 'i64' }
  >;
/**
 * The node representing the `load8_u` instruction.
 */
export type Load8ZeroExt<T extends NumericDataType = NumericDataType> = Replace<
  Load<T>,
  { __nodeType: 'load8ZeroExt' }
>;
/**
 * The node representing the `load16_u` instruction.
 */
export type Load16ZeroExt<T extends NumericDataType = NumericDataType> =
  Replace<Load<T>, { __nodeType: 'load16ZeroExt' }>;
/**
 * The node representing the `load32_u` instruction.
 */
export type Load32ZeroExt<T extends NumericDataType = NumericDataType> =
  Replace<
    Load<T>,
    { __nodeType: 'load32ZeroExt'; dataType: 'i64'; returnType: 'i64' }
  >;
/**
 * The node representing the `store` instruction.
 */
export type Store = {
  __nodeType: 'store';
  dataType: NumericDataType;
  offset: number;
  align: number | null;
  base: Instr<IntegerDataType>;
  value: Instr;
  returnType: 'none';
};
/**
 * The node representing the `store8` instruction.
 */
export type Store8 = Replace<Store, { __nodeType: 'store8' }>;
/**
 * The node representing the `store16` instruction.
 */
export type Store16 = Replace<Store, { __nodeType: 'store16' }>;
/**
 * The node representing the `store32` instruction.
 */
export type Store32 = Replace<
  Store,
  { __nodeType: 'store32'; dataType: 'i64' }
>;

/**
 * The node representing the `loop` instruction.
 */
export type Loop = {
  __nodeType: 'loop';
  returnType: 'none';
  name: string | null;
  body: Instr<'none'>[];
};

/**
 * The node representing the `br_if` instruction.
 */
export type BranchIf = {
  __nodeType: 'branchIf';
  returnType: 'none';
  branchTo: string | number;
  cond: Instr<NumericDataType>;
};

/**
 * The node representing the `br_if` instruction.
 */
export type Branch = {
  __nodeType: 'branch';
  returnType: 'none';
  branchTo: string | number;
};

/**
 * The node representing the `eq` instruction.
 */
export type Equal<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'equal';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `eqz` instruction.
 */
export type EqualZero<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'equalZero';
  returnType: 'i32';
  dataType: T;
  right: Instr<T>;
};

/**
 * The node representing the `eq` instruction.
 */
export type NotEqual<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'notEqual';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `gt_s` instruction.
 */
export type GreaterThanSigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'greaterThanSigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `gt_u` instruction.
 */
export type GreaterThanUnsigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'greaterThanUnsigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `lt_s` instruction.
 */
export type LessThanSigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'lessThanSigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `lt_u` instruction.
 */
export type LessThanUnsigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'lessThanUnsigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `ge_s` instruction.
 */
export type GreaterEqualSigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'greaterEqualSigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `ge_u` instruction.
 */
export type GreaterEqualUnsigned<T extends NumericDataType = NumericDataType> =
  {
    __nodeType: 'greaterEqualUnsigned';
    returnType: 'i32';
    dataType: T;
    left: Instr<T>;
    right: Instr<T>;
  };

/**
 * The node representing the `le_s` instruction.
 */
export type LessEqualSigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'lessEqualSigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * The node representing the `le_u` instruction.
 */
export type LessEqualUnsigned<T extends NumericDataType = NumericDataType> = {
  __nodeType: 'lessEqualUnsigned';
  returnType: 'i32';
  dataType: T;
  left: Instr<T>;
  right: Instr<T>;
};

/**
 * All possible instruction nodes.
 */
type InstrList =
  | Drop
  | LocalSet
  | GlobalSet
  | Store
  | Store8
  | Store16
  | Store32
  | LocalGet
  | LocalTee
  | GlobalGet
  | GlobalTee
  | Block
  | Call
  | CallIndirect
  | Const
  | Clz
  | Ctz
  | Popcnt
  | Add
  | Sub
  | Mul
  | DivSigned
  | DivUnsigned
  | RemSigned
  | RemUnsigned
  | And
  | Or
  | Xor
  | ShiftLeft
  | ShiftRightSigned
  | ShiftRightUnsigned
  | RotateLeft
  | RotateRight
  | Load
  | Load8SignExt
  | Load16SignExt
  | Load32SignExt
  | Load8ZeroExt
  | Load16ZeroExt
  | Load32ZeroExt
  | Loop
  | Branch
  | BranchIf
  | Equal
  | EqualZero
  | GreaterThanSigned
  | GreaterThanUnsigned
  | LessThanSigned
  | LessThanUnsigned
  | GreaterEqualSigned
  | GreaterEqualUnsigned
  | LessEqualSigned
  | LessEqualUnsigned;

type FilterInstrByDataType<I extends { returnType: any }, DT> = I extends any
  ? I['returnType'] & DT extends never
  ? never
  : I
  : never;

/**
 * This generic type returns a union of all the instruction node types
 * that have a compatible return type.
 *
 * For instance, `Instr<'i32'>` will be the union of all instruction node types
 * that can have `returnType === 'i32'`.
 */
export type Instr<DT extends DataType = DataType> = FilterInstrByDataType<
  InstrList,
  DT
>;
