import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';

/**
  Representación de las comparaciones por igual.
*/
export class CompareEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} == ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    var lhsEval = this.lhs.evaluate(state);
    var rhsEval = this.rhs.evaluate(state);
    console.log(typeof lhsEval)
    console.log(typeof rhsEval)



    if (typeof lhsEval === 'number' && typeof rhsEval === 'number') {
      if (lhsEval === NaN || rhsEval === NaN) {
        return false;
      } else {
        return lhsEval == rhsEval;
      }
    }



    if (typeof lhsEval === 'boolean' && typeof rhsEval === 'boolean') {
      return lhsEval == rhsEval;
    }



    if (lhsEval instanceof Lista && rhsEval instanceof Lista) {
      if (lhsEval.elementos.length != rhsEval.elementos.length) {
        return false;
      } 
      else {
        for (var x = 0; x < lhsEval.elementos.length; x++) {
          if (lhsEval.elementos[x] != rhsEval.elementos[x]) {
            return false;
          }
        }
        return true;
      }
    }

    if (lhsEval instanceof String && rhsEval instanceof String) {
      if (lhsEval.length != rhsEval.length) {
        return false;
      } else {
        for (var x = 0; x < lhsEval.length; x++) {
          if (lhsEval.charAt(x) != rhsEval.charAt(x)) {
            return false;
          }
        }
        return true;
      }
    }

    var pertenece = false;
    if (lhsEval instanceof Conjunto && rhsEval instanceof Conjunto) {
      if (lhsEval.elementos.length == rhsEval.elementos.length) {
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
      return false;
    }

    throw new Error("No se reconoce el tipo.");
  }
}
