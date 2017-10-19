import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Union extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Union(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} \\/ ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var res = [];
    var list = this.lhs.evaluate(state).slice().concat(this.rhs.evaluate(state));
    for(var i=0;i<list.length;i++){
      if(res.indexOf(list[i]) < 0){
        res.push(list[i]);
        }
    }
    return res;
  }

}
