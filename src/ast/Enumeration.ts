import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { Numeral, List } from './AST';
/**
  Representación de sumas.
*/
export class Enumeration extends Exp {

  low: Exp;
  step: Exp;
  high: Exp;

  constructor(low: Exp, high: Exp, step:Exp = new Numeral(1)) {
    super();
    this.low = low;
    this.high = high;
    this.step = step;
  }

  toString(): string {
    return `Enumeration(${this.low.toString()}, ${this.step.toString()}, ${this.high.toString()})`;
  }

  unparse(): string {
    return `[${this.low.unparse()},${this.step.unparse()}..${this.high.unparse()}]`;
  }

  evaluate(state: State): any {
    var res = [];
    for(var i=this.low.evaluate(state);i<=this.high.evaluate(state);i=i+this.step.evaluate(state)){
      res.push(i);
    }
    return res;
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw "LC error 9";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 9";
  }
}
