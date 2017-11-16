import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTNumeral } from '../typecheck/QTNumeral';
import { QTBool } from '../typecheck/QTBool';
import { QTInt } from '../typecheck/QTInt';

/**
  Representación de sumas.
*/
export class Addition implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Addition(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)

    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      console.log ('Los operandos son del tipo numérico.');
      return lhsEval + rhsEval;
    }
    console.log ('Operandos deben ser de tipo numérico.');
    throw new Error("Operandos deben ser de tipo numérico.");
  }
}
