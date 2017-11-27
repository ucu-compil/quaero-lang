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
    //return `Conjunto(${elementos})`
    return "nop";
  }

  unparse(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(" ");
    return `\{${elementos}\}`;
  }

  evaluate(state: Estado): any {
    var objects = [];

    this.elementos.forEach((elem) => {
      let elemEval = elem.evaluate(state);

      if (typeof elemEval == 'object') {
        objects[elemEval.clave] = elemEval.valor;
      } else {
        objects.push(elemEval);
      }
    });
    return objects;
  }

}