import { Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { Return } from './AST';

/**
  Representación de las secuencias de sentencias.
*/
export class Sequence implements Stmt {

  statements: [Stmt];

  constructor(statements: [Stmt]) {
    this.statements = statements;
  }

  toString(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(", ");
    return `Sequence(${statements})`
  }

  unparse(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(" ");
    return `{ ${statements} }`
  }

  evaluate(state: State): State {
    for(var i = 0; i<this.statements.length; i++){
      if(this.statements[i] instanceof Return){
        return this.statements[i].evaluate(state); 
      }
      state = this.statements[i].evaluate(state);
    }
    return state;
  }
}
