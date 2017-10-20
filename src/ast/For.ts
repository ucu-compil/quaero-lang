import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones while-do.
*/
export class For implements Stmt {
  vars: String[];
  values: Exp[];
  conds: Exp[];
  body: Stmt;

  constructor(vars: String[], values: Exp[], conds: Exp[], body: Stmt) {
    this.vars = vars;
    this.values = values;
    this.conds = conds;
    this.body = body;
  }

  toString(): string {
    return `For()`;
  }

  unparse(): string {
    return `for`;
  }

  evaluate(state: State): State {
    var auxState = state;

    var conds = this.conds.map((c) => c.evaluate(auxState));

    return state;
  }
}
