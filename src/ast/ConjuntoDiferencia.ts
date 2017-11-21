import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de las comparaciones por igual.
*/
export class ConjuntoDiferencia implements Exp {

    cjIzq: Exp;
    cjDer: Exp;

    constructor(cjIzq: Exp, cjDer: Exp) {
        this.cjIzq = cjIzq;
        this.cjDer = cjDer;
    }

    toString(): string {
        const cjIzq = this.cjIzq.toString();
        const cjDer = this.cjDer.toString();
        return `ConjuntoDiferencia(${cjIzq}, ${cjDer})`;
    }

    unparse(): string {
        return `(${this.cjIzq.unparse()} -- ${this.cjDer.unparse()})`;

    }

    evaluate(state: Estado): any {
        const cjIzq = this.cjIzq.evaluate(state);
        const cjDer = this.cjDer.evaluate(state);
        let diferencia = cjIzq.filter(item => cjDer.indexOf(item) < 0);
        return diferencia;
    }

}
