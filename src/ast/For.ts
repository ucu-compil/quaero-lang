import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { ListComprehension } from './AST';
/**
  Representación de las iteraciones while-do.
*/
export class For implements Stmt {
  expList: Exp[];
  body: Stmt;

  constructor(expList: Exp[], body: Stmt) {
    this.expList = expList;
    this.body = body;
  }

  toString(): string {
    return `For()`;
  }

  unparse(): string {
    return `for`;
  }

  evaluate(state: State): State {
    let list = this.expList.slice(1);
    return this.expList[0].evaluateFor(state,list,this.body);
  }
}
