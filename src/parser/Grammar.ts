// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
function id(d:any[]):any {return d[0];}
declare var identifier:any;
declare var integer:any;
declare var float:any;
declare var hex:any;
declare var inf:any;
declare var nan:any;
declare var lit:any;


import {
  Addition, Assignment, Belonging, Call, Cardinality, CompareEqual,
  CompareGreat, CompareGreatOrEqual, CompareLess, CompareLessOrEqual,
  CompareNotEqual, Concatenation, Conjunction, Difference, Disjunction,
  Division, DoWhile, Enumeration, ExpAsStmt, ExpCond, For, Funcion, IfThen,
  IfThenElse, IndKey, Index, Intersection, KeyVal, List, ListComprehension,
  Load, Multiplication, Negation, Negative, Null, Numeral, QSet, Reload,
  Return, Sequence, Substraction, TextLiteral, TruthValue, Union,
  Variable, WhileDo, WhileDoElse
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
    {"name": "stmt", "symbols": [{"literal":"if"}, {"literal":"("}, "exp", {"literal":")"}, "stmt"], "postprocess": ([, , cond, , thenBody]) => (new IfThen(cond, thenBody))},
    {"name": "stmt", "symbols": ["exp", {"literal":";"}], "postprocess": ([exp,]) => (new ExpAsStmt(exp))},
    {"name": "stmt", "symbols": [{"literal":":"}, {"literal":"l"}, "lit"], "postprocess": ([,,str]) => (new Load(str))},
    {"name": "stmt", "symbols": [{"literal":":"}, {"literal":"r"}], "postprocess": ([,,]) => (new Reload())},
    {"name": "stmtelse", "symbols": ["identifier", {"literal":"="}, "exp", {"literal":";"}], "postprocess": ([id, , exp, ]) => (new Assignment(id, exp))},
    {"name": "stmtelse", "symbols": ["identifier", {"literal":"("}, "lista_id", {"literal":")"}, "stmt"], "postprocess": ([name,, ids,, body]) => (new Funcion(name,ids,body))},
    {"name": "stmtelse", "symbols": ["identifier", {"literal":"("}, {"literal":")"}, "stmt"], "postprocess": ([name,,, body]) => (new Funcion(name, new Array<any>() ,body))},
    {"name": "stmtelse$ebnf$1", "symbols": []},
    {"name": "stmtelse$ebnf$1", "symbols": ["stmtelse$ebnf$1", "stmt"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "stmtelse", "symbols": [{"literal":"{"}, "stmtelse$ebnf$1", {"literal":"}"}], "postprocess": ([, statements, ]) => (new Sequence(statements))},
    {"name": "stmtelse", "symbols": [{"literal":"while"}, "exp", {"literal":"do"}, "stmt"], "postprocess": ([, cond, , body]) => (new WhileDo(cond, body))},
    {"name": "stmtelse", "symbols": [{"literal":"do"}, "stmt", {"literal":"while"}, "exp"], "postprocess": ([, body, , cond]) => (new DoWhile(cond, body))},
    {"name": "stmtelse", "symbols": [{"literal":"while"}, "exp", {"literal":"do"}, "stmt", {"literal":"else"}, "stmt"], "postprocess": ([, cond, , body, , elseBody]) => (new WhileDoElse(cond,body,elseBody))},
    {"name": "stmtelse", "symbols": [{"literal":"return"}, "exp", {"literal":";"}], "postprocess": ([, exp,]) => (new Return(exp))},
    {"name": "stmtelse", "symbols": [{"literal":"if"}, {"literal":"("}, "exp", {"literal":")"}, "stmtelse", {"literal":"else"}, "stmt"], "postprocess": ([, , cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody))},
    {"name": "stmtelse", "symbols": [{"literal":"for"}, {"literal":"("}, "exp_list", {"literal":")"}, "stmt"], "postprocess": ([,,list,,stmt]) => (new For(list,stmt))},
    {"name": "lista_id", "symbols": ["identifier"], "postprocess": ([id]) => ([id])},
    {"name": "lista_id", "symbols": ["lista_id", {"literal":","}, "identifier"], "postprocess": ([lista, ,id]) => { lista.concat(id) }},
    {"name": "exp", "symbols": ["identifier", {"literal":"("}, "exp_list", {"literal":")"}], "postprocess": ([name, , ids,]) => (new Call(name,ids))},
    {"name": "exp", "symbols": ["identifier", {"literal":"("}, {"literal":")"}], "postprocess": ([name, ,]) => (new Call(name,new Array<any>()))},
    {"name": "exp", "symbols": ["exp", {"literal":"["}, "condisj", {"literal":"]"}], "postprocess": ([str, ,ind, ]) => (new Index(str,ind))},
    {"name": "exp", "symbols": [{"literal":"#"}, "exp"], "postprocess": ([, exp]) => (new Cardinality(exp))},
    {"name": "exp", "symbols": ["exp", {"literal":"."}, "identifier"], "postprocess": ([list, ,key]) => (new IndKey(list,key))},
    {"name": "exp", "symbols": ["exp", {"literal":"<-"}, "condisj"], "postprocess": ([elem, ,list]) => (new Belonging(elem,list))},
    {"name": "exp", "symbols": ["exp", {"literal":"++"}, "condisj"], "postprocess": ([lhs, ,rhs]) => (new Concatenation(lhs,rhs))},
    {"name": "exp", "symbols": ["exp", {"literal":"\\/"}, "condisj"], "postprocess": ([lhs, ,rhs]) => (new Union(lhs,rhs))},
    {"name": "exp", "symbols": ["exp", {"literal":"/\\"}, "condisj"], "postprocess": ([lhs, ,rhs]) => (new Intersection(lhs,rhs))},
    {"name": "exp", "symbols": ["exp", {"literal":"--"}, "condisj"], "postprocess": ([lhs, ,rhs]) => (new Difference(lhs,rhs))},
    {"name": "exp", "symbols": ["condisj"], "postprocess": id},
    {"name": "condisj", "symbols": ["exp", {"literal":"&&"}, "comp"], "postprocess": ([lhs, , rhs]) => (new Conjunction(lhs, rhs))},
    {"name": "condisj", "symbols": ["exp", {"literal":"||"}, "comp"], "postprocess": ([lhs, , rhs]) => (new Disjunction(lhs, rhs))},
    {"name": "condisj", "symbols": ["comp"], "postprocess": id},
    {"name": "comp", "symbols": ["addsub", {"literal":"=="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub", {"literal":"/="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub", {"literal":"<="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub", {"literal":"<"}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareLess(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub", {"literal":">="}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub", {"literal":">"}, "addsub"], "postprocess": ([lhs, , rhs]) => (new CompareGreat(lhs, rhs))},
    {"name": "comp", "symbols": ["addsub"], "postprocess": id},
    {"name": "addsub", "symbols": ["addsub", {"literal":"+"}, "muldiv"], "postprocess": ([lhs, , rhs]) => (new Addition(lhs, rhs))},
    {"name": "addsub", "symbols": ["addsub", {"literal":"-"}, "muldiv"], "postprocess": ([lhs, , rhs]) => (new Substraction(lhs, rhs))},
    {"name": "addsub", "symbols": ["muldiv"], "postprocess": id},
    {"name": "muldiv", "symbols": ["muldiv", {"literal":"*"}, "neg"], "postprocess": ([lhs, , rhs]) => (new Multiplication(lhs, rhs))},
    {"name": "muldiv", "symbols": ["muldiv", {"literal":"/"}, "neg"], "postprocess": ([lhs, , rhs]) => (new Division(lhs, rhs))},
    {"name": "muldiv", "symbols": ["neg"], "postprocess": id},
    {"name": "neg", "symbols": [{"literal":"!"}, "value"], "postprocess": ([, exp]) => (new Negation(exp))},
    {"name": "neg", "symbols": [{"literal":"-"}, "value"], "postprocess": ([, exp]) => (new Negative(exp))},
    {"name": "neg", "symbols": ["value"], "postprocess": id},
    {"name": "value", "symbols": [{"literal":"("}, "exp", {"literal":")"}], "postprocess": ([, exp, ]) => (exp)},
    {"name": "value", "symbols": [{"literal":"("}, "exp", {"literal":"if"}, "exp", {"literal":"else"}, "exp", {"literal":")"}], "postprocess": ([,exp, ,cond, ,expElse,]) => (new ExpCond(cond, exp, expElse))},
    {"name": "value", "symbols": [{"literal":"null"}], "postprocess": () => (new Null())},
    {"name": "value", "symbols": ["number"], "postprocess": ([num]) => (new Numeral(+num))},
    {"name": "value", "symbols": [{"literal":"true"}], "postprocess": () => (new TruthValue(true))},
    {"name": "value", "symbols": [{"literal":"false"}], "postprocess": () => (new TruthValue(false))},
    {"name": "value", "symbols": ["identifier"], "postprocess": ([id]) => (new Variable(id))},
    {"name": "value", "symbols": ["lit"], "postprocess": ([str]) => (new TextLiteral(JSON.parse(str)))},
    {"name": "value", "symbols": ["lists"], "postprocess": id},
    {"name": "lists", "symbols": [{"literal":"["}, "elems", {"literal":"]"}], "postprocess": ([, elems,]) => (new List(elems))},
    {"name": "lists", "symbols": [{"literal":"{"}, "elems", {"literal":"}"}], "postprocess": ([, elems,]) => (new QSet(elems))},
    {"name": "lists", "symbols": [{"literal":"["}, {"literal":"]"}], "postprocess": ([,]) => (new List([]))},
    {"name": "lists", "symbols": [{"literal":"{"}, {"literal":"}"}], "postprocess": ([,]) => (new QSet([]))},
    {"name": "lists", "symbols": [{"literal":"["}, "exp", {"literal":".."}, "exp", {"literal":"]"}], "postprocess": ([, low, , high,]) => (new Enumeration(false,low,high))},
    {"name": "lists", "symbols": [{"literal":"["}, "exp", {"literal":","}, "exp", {"literal":".."}, "exp", {"literal":"]"}], "postprocess": ([, low, ,step, ,high,]) => (new Enumeration(false,low,high,step))},
    {"name": "lists", "symbols": [{"literal":"{"}, "exp", {"literal":".."}, "exp", {"literal":"}"}], "postprocess": ([, low, , high,]) => (new Enumeration(true,low,high))},
    {"name": "lists", "symbols": [{"literal":"{"}, "exp", {"literal":","}, "exp", {"literal":".."}, "exp", {"literal":"}"}], "postprocess": ([, low, ,step, ,high,]) => (new Enumeration(true,low,high,step))},
    {"name": "lists", "symbols": [{"literal":"["}, "exp", {"literal":"for"}, "exp_list", {"literal":"]"}], "postprocess": ([,exp,,list,]) => (new ListComprehension(exp, list))},
    {"name": "lists", "symbols": [{"literal":"{"}, "exp", {"literal":"for"}, "exp_list", {"literal":"}"}], "postprocess": ([,exp,,list,]) => (new ListComprehension(exp, list, true))},
    {"name": "exp_list", "symbols": ["exp"], "postprocess": ([exp]) => ([exp])},
    {"name": "exp_list", "symbols": ["exp_list", {"literal":","}, "exp"], "postprocess": ([list,,exp]) => list.concat([exp])},
    {"name": "elems", "symbols": ["exp"], "postprocess": ([exp]) => ([exp])},
    {"name": "elems", "symbols": ["keyval"], "postprocess": ([kv]) => ([kv])},
    {"name": "elems", "symbols": ["elems", {"literal":","}, "exp"], "postprocess": ([elems, , exp]) => elems.concat([exp])},
    {"name": "elems", "symbols": ["elems", {"literal":","}, "keyval"], "postprocess": ([elems, , kv]) => elems.concat([kv])},
    {"name": "keyval", "symbols": ["identifier", {"literal":":"}, "exp"], "postprocess": ([id, ,exp]) => (new KeyVal(id,exp))},
    {"name": "keyval", "symbols": ["lit", {"literal":":"}, "exp"], "postprocess": ([id, ,exp]) => (new KeyVal(id,exp))},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("integer") ? {type: "integer"} : integer)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("hex") ? {type: "hex"} : hex)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("inf") ? {type: "inf"} : inf)], "postprocess": ([id]) => (id.value)},
    {"name": "number", "symbols": [(lexer.has("nan") ? {type: "nan"} : nan)], "postprocess": ([id]) => (id.value)},
    {"name": "lit", "symbols": [(lexer.has("lit") ? {type: "lit"} : lit)], "postprocess": ([id]) => (id.value)}
];
export var ParserStart:string = "stmt";
