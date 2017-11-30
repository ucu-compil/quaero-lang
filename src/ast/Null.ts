import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de constantes numéricas o numerales.
*/
export class Null extends Exp {

  constructor() {
    super();
  }

  toString(): string {
    return `Null()`;
  }

  unparse(): string {
    return `null`;
  }

  evaluate(state: State): any {
    return null;
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 20");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 20");
  }
}
