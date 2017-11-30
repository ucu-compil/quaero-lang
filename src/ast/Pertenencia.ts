import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Variable } from './AST';

/**
  Representación de usos de variable en expresiones.
*/
export class Pertenencia implements Exp {
    lhs: string;
    rhs: Exp;

    constructor(lhs: string, rhs: Exp, cond: Exp = null) {
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
        var res = [];
        var tail = this.rhs.evaluate(state).slice(1);

        var list = this.rhs.evaluate(state);
        if (tail.length == 0) {
            list.forEach(element => {
                var aux = [];
                aux[this.lhs] = element;
                res.push(aux);
            });
            return res;
        }

        var aux = [];

        tail.forEach(element => {
            if (element instanceof Pertenencia) {
                aux[element.lhs] = element.rhs.evaluate(state);
            }
        });

        console.log(aux);
    }

    evaluateComprension(state: Estado, tail: Exp[], res): any {
        var list = this.rhs.evaluate(state);
        if (tail.length == 0) {
            list.forEach(element => {
                var aux = [];
                aux[this.lhs] = element;
                res.push(aux);
            });
            return res;
        }

        var aux = [];

        tail.forEach(element => {
            if (element instanceof Pertenencia) {
                aux[element.lhs] = element.rhs.evaluate(state);
            }
        });

        list.forEach(listElement => {
            var aux2 = [];

            for (var h = 0; h < Object.keys(aux).length; h++) {
                
            }

            Object.keys(aux).forEach(keysElement => {
                
            });
        });
    }

}

function* pertenenciaGenerator(state: Estado, tail: Exp[]) {
    for (var i = 0; i <= tail.length; i++) {
        yield tail[i];
    }
}
