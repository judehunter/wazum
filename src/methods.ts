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
  Instr,
  GlobalGet,
  GlobalSet,
  GlobalTee,
  Loop,
  BranchIf,
  Branch,
  Eqz,
  Load8SignExt,
  Load8ZeroExt,
  Load16SignExt,
  Load32SignExt,
  Load32ZeroExt,
  Store8,
  Store16,
  Store32,
} from './nodes';

/**
 * Methods for the `local.get`, `local.set`, and `local.tee` instructions.
 */
export const local = {
  /**
   * Creates a node for the `local.get` instruction.
   * The local has to be defined in the function.
   *
   * When compiled, results in
   * ```wat
   * (local.get $[name])
   * ```
   * @param dataType the data type of the local.
   * @param name the name of the local (without the prefixing dollar sign).
   */
  get: <T extends NumericDataType>(dataType: T, name: string): LocalGet<T> => ({
    __nodeType: 'localGet',
    dataType,
    name,
    returnType: dataType,
  }),
  /**
   * Creates a node for the `local.set` instruction.
   * The local has to be defined in the function.
   *
   * When compiled, results in
   * ```wat
   * (local.set $[name] [value])
   * ```
   * @param dataType the data type of the local.
   * @param name the name of the local (without the prefixing dollar sign).
   * @param value the value `Expr` node.
   */
  set: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Instr<NoInfer<T>>,
  ): LocalSet => ({
    __nodeType: 'localSet',
    dataType,
    name,
    value,
    returnType: 'none',
  }),
  /**
   * Creates a node for the `local.tee` instruction.
   * The local has to be defined in the function.
   *
   * When compiled, results in
   * ```wat
   * (local.tee $[name] [value])
   * ```
   * @param dataType the data type of the local.
   * @param name the name of the local (without the prefixing dollar sign).
   * @param value the value `Expr` node.
   */
  tee: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Instr<NoInfer<T>>,
  ): LocalTee<T> => ({
    __nodeType: 'localTee',
    dataType,
    name,
    returnType: dataType,
    value,
  }),
};

export const global = {
  /**
   * Creates a node for the `global.get` instruction.
   * The global has to be defined in the module.
   *
   * When compiled, results in
   * ```wat
   * (global.get $[name])
   * ```
   * @param dataType the data type of the global.
   * @param name the name of the global (without the prefixing dollar sign).
   */
  get: <T extends NumericDataType>(
    dataType: T,
    name: string,
  ): GlobalGet<T> => ({
    __nodeType: 'globalGet',
    dataType,
    name,
    returnType: dataType,
  }),
  /**
   * Creates a node for the `global.set` instruction.
   * The global has to be defined in the module.
   *
   * When compiled, results in
   * ```wat
   * (global.set $[name] [value])
   * ```
   * @param dataType the data type of the global.
   * @param name the name of the global (without the prefixing dollar sign).
   * @param value the value `Expr` node.
   */
  set: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Instr<NoInfer<T>>,
  ): GlobalSet => ({
    __nodeType: 'globalSet',
    dataType,
    name,
    value,
    returnType: 'none',
  }),
  /**
   * Creates a node for the `global.tee` instruction.
   * The global has to be defined in the module.
   *
   * When compiled, results in
   * ```wat
   * (global.tee $[name] [value])
   * ```
   * @param dataType the data type of the global.
   * @param name the name of the global (without the prefixing dollar sign).
   * @param value the value `Expr` node.
   */
  tee: <T extends NumericDataType>(
    dataType: T,
    name: string,
    value: Instr<NoInfer<T>>,
  ): GlobalTee<T> => ({
    __nodeType: 'globalTee',
    dataType,
    name,
    returnType: dataType,
    value,
  }),
};

/**
 * Creates a node for the `add` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].add [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const add = <T extends NumericDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): Add<T> => ({
  __nodeType: 'add',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `sub` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].sub [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const sub = <T extends NumericDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): Sub<T> => ({
  __nodeType: 'sub',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `mul` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].mul [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const mul = <T extends NumericDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): Mul<T> => ({
  __nodeType: 'mul',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `div_s` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].div_s [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const divSigned = <T extends NumericDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): DivSigned<T> => ({
  __nodeType: 'divSigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `div_u` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].div_u [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const divUnsigned = <T extends NumericDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): DivUnsigned<T> => ({
  __nodeType: 'divUnsigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `rem_s` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].rem_s [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const remSigned = <T extends IntegerDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): RemSigned<T> => ({
  __nodeType: 'remSigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `rem_u` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].rem_u [left] [right])
 * ```
 * @param dataType the data type of both operands and of the result type.
 * @param left the value `Expr` node of the left operand.
 * @param right the value `Expr` node of the right operand.
 */
