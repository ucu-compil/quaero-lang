import { Parser } from "nearley";

import { tokens } from "../parser/Tokens";
import { MyLexer } from "../parser/Lexer"
import { ParserRules, ParserStart } from "../parser/Grammar";
import { Stmt } from './ASTNode';
import { State } from '../interpreter/State';
/**
  Representación de las asignaciones de valores a variables.
*/
export class Load implements Stmt {

  path: string;

  constructor(path: string) {
    if(path.endsWith(".qr")) this.path = path;
    else this.path = `${path}.qr`;
  }

  toString(): string {
    return `Load(${this.path})`;
  }

  unparse(): string {
    return `:l ${this.path}`;
  }

  evaluate(state: State): State {
    const lexer = new MyLexer(tokens);
    const parser = new Parser(ParserRules, ParserStart, { lexer });

    try {
      // Parse user input
      var fs = require('fs');
      var input;
      input = fs.readFileSync(this.path, 'utf8', function(err) {
        if(err) return console.log(err);
      });
      parser.feed(input);
      // Print result
      const nodes: Stmt[] = parser.results;
      switch (nodes.length) {
        case 0: {
          console.log("Parse failed!!");
          break;
        }
        case 1: {
          const node = nodes[0];
          state = node.evaluate(state);
          state.setFile(this.path);
          break;
        }
        default: {
          console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
          nodes.map((node) => console.log(node.toString()));
          break;
        }
      }

    } catch(parseError) {
      console.log(parseError);
    }
    return state;
  }
}
