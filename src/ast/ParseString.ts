import { Exp } from './ASTNode';
import { Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class ParseString implements Exp {
    exp: Exp;

    constructor(exp: Exp) {
        this.exp = exp;
    }

    toString(): string {
        console.log(this.exp);
        return `ParseString(${this.exp.toString()})`;
    }
1
    unparse(): string {
        return this.exp.unparse();
    }

    evaluate(state: Estado): any {
        console.log("esto a string:");
        console.log(this.exp.evaluate(state).toString());
        return this.exp.evaluate(state).toString();
    }
}
