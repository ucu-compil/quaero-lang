import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Conjunto } from './Conjunto';

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
    console.log("Expresion:");
    console.log(expresionE);
    var conjuntoE = this.conjunto.evaluate(state);
    console.log("Conjunto:");
    console.log(conjuntoE);
    console.log(conjuntoE.length);

    if(this.conjunto instanceof Conjunto || this.conjunto instanceof Lista){
      var r = false;
      conjuntoE.forEach(element => {
        console.log("element:");
        console.log(element);
        if(element == expresionE){
          console.log("a");
          r = true;
        }
      });
      return r;
    }
    else{
      console.log(this.expresion+" Debe ser una lista o un conjunto");
      return undefined;
    }
  }

}