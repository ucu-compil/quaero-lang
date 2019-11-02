import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';


/**
  Representación de las comparaciones por igual.
*/
export class Diferencia implements Exp {

    cjIzq: Exp;
    cjDer: Exp;

    constructor(cjIzq: Exp, cjDer: Exp) {
        this.cjIzq = cjIzq;
        this.cjDer = cjDer;
    }

    toString(): string {
        const cjIzq = this.cjIzq.toString();
        const cjDer = this.cjDer.toString();
        return `Diferencia(${cjIzq}, ${cjDer})`;
    }

    unparse(): string {
        return `(${this.cjIzq.unparse()} -- ${this.cjDer.unparse()})`;

    }

    evaluate(state: Estado): any {
        if(!(this.cjIzq instanceof Lista && this.cjDer instanceof Lista))
        {
            if(!(this.cjIzq instanceof Conjunto && this.cjDer instanceof Conjunto))
            {
                throw new Error("Solo se pueden hacer Diferencia sobre conjuntos o listas");                
                
            }
        }

        
        const cjIzq = this.cjIzq.evaluate(state);
        const cjDer = this.cjDer.evaluate(state);
        let diferencia = cjIzq.filter(item => cjDer.indexOf(item) < 0);
        return diferencia;

        
    }

}
