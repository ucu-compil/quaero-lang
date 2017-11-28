import { Exp } from './ASTNode';
import { Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';

/**
  Representación de usos de variable en expresiones.
*/
export class ParseBoolean implements Exp {
    exp: Exp;

    constructor(exp: Exp) {
        this.exp = exp;
    }

    toString(): string {
        console.log(this.exp);
        return `ParseBoolean(${this.exp.toString()})`;
    }
1
    unparse(): string {
        return this.exp.unparse();
    }

    evaluate(state: Estado): any {
        const exp = this.exp.evaluate(state);
        if(typeof exp == "string"){
            if(exp == "true"){
                return true;
            }
            if(exp == "false"){
                return false;
            }
        }
        if(typeof exp == "boolean"){
            return exp;
        }
        if(typeof exp == "number"){
            console.log("es un numero");
            if(exp==0){
                return false;
            }
            if(exp==1){
                return true;
            }
        }
        
        throw new Error('No se puede convertir a boolean');
        
        //console.log(this.exp.evaluate(state).toString());
        //return this.exp.evaluate(state).toString();
    }
}
