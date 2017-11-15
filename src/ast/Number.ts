import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Number extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Number(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(number(${this.exp.unparse()}))`;
  }

  evaluate(state: State): any {
    return parseFloat(this.exp.evaluateString(state));
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw "For error 21";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 21";
  }
}
