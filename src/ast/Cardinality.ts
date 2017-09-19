import { Exp } from './ASTNode';
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

}
