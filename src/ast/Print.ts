import { Exp } from './ASTNode';
import { Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class Print implements Stmt {
    exp: Exp;

    constructor(exp: Exp) {
        this.exp = exp;
    }

    toString(): string {
        console.log(this.exp);
        return `Print(${this.exp.toString()})`;
    }
1
    unparse(): string {
        return this.exp.unparse();
    }

    evaluate(state: Estado): any {
        console.log(this.exp.evaluate(state));
        return state;
    }

}
