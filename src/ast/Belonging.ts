import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Belonging extends Exp {

  elem: Exp
  list: Exp;

  constructor(elem: Exp, list: Exp) {
    super();
    this.elem = elem;
    this.list = list;
  }

  toString(): string {
    return `Belonging(${this.elem.toString()},${this.list.toString()})`;
  }

  unparse(): string {
    return `(${this.elem.unparse()} <- ${this.list.unparse()}])`;
  }

  evaluate(state: State): any {
    var l = this.list.evaluateList(state);
    return l.indexOf(this.elem.evaluate(state)) >= 0;
  }

  evalLC(state: State): any{
    return [this.elem,this.list.evaluate(state)];
  }
}
