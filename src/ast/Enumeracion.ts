import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';

/**
  Representación de enumeracion.
*/
export class Enumeracion implements Exp {

    inicio: Exp;
    fin: Exp;
    salto: Exp;

    constructor(inicio: Exp, fin: Exp, salto: Exp = null) {
        this.inicio = inicio;
        this.fin = fin;
        this.salto = salto;
    }

    toString(): string {
        return `Enumeracion(${this.inicio.toString()}, ${this.fin.toString()}, ${this.salto ? this.salto.toString() : 'Numeral(1)'})`;
    }

    unparse(): string {
        // const elementos = this.elementos
        //     .filter((exp) => (exp !== undefined))
        //     .map((exp) => (exp.toString()))
        //     .join(", ");
        // return `[ ${elementos} ]`;

        return undefined;
    }

    evaluate(state: Estado): any {
        var ini = this.inicio.evaluate(state);
        var fin = this.fin.evaluate(state);
        var salto = this.salto ? this.salto : 1;

        if (typeof ini !== 'number' || typeof fin !== 'number' || typeof salto !== 'number') {
            throw new Error('Los elementos deben ser de tipo numérico.');
        }

        var arr = [];
        while (ini < fin) {
            arr.push(ini += salto);
        }

        return arr;
    }

}
