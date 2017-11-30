import { Exp, Stmt } from './ASTNode';
import { Belonging } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones while-do.
*/
export class ListComprehension extends Exp {
  exp: Exp;
  expList: Exp[];
  isSet: boolean;

  constructor(exp: Exp, expList: Exp[],isSet=false) {
    super();
    this.exp = exp;
    this.expList = expList;
    this.isSet = isSet;
  }

  toString(): string {
    return `ListComprehension`;
  }

  unparse(): string {
    return `ListComprehension`;
  }

  evaluateLC(state: State, exp_list: Exp[], exp: Exp): any {
    throw "LC Error 29";
  }

  evaluateFor(state: State, exp_list: Exp[], stmt: Stmt): any {
    throw "For Error 29";
  }

  evaluate(state: State): any {
    let auxState = state.clone();
    let list = this.expList.slice(1);
    if(this.isSet) return new Set(this.expList[0].evaluateLC(auxState,list,this.exp));
    else return this.expList[0].evaluateLC(auxState,list,this.exp);
  }
}
