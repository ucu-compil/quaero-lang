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

  evaluateFor(state: State, exp_list: Exp[], exp: Exp): any {
    if(typeof this.evaluate(state) == 'boolean'){
      if(exp_list.length == 0){
        return [exp.evaluate(state)];
      } else{
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        return head.evaluateFor(state,tail,exp);
      }
    } else { throw "For error 10"; }
  }
}
