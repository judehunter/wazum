import { Variant, VariantExpr, VariantInstr, VariantStmt } from './variants';

export type DataType = 'i32' | 'i64' | 'f32' | 'f64' | 'none';

const methods = {
  local: <T extends DataType>(dataType: T) => ({
    get: (name: string): Variant.LocalGet<T> => ({
      __nodeType: 'localGet',
      dataType,
      name,
      returnType: dataType,
    }),
    set: (name: string, value: VariantExpr): Variant.LocalSet => ({
      __nodeType: 'localSet',
      dataType,
      name,
      value,
      returnType: 'none',
    }),
  }),
  add:
    <T extends DataType>(dataType: T) =>
    (left: VariantExpr<T>, right: VariantExpr<T>): Variant.Add<T> => ({
      __nodeType: 'add',
      dataType,
      left,
      right,
      returnType: dataType,
    }),
  // func:
  //   <T extends DataType>(dataType: T) =>
  //   (
  //     name: string,
  //     params: [type: DataType, name: string][],
  //     locals: [type: DataType, name: string][],
  //     body: VariantExpr,
  //   ): Variant.Func<T> => ({
  //     __nodeType: 'func',
  //     name,
  //     params,
  //     locals,
  //     body,
  //     dataType,
  //   }),
  const:
    <T extends DataType>(dataType: T) =>
    (value: number): Variant.Const<T> => ({
      __nodeType: 'const',
      value,
      dataType,
      returnType: dataType,
    }),
};

export const i32 = {
  local: methods.local('i32'),
  add: methods.add('i32'),
  const: methods.const('i32'),
  // block: methods.block('i32'),
  // func: methods.func('i32'),
};
export const i64 = {
  local: methods.local('i64'),
  add: methods.add('i64'),
  const: methods.const('i64'),
  // block: methods.block('i64'),
  // func: methods.func('i64'),
};
export const f32 = {
  local: methods.local('f32'),
  add: methods.add('f64'),
  const: methods.const('f64'),
}
export const none = {
  // block: methods.block('none'),
  // func: methods.func('none'),
};

export const func = <T extends DataType, R extends T>(
  name: string,
  signature: {
    params: [type: DataType, name: string][];
    locals: [type: DataType, name: string][];
    returnType: T;
  },
  body: VariantExpr<R>,
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

export const block = <T extends DataType, R extends T>(
  name: string | null,
  returnType: T,
  value: [
    ...VariantStmt[],
    Omit<VariantInstr, 'returnType'> & { returnType: R },
  ],
): Variant.Block<T> => ({
  __nodeType: 'block',
  name,
  value,
  returnType,
});

export const call = <T extends DataType>(
  name: string,
  signature: {
    returnType: T;
  },
  args: VariantExpr[],
): Variant.Call<T> => ({
  __nodeType: 'call',
  name,
  args,
  returnType: signature.returnType,
});
// export const block = <Ret extends DataType>
// type VarsIntoObject<Vars extends NodeLocal[]> = {[Prop in keyof Vars[number]]: }

// type Test = VarsIntoObject<[{__nodeType: 'local', name: 'a'}]>

// export class Func {
//   /**
//    * Creates a function without adding it to a module.
//    *
//    * @param opts.name The name of the function
//    */
//   constructor(name: string, params: NodeLocal[], body: () => any[]) {}
// }

// const foo = func('foo', [i32.local('a')], [i32.local('b')], () => {
//   return [
//     b.set((i32.local('a').get(), i32.const(7))),

//     i32.add(b.get(), i32.const(42)),
//   ];
// });

// const m = new Module();
// m.addFunc(foo);
