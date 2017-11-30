import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Pertenencia } from './Pertenencia';

/**
  Representación del FOR loop.
*/
export class For implements Stmt {
  exp: Exp[];
  forBody: Stmt;

  constructor(exp: Exp[], forBody: Stmt) {
    this.exp = exp;
    this.forBody = forBody;
  }

  toString(): string {
    return `IfThen(${this.exp.toString()}, ${this.forBody.toString()})`;
  }

  unparse(): string {
    return undefined;
    // return `if ${this.exp.unparse()} then { ${this.forBody.unparse()} }`;
  }

  evaluate(state: Estado): any {

    if (this.exp.length != 0) {
      var head = this.exp[0];
      var last = this.exp[this.exp.length - 1];

      if (head instanceof Pertenencia) {
        var cond = typeof last.evaluate == 'boolean' ? this.exp.pop().evaluate(state) : true;
        var tail = this.exp.slice(1);
        var result = [];

        head.evaluateComprension(state, tail, result);

        result.forEach(element => {
          Object.keys(element).forEach(e => {
            state.set(e, element[e]);
          })

          if (cond) {
            this.forBody.evaluate(state);
          }
        });
      }

    }

    return state;
  }

}