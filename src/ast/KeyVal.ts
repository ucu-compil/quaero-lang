import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class KeyVal extends Exp {
  key: Exp;
  value: Exp;

  constructor(key: Exp, value: Exp) {
    super();
    this.key = key;
    this.value = value;
  }

  toString(): string {
    return `KeyVal(${this.key},${this.value})`;
  }

  unparse(): string {
    return `${this.key.unparse()}:${this.value.unparse()}`;
  }

  evaluate(state: State): any {
    return this.value; //?
  }
}
