import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTString } from "../typecheck/QTString";

/**
  Representación de constantes como cadenas de caracteres.
*/
export class String implements Exp {

  value: String;

  constructor(value: String) {
    this.value = value;
  }

  toString(): string {
    return `String(${this.value})`;
  }

  unparse(): string {
    return `${this.value}`;
  }

  evaluate(state: Estado): any {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    return QTString.Instance;
  }
  
}