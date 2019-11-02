import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de constantes numéricas o numerales.
*/
export class Numeral implements Exp {

  value: number;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return `Numeral(${this.value.toString()})`;
  }

  unparse(): string {
    return `${this.value}`;
  }

  evaluate(state: Estado): any {
    return this.value;
  }
  
}
