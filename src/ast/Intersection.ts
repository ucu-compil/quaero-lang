import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Intersection extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Intersection(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} /\\ ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var res = [];
    var lhs = this.lhs.evaluate(state).slice();
    var rhs = this.rhs.evaluate(state).slice();
    return lhs.filter((e) => rhs.indexOf(e) >= 0);
  }

  evaluateFor(state: State): any{
    throw "For error";
  }
}
