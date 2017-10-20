import { Exp, Stmt } from './ASTNode';
import { Belonging } from './AST';
import { State } from '../interpreter/State';

/**
  Representación de las iteraciones while-do.
*/
export class ListComprehension implements Stmt {
  exp: Exp;
  vars: Belonging[];
  conds: Exp[];

  constructor(exp: Exp, vars: Belonging[], conds: Exp[]) {
    this.exp = exp;
    this.vars = vars;
    this.conds = conds;
  }

  toString(): string {
    return `ListComprehension`;
  }

  unparse(): string {
    return `ListComprehension`;
  }

  evaluate(state: State): any {
    let res = [];
    let auxState: State = state.clone();
    let aux = (this.vars.map((v) => v.evalLC(state)));
    let [ids,values] = [aux.map((x) => x[0]),aux.map((x) => x[1])]
    let pc = (function(arr){
      return arr.reduce(function(a,b){
          return a.map(function(x){
              return b.map(function(y){
                  return x.concat(y);
                })
              }).reduce(function(a,b){ return a.concat(b) },[])
            }, [[]])
    })(values);
    for(var i=0;i<pc.length;i++){
      for(var j=0;j<pc[i].length;j++){
        auxState.set(ids[j],pc[i][j]);
      }
      for(var j=0;j<this.conds.length;j++){
        if(!this.conds[j].evaluate(auxState)) return res;
      }
      res.push(this.exp.evaluate(auxState));
    }
    return res;
  }
}
