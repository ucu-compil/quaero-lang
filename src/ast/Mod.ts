import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de multiplicaciones.
*/
export class Mod implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Mod(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `Mod(${this.lhs.unparse()},${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    //console.log(typeof lhsEval)
    //console.log(typeof rhsEval)
    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      try {
        //console.log(lhsEval%rhsEval)        
        return (lhsEval % rhsEval );
      } catch (error) {
        throw new Error(error.description);
      }
    }
    //console.log ('Operandos deben ser de tipo numérico.');
    throw new Error("Operandos deben ser de tipo numérico.");
  }
}
