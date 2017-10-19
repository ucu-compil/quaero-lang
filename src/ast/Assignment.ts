import { Exp, Stmt } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTNumeral } from '../typecheck/QTNumeral';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Assignment implements Stmt {

  id: string;
  exp: Exp;

  constructor(id: string, exp: Exp) {
    this.id = id;
    this.exp = exp;
  }

  toString(): string {
    return `Assignment(${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return `${this.id} = ${this.exp.unparse()}`;
  }

  evaluate(state: Estado): Estado {
    return undefined;
  }

  checktype(checkstate: CheckState): CheckState {
    console.log(this.exp);

    var state = checkstate.get(this.id);
    if (state === undefined) {
      checkstate.set(this.id, this.exp[0].checktype(checkstate));
    } else {
      if (state.isCompatible(this.exp[0].checktype(checkstate))) {
        checkstate.set(this.id, state.coerce(this.exp[0]));


        // if (this.exp[0].checktype(checkstate) === WTNumeral.Instance) {
        //   console.log("entro aquiqui")
        //   checkstate.set(this.id, new WTNumeral());
        // }
        // console.log("Listo");
      }
      else {
        console.log("No son compatibles, guardo error y sigo de largo");
      }
    }
    console.log(checkstate.get(this.id));
    return checkstate;
  }
}
