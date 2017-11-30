import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Concatenation extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Concatenation(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} ++ ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return this.lhs.evaluate(state).concat(this.rhs.evaluate(state));
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any{
    throw new Error("LC error 3");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error("For error 3");
  }
}
