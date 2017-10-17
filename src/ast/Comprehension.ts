import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class Comprehension extends Exp {

  elems: Exp[];
  list: Boolean;

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
}
