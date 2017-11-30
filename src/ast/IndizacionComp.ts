import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Conjunto } from './Conjunto';
import { Lista } from './Lista';
import { Numeral } from './Numeral';
/**
  Representación de 
*/
export class IndizacionComp implements Exp {

    conjunto: Exp;
    indice: Exp;

    constructor(conjunto: Exp, indice: Exp) {
        this.conjunto = conjunto;
        this.indice = indice;
    }

    toString(): string {
        const conjunto = this.conjunto
        return `Indizacion(${conjunto})`
    }

    unparse(): string {
        const conjunto = this.conjunto
        return `{${conjunto}}`;
    }

    evaluate(state: Estado): any {
        const conjuntoE = this.conjunto.evaluate(state);
        const indiceE = this.indice.evaluate(state);
        return (conjuntoE[indiceE]);
    }
}