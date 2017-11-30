import * as readlineSync from "readline-sync";

import { Parser } from "nearley";

import { tokens } from "./parser/Tokens";
import { MyLexer } from "./parser/Lexer"
import { ParserRules, ParserStart } from "./parser/Grammar";

import { ASTNode, Stmt } from './ast/AST';

import { Estado } from './interpreter/Estado';
import fs  = require('fs');
fs.readFileSync('src/texto.txt','utf8');




var state = new Estado();
console.log("Para correr en modo REPL elija opcion 1");
console.log("Para ingresar un archivo .qr elija opcion 2")
const opcion = readlineSync.question('Opcion:');
if (opcion == '1') {
  console.log("Entrando en modo REPL")
  console.log("Quaero :: REPL");
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
          console.log(node);
          state = node.evaluate(state);
          console.log(state);
          if (state != undefined) {
            console.log(`\n${state.toString()}`);
          }

          break;
        }
        default: {
          console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
          nodes.map((node) => console.log(node.toString()));
          break;
        }
      }
    } catch (parseError) {
      console.log(parseError);
    }
  }
}
if (opcion == '2') {
  while (true) {
    const lexer = new MyLexer(tokens);
    const parser = new Parser(ParserRules, ParserStart, { lexer });
    const ruta = readlineSync.question('Ingrese la ruta y el nombre del archivo:');
    var texto = fs.readFileSync(ruta,'utf8');
    console.log(texto);
    const input = "{"+texto+"}";
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
          console.log(node);
          state = node.evaluate(state);
          console.log(state);
          if (state != undefined) {
            console.log(`\n${state.toString()}`);
          }
          break;
        }
        default: {
          console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
          nodes.map((node) => console.log(node.toString()));
          break;
        }
      }
    } catch (parseError) {
      console.log(parseError);
    }
  }
}
