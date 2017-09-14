import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de multiplicaciones.
*/
export class Boolean extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Boolean(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(boolean(${this.exp.unparse()}))`;
  }

  evaluate(state: State): any {
    var falses = [0,null,"",[],{}];
    if(falses.indexOf(this.exp.evaluate(state) >= 0)){
      return true;
    } else return false;
  }
}
