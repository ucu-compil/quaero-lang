import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de 
*/
export class Cardinalidad implements Exp {

  conjunto: Exp;

  constructor(conjunto: Exp) {
    this.conjunto = conjunto;
  }

  toString(): string {
    const conjunto = this.conjunto
    return `Cardinalidad(${conjunto})`
  }

  unparse(): string {
    const conjunto = this.conjunto
    return `{${conjunto}}`;
  }

  evaluate(state: Estado): any {
    const conjuntoE = this.conjunto.evaluate(state)
    if( conjuntoE instanceof Array){
     return conjuntoE.length;
    }
    else{
      throw new Error("Solo se pueden hacer cardinalidad sobre conjuntos o listas");
            //tengo que tirar error aca
    }
    
    
  }

}