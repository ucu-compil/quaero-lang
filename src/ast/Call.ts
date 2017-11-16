import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class Call extends Exp {

  name: string;
  params: [Exp];

  constructor(name: string, params: [Exp]) {
    super();
    this.name = name;
    this.params = params;
  }

  toString(): string {
    return `Call(${this.name}, ${this.params})`;
  }

  unparse(): string {
    return `${this.name}(${this.params})`;
  }

  evaluate(state: State): any {
    var fun = state.get(this.name);
    if(fun !== undefined){
      if (this.params.length == fun[0].length){
        var auxState = state;
        for(var i=0;i<fun[0].length;i++){
          auxState.set(fun[0][i],this.params[i].evaluate(state));
        }
        return fun[1].evaluate(state);
      }
    }else{
      fun = state.getFunction(this.name);
      if(fun !== undefined){
        let params = (this.params.map((e) => (e.evaluate(state))));
        return fun(...params);
      }
    }
    throw "error";
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any {
    if(this.evaluateBoolean(state)){
      if(exp_list.length == 0){
        return [exp.evaluate(state)];
      } else{
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        return head.evaluateLC(state,tail,exp);
      }
    }
    return [];
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    if(this.evaluateBoolean(state)){
      if(exp_list.length == 0){
        return stmt.evaluate(state);
      } else{
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        return head.evaluateFor(state,tail,stmt);
      }
    }
    return state;
    }
}
