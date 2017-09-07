import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las comparaciones por igual.
*/
export class Length extends Exp {

  str: Exp;

  constructor(str: Exp) {
    super();
    this.str = str;
  }

  toString(): string {
    return `Length(${this.str.toString()})`;
  }

  unparse(): string {
    return `(Length(${this.str.unparse()})`;
  }

  evaluate(state: State): any {
    return this.str.evaluateString(state).length;
  }
}
