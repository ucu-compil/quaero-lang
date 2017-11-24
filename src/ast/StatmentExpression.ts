import { Exp } from './ASTNode';
import { Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class StatmentExpression implements Stmt {
    exp: Exp;

    constructor(exp: Exp) {
        this.exp = exp;
    }

    toString(): string {
        console.log(this.exp);
        return `StatmentExpression(${this.exp.toString()})`;
    }

    unparse(): string {
        return this.exp.unparse();
    }

    evaluate(state: Estado): any {
        this.exp.evaluate(state);
        return state;
    }

}
