import { Exp, Stmt } from './ASTNode';
import { KeyVal, Null, Variable, TextLiteral } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de sumas.
*/
export class IndKey extends Exp {

  list: Exp;
  key: Exp;

  constructor(str: Exp, key: Exp) {
    super();
    this.list = str;
    this.key = key;
  }

  toString(): string {
    return `IndKey(${this.list.toString()}, ${this.key.toString()})`;
  }

  unparse(): string {
    return `(${this.list.unparse()}.${this.key.unparse()})`;
  }

  evaluate(state: State): any {
    let list = this.list.evaluateList(state);
    var key;
    if(this.key instanceof Variable){
        key = this.key.id;
    }
    if(this.key instanceof TextLiteral){
      key = `"${this.key.evaluate(state)}"`;
    }
    if(key !== undefined){
      for(var elem of list){
        if(elem instanceof KeyVal && elem.key == key) return elem.value;
      }
    }
    return new Null();
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw "LC error 11";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw "For error 11";
  }
}
