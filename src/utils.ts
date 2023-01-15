export type NoInfer<T> = [T][T extends any ? 0 : never];

export type IntegerLiteral<T extends number> = `${T}` extends `${
  | '-'
  | ''}${string}.${string}`
  ? never
  : T;

export type Replace<
  T extends Record<any, any>,
  S extends Record<any, any>,
> = Omit<T, keyof S> & S;
