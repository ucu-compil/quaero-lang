import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Conjunto implements Stmt {

  elementos: [Exp];

  constructor(elementos: [Exp]) {
    this.elementos = elementos;
  }

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

  evaluate(state: State): State {
    this.elementos.forEach(function (s: Stmt) {
      state = s.evaluate(state);
    });

    return state;
  }

}