import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Conjunto } from './Conjunto';
import { Lista } from './Lista';

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareGreatOrEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareGreatOrEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} >= ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    if (this.lhs instanceof Conjunto && this.rhs instanceof Conjunto) {
      return this.compareConjunto(this.lhs, this.rhs, state);
    }

    if (this.lhs instanceof Lista && this.rhs instanceof Lista) {
      return this.compareLista(this.lhs, this.rhs, state);
    }

    return this.lhs.evaluate(state) >= this.rhs.evaluate(state);
  }

  compareLista(lhsList: Lista, rhsList: Lista, state: Estado): boolean {
    var flag = true;
    for (var x = 0; x < lhsList.elementos.length; x++) {
      var lhsEvalLista = lhsList.elementos[x];
      var rhsEvalLista = rhsList.elementos[x];

      if (lhsEvalLista instanceof Lista && rhsEvalLista instanceof Lista) {
        flag = this.compareLista(lhsEvalLista, rhsEvalLista, state);
        if (flag == false) {
          return false;
        }
      } else {
        if (lhsEvalLista instanceof Conjunto && rhsEvalLista instanceof Conjunto) {
          flag = this.compareConjunto(lhsEvalLista, rhsEvalLista, state);
          if (flag == false) {
            return false;
          }
        } else {
          if (lhsEvalLista.evaluate(state) < rhsEvalLista.evaluate(state)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  compareConjunto(lhsList: Conjunto, rhsList: Conjunto, state: Estado): boolean {
    var flag = true;
    var pertenece = false;
    for (var x = 0; x < lhsList.elementos.length; x++) {
      pertenece = false;
      for (var y = 0; y < rhsList.elementos.length; y++) {

        var lhsEvalLista = lhsList.elementos[y];
        var rhsEvalLista = rhsList.elementos[x];

        if (lhsEvalLista instanceof Lista && rhsEvalLista instanceof Lista) {
          flag = this.compareLista(lhsEvalLista, rhsEvalLista, state);
          if (flag == false) {
            return false;
          } else {
            pertenece = true;
            break;
          }
        } else {
          if (lhsEvalLista instanceof Conjunto && rhsEvalLista instanceof Conjunto) {
            flag = this.compareConjunto(lhsEvalLista, rhsEvalLista, state);
            if (flag == false) {
              return false;
            } else {
              pertenece = true;
              break;
            }
          } else {
            if (lhsEvalLista.evaluate(state) == rhsEvalLista.evaluate(state)) {
              pertenece = true;
              break;
            }
          }
        }
      }
      if (pertenece == false) {
        return false;
      }
    }
    return true;
  }
}

