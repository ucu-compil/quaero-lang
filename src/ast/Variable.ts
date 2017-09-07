import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class Variable extends Exp {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  toString(): string {
    return `Variable(${this.id})`;
  }

  unparse(): string {
    return this.id;
  }

  evaluate(state: State): any {
    return state.get(this.id);
  }
}
