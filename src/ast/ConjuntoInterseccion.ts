import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTNumeral, QTInt, QTBool } from './AST';

/**
  Representación de las comparaciones por igual.
*/
export class ConjuntoInterseccion implements Exp {

    cjIzq: Exp;
    cjDer: Exp;

    constructor(cjIzq: Exp, cjDer: Exp) {
        this.cjIzq = cjIzq;
        this.cjDer = cjDer;
    }

    toString(): string {
        const cjIzq = this.cjIzq.toString();
        const cjDer = this.cjDer.toString();
        return `ConjuntoInterseccion(${cjIzq}, ${cjDer})`;
    }

    unparse(): string {
        return `(${this.cjIzq.unparse()} /\ ${this.cjDer.unparse()})`;

    }

    evaluate(state: Estado): any {
        const cjIzq = this.cjIzq.evaluate(state);
        const cjDer = this.cjDer.evaluate(state);
        const interseccion = [];
        cjIzq.forEach(element => {
            if(cjDer.includes(element)){
                interseccion.push(element);
            }
        })
        return interseccion;
    }

    checktype(checkstate: CheckState): QuaeroType {
        return undefined;
    }
}
