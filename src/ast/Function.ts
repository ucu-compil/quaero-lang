import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Sequence } from './Sequence';
import { Stmt } from './ASTNode';
export class Function implements Stmt {
      id: string;
      args:string[];
      body:Sequence;
      
      constructor(id: string, args: string[], body: Sequence) {
        this.id = id;
        this.args = args;
        this.body = body;
      }
    
      toString(): string {
        return `Function(${this.id} , ${this.args.toString()} , ${this.body.toString()})`;
      }
    
      unparse(): string {
        let argumentos = this.args.join(",");
        return `function ${this.id} (${argumentos}) { ${this.body.unparse()}}`;
      }
    
      evaluate(state: Estado): Estado {
        state.set(this.id,this);
        return state;
      }
    }