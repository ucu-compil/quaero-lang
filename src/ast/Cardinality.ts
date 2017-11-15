import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Cardinality extends Exp {

  list: Exp;

  constructor(list: Exp) {
    super();
    this.list = list;
  }

  toString(): string {
    return `Cardinality(${this.list.toString()})`;
  }

  unparse(): string {
    return `(${this.list.unparse()}])`;
  }

  evaluate(state: State): any {
    return this.list.evaluate(state).length;
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any{
    throw "LC error 2";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 2";
  }
}
