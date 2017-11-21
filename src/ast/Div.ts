import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Div extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Div(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(div(${this.lhs.unparse()},${this.rhs.unparse()}))`;
  }

  evaluate(state: State): any {
    return Math.floor(this.lhs.evaluateNumber(state) / this.lhs.evaluateNumber(state));
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any{
    throw new Error("LC error 7");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error("For error 7");
  }
}
