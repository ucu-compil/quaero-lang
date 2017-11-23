import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class List extends Exp {
  elems: Exp[];

  constructor(elems: Exp[]) {
    super();
    this.elems = elems;
  }

  toString(): string {
    return `List(${this.elems.toString()})`;
  }

  unparse(): string {
    return undefined; //cambiar
  }

  evaluate(state: State): any {
    return this.elems.map((e) => e.evaluate(state));
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 16");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 16");
  }
}
