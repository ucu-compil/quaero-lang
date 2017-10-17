import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTInt } from '../typecheck/QTInt';

/**
  Representación de constantes numéricas o numerales.
*/
export class Int implements Exp {

  value: Int;

  constructor(value: Int) {
    this.value = value;
  }

  toString(): string {
    return `Int(${this.value})`;
  }

  unparse(): string {
    return `${this.value}`;
  }

  evaluate(state: Estado): any {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    return QTInt.Instance;
  }
  
}
