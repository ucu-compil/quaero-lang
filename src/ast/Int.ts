import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

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
  
}
