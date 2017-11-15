import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de constantes numéricas o numerales.
*/
export class Numeral extends Exp {

  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  toString(): string {
    return `Numeral(${this.value})`;
  }

  unparse(): string {
    return `${this.value}`;
  }

  evaluate(state: State): any {
    return this.value;
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw "LC error 22";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 22";
  }
}
