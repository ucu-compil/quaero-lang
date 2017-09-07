import { Exp } from './ASTNode';
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
    return this.value;
  }

  evaluate(state: State): any {
    return this.value;
  }
}
