import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las sentencias condicionales.
*/
export class IfThen implements Stmt {
  cond: Exp;
  thenBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
  }

  toString(): string {
    return `IfThen(${this.cond.toString()}, ${this.thenBody.toString()})`;
  }

  unparse(): string {
    return `if(${this.cond.unparse()}) { ${this.thenBody.unparse()} }`;
  }

  evaluate(state: State): State {
    if (this.cond.evaluateBoolean(state)){
      state = this.thenBody.evaluate(state);
    }
    return state;
  }
}
