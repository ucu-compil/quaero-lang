import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';
import { Numeral } from './Numeral';
import { TruthValue } from './TruthValue';
import { String } from './String';

/**
  Representación de las comparaciones por igual.
*/
export class CompareNotEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareNotEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} /= ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {

    if (this.lhs instanceof Numeral && this.rhs instanceof Numeral) {
      if (this.lhs.evaluate(state) === NaN || this.rhs.evaluate(state) === NaN) {
        return false;
      } else {
        return this.lhs.evaluate(state) != this.rhs.evaluate(state);
      }
    }

    if (this.lhs instanceof TruthValue && this.rhs instanceof TruthValue) {
      return this.lhs.evaluate(state) != this.rhs.evaluate(state);
    }

    if (this.lhs instanceof Conjunto && this.rhs instanceof Conjunto) {
      return this.compareConjunto(this.lhs, this.rhs, state);
    }

    if (this.lhs instanceof Lista && this.rhs instanceof Lista) {
      return this.compareLista(this.lhs, this.rhs, state);
    }

    if (this.lhs instanceof String && this.rhs instanceof String) {
      return this.lhs.evaluate(state) != this.rhs.evaluate(state);
    }

    throw new Error("No se reconoce el tipo.");
  }

  compareLista(lhsList: Lista, rhsList: Lista, state: Estado): boolean {
    var flag = true;
    for (var x = 0; x < lhsList.evaluate(state).length; x++) {
      var lhsEvalLista = lhsList.evaluate(state)[x];
      var rhsEvalLista = rhsList.evaluate(state)[x];

      if (lhsEvalLista instanceof Lista && rhsEvalLista instanceof Lista) {
        flag = this.compareLista(lhsEvalLista, rhsEvalLista, state);
        if (flag == false) {
          return false;
        }
      }

      if (lhsEvalLista instanceof Conjunto && rhsEvalLista instanceof Conjunto) {
        flag = this.compareConjunto(lhsEvalLista, rhsEvalLista, state);
        if (flag == false) {
          return false;
        }
      }

      if (lhsEvalLista == rhsEvalLista) {
        return false;
      }

    }
    return true;
  }

  compareConjunto(lhsList: Conjunto, rhsList: Conjunto, state: Estado): boolean {
    var pertenece = false;
    if (lhsList.evaluate(state).length == rhsList.evaluate(state).length) {
      for (var x = 0; x < lhsList.evaluate(state).length; x++) {
        pertenece = false;
        for (var y = 0; y < rhsList.evaluate(state).length; y++) {
          if (lhsList.evaluate(state)[x] == rhsList.evaluate(state)[y]) {
            pertenece = true;
            break;
          }
        }
        if (pertenece == false) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
}
