import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de multiplicaciones.
*/
export class Division implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Division(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} / ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)
    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      console.log ('Los operandos son del tipo numérico.');
      try {
        return lhsEval % rhsEval;
      } catch (error) {
        throw new Error(error.description);
      }
    }
    console.log ('Operandos deben ser de tipo numérico.');
    throw new Error("Operandos deben ser de tipo numérico.");
  }
}
