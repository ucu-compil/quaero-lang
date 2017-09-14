import { Exp } from './ASTNode';
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
    return parseFloat(this.exp.evaluate(state));
  }
}
