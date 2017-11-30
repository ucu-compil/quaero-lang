import { Exp } from './ASTNode';
import { Estado } from '../interpreter/Estado';
import { Sequence } from './Sequence';
import { Stmt } from './ASTNode';
export class DeclarationFunction implements Stmt {
      id: string;
      args:string[];
      statements: Stmt[]
      
      constructor(id: string, args: string[], statements: Stmt[]) {
        this.id = id;
        this.args = args;
        this.statements = statements;
      }
    
      toString(): string {

        const statements = this.statements
        .filter((stmt) => (stmt !== undefined))
        .map((stmt) => (stmt.toString()))
        .join(", ");

        return `Function(${this.id} , ${this.args.toString()} , ${statements.toString()})`;
      }
    
      unparse(): string {
          const statements = this.statements
            .filter((stmt) => (stmt !== undefined))
            .map((stmt) => (stmt.toString()))
            .join(" ");
        let argumentos = this.args.join(",");
        return `function ${this.id} (${argumentos}) { ${statements}}`;
      }
    
      evaluate(state: Estado): Estado {
        var a = state.set(this.id,this);
        return state;
      }
    }