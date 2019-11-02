import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';



/**
  Representación de las comparaciones por igual.
*/
export class Concatenacion implements Exp {

    cjIzq: Exp;
    cjDer: Exp;

    constructor(cjIzq: Exp, cjDer: Exp) {
        this.cjIzq = cjIzq;
        this.cjDer = cjDer;
    }

    toString(): string {
        const cjIzq = this.cjIzq.toString();
        const cjDer = this.cjDer.toString();
        return `Concatenacion(${cjIzq}, ${cjDer})`;
    }

    unparse(): string {
        return `(${this.cjIzq.unparse()} ++ ${this.cjDer.unparse()})`;

    }

    evaluate(state: Estado): any {
        if(this.cjIzq instanceof Lista && this.cjDer instanceof Lista)
        {
            const cjIzqev = this.cjIzq.evaluate(state);
            const cjDerev = this.cjDer.evaluate(state);
            let concatenacion = [];
            cjIzqev.forEach(element => {
                concatenacion.push(element);
            }
            )
            cjDerev.forEach(element => {
                concatenacion.push(element);
            }
            )
            return concatenacion;
            

        }
        else if(this.cjIzq instanceof Conjunto && this.cjDer instanceof Conjunto)
        {
            const cjIzqev = this.cjIzq.evaluate(state);
            const cjDerev = this.cjDer.evaluate(state);
            let concatenacion = [];
            cjIzqev.forEach(element => {
                concatenacion.push(element);
            }
            )
            cjDerev.forEach(element => {
                if(concatenacion.find(myObj => myObj == element)==undefined)  
                {
                    concatenacion.push(element);
                }       
            }
            )
            return concatenacion;            
        }
    
        throw new Error("Solo se pueden hacer concatenación sobre conjuntos o listas");                
        
    }

}
