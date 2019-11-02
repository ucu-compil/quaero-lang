import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

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
    return `\'${this.value}\'`;
  }

  evaluate(state: Estado): any {
    return `${this.value}`;
  }

}