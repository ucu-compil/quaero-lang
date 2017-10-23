import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Mod extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Mod(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(mod(${this.lhs.unparse()},${this.rhs.unparse()}))`;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateNumber(state) % this.lhs.evaluateNumber(state);
  }

  evaluateFor(state: State, exp_list: Exp[]): any{
    throw "For error 17";
  }
}
