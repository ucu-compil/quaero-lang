import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de literales de texto en expresiones.
*/
export class TextLiteral extends Exp {
  value: string;

  constructor(value: string) {
    super();
    this.value = JSON.parse(value);
  }

  toString(): string {
    return `TextLiteral(${this.value})`;
  }

  unparse(): string {
    return this.value;
  }

  evaluate(state: State): any {
    return this.value;
  }

  evaluateFor(state: State, exp_list: Exp[]): any{
    throw "For error 26";
  }
}
