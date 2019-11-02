import { Exp } from './ASTNode';
import { Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class StatementExpression implements Stmt {
    exp: Exp;

    constructor(exp: Exp) {
        this.exp = exp;
    }

    toString(): string {
        return `StatementExpression(${this.exp.toString()})`;
    }

    unparse(): string {
        return this.exp.unparse();
    }

    evaluate(state: Estado): any {
        this.exp.evaluate(state);
        return state;
    }

}
