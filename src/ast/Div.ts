import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de multiplicaciones.
*/
export class Div implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Div(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `Div(${this.lhs.unparse()},${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);

    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      try {

        //console.log(Math.floor(lhsEval/rhsEval))
        return Math.floor(lhsEval / rhsEval);
        
      } catch (error) {
        throw new Error(error.description);
      }
    }
    //console.log ('Operandos deben ser de tipo numérico.');
    throw new Error("Operandos deben ser de tipo numérico.");
  }
}
