import { Estado } from '../interpreter/Estado';
import { CheckState } from '../typecheck/CheckState';
import { QuaeroType } from '../typecheck/QuaeroType';


export interface ASTNode {
  toString(): string;
  unparse(): string;
}

/**
  Categoría sintáctica de las expresiones de While, las
  construcciones del lenguaje que evalúan a un valor.
*/
export interface Exp extends ASTNode {

  evaluate(state: Estado): any;
  checktype(checkstate: CheckState): QuaeroType;
  
}

/**
  Categoría sintáctica de las sentencias (statements) de While, las
  construcciones del lenguaje que modifican (potencialmente) los
  valores de las variables en el estado del programa.
*/
export interface Stmt extends ASTNode {

  evaluate(state: Estado): Estado;

}
