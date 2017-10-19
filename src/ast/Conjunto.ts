import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTConjunto } from '../typecheck/QTConjunto';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Conjunto implements Exp {

  elementos: [Exp];

  constructor(elementos: [Exp]) {
    this.elementos = elementos;
  }


  toString(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(", ");
    return `Conjunto(${elementos})`
  }

  unparse(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(" ");
    return `{${elementos}}`;
  }

  evaluate(state: Estado): Estado {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    return QTConjunto.Instance;
  }

}