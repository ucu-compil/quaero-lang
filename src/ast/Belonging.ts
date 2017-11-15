import { Exp, Stmt } from './ASTNode';
import { Variable } from './AST';
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

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any{
    let head = exp_list[0];
    let tail = exp_list.slice(1);
    let res = [];
    let list = this.list.evaluate(state);

    if(!(this.elem instanceof Variable)) throw "Error";

    for(var i=0;i<list.length;i++){
      state.set(this.elem.id,list[i]);
      if(exp_list.length == 0){
        res.push(exp.evaluate(state));
      } else {
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        head.evaluateLC(state,tail,exp).map((x) => res.push(x));
      }
    }
    return res;
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): State{
    let head = exp_list[0];
    let tail = exp_list.slice(1);
    let res = [];
    let list = this.list.evaluate(state);

    if(!(this.elem instanceof Variable)) throw "Error";

    for(var i=0;i<list.length;i++){
      state.set(this.elem.id,list[i]);
      if(exp_list.length == 0){
        state = stmt.evaluate(state);
      } else{
        let tail = exp_list.slice(1);
        exp_list[0].evaluateFor(state,tail,stmt);
      }
    }
    return state;
  }
}
