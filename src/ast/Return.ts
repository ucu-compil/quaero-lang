import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Return implements Stmt {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Return(${this.exp.toString()})`;
  }

  unparse(): string {
    return `return ${this.exp.unparse()}`;
  }

  evaluate(state: State): any {
    return this.exp.evaluate(state);
  }
}
