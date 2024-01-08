import { compile } from './compiler';
import {
  DataType,
  Func,
  FuncImport,
  Instr,
  IntegerDataType,
  NumericDataType,
  PresentDataType,
} from './nodes';

export type Memory = {
  name: string;
  initSize: number;
  maxSize: number;
  segments: MemorySegment[];
};

export type MemorySegment = {
  data: Uint8Array;
  offset: Instr<IntegerDataType>;
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
  offset: Instr<IntegerDataType>;
};

export type Global = {
  name: string;
  dataType: DataType;
  initVal: Instr<PresentDataType>;
  mutable: boolean;
};

export class Module {
  funcs: Func<DataType>[] = [];
  funcImports: FuncImport<DataType>[] = [];
  memories: Memory[] = [];
  tables: Table[] = [];
  globals: Global[] = [];
  start: string | null = null;

  constructor() {}

  addFunc = (func: Func<DataType>, exported?: boolean | string) => {
    if (exported) {
      func.exportName = typeof exported === 'boolean' ? func.name : exported;
    }
    this.funcs.push(func);
  };

  addFuncImport = (funcImport: FuncImport<DataType>) => {
    this.funcImports.push(funcImport);
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
    segments: TableSegment[],
  ) => {
    this.tables.push({ type, name, initSize, maxSize, segments });
  };

  addGlobal = (
    name: string,
    dataType: DataType,
    mutable: boolean,
    initVal: Instr<PresentDataType>,
  ) => {
    this.globals.push({ name, dataType, initVal, mutable });
  };

  setStart = (name: string | null) => {
    this.start = name;
  };

  compile = () => compile(this);
}
