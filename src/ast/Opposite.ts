import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { QuaeroType } from '../typecheck/QuaeroType';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Opposite implements Exp {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Opposite(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(-${this.exp.unparse()})`;
  }

  evaluate(state: Estado): any {
    var expEval = this.exp.evaluate(state);
    
        if (typeof expEval === 'number') {
          return -expEval;
        }
        throw new Error('El operando debe ser del tipo numerico');
  }
}
