import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Int extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Int(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(int(${this.exp.unparse()}))`;
  }

  evaluate(state: State): any {
    return parseInt(this.exp.evaluateString(state));
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 12");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 12");
  }
}
