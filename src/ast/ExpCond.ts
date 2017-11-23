import { Exp, Stmt } from './ASTNode';
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

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any {
    let r = this.evaluate(state);
    if(typeof r == 'boolean'){
      if(r){
        if(exp_list.length == 0){
          return [exp.evaluate(state)];
        } else{
          let head = exp_list[0];
          let tail = exp_list.slice(1);
          return head.evaluateLC(state,tail,exp);
        }
      }
    } else { throw new Error( "LC error 10"); }
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    let r = this.evaluate(state);
    if(typeof r == 'boolean'){
      if(r){
        if(exp_list.length == 0){
          return stmt.evaluate(state);
        } else{
          let head = exp_list[0];
          let tail = exp_list.slice(1);
          return head.evaluateFor(state,tail,stmt);
        }
      }
    } else { throw new Error( "For error 10"); }
  }
}
