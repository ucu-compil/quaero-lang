import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTBool } from '../typecheck/QTBool';
import { QTInt } from '../typecheck/QTInt';
import { QTNumeral } from '../typecheck/QTNumeral';

/**
  Representación de multiplicaciones.
*/
export class Division implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Division(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} / ${this.rhs.unparse()})`;
  }

  evaluate(state: Estado): any {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    var trhs = this.rhs.checktype(checkstate);
    var tlhs = this.lhs.checktype(checkstate);
    if(tlhs==QTBool.Instance || trhs == QTBool.Instance){
      console.log("no podes operar con buleanos crimen, cual haces?, me guardo el error y sigo")
    }
    else{
      if(trhs === tlhs && tlhs === QTInt.Instance){
        return QTInt.Instance;
      }
      else{
        return QTNumeral.Instance;
      }
    }
    return undefined
  }
}
