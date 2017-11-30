import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { Numeral, List } from './AST';
/**
  Representación de sumas.
*/
export class Enumeration extends Exp {

  isSet: Boolean;
  low: Exp;
  step: Exp;
  high: Exp;

  constructor(isSet: Boolean, low: Exp, high: Exp, step:Exp = new Numeral(1)) {
    super();
    this.isSet = isSet;
    this.low = low;
    this.high = high;
    this.step = step;
  }

  toString(): string {
    return `Enumeration(${this.isSet}, ${this.low.toString()}, ${this.step.toString()}, ${this.high.toString()})`;
  }

  unparse(): string {
    return !this.isSet ? `[${this.low.unparse()},${this.step.unparse()}..${this.high.unparse()}]` : `{${this.low.unparse()},${this.step.unparse()}..${this.high.unparse()}}`;
  }

  evaluate(state: State): any {
    var res = [];
    for(var i=this.low.evaluate(state);i<=this.high.evaluate(state);i=i+this.step.evaluate(state)){
      res.push(i);
    }
    return this.isSet ? new Set(res) : res;
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 9");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 9");
  }
}
