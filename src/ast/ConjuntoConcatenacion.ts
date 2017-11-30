import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de las comparaciones por igual.
*/
export class ConjuntoConcatenacion implements Exp {

    cjIzq: Exp;
    cjDer: Exp;

    constructor(cjIzq: Exp, cjDer: Exp) {
        this.cjIzq = cjIzq;
        this.cjDer = cjDer;
    }

    toString(): string {
        const cjIzq = this.cjIzq.toString();
        const cjDer = this.cjDer.toString();
        return `ConjuntoConcatenacion(${cjIzq}, ${cjDer})`;
    }

    unparse(): string {
        return `(${this.cjIzq.unparse()} ++ ${this.cjDer.unparse()})`;

    }

    evaluate(state: Estado): any {
        const cjIzq = this.cjIzq.evaluate(state);
        const cjDer = this.cjDer.evaluate(state);
        let concatenacion = [];
        cjIzq.forEach(element => {
            concatenacion.push(element);
        }
        )
        cjDer.forEach(element => {
            concatenacion.push(element);
        }
        )
        return concatenacion;
    }

}
