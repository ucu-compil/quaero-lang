import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de usos de variable en expresiones.
*/
export class QSet extends Exp {
  elems: Set<Exp>;

  constructor(elems: Exp[]) {
    super();
    this.elems = new Set<Exp>(elems);
  }

  toString(): string {
    return `Set(${this.elems})`;
  }

  unparse(): string {
    return undefined; //cambiar
  }

  evaluate(state: State): any {
    var res = [];
    var e = [...this.elems];
    for(var i=0;i<e.length;i++){
      res.push(e[i].evaluate(state));
    }
    return new Set(res);
  } //{a=[1,2,3];b=[3,4,5];c=a\/b;}

  evaluateFor(state: State, exp_list: Exp[]): any{
    throw "For error 23";
  }
}
