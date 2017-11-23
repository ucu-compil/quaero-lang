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
    return `Clave(${this.id}, ${this.value.toString()})`;
  }

  unparse(): string {
    return `${this.id}: ${this.value.toString()}`;
  }

  evaluate(state: Estado): any {
    let clave = this.id;
    let valorEval = this.value.evaluate(state);
    return { clave: valorEval };
  }

}
