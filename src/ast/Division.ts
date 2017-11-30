import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Division extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Division(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} / ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateNumber(state) / this.rhs.evaluateNumber(state);
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any{
    throw new Error("LC error 8");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error("For error 8");
  }
}
