import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones for.
*/
export class ForEach implements Stmt {
  id: string;
  lst: List;
  body: Stmt;

  constructor(id: string, lst: List, body: Stmt) {
    this.id   = id;
    this.lst = cond;
    this.body = body;
  }

  toString(): string {
    return `ForEach(${this.id}, ${this.lst.toString()}, ${this.body.toString()})`;
  }
  //for (x <- xs) y = y * x;

  unparse(): string {
    //return `while ${this.cond.unparse()} do { ${this.body.unparse()} }`;
    return `for((${this.id} <- ${this.lst.unparse()}) ${this.body.unparse()})`;
  }

  evaluate(state: State): State {
    for (this.id of this.lst.evaluateList(state)) { this.body.evaluate(state) } 
    //Clonar el estado de la evaluacion de la lista y luego utilizarlo dentro del body
    /*
    for(this.cond.evaluateBoolean(state)){
      state = this.body.evaluate(state);
    }
    return state;
    */
  }
}
