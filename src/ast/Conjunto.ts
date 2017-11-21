import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de 
*/
export class Conjunto implements Exp {

  elementos: Exp[];

  constructor(elementos: Exp[] = null) {
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

  evaluate(state: Estado): any {
    const elementos = this.elementos
    .filter((exp) => (exp !== undefined))
    .map((exp) => (exp.evaluate(state)));
    return elementos;
  }

}