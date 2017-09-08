import { Exp } from './ASTNode';
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
    return ``;//`Addition(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return ``;//`(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var fun = state.get(this.name);
    if (this.params.length == fun[0].length){
      var auxState = state;
      for(var i=0;i<fun[0].length;i++){
        auxState.set(fun[0][i],this.params[i].evaluate(state));
      }
      console.log("a");
      return fun[1].evaluate(auxState);
    }
    throw "error";
  }
}
