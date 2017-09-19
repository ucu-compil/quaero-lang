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
    res.push(this.lhs.evaluate(state));
    var rhs = this.rhs.evaluate(state);
    console.log(rhs);
    for(var i=0;i<res.length;i++){
      if(res.indexOf(rhs[i]) < 0){
        res.push(rhs[i]);
        console.log(res.indexOf(rhs[i]));
      }
    }
    return res;
  }

}