export const remUnsigned = <T extends IntegerDataType>(
  dataType: T,
  left: Instr<NoInfer<T>>,
  right: Instr<NoInfer<T>>,
): RemUnsigned<T> => ({
  __nodeType: 'remUnsigned',
  dataType,
  left,
  right,
  returnType: dataType,
});

/**
 * Creates a node for the `const` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].const [value])
 * ```
 * @param dataType the data type of the constant.
 * @param value the literal value.
 */
export const constant = <T extends NumericDataType>(
  dataType: T,
  value: number,
): Const<T> => ({
  __nodeType: 'const',
  value,
  dataType,
  returnType: dataType,
});

/**
 * Creates a node for the `func` instruction.
 * Note: to add the function to your module, use `w.addFunc`.
 *
 * When compiled, results in
 * ```wat
 * (func $[name]
 *  (param $[param name] [param type]) ;; for each param in signature.params
 *  (local $[local name] [local type]) ;; for each local in signature.locals
 *  (result [signature.returnType]) ;; if returnType is not `none`
 *  [body]
 * )
 * ```
 * @param name
 * @param signature.params a list of `[type, name]` tuples for each param.
 * @param signature.locals a list of `[type, name]` tuples for each local.
 * @param signature.returnType the return type of the function. Has to be the same as the `returnType` of `body`.
 * @param body the value `Expr` node to be returned.
 */
export const func = <T extends DataType>(
  name: string,
  signature: {
    params: [type: NumericDataType, name: string][];
    locals: [type: NumericDataType, name: string][];
    returnType: T;
  },
  body: Instr<NoInfer<T>>,
): Func<T> => ({
  __nodeType: 'func',
  name,
  params: signature.params,
  locals: signature.locals,
  body,
  dataType: signature.returnType,
  exportName: null,
});

/**
 * Creates a node for the `drop` instruction.
 *
 * When compiled, results in
 * ```wat
 * (drop [value])
 * ```
 * @param value the value `Expr` to be dropped.
 */
export const drop = (value: Instr): Drop => ({
  __nodeType: 'drop',
  value,
  returnType: 'none',
});

/**
 * Creates a node for the `block` instruction.
 *
 * @param name the optional name of the block. `null` if anonymous.
 * @param returnType the return type of the block. Has to be the same as the last node's return type in `value`.
 * @param value a list of instructions that make up the block. All but the last one must be statements.
 */
export const block = <T extends DataType>(
  name: string | null,
  returnType: T,
  value: [...Instr<'none'>[], Instr<NoInfer<T>>] | [Instr<NoInfer<T>>] | [],
): Block<T> => ({
  __nodeType: 'block',
  name,
  body: value,
  returnType,
});

/**
 * Creates a node for the `call` instruction.
 *
 * When compiled, results in
 * ```wat
 * (call $[name]
 *  [arg] ;; for each argument in `args`
 * )
 * ```
 * @param name the name of the function to be called.
 * @param returnType the return type of the function.
 * @param args a list of value `Expr` nodes in the order of the function's params.
 */
export const call = <T extends NumericDataType>(
  name: string,
  returnType: T,
  args: Instr[],
): Call<T> => ({
  __nodeType: 'call',
  name,
  args,
  returnType,
});

/**
 * Creates a node for the `call_indirect` instruction.
 *
 * When compiled, results in
 * ```wat
 * (call_indirect
 *  $[tableName]
 *  (param [param type]) ;; for each param in `signature.params`
 *  (result [signature.returnType]) ;; if return type is not `none`
 *  [arg] ;; for each argument in `args`
 *  [address]
 * )
 * ```
 * @param tableName the name of the `funcref` table.
 * @param address the value `Expr` node for the address of the function in the `funcref` table.
 * @param signature.params a list of `[type, name]` tuples for each param.
 * @param signature.returnType the return type of the function.
 * @param args a list of value `Expr` nodes in the order of the function's params.
 */
export const callIndirect = <T extends NumericDataType>(
  tableName: string,
  address: Instr<IntegerDataType>,
  signature: {
    params: [type: NumericDataType, name?: string][];
    returnType: T;
  },
  args: Instr[],
): CallIndirect<T> => ({
  __nodeType: 'callIndirect',
  tableName,
  address,
  params: signature.params,
  args: args,
  dataType: signature.returnType,
  returnType: signature.returnType,
});

