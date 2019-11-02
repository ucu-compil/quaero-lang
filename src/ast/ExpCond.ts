import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Lista } from './Lista';
import { Conjunto } from './Conjunto';

/**
  Representación de las comparaciones por igual.
*/
export class ExpCond implements Exp {

  vt: Exp;
  vf: Exp;
  b: Exp;

  constructor(vt: Exp, b: Exp, vf: Exp) {
    this.vt = vt;
    this.vf = vf;
    this.b = b;
  }

  toString(): string {
    return `ExpCond(${this.vt.toString()}, ${this. b.toString()} ,${this. vf.toString()})`;
  }

  unparse(): string {
    return `(${this.vt.unparse()} if ${this.b.unparse()} else ${this.vf.unparse()})`;
  }

  evaluate(state: Estado): any {
    var evalCond = this.b.evaluate(state);

    if(typeof evalCond === 'boolean')
    {
        if(evalCond === true)
        {
            return this.vt.evaluate(state);
        }
        return this.vf.evaluate(state);
    }

    throw new Error("La condición no es de tipo booleano");
  }
}
