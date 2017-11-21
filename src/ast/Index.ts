import { Exp, Stmt } from './ASTNode';
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
    return this.str.evaluate(state)[this.ind.evaluateNumber(state)];
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 11");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 11");
  }
}
