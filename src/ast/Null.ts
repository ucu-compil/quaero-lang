import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

export class Null implements Exp {
  value: null;

  toString(): string {
    return `Null(null)`;
  }

  unparse(): string {
    return "null";
  }

  evaluate(state: Estado): any {
    return null;
  }
}
