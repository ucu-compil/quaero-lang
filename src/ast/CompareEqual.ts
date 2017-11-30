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

    //Test//
    /*
    console.log(typeof this.lhs)
    console.log(typeof this.rhs)
    console.log(this.lhs instanceof Lista)
    console.log(this.rhs instanceof Lista)
    console.log(this.lhs instanceof Numeral)
    console.log(this.rhs instanceof Numeral)
    console.log(this.lhs instanceof TruthValue)
    console.log(this.rhs instanceof TruthValue)
    console.log(this.lhs instanceof String)
    console.log(this.rhs instanceof String)
    console.log(this.lhs.evaluate(state))
    console.log(this.rhs.evaluate(state))
    */
    
    if (this.lhs instanceof Conjunto && this.rhs instanceof Conjunto) {
      return this.compareConjunto(this.lhs, this.rhs, state);
    }

    if (this.lhs instanceof Lista && this.rhs instanceof Lista) {
      return this.compareLista(this.lhs, this.rhs, state);
    }

    return this.lhs.evaluate(state) == this.rhs.evaluate(state);
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

      if (lhsEvalLista != rhsEvalLista) {
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
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
