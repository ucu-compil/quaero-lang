import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Sequence } from './Sequence';
import { Stmt } from './ASTNode';
import { DeclarationFunction } from './DeclarationFunction';

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
        this.args.forEach(element => {
          evaluatedargs.push(element.evaluate(state));
          evaluatedargs.reverse();
        });
        var funcion = state.get(this.id);
        if(funcion instanceof DeclarationFunction)
        {
          var estadoAux: Estado = new Estado();
          var nameargs = funcion.args;
          nameargs.forEach(element => 
            {
              estadoAux.set(element,evaluatedargs.pop());
            });
        }
        var evaluatedStatement = funcion.body.evaluate(estadoAux);

        return state;
      }
    }