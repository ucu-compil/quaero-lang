import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { KeyVal } from './AST';
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
    var res = new Set();
    var e = [...this.elems];
    for(var i=0;i<e.length;i++){
      if(e[i] instanceof KeyVal){
        let ev = e[i].evaluate(state);
        res[ev[0]] = ev[1];
      } else res.add(e[i].evaluate(state));
    }
    return res;
  } //{a=[1,2,3];b=[3,4,5];c=a\/b;}

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 23");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 23");
  }
}
