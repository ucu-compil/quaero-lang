import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class Pertenencia implements Exp {
    lhs: Exp;
    rhs: Exp;

    constructor(lhs: Exp, rhs: Exp, cond: Exp = null) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    toString(): string {
        return "";
    }

    unparse(): string {
        return "";
    }

    evaluate(state: Estado): any {
        
    }

    evaluateComprension(state: Estado, tail: Exp[], res): any {
        if (tail.length == 0) {
            var list = this.rhs.evaluate(state);
            list.forEach(element => {
                var aux = [];
                aux[this.lhs.id] = element;
                res.push(aux);
            });

            return res;
        }

        
    }

}

function* pertenenciaGenerator() {
    var i = 0;
    while (true) {
        yield i++;
    }
}
