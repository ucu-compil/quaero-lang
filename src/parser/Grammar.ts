// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
function id(d:any[]):any {return d[0];}
declare var identifier:any;
declare var integer:any;
declare var hex:any;
declare var float:any;
declare var string:any;


import {
  Addition,
  Assignment,
  CompareEqual,
  CompareNotEqual,
  CompareLessOrEqual,
  CompareLess,
  CompareGreatOrEqual,
  CompareGreat,
  Conjunction,
  Disjunction,
  IfThenElse,
  IfThen,
  Multiplication,
  Division,
  Negation,
  Numeral,
  Sequence,
  Substraction,
  TruthValue,
  Variable,
  WhileDo,
  ExpCond,
  TextLiteral,
  Length,
  Index,
  DoWhile,
  WhileDoElse,
  Funcion,
  Call
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

export interface Token {value:any; [key: string]:any};
export interface Lexer {reset:(chunk:string, info:any) => void; next:() => Token | undefined; save:() => any; formatError:(token:Token) => string; has:(tokenType:string) => boolean};
export interface NearleyRule {name:string; symbols:NearleySymbol[]; postprocess?:(d:any[],loc?:number,reject?:{})=>any};
export type NearleySymbol = string | {literal:any} | {test:(token:any) => boolean};
export var Lexer:Lexer|undefined = lexer;
export var ParserRules:NearleyRule[] = [
    {"name": "stmt", "symbols": ["stmtelse"], "postprocess": id},
    {"name": "stmt", "symbols": [{"literal":"if"}, "exp", {"literal":"then"}, "stmt"], "postprocess": ([, cond, , thenBody]) => (new IfThen(cond, thenBody))},
    {"name": "stmtelse", "symbols": ["identifier", {"literal":"="}, "exp", {"literal":";"}], "postprocess": ([id, , exp, ]) => (new Assignment(id, exp))},
    {"name": "stmtelse$ebnf$1", "symbols": []},
    {"name": "stmtelse$ebnf$1", "symbols": ["stmtelse$ebnf$1", "identifier"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "stmtelse", "symbols": ["identifier", {"literal":"("}, "stmtelse$ebnf$1", {"literal":")"}, "stmt"], "postprocess": ([name, , ids, , body]) => (new Funcion(name,ids,body))},
    {"name": "stmtelse$ebnf$2", "symbols": []},
    {"name": "stmtelse$ebnf$2", "symbols": ["stmtelse$ebnf$2", "stmt"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "stmtelse", "symbols": [{"literal":"{"}, "stmtelse$ebnf$2", {"literal":"}"}], "postprocess": ([, statements, ]) => (new Sequence(statements))},
    {"name": "stmtelse", "symbols": [{"literal":"while"}, "exp", {"literal":"do"}, "stmt"], "postprocess": ([, cond, , body]) => (new WhileDo(cond, body))},
    {"name": "stmtelse", "symbols": [{"literal":"do"}, "stmt", {"literal":"while"}, "exp"], "postprocess": ([, body, , cond]) => (new DoWhile(cond, body))},
    {"name": "stmtelse", "symbols": [{"literal":"while"}, "exp", {"literal":"do"}, "stmt", {"literal":"else"}, "stmt"], "postprocess": ([, cond, , body, , elseBody]) => (new WhileDoElse(cond,body,elseBody))},
    {"name": "stmtelse", "symbols": [{"literal":"if"}, "exp", {"literal":"then"}, "stmtelse", {"literal":"else"}, "stmt"], "postprocess": ([, cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody))},
    {"name": "exp", "symbols": ["exp", {"literal":"if"}, "exp", {"literal":"else"}, "exp"], "postprocess": ([exp, ,cond, ,expElse]) => (new ExpCond(cond, exp, expElse))},
    {"name": "exp$ebnf$1", "symbols": []},
    {"name": "exp$ebnf$1", "symbols": ["exp$ebnf$1", "identifier"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "exp", "symbols": ["identifier", {"literal":"("}, "exp$ebnf$1", {"literal":")"}], "postprocess": ([name, , ids,]) => (new Call(name,ids))},
    {"name": "exp", "symbols": [{"literal":"length"}, {"literal":"("}, "exp", {"literal":")"}], "postprocess": ([, , exp, ]) => (new Length(exp))},
    {"name": "exp", "symbols": ["exp", {"literal":"["}, "exp", {"literal":"]"}], "postprocess": ([str, ,ind, ]) => (new Index(str,ind))},
    {"name": "exp", "symbols": ["condisj"], "postprocess": id},
    {"name": "condisj", "symbols": ["exp", {"literal":"&&"}, "comp"], "postprocess": ([lhs, , rhs]) => (new Conjunction(lhs, rhs))},
    {"name": "condisj", "symbols": ["exp", {"literal":"||"}, "comp"], "postprocess": ([lhs, , rhs]) => (new Disjunction(lhs, rhs))},
    {"name": "condisj", "symbols": ["comp"], "postprocess": id},
    {"name": "comp", "symbols": ["comp", {"literal":"=="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["comp", {"literal":"!="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["comp", {"literal":"<="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["comp", {"literal":"<"}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareLess(lhs, rhs))},
    {"name": "comp", "symbols": ["comp", {"literal":">="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["comp", {"literal":">"}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareGreat(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub"], "postprocess": id},
    {"name": "addsub", "symbols": ["addsub", {"literal":"+"}, "muldiv"], "postprocess": ([lhs, , rhs]) => (new Addition(lhs, rhs))},
    {"name": "addsub", "symbols": ["addsub", {"literal":"-"}, "muldiv"], "postprocess": ([lhs, , rhs]) => (new Substraction(lhs, rhs))},
    {"name": "addsub", "symbols": ["muldiv"], "postprocess": id},
    {"name": "muldiv", "symbols": ["muldiv", {"literal":"*"}, "neg"], "postprocess": ([lhs, , rhs]) => (new Multiplication(lhs, rhs))},
    {"name": "muldiv", "symbols": ["muldiv", {"literal":"/"}, "neg"], "postprocess": ([lhs, , rhs]) => (new Division(lhs, rhs))},
    {"name": "muldiv", "symbols": ["neg"], "postprocess": id},
    {"name": "neg", "symbols": [{"literal":"!"}, "value"], "postprocess": ([, exp]) => (new Negation(exp))},
    {"name": "neg", "symbols": ["value"], "postprocess": id},
    {"name": "value", "symbols": [{"literal":"("}, "exp", {"literal":")"}], "postprocess": ([, exp, ]) => (exp)},
    {"name": "value", "symbols": ["number"], "postprocess": ([num]) => (new Numeral(+num))},
    {"name": "value", "symbols": [{"literal":"true"}], "postprocess": () => (new TruthValue(true))},
    {"name": "value", "symbols": [{"literal":"false"}], "postprocess": () => (new TruthValue(false))},
    {"name": "value", "symbols": ["identifier"], "postprocess": ([id]) => (new Variable(id))},
    {"name": "value", "symbols": ["string"], "postprocess": ([id]) => (new TextLiteral(id))},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("hex") ? {type: "hex"} : hex)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": ([id]) => (id.value)},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": ([id]) => (id.value)}
];
export var ParserStart:string = "stmt";
