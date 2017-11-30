"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
const nearley_1 = require("nearley");
const Tokens_1 = require("./parser/Tokens");
const Lexer_1 = require("./parser/Lexer");
const Grammar_1 = require("./parser/Grammar");
const State_1 = require("./interpreter/State");
console.log("While :: REPL");
var state = new State_1.State();
while (true) {
    const lexer = new Lexer_1.MyLexer(Tokens_1.tokens);
    const parser = new nearley_1.Parser(Grammar_1.ParserRules, Grammar_1.ParserStart, { lexer });
    const input = readlineSync.question('> ');
    try {
        // Parse user input
        parser.feed(input);
        // Print result
        const nodes = parser.results;
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
    }
    catch (parseError) {
        console.log(parseError);
    }
}
//# sourceMappingURL=main.js.map