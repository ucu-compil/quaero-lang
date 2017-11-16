import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTConjunto } from '../typecheck/QTConjunto';

/**
  Representación de 
*/
export class Conjunto implements Exp {

  conjunto: Exp[];

  constructor(conjunto: Exp[] = null) {
    this.conjunto = conjunto;
  }

  toString(): string {
    const conjunto = this.conjunto
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(", ");
    return `ConjuntoCardinalidad(${conjunto})`
  }

  unparse(): string {
    const conjunto = this.conjunto
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(" ");
    return `{${conjunto}}`;
  }

  evaluate(state: Estado): any {
    var valor = 0;
    this.conjunto.forEach(element => {
        valor++
    })
    return valor;
  }

  checktype(checkstate: CheckState): QuaeroType {
    return undefined;
  }

}