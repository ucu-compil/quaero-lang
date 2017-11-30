import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Sequence } from './Sequence';
import { Stmt } from './ASTNode';
import { DeclarationFunction } from './DeclarationFunction';
import { Return } from './Return';


export class Function implements Exp {
      id: string;
      args:Exp[];
      
      constructor(id: string, args: Exp[]) {
        this.id = id;
        this.args = args;
      }
    
      toString(): string {
        return `Function(${this.id} , ${this.args.toString()})`;
      }
    
      unparse(): string {
        let argumentos = this.args.join(",");
        return `function ${this.id} (${argumentos})`;
      }
    
      evaluate(state: Estado): Estado {
        var evaluatedargs=[];
        var estadoAux: Estado = new Estado();
        var auxReturn;
        
        this.args.forEach(element => {
          evaluatedargs.push(element.evaluate(state));
        });
        evaluatedargs.reverse();
                
        var funcion = state.get(this.id);
        if(funcion instanceof DeclarationFunction)
        {
          console.log("Es Declaration function")
          var nameargs = funcion.args;
          nameargs.forEach(element => 
            {
              estadoAux.set(element,evaluatedargs.pop());
            });
        
        var sequence = funcion.statements;        
        sequence.forEach(element => {
          if(element instanceof Return)
          {
            console.log("es instance of return")
            auxReturn =  element.evaluate(estadoAux);
          }
          else
          {
          console.log("no es instance of return")
          element.evaluate(estadoAux);
          }
        });
      }
        return auxReturn;
    }
  }