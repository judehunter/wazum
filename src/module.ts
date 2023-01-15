import {
  DataType,
  Func,
  IntegerDataType,
  NumericDataType,
  VariantExpr,
} from './variants';

export type Memory = {
  name: string;
  initSize: number;
  maxSize: number;
  segments: MemorySegment[];
};

export type MemorySegment = {
  data: Uint8Array;
  offset: VariantExpr<IntegerDataType>;
};

export type Table = {
  type: 'funcref';
  name: string;
  initSize: number;
  maxSize: number;
  segments: TableSegment[];
};

export type TableSegment = {
  elems: string[];
  offset: VariantExpr<IntegerDataType>;
};

export class Module {
  funcs: Func<DataType>[] = [];
  memories: Memory[] = [];
  tables: Table[] = [];

  constructor() {}

  addFunc = (func: Func<DataType>, exported?: boolean | string) => {
    if (exported) {
      func.exportName = typeof exported === 'boolean' ? func.name : exported;
    }
    this.funcs.push(func);
  };

  addMemory = (
    name: string,
    initSize: number,
    maxSize: number,
    segments: MemorySegment[],
  ) => {
    if (this.memories.length)
      throw new Error('Multiple memories not supported yet');
    this.memories.push({
      name,
      initSize,
      maxSize,
      segments,
    });
  };

  addTable = (
    name: string,
    initSize: number,
    maxSize: number,
    type: 'funcref',
    segments: TableSegment[]
  ) => {
    this.tables.push({type, name, initSize, maxSize, segments});
  }
}
