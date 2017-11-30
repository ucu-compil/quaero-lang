import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de las asignaciones de valores a variables.
*/

export class Assignment implements Stmt {

  id: string;
  exp: Exp;

  constructor(id: string, exp: Exp) {
    this.id = id;
    this.exp = exp;
  }

  toString(): string {
    return `Assignment(${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return `${this.id} = ${this.exp.unparse()}`;
  }

  evaluate(state: Estado): Estado {
    state.set(this.id, this.exp.evaluate(state));
    return state;
  }

}
