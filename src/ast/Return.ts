import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class Return implements Exp {
  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Return(${this.exp.toString()})`;
  }

  unparse(): string {
    return `return ${this.exp.unparse()}`;
  }

  evaluate(state: Estado): any {
    var expeva = this.exp.evaluate(state);
    console.log("return evaluado")
    console.log(expeva);
    return expeva;
    
  }

}
