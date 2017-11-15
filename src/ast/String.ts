import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class String extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `String(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(string(${this.exp.unparse()}))`;
  }

  evaluate(state: State): any {
    return this.exp.evaluate(state) + [];
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw "LC error 24";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 24";
  }
}