/**
 * Creates a node for the `load` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].load
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load = <T extends NumericDataType>(
  dataType: T,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load<T> => ({
  __nodeType: 'load',
  returnType: dataType,
  dataType,
  align,
  base,
  offset,
});

/**
 * Creates a node for the `load8_s` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].load8_s
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load8SignExt = <T extends IntegerDataType>(
  dataType: T,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load8SignExt<T> => ({
  __nodeType: 'load8SignExt',
  returnType: dataType,
  dataType,
  align,
  base,
  offset,
});

/**
 * Creates a node for the `load8_u` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].load8_u
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load8ZeroExt = <T extends IntegerDataType>(
  dataType: T,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load8ZeroExt<T> => ({
  __nodeType: 'load8ZeroExt',
  returnType: dataType,
  dataType,
  align,
  base,
  offset,
});

/**
 * Creates a node for the `load16_s` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].load16_s
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load16SignExt = <T extends IntegerDataType>(
  dataType: T,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load16SignExt<T> => ({
  __nodeType: 'load16SignExt',
  returnType: dataType,
  dataType,
  align,
  base,
  offset,
});

/**
 * Creates a node for the `load16_u` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].load16_u
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load16ZeroExt = <T extends IntegerDataType>(
  dataType: T,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load8SignExt<T> => ({
  __nodeType: 'load8SignExt',
  returnType: dataType,
  dataType,
  align,
  base,
  offset,
});

/**
 * Creates a node for the `load32_s` instruction.
 *
 * When compiled, results in
 * ```wat
 * (i64.load32_s
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load32SignExt = (
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load32SignExt<'i64'> => ({
  __nodeType: 'load32SignExt',
  returnType: 'i64',
  dataType: 'i64',
  align,
  base,
  offset,
});

/**
 * Creates a node for the `load32_u` instruction.
 *
 * When compiled, results in
 * ```wat
 * (i64.load32_u
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 */
export const load32ZeroExt = (
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
): Load32ZeroExt => ({
  __nodeType: 'load32ZeroExt',
  returnType: 'i64',
  dataType: 'i64',
  align,
  base,
  offset,
});

/**
 * Creates a node for the `store` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].store
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 *  [value]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 * @param value the `Expr` node for the value to be stored.
 */
export const store = (
  dataType: NumericDataType,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
  value: Instr,
): Store => ({
  __nodeType: 'store',
  dataType,
  align,
  base,
  offset,
  value,
  returnType: 'none',
});

/**
 * Creates a node for the `store8` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].store8
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 *  [value]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 * @param value the `Expr` node for the value to be stored.
 */
export const store8 = (
  dataType: IntegerDataType,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
  value: Instr,
): Store8 => ({
  __nodeType: 'store8',
  returnType: 'none',
  dataType,
  align,
  base,
  offset,
  value,
});

/**
 * Creates a node for the `store16` instruction.
 *
 * When compiled, results in
 * ```wat
 * ([dataType].store16
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 *  [value]
 * )
 * ```
 * @param dataType the data type of the value.
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 * @param value the `Expr` node for the value to be stored.
 */
export const store16 = (
  dataType: IntegerDataType,
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
  value: Instr,
): Store16 => ({
  __nodeType: 'store16',
  returnType: 'none',
  dataType,
  align,
  base,
  offset,
  value,
});

/**
 * Creates a node for the `store32` instruction.
 *
 * When compiled, results in
 * ```wat
 * (i64.store32
 *  offset=[offset] ;; if not 0
 *  align=[align] ;; if not null
 *  [base]
 *  [value]
 * )
 * ```
 * @param offset the literal offset value.
 * @param align the optional literal align value.
 * @param base the `Expr` node for the base address in memory.
 * @param value the `Expr` node for the value to be stored.
 */
export const store32 = (
  offset: number,
  align: number | null,
  base: Instr<IntegerDataType>,
  value: Instr,
): Store32 => ({
  __nodeType: 'store32',
  returnType: 'none',
  dataType: 'i64',
  align,
  base,
  offset,
  value,
});

export const loop = (name: string | null, body: Instr<'none'>[]): Loop => ({
  __nodeType: 'loop',
  returnType: 'none',
  name,
  body,
});

export const branchIf = (
  branchTo: string | number,
  cond: Instr<NumericDataType>,
): BranchIf => ({
  __nodeType: 'branchIf',
  returnType: 'none',
  branchTo,
  cond,
});

export const branch = (branchTo: string | number): Branch => ({
  __nodeType: 'branch',
  returnType: 'none',
  branchTo,
});

export const eqz = <T extends NumericDataType>(
  dataType: T,
  right: Instr<T>,
): Eqz<T> => ({
  __nodeType: 'eqz',
  returnType: 'i32',
  dataType: dataType,
  right,
});
