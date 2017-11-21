import { Exp, Stmt } from './ASTNode';
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

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 19");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 19");
  }
}
