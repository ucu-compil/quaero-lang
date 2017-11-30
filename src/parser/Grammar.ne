@preprocessor typescript

@{%

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

%}

@lexer lexer

# Statements

stmt ->
    stmtelse                                {% id %}
  | "if" "(" exp ")" stmt                   {% ([, , cond, , thenBody]) => (new IfThen(cond, thenBody)) %}
  | exp ";"                                 {% ([exp,]) => (new ExpAsStmt(exp)) %}
  | ":" "l" lit                             {% ([,,str]) => (new Load(str)) %}
  | ":" "r"                                 {% ([,,]) => (new Reload()) %}

stmtelse ->
    identifier "=" exp ";"                  {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | identifier "(" lista_id ")" stmt        {% ([name,, ids,, body]) => (new Funcion(name,ids,body)) %}
  | identifier "(" ")" stmt                 {% ([name,,, body]) => (new Funcion(name, new Array<any>() ,body)) %}
  | "{" stmt:* "}"                          {% ([, statements, ]) => (new Sequence(statements)) %}
  | "while" exp "do" stmt                   {% ([, cond, , body]) => (new WhileDo(cond, body)) %}
  | "do" stmt "while" exp                   {% ([, body, , cond]) => (new DoWhile(cond, body)) %}
  | "while" exp "do" stmt "else" stmt       {% ([, cond, , body, , elseBody]) => (new WhileDoElse(cond,body,elseBody)) %}
  | "return" exp ";"                        {% ([, exp,]) => (new Return(exp)) %}
  | "if"  "(" exp ")" stmtelse "else" stmt  {% ([, , cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}
  | "for" "(" exp_list ")" stmt             {% ([,,list,,stmt]) => (new For(list,stmt)) %}

lista_id ->
    identifier                              {% ([id]) => ([id]) %}
  | lista_id "," identifier                 {% ([lista, ,id]) => { lista.concat(id) } %}

# Expressions

exp ->
    identifier "(" exp_list ")"             {% ([name, , ids,]) => (new Call(name,ids)) %}
  | identifier "(" ")"                      {% ([name, ,]) => (new Call(name,new Array<any>())) %}
  | exp "[" condisj "]"                     {% ([str, ,ind, ]) => (new Index(str,ind)) %}
  | "#" exp                                 {% ([, exp]) => (new Cardinality(exp)) %}
  | exp "." identifier                      {% ([list, ,key]) => (new IndKey(list,key)) %}
  | exp "<-" condisj                        {% ([elem, ,list]) => (new Belonging(elem,list)) %}
  | exp "++" condisj                        {% ([lhs, ,rhs]) => (new Concatenation(lhs,rhs)) %}
  | exp "\\/" condisj                       {% ([lhs, ,rhs]) => (new Union(lhs,rhs)) %}
  | exp "/\\" condisj                       {% ([lhs, ,rhs]) => (new Intersection(lhs,rhs)) %}
  | exp "--" condisj                        {% ([lhs, ,rhs]) => (new Difference(lhs,rhs)) %}
  | condisj                                 {% id %}

condisj ->
    exp "&&" comp                           {% ([lhs, , rhs]) => (new Conjunction(lhs, rhs)) %}
  | exp "||" comp                           {% ([lhs, , rhs]) => (new Disjunction(lhs, rhs)) %}
  | comp                                    {% id %}

comp ->
    addsub "==" addsub                      {% ([lhs, , rhs]) => (new CompareEqual(lhs, rhs)) %}
  | addsub "/=" addsub                      {% ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs)) %}
  | addsub "<=" addsub                      {% ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs)) %}
  | addsub "<" addsub                       {% ([lhs, , rhs]) => (new CompareLess(lhs, rhs)) %}
  | addsub ">=" addsub                      {% ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs)) %}
  | addsub ">" addsub                       {% ([lhs, , rhs]) => (new CompareGreat(lhs, rhs)) %}
  | addsub                                  {% id %}

addsub ->
    addsub "+" muldiv                       {% ([lhs, , rhs]) => (new Addition(lhs, rhs)) %}
  | addsub "-" muldiv                       {% ([lhs, , rhs]) => (new Substraction(lhs, rhs)) %}
  | muldiv                                  {% id %}

muldiv ->
    muldiv "*" neg                          {% ([lhs, , rhs]) => (new Multiplication(lhs, rhs)) %}
  | muldiv "/" neg                          {% ([lhs, , rhs]) => (new Division(lhs, rhs)) %}
  | neg                                     {% id %}

neg ->
    "!" value                               {% ([, exp]) => (new Negation(exp)) %}
  | "-" value                               {% ([, exp]) => (new Negative(exp)) %}
  | value                                   {% id %}

value ->
    "(" exp ")"                             {% ([, exp, ]) => (exp) %}
  | "(" exp "if" exp "else" exp ")"         {% ([,exp, ,cond, ,expElse,]) => (new ExpCond(cond, exp, expElse)) %}
  | "null"                                  {% () => (new Null()) %}
  | number                                  {% ([num]) => (new Numeral(+num)) %}
  | "true"                                  {% () => (new TruthValue(true)) %}
  | "false"                                 {% () => (new TruthValue(false)) %}
  | identifier                              {% ([id]) => (new Variable(id)) %}
  | lit                                     {% ([str]) => (new TextLiteral(JSON.parse(str))) %}
  | lists                                   {% id %}

lists ->
    "[" elems "]"                           {% ([, elems,]) => (new List(elems)) %}
  | "{" elems "}"                           {% ([, elems,]) => (new QSet(elems)) %}
  | "[" "]"                                 {% ([,]) => (new List([])) %}
  | "{" "}"                                 {% ([,]) => (new QSet([])) %}
  | "[" exp ".." exp "]"                    {% ([, low, , high,]) => (new Enumeration(false,low,high)) %}
  | "[" exp "," exp ".." exp "]"            {% ([, low, ,step, ,high,]) => (new Enumeration(false,low,high,step)) %}
  | "{" exp ".." exp "}"                    {% ([, low, , high,]) => (new Enumeration(true,low,high)) %}
  | "{" exp "," exp ".." exp "}"            {% ([, low, ,step, ,high,]) => (new Enumeration(true,low,high,step)) %}
  | "[" exp "for" exp_list "]"              {% ([,exp,,list,]) => (new ListComprehension(exp, list)) %}
  | "{" exp "for" exp_list "}"              {% ([,exp,,list,]) => (new ListComprehension(exp, list, true)) %}

exp_list ->
    exp                                     {% ([exp]) => ([exp]) %}
  | exp_list "," exp                        {% ([list,,exp]) => list.concat([exp]) %}

elems ->
    exp                                     {% ([exp]) => ([exp]) %}
  | keyval                                  {% ([kv]) => ([kv]) %}
  | elems "," exp                           {% ([elems, , exp]) => elems.concat([exp]) %}
  | elems "," keyval                        {% ([elems, , kv]) => elems.concat([kv]) %}

keyval ->
    identifier ":" exp                      {% ([id, ,exp]) => (new KeyVal(id,exp)) %}
  | lit ":" exp                             {% ([id, ,exp]) => (new KeyVal(id,exp)) %}

# Atoms

identifier ->
    %identifier                             {% ([id]) => (id.value) %}

number ->
    %integer                                {% ([id]) => (id.value) %}
  | %float                                  {% ([id]) => (id.value) %}
  | %hex                                    {% ([id]) => (id.value) %}
  | %inf                                    {% ([id]) => (id.value) %}
  | %nan                                    {% ([id]) => (id.value) %}

lit ->
   %lit                                     {% ([id]) => (id.value) %}
