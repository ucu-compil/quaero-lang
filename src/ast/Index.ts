import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Index extends Exp {

  str: Exp;
  ind: Exp;

  constructor(str: Exp, ind: Exp) {
    super();
    this.str = str;
    this.ind = ind;
  }

  toString(): string {
    return `Index(${this.str.toString()}, ${this.ind.toString()})`;
  }

  unparse(): string {
    return `(${this.str.unparse()}[${this.ind.unparse()}])`;
  }

  evaluate(state: State): any {
    return this.str.evaluateString(state)[this.ind.evaluateNumber(state)];
  }

}
