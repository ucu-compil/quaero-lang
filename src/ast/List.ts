import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { KeyVal } from './AST';
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
    return this.elems.map((e) => e.unparse()) + "";
  }

  evaluate(state: State): any {
    let list = [];
    for(var i=0;i<this.elems.length;i++){
      let e = this.elems[i].evaluate(state);
      if(this.elems[i] instanceof KeyVal){
        list[e[0]] = e[1];
        list.push(e[1]);
      }
      else list.push(e);
    }
    return list;
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error("LC error 16");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error("For error 16");
  }
}
