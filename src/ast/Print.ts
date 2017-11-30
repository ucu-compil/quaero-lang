import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Print implements Stmt {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Print(${this.exp.toString()})`;
  }

  unparse(): string {
    return `print(${this.exp.unparse()});`;
  }

  evaluate(state: State): State {
    console.log(this.exp.evaluate(state));
    return state;
  }
}
