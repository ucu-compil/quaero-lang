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
    return `Conjunto(${elementos})`;
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
        if(objects.find(myObj => myObj == elemEval)==undefined)  
        {
        objects.push(elemEval);
        }
      }
    });
    return objects;
  }

}