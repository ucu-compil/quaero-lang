import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de literales de texto en expresiones.
*/
export class TextLiteral extends Exp {
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  toString(): string {
    return `TextLiteral(${this.value})`;
  }

  unparse(): string {
    return JSON.stringify(this.value);
  }

  evaluate(state: State): any {
    return this.value;
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw "Stmt error 26";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 26");
  }
}
