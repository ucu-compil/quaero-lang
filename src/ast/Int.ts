import { Exp } from './ASTNode';
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
    return parseInt(this.exp.evaluate(state));
  }

  evaluateFor(state: State): any{
    throw "For error";
  }
}
