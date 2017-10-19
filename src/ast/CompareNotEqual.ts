import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTBool, QTNumeral, QTInt } from './AST';

/**
  Representación de las comparaciones por igual.
*/
export class CompareNotEqual implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareNotEqual(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} != ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    var trhs = this.rhs.checktype(checkstate);
    var tlhs = this.lhs.checktype(checkstate);


    if (tlhs === QTNumeral.Instance && (trhs === QTInt.Instance || trhs === QTNumeral.Instance)) {
      return QTBool.Instance;
    }
    else if (tlhs === QTInt.Instance) {
      if (trhs === QTInt.Instance) {
        return QTBool.Instance;
      }
      //Y Numeral
      else if (trhs === QTNumeral.Instance) {
        return QTBool.Instance
      }
    }
    //Si son booleanos 
    else if (trhs === QTBool.Instance && tlhs === QTBool.Instance) {
      return QTBool.Instance;
    }
    else {
      console.log("Guardar Error [No se pueden COMPARAR variables de tipo " + tlhs.toString() + " con " + trhs.toString() + "] Y Seguir")
    }
  }
}
