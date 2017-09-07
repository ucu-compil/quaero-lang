import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las sentencias condicionales.
*/
export class ExpCond extends Exp {
  cond: Exp;
  thenBody: Exp;
  elseBody: Exp;

  constructor(cond: Exp, thenBody: Exp, elseBody: Exp) {
    super();
    this.cond = cond;
    this.thenBody = thenBody;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `ExpCond(${this.cond.toString()}, ${this.thenBody.toString()}, ${this.elseBody.toString()})`;
  }

  unparse(): string {
    return `{ ${this.thenBody.unparse()} } if ${this.cond.unparse()} else { ${this.elseBody.unparse()} }`;
  }

  evaluate(state: State): any {
    if (this.cond.evaluateBoolean(state)){
      return this.thenBody.evaluate(state);
    } else{
      return this.elseBody.evaluate(state);
    }
  }
}
