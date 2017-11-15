import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareLess extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareLess(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} < ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    if (lhs.constructor == rhs.constructor){
      if(lhs instanceof Array){
        if(lhs.length >= rhs.length) return false;
        for(var i=0;i<lhs.length;i++){
          if(lhs[i] >= rhs[i]) return false;
        }
        return true;
      }
      if(lhs instanceof Set){
        var isSetsLess = (a, b) => a.size < b.size && [...a].every(value => b.has(value));
        return isSetsLess(lhs,rhs);
      }
      else return lhs < rhs;
    }
    else throw "Type Error"
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
