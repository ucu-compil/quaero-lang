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
    var e = this.exp.evaluate(state);
    if(e instanceof Array && e.length == 0) return false;
    if(e instanceof Set && e.size == 0) return false;
    switch (e){
      case 0:
      case null:
      case "":
        return false;
      default:
        return true;
    }
  }
}
