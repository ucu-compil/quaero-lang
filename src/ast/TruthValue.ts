import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de valores de verdad (cierto o falso).
*/
export class TruthValue extends Exp {

  value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }

  toString(): string {
    return `TruthValue(${this.value})`;
  }

  unparse(): string {
    return this.value ? "true" : "false";
  }

  evaluate(state: State): any {
    return this.value;
  }
}
