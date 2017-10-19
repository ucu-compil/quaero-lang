import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareGreatOrEqual extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareGreatOrEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} >= ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var lhs = this.lhs.evaluate(state);
    var rhs = this.rhs.evaluate(state);
    if (lhs.constructor == rhs.constructor){
      if(lhs instanceof Array){
        if(lhs.length < rhs.length) return false;
        for(var i=0;i<rhs.length;i++){
          if(lhs[i] < rhs[i]) return false;
        }
        return true;
      }
      if(lhs instanceof Set){
        var isSetsGreatOrEqual = (a, b) => a.size >= b.size && [...b].every(value => a.has(value));
        return isSetsGreatOrEqual(lhs,rhs);
      }
      else return lhs >= rhs;
    }
    else throw "Type Error"
  }
}
