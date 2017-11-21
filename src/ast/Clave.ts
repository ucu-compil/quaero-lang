import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de las claves.
*/
export class Clave implements Exp {

  id: String;
  value: Exp;

  constructor(id: String, value: Exp) {
    this.id = id;
    this.value = value;
  }

  toString(): string {
    return `Clave(${this.id},${this.value})`;
  }

  unparse(): string {
    return `${this.id}: ${this.value}`;
  }

  evaluate(state: Estado): Estado {
    return undefined;
  }

}
