import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Negative extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Negative(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(-${this.exp.unparse()})`;
  }

  evaluate(state: State): any {
    return -this.exp.evaluateNumber(state);
  }

  evaluateFor(state: State): any{
    throw "For error";
  }
}
