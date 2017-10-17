import { State } from '../interpreter/State';

export interface ASTNode {
  toString(): string;
  unparse(): string;
}

/**
  Categoría sintáctica de las expresiones de While, las
  construcciones del lenguaje que evalúan a un valor.
*/
export abstract class Exp implements ASTNode {

  abstract toString(): string;
  abstract unparse(): string;
  abstract evaluate(state: State): any;

  evaluateNumber(state: State): number{
    var e = this.evaluate(state);
    if (typeof e == 'number'){
      return e;
    }
    else { throw "Type error"; }
  }

  evaluateBoolean(state: State): boolean{
    var e = this.evaluate(state);
    if (typeof e == 'boolean'){
      return e;
    }
    else { throw "Type error"; }
  }

  evaluateList(state: State): Array<any> {
    var e = this.evaluate(state);
    if (e instanceof Array){
      return e;
    }
  }

  evaluateSet(state: State): Set<any> {
    var e = this.evaluate(state);
    if (e instanceof Set){
      return e;
    }
  }

  evaluateString(state: State): string{
    var e = this.evaluate(state);
    if (typeof e == 'string'){
      return e;
    }
    else { throw "Type error"; }
  }
}

/**
  Categoría sintáctica de las sentencias (statements) de While, las
  construcciones del lenguaje que modifican (potencialmente) los
  valores de las variables en el estado del programa.
*/
export interface Stmt extends ASTNode {

  evaluate(state: State): State;

}
