import { Estado } from '../interpreter/Estado';

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
  
}

/**
  Categoría sintáctica de las sentencias (statements) de While, las
  construcciones del lenguaje que modifican (potencialmente) los
  valores de las variables en el estado del programa.
*/

export interface Stmt extends ASTNode {

  evaluate(state: Estado): Estado;
  
}
