import { Exp, Stmt } from './ASTNode';
import { KeyVal, Null, Variable, TextLiteral } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class IndKey extends Exp {

  list: Exp;
  key: string;

  constructor(list: Exp, key: string) {
    super();
    this.list = list;
    this.key = key;
  }

  toString(): string {
    return `IndKey(${this.list.toString()}, ${this.key})`;
  }

  unparse(): string {
    return `(${this.list.unparse()}.${this.key})`;
  }

  evaluate(state: State): any {
    let list = this.list.evaluateList(state);
    return list[this.key];
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 11");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 11");
  }
}
