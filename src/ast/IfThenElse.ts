import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las sentencias condicionales.
*/
export class IfThenElse implements Stmt {
  cond: Exp;
  thenBody: Stmt;
  elseBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt, elseBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `IfThenElse(${this.cond.toString()}, ${this.thenBody.toString()}, ${this.elseBody.toString()})`;
  }

  unparse(): string {
    return `if(${this.cond.unparse()}) { ${this.thenBody.unparse()} } else { ${this.elseBody.unparse()} }`;
  }

  evaluate(state: State): State {
    if (this.cond.evaluateBoolean(state)){
      state = this.thenBody.evaluate(state);
    } else{
      state = this.elseBody.evaluate(state);
    }
    return state;
  }
}
