import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones while-do.
*/
export class DoWhile implements Stmt {
  cond: Exp;
  body: Stmt;

  constructor(cond: Exp, body: Stmt) {
    this.cond = cond;
    this.body = body;
  }

  toString(): string {
    return `DoWhile(${this.cond.toString()}, ${this.body.toString()})`;
  }

  unparse(): string {
    return `do ${this.body.unparse()} while ${this.cond.unparse()}`;
  }

  evaluate(state: State): State {
    state = this.body.evaluate(state);
    while(this.cond.evaluateBoolean(state)){
      state = this.body.evaluate(state);
    }
    return state;
  }
}
