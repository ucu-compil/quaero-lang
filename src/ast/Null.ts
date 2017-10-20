import { Exp } from './ASTNode';
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

  evaluateFor(state: State): any{
    throw "For error";
  }
}
