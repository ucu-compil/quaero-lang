import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de las sentencias condicionales.
*/
export class IfElse implements Stmt {
  cond: Exp;
  body: Stmt;
  elseBody: Stmt;

  constructor(cond: Exp, body: Stmt, elseBody: Stmt = null) {
    this.cond = cond;
    this.body = body;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `IfElse(${this.cond.toString()}, ${this.body.toString()})`;
  }

  unparse(): string {
    return `if (${this.cond.unparse()}) { ${this.body.unparse()} }`;
  }

  evaluate(state: Estado): Estado {
    if (this.cond.evaluate(state)) {
      this.body.evaluate(state);
    } else if (this.elseBody !== null) {
      this.elseBody.evaluate(state);
    }

    return state;
  }

}
