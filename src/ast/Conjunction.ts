import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Conjunction extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Conjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} && ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateBoolean(state) && this.rhs.evaluateBoolean(state);
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any{
    throw "LC error 4";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 4";
  }
}
