import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Negation implements Exp {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Negation(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(!${this.exp.unparse()})`;
  }

  evaluate(state: Estado): any {
    var expEval = this.exp.evaluate(state);
    if (typeof expEval === 'boolean') {
      return !expEval;
    }
    throw new Error('El operando debe ser del tipo boolean');
  }

}
