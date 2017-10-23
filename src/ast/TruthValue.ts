import { Exp } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de valores de verdad (cierto o falso).
*/
export class TruthValue extends Exp {

  value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }

  toString(): string {
    return `TruthValue(${this.value})`;
  }

  unparse(): string {
    return this.value ? "true" : "false";
  }

  evaluate(state: State): any {
    return this.value;
  }

  evaluateFor(state: State, exp_list: Exp[], exp: Exp): any{
    if(this.value){
      if(exp_list.length == 0){
        return [exp.evaluate(state)];
      } else{
        let head = exp_list[0];
        let tail = exp_list.slice(1);
        return head.evaluateFor(state,tail,exp);
      }
    }
    return [];
  }
}
