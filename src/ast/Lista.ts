import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';
import { QTLista } from '../typecheck/QTLista';

/**
  Representación de las listas.
*/
export class Lista implements Exp {

  elementos: Exp[];

  constructor(elementos: Exp[] = null) {
    this.elementos = elementos;
  }

  toString(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(", ");
    return `Lista(${elementos})`
  }

  unparse(): string {
    const elementos = this.elementos
      .filter((exp) => (exp !== undefined))
      .map((exp) => (exp.toString()))
      .join(" ");
    return `[ ${elementos} ]`;
  }

  evaluate(state: Estado): Estado {
    return undefined;
  }

  checktype(checkstate: CheckState): QuaeroType {
    return QTLista.Instance;
}
}
