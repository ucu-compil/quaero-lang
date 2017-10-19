import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTNumeral, QTInt, QTBool } from './AST';

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareLess implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareLess(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} < ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    var trhs = this.rhs.checktype(checkstate);
    var tlhs = this.lhs.checktype(checkstate);

    //Si es Numeral y (Numeral o Int)
    if (tlhs === QTNumeral.Instance && (trhs === QTInt.Instance || trhs === QTNumeral.Instance)) {
      return QTNumeral.Instance;
    }
    //Si es Int
    else if (tlhs === QTInt.Instance) {
      //Y Int
      if (trhs === QTInt.Instance) {
        return QTBool.Instance;
      }
      //Y Numeral
      else if (trhs === QTNumeral.Instance) {
        return QTBool.Instance
      }
    }
    //Si no es Numeral Ni Int
    else {
      console.log("Guardar Error [No se pueden CMPARAR <= variables de tipo " + tlhs.toString() + " con " + trhs.toString() + "] Y Seguir")
    }
  }
}

