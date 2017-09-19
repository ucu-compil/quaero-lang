@preprocessor typescript

@{%

import {
  Null,
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
  Call,
  Return,
  Print,
  Div,
  Mod,
  String,
  Boolean,
  Number,
  Int,
  List,
  KeyVal,
  QSet,
  Cardinality,
  Belonging,
  Concatenation,
  Union
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer

# Statements

stmt ->
    stmtelse                              {% id %}
  | "if" "(" exp ")" stmt                 {% ([, , cond, , thenBody]) => (new IfThen(cond, thenBody)) %}

stmtelse ->
    identifier "=" exp ";"                {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | identifier "(" lista_id ")" stmt      {% ([name, , ids, , body]) => (new Funcion(name,ids,body)) %}
  | "{" stmt:* "}"                        {% ([, statements, ]) => (new Sequence(statements)) %}
  | "while" exp "do" stmt                 {% ([, cond, , body]) => (new WhileDo(cond, body)) %}
  | "do" stmt "while" exp                 {% ([, body, , cond]) => (new DoWhile(cond, body)) %}
  | "while" exp "do" stmt "else" stmt     {% ([, cond, , body, , elseBody]) => (new WhileDoElse(cond,body,elseBody)) %}
  | "return" exp ";"                      {% ([, exp,]) => (new Return(exp)) %}
  | "print" "(" exp ")" ";"               {% ([, , exp, ,]) => (new Print(exp)) %}
  | "if"  "(" exp ")" stmtelse "else" stmt  {% ([, , cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}

lista_id ->
    identifier                            {% ([id]) => ([id]) %}
  | lista_id "," identifier               {% ([lista, ,id]) => { lista.push(id); return lista; } %}

# Expressions

exp ->
    exp "if" exp "else" exp                  {% ([exp, ,cond, ,expElse]) => (new ExpCond(cond, exp, expElse)) %}
  | identifier "(" lista_params ")"          {% ([name, , ids,]) => (new Call(name,ids)) %}
  | exp "[" exp "]"                          {% ([str, ,ind, ]) => (new Index(str,ind)) %}
  | "#" exp                                  {% ([, exp]) => (new Cardinality(exp)) %}
  | exp "." exp                              {% ([list, ,ind]) => (new Index(list,ind)) %}
  | exp "<-" exp                             {% ([elem, ,list]) => (new Belonging(elem,list)) %}
  | exp "++" exp                             {% ([lhs, ,rhs]) => (new Concatenation(lhs,rhs)) %}
  | exp "\\/" exp                            {% ([lhs, ,rhs]) => (new Union(lhs,rhs)) %}
  | condisj                                  {% id %}

lista_params ->
    exp                                      {% ([exp]) => ([exp]) %}
  | lista_params "," exp                     {% ([lista, ,exp]) => { lista.push(exp); return lista; } %}

condisj ->
    exp "&&" comp           {% ([lhs, , rhs]) => (new Conjunction(lhs, rhs)) %}
  | exp "||" comp           {% ([lhs, , rhs]) => (new Disjunction(lhs, rhs)) %}
  | comp                    {% id %}

comp ->
    comp "==" addsub        {% ([lhs, , rhs]) => (new CompareEqual(lhs, rhs)) %}
  | comp "/=" addsub        {% ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs)) %}
  | comp "<=" addsub        {% ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs)) %}
  | comp "<" addsub         {% ([lhs, , rhs]) => (new CompareLess(lhs, rhs)) %}
  | comp ">=" addsub        {% ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs)) %}
  | comp ">" addsub         {% ([lhs, , rhs]) => (new CompareGreat(lhs, rhs)) %}
  | addsub                  {% id %}

addsub ->
    addsub "+" muldiv       {% ([lhs, , rhs]) => (new Addition(lhs, rhs)) %}
  | addsub "-" muldiv       {% ([lhs, , rhs]) => (new Substraction(lhs, rhs)) %}
  | muldiv                  {% id %}

muldiv ->
    muldiv "*" neg          {% ([lhs, , rhs]) => (new Multiplication(lhs, rhs)) %}
  | muldiv "/" neg          {% ([lhs, , rhs]) => (new Division(lhs, rhs)) %}
  | neg                     {% id %}

neg ->
    "!" value               {% ([, exp]) => (new Negation(exp)) %}
  | value                   {% id %}

value ->
    "(" exp ")"                 {% ([, exp, ]) => (exp) %}
  | "null"                      {% () => (new Null()) %}
  | number                      {% ([num]) => (new Numeral(+num)) %}
  | "true"                      {% () => (new TruthValue(true)) %}
  | "false"                     {% () => (new TruthValue(false)) %}
  | identifier                  {% ([id]) => (new Variable(id)) %}
  | str                         {% ([id]) => (new TextLiteral(id)) %}
  | "div" "(" exp "," exp ")"   {% ([, ,lhs, , rhs,]) => (new Div(lhs,rhs)) %}
  | "mod" "(" exp "," exp ")"   {% ([, ,lhs, , rhs,]) => (new Mod(lhs,rhs)) %}
  | "length" "(" exp ")"        {% ([, , exp, ]) => (new Length(exp)) %}
  | "string" "(" exp ")"        {% ([, , exp,]) => (new String(exp)) %}
  | "boolean" "(" exp ")"       {% ([, , exp,]) => (new Boolean(exp)) %}
  | "number" "(" exp ")"        {% ([, , exp,]) => (new Number(exp)) %}
  | "int" "(" exp ")"           {% ([, , exp,]) => (new Int(exp)) %}
  | lists                        {% id %}

lists ->
    "[" elems "]"               {% ([, elems,]) => (new List(elems)) %}
  | "{" elems "}"               {% ([, elems,]) => (new QSet(elems)) %}

elems ->
    exp                         {% ([exp]) => ([exp]) %}
  | keyval                      {% ([kv]) => ([kv]) %}
  | elems "," exp               {% ([elems, , exp]) => { elems.push(exp); return elems; } %}
  | elems "," keyval            {% ([elems, , kv]) => { elems.push(kv); return elems; } %}

keyval ->
    identifier ":" exp          {% ([id, ,exp]) => (new KeyVal(id,exp)) %}
  | str ":" exp                 {% ([id, ,exp]) => (new KeyVal(id,exp)) %}

# Atoms

identifier ->
    %identifier             {% ([id]) => (id.value) %}

number ->
    %integer                {% ([id]) => (id.value) %}
  | %float                  {% ([id]) => (id.value) %}
  | %hex                    {% ([id]) => (id.value) %}

str ->
   %str                     {% ([id]) => (id.value) %}
