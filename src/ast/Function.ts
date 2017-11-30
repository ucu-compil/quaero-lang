import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Sequence } from './Sequence';
import { Stmt } from './ASTNode';
import { DeclarationFunction } from './DeclarationFunction';
import { Return } from './Return';


export class Function implements Exp {
      id: string;
      args:Exp[];
      
      constructor(id: string, args: Exp[], body: Sequence) {
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
        
        this.args.forEach(element => {
          evaluatedargs.push(element.evaluate(state));
          evaluatedargs.reverse();
        });
        var funcion = state.get(this.id);
        if(funcion instanceof DeclarationFunction)
        {
          var nameargs = funcion.args;
          nameargs.forEach(element => 
            {
              estadoAux.set(element,evaluatedargs.pop());
            });
        }
        var sequence = funcion.body;        
        sequence.forEach(element => {
          if(element instanceof Return)
          {
            return element.evaluate(state);
          }
          element.evaluate(state);
        });

        return undefined;
      }
    }