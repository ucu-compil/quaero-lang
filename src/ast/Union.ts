import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';

/**
  Representación de las comparaciones por igual.
*/
export class Union implements Exp {

    cjIzq: Exp;
    cjDer: Exp;

    constructor(cjIzq: Exp, cjDer: Exp) {
        this.cjIzq = cjIzq;
        this.cjDer = cjDer;
    }

    toString(): string {
        const cjIzq = this.cjIzq.toString();
        const cjDer = this.cjDer.toString();
        return `ConjuntoUnion(${cjIzq}, ${cjDer})`;
    }

    unparse(): string {
        return `(${this.cjIzq.unparse()} \/ ${this.cjDer.unparse()})`;

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
        const union = [];
        cjIzq.forEach(element => {
               union.push(element);
            })
        cjDer.forEach(element => {
                if(!cjIzq.includes(element)){
                    union.push(element);
                }
            })
        return union;
    }

}
