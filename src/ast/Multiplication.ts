import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Multiplication extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Multiplication(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} * ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var l = this.lhs.evaluate(state);
    var r = this.rhs.evaluate(state);
    if(typeof l == 'string' && typeof r == 'number'){
      return l.repeat(r);
    } else{
      if(typeof r == 'string' && typeof l == 'number'){
        return r.repeat(l);
      } else { throw "Type error" }
    }
  }
}
