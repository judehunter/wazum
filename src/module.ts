import { DataType, Variant } from './variants';

export class Module {
  funcs: Variant.Func<DataType>[] = [];
  // memories = [];

  constructor() {}

  addFunc = (func: Variant.Func<DataType>, exported?: boolean | string) => {
    if (exported) {
      func.exportName = typeof exported === 'boolean' ? func.name : exported;
    }
    this.funcs.push(func);
  };

  // addMemory = () => {

  // }
}
