@preprocessor typescript

@{%

import {
  QTBool,
  QTInt,
  QTNumeral,
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
  Opposite
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
    identifier "=" exp ";"                {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | "while" exp "do" stmt                 {% ([, cond, , body]) => (new WhileDo(cond, body)) %}
  | "if" exp "then" stmtelse "else" stmt  {% ([, cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}
  | "{" stmt:* "}"                        {% ([, statements, ]) => (new Sequence(statements)) %}
  | exp ";"                               {% ([exp, ]) => (exp) %} 

exp ->
    exp "&&" comp           {% ([lhs, , rhs]) => (new Conjunction(lhs, rhs)) %}
  | exp "||" comp           {% ([lhs, , rhs]) => (new Disjunction(lhs, rhs)) %}
  | comp                    {% id %}

comp ->
    comp "==" addsub        {% ([lhs, , rhs]) => (new CompareEqual(lhs, rhs)) %}
  | comp "!=" addsub        {% ([lhs, , rhs]) => (new CompareNotEqual(lhs, rhs)) %}
  | comp "<=" addsub        {% ([lhs, , rhs]) => (new CompareLessOrEqual(lhs, rhs)) %}
  | comp "<" addsub         {% ([lhs, , rhs]) => (new CompareLess(lhs, rhs)) %}
  | comp ">=" addsub        {% ([lhs, , rhs]) => (new CompareGreatOrEqual(lhs, rhs)) %}
  | comp ">" addsub         {% ([lhs, , rhs]) => (new CompareGreat(lhs, rhs)) %}
  | addsub

addsub ->
    addsub "+" muldiv       {% ([lhs, , rhs]) => (new Addition(lhs, rhs)) %}
  | addsub "-" muldiv       {% ([lhs, , rhs]) => (new Substraction(lhs, rhs)) %}
  | muldiv                  {% id %}

opposite ->
    "-" muldiv              {% ([,op]) => (new Opposite(op)) %}
    |muldiv                 {% id %}

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
  | clave                   {% id %}
  | "(" exp ")"             {% ([, exp, ]) => (exp) %} 

# Colecciones
conjunto -> 
    "{" "}"                {% ([,]) => (new Conjunto()) %} 
  | "{" elementos "}"       {% ([,elementos,]) => (new Conjunto(elementos)) %} 

lista -> 
    "[" "]"                 {% ([,]) => (new Lista()) %} 
  | "[" elementos "]"       {% ([,elementos,]) => (new Lista(elementos)) %} 

elementos->
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


# Atoms
identifier ->
    %identifier             {% ([id]) => (id.value) %}

string->
    %string                 {% ([id]) => (id.value) %}

number ->
    %integer                {% ([id]) => (id.value) %}
  | %hex                    {% ([id]) => (id.value) %}
  | %float                  {% ([id]) => (id.value) %}
