import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Clave } from './AST';

/**
  Representación de las listas.
*/
export class Lista implements Exp {

  elementos: Exp[];

  constructor(elementos: Exp[] = null) {
    this.elementos = elementos;
  }

  toString(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(", ");
    return `Lista(${elementos})`
  }

  unparse(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(" ");
    return `[ ${elementos} ]`;
  }

  evaluate(state: Estado): any {
    var objects = [];

    this.elementos.forEach((elem) => {
      let elemEval = elem.evaluate(state);

      if (elem instanceof Clave) {
        objects[elemEval.clave] = elemEval.valor;
      } else {
        objects.push(elemEval);
      }
    });

    return objects;
  }

}
