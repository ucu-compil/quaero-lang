import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Conjunction implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Conjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} && ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)
    
    if (typeof lhsEval === 'boolean' && typeof rhsEval === 'boolean') {
      try {
        return lhsEval && rhsEval;
      } catch (error) {
        throw new Error(error.description);
      }
    }
    throw new Error("Operandos deben ser de tipo boolean.");
  }

}
