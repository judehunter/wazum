import { DataType } from './methods';
import { Variant } from './variants';

export class Module {
  private funcs: Variant.Func<DataType>[] = [];

  constructor() {}

  addFunc = (func: Variant.Func<DataType>) => {
    this.funcs.push(func);
  };

  
}
