import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las comparaciones por igual.
*/
export class Length extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Length(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(Length(${this.exp.unparse()})`;
  }

  evaluate(state: State): any {
    let e = this.exp.evaluate(state);
    if(typeof e == 'string') return e.length;
    if(e instanceof Array) return e.length;
    if(e instanceof Set) return e.size;
    throw new Error('Type error')
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 15");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 15");
  }
}
