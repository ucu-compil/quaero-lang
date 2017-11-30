import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Negation extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Negation(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(!${this.exp.unparse()})`;
  }

  evaluate(state: State): any {
    return !this.exp.evaluateBoolean(state);
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any {
    if(this.evaluate(state)){
      if(exp_list.length == 0){
        return [exp.evaluate(state)];
      } else{
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        return head.evaluateLC(state,tail,exp);
      }
    }
    return [];
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    if(this.evaluate(state)){
      if(exp_list.length == 0){
        return stmt.evaluate(state);
      } else{
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        return head.evaluateFor(state,tail,stmt);
      }
    }
    return state;
  }
}
