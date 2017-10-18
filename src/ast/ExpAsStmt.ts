import { Stmt, Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { Return } from './AST';

/**
  Representación de las secuencias de sentencias.
*/
export class ExpAsStmt implements Stmt {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {

    return `${this.exp.toString()};`
  }

  unparse(): string {
    return `${this.exp.unparse()};`
  }

  evaluate(state: State): any {
    console.log(this.exp.evaluate(state));
    return state;
  }
}
