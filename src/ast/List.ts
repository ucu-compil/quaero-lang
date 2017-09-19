import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class List extends Exp {
  elems: Exp[];

  constructor(elems: Exp[]) {
    super();
    this.elems = elems;
  }

  toString(): string {
    return `List(${this.elems.toString()})`;
  }

  unparse(): string {
    return undefined; //cambiar
  }

  evaluate(state: State): any {
    var res = [];
    for(var i=0;i<this.elems.length;i++){
      res.push(this.elems[i].evaluate(state));
    }
    return res;
  }
}
