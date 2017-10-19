import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTLista } from '../typecheck/QTLista';

/**
  Representación de las claves.
*/
export class Clave implements Exp {

  id: String
  value: Exp

  constructor(id: String, value: Exp) {
    this.id = id;
    this.value = value;
  }

  toString(): string {
    return `Clave(${this.id},${this.value})`
  }

  unparse(): string {
    return `${this.id}: ${this.value}`;
  }

  evaluate(state: Estado): Estado {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    return undefined;
}
}
