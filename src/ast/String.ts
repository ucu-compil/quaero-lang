import { Exp } from './ASTNode';
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

  evaluateFor(state: State, exp_list: Exp[]): any{
    throw "For error 24";
  }
}
