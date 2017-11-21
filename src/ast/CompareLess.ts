import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Conjunto } from './Conjunto';

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareLess implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareLess(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} < ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)

    var pertenece = false;
    if (lhsEval instanceof Conjunto && rhsEval instanceof Conjunto) {
      if (lhsEval.elementos.length != rhsEval.elementos.length) {
        return false;
      } else {
        for (var x = 0; x < lhsEval.elementos.length; x++) {
          pertenece = false;
          for (var y = 0; y < rhsEval.elementos.length; y++) {
            if (lhsEval.elementos[x] == rhsEval.elementos[y]) {
              pertenece = true;
              break;
            }
          }
          if (!pertenece) {
            return false;
          }
        }
        return true;
      }
    }

    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      console.log('Los operandos son del tipo numérico.');
      return lhsEval < rhsEval;
    }
    console.log('Operandos deben ser de tipo numérico.');
    throw new Error("Operandos deben ser de tipo numérico.");
  }
}

