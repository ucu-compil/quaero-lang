@preprocessor typescript

@{%

import {
  Numeral,
  String,
  Int,
  TruthValue,
  Variable,
  Conjunction,
  Disjunction,
  Addition,
  Substraction,
  Negation,
  CompareEqual,
  CompareGreat,
  CompareGreatOrEqual,
  CompareLessOrEqual,
  CompareLess,
  CompareNotEqual,
  Multiplication,
  Division,
  Lista,
  Conjunto,
  Clave,
  IfThen,
  Assignment,
  WhileDo,
  IfThenElse,
  Sequence,
  Opposite,
  Enumeracion,
  ExpCond,
  StatmentExpression,
  Print,
  Mod,
  Div,
  ParseString,
  ParseBoolean,
  ParseInt,
  ParseNumber,
  ConjuntoInterseccion,
  ConjuntoUnion,
  DeclarationFunction,
  Function,
  Return
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';
import { Exp } from '../ast/ASTNode';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


stmt ->
    stmtelse                              {% id %}
  | "if" exp "then" stmt                  {% ([, cond, , thenBody]) => (new IfThen(cond, thenBody)) %}

stmtelse ->
    identifier "=" funcionexp ";"                {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | "while" funcionexp "do" stmt                 {% ([, cond, , body]) => (new WhileDo(cond, body)) %}
  | "if" funcionexp "then" stmtelse "else" stmt  {% ([, cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}
  | "{" stmt:* "}"                        {% ([, statements, ]) => (new Sequence(statements)) %}
  | funcionexp ";"                                {% ([exp, ]) => (new StatmentExpression(exp)) %}
  | "print" "(" funcionexp ")" ";"                  {% ([,,exp,]) => (new Print(exp)) %}
  | "function" identifier "(" variables ")" "{" stmt:* "}"     {% ([,id,,variables,,,statements,]) => (new DeclarationFunction(id,variables,statements)) %}
  | "return" funcionexp ";"                          {% ([,exp,]) => (new Return(exp)) %}

funcionexp ->
   "div" "(" funcionexp ","  funcionexp ")"     {% ([,,a,,b,]) => (new Div(a, b)) %}
  |"mod" "(" funcionexp ","  funcionexp ")"     {% ([,,a,,b,]) => (new Mod(a, b)) %}
  | "string" "(" funcionexp ")"              {% ([,,exp,]) => (new ParseString(exp)) %}
  | "boolean" "(" funcionexp ")"               {% ([,,exp,]) => (new ParseBoolean(exp)) %}
  | "number" "(" funcionexp ")"               {% ([,,exp,]) => (new ParseNumber(exp)) %}
  | "int" "(" funcionexp ")"              {% ([,,exp,]) => (new ParseInt(exp)) %}
  | identifier "(" listaExp ")"              {% ([id,,exp,]) => (new Function(id,exp)) %}
  |exp                                      {% id %}


exp ->
    exp "&&" comp           {% ([lhs, , rhs]) => (new Conjunction(lhs, rhs)) %}
  | exp "||" comp           {% ([lhs, , rhs]) => (new Disjunction(lhs, rhs)) %}
  | exp "if" exp "else" exp {% ([vt , ,b, ,vf]) => (new ExpCond(vt,b,vf)) %}
  | comp                    {% id %}

comp ->
    comp "==" addsub        {% ([lhs, , rhs]) => (new CompareEqual(lhs, rhs)) %}
  | comp "!=" addsub        {% ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs)) %}
  | comp "<=" addsub        {% ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs)) %}
  | comp "<" addsub         {% ([lhs, , rhs]) => (new CompareLess(lhs, rhs)) %}
  | comp ">=" addsub        {% ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs)) %}
  | comp ">" addsub         {% ([lhs, , rhs]) => (new CompareGreat(lhs, rhs)) %}
  | addsub                  {% id %}

addsub ->
    addsub "+" opposite       {% ([lhs, , rhs]) => (new Addition(lhs, rhs)) %}
  | addsub "-" opposite       {% ([lhs, , rhs]) => (new Substraction(lhs, rhs)) %}
  | opposite                  {% id %}

opposite ->
    "-" muldiv              {% ([,op]) => (new Opposite(op)) %}
  | muldiv                  {% id %}

muldiv ->
    muldiv "*" neg          {% ([lhs, , rhs]) => (new Multiplication(lhs, rhs)) %}
  | muldiv "/" neg          {% ([lhs, , rhs]) => (new Division(lhs, rhs)) %}
  | neg                     {% id %}

neg ->
    "!" elemento               {% ([, exp]) => (new Negation(exp)) %}
  | elemento                   {% id %}

elemento -> 
    value                   {% id %}
  | lista                   {% id %}
  | conjunto                {% id %}
  | enumeracion             {% id %}
  | clave                   {% id %}
#| "(" exp ")"             {% ([, exp, ]) => (exp) %} 

# Colecciones
conjunto -> 
    "{" "}"                 {% ([,]) => (new Conjunto()) %} 
  | "{" elementos "}"       {% ([,elementos,]) => (new Conjunto(elementos)) %} 

lista -> 
    "[" number "]"                 {% ([,]) => (new Lista()) %} 
  | "[" elementos "]"              {% ([,elementos,]) => (new Lista(elementos)) %} 

# Enumeración
enumeracion ->
    "[" value ".." value "]"                {% ([,inicio,,fin,]) => (new Enumeracion(inicio, fin)) %} 
  | "[" value "," value ".." value "]"      {% ([,inicio,,salto,,fin,]) => (new Enumeracion(inicio, fin, salto)) %} 

elementos ->
    elemento                  {% ([elemento]) => { const arr: Exp[] = []; arr.push(elemento); return arr; } %} 
  | elementos "," elemento    {% ([elementos, ,elemento]) => {elementos.push(elemento); return elementos;} %} 

#Clave
clave ->
    identifier ":" value        {% ([id,,valor]) => (new Clave(id,valor)) %}
  | string ":" value            {% ([id,,valor]) => (new Clave(id,valor)) %}

value ->
    string                  {% ([string]) => (new String(string)) %}
  | number                  {% ([num]) => (new Numeral(num)) %}
  | "true"                  {% () => (new TruthValue(true)) %}
  | "false"                 {% () => (new TruthValue(false)) %}
  | identifier              {% ([id]) => (new Variable(id)) %}
  | "(" funcionexp ")"      {% ([, funcionexp, ]) => (funcionexp) %} 



variables ->
    identifier                  {% ([identifier]) => { const arr: string[] = []; arr.push(identifier); return arr; } %} 
  | variables "," identifier    {% ([variables, ,identifier]) => {variables.push(identifier); return variables;} %} 

listaExp ->
   funcionexp                  {% ([exp]) => { const arr: Exp[] = []; arr.push(exp); return arr; } %} 
  | listaExp "," funcionexp    {% ([listaExp, ,exp]) => {listaExp.push(exp); return listaExp;} %} 


# Atoms
identifier ->
    %identifier             {% ([id]) => (id.value) %}

string->
    %characters                 {% ([id]) => (id.value) %}

number ->
    %integer                {% ([id]) => (id.value) %}
  | %hex                    {% ([id]) => (id.value) %}
  | %float                  {% ([id]) => (id.value) %}
