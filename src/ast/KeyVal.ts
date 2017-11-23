import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { TextLiteral, Variable } from './AST';
/**
  Representación de usos de variable en expresiones.
*/
export class KeyVal extends Exp {
  key: (string | Exp);
  value: Exp;

  constructor(key: (string|Exp), value: Exp) {
    super();
    this.key = key;
    this.value = value;
  }

  toString(): string {
    return `KeyVal(${this.key},${this.value})`;
  }

  unparse(): string {
    if(typeof this.key === 'string') return `(${this.key}:${this.value.unparse()})`;
    else return `(${this.key.unparse()}:${this.value.unparse()})`;
  }

  evaluate(state: State): any {
    if(typeof this.key === 'string'){
      var k;
      if(/[a-zA-Z_][a-zA-Z0-9_]*/.test(this.key)) k = this.key.slice(1,this.key.length-1);
      else k = this.key;
      return [k,this.value.evaluate(state)];
    }
    else return [this.key.evaluate(state),this.value.evaluate(state)];
  }

  evaluateLC(state: State, exp_list: Exp[]): any{
    throw new Error( "LC error 14");
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any{
    throw new Error( "For error 14");
  }
}
