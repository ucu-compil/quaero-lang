import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de 
*/
export class ConjuntoPertenencia implements Exp {

  conjunto: Exp;
  expresion: Exp;

  constructor(conjunto: Exp, expresion: Exp) {
    this.conjunto = conjunto;
    this.expresion = expresion;
  }

  toString(): string {
    const conjunto = this.conjunto
    return `ConjuntoPertenencia(${conjunto})`
  }

  unparse(): string {
    const conjunto = this.conjunto
    return `{${conjunto}}`;
  }

  evaluate(state: Estado): any {
    var expresionE = this.expresion.evaluate(state);
    var conjuntoE = this.conjunto.evaluate(state);
    if(this.conjunto instanceof Array){
        conjuntoE.include(expresionE);
    }
    else{
        //tiro un error
        return undefined;
    }
  }

}