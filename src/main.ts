import * as readlineSync from "readline-sync";

import { Parser } from "nearley";

import { tokens } from "./parser/Tokens";
import { MyLexer } from "./parser/Lexer"
import { ParserRules, ParserStart } from "./parser/Grammar";

import { ASTNode, Stmt } from './ast/AST';

import { State } from './interpreter/State';

console.log("Quaero :: REPL");

var state = new State();
state.jsfun.set("print",console.log);
state.jsfun.set("div",function div(x,y){ return Math.floor(x/y); });
state.jsfun.set("mod",function mod(x,y){ return x%y; });
state.jsfun.set("length",function length(x){ return x.length; });
state.jsfun.set("string",function string(x){ return x+''; });
state.jsfun.set("boolean",function boolean(x){ return !!x; });
state.jsfun.set("number",function number(x){ return parseFloat(x); });
state.jsfun.set("int",function int(x){ return parseInt(x); });
state.jsfun.set("max",Math.max);

while (true) {
  const lexer = new MyLexer(tokens);
  const parser = new Parser(ParserRules, ParserStart, { lexer });

  const input = readlineSync.question('> ');

  try {
    // Parse user input
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
        //console.log(node.toString());
        console.log(`\n${state.toString()}`);
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
}
