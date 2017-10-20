import { Exp } from './ASTNode';
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

  evaluateFor(state: State): any{
    throw "For error";
  }
}
