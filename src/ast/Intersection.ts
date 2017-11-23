import { Exp, Stmt } from './ASTNode';
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

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 13");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 13");
  }
}
