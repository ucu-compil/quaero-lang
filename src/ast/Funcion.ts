import { Exp, Stmt } from './ASTNode';
import { Sequence } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Funcion implements Stmt {

  name: string;
  params: [string];
  body: Sequence;

  constructor(name: string, params: [string], body: Sequence) {
    this.name = name;
    this.params = params;
    this.body = body;
  }

  toString(): string {
    return ``;//\`Assignment(${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return ``;//`${this.name} = ${this.exp.unparse()}`;
  }

  evaluate(state: State): State {
    state.set(this.name,[this.params,this.body]);
    return state;
  }
}
