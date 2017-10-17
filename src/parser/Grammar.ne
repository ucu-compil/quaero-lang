@preprocessor typescript

@{%

import {
  QTBool,
  QTInt,
  QTNumeral,
  Numeral,
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
  Division
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer

# Colecciones
conjunto -> 
"{"  "}"  
|"{" elementos "}"

lista -> 
"["  "]"
|"[" elementos "]"

elementos->
elemento
|elementos "," elemento

elemento -> 
identifier              {% ([id]) => (new Variable(id)) %}
|" string "             {% ([string]) => (new String(string)) %}
|lista                  {% id %}
|conjunto               {% id %}
|clave

clave ->
identifier ":" 
|string ":" 


# Expressions

<<<<<<< HEAD
=======
# Expresiones



>>>>>>> 27c9b2319ee65334538a8aac8bcc8d3794e92a54
exp ->
    exp "&&" comp           {% ([lhs, , rhs]) => (new Conjunction(lhs, rhs)) %}
  | exp "||" comp           {% ([lhs, , rhs]) => (new Disjunction(lhs, rhs)) %}
  | exp "where" stmtelse  {% ([exp, ,stmtelse]) => (new Where(exp, stmtelse)) %}
  | comp                    {% id %}

<<<<<<< HEAD


=======
>>>>>>> 27c9b2319ee65334538a8aac8bcc8d3794e92a54
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

muldiv ->
    muldiv "*" neg          {% ([lhs, , rhs]) => (new Multiplication(lhs, rhs)) %}
<<<<<<< HEAD
  | muldiv "/" neg          {% ([lhs, , rhs]) => (new Division(lhs, r'phs)) %}
=======
  | muldiv "/" neg          {% ([lhs, , rhs]) => (new Division(lhs, rhs)) %}
>>>>>>> 27c9b2319ee65334538a8aac8bcc8d3794e92a54
  | neg                     {% id %}

neg ->
    "!" value               {% ([, exp]) => (new Negation(exp)) %}
  | value                   {% id %}

value ->
    "comillas" string "comillas"                  {% ([string]) => (new String(string)) %}
  | number                  {% ([num]) => (new Numeral(num)) %}
  | "true"                  {% () => (new TruthValue(true)) %}
  | "false"                 {% () => (new TruthValue(false)) %}
  | identifier              {% ([id]) => (new Variable(id)) %}


# Atoms

identifier ->
    %identifier             {% ([id]) => (id.value) %}

string->
  %string                   {% ([id]) => (id.value) %}
number ->
    %integer                {% ([id]) => (id.value) %}
  | %hex                    {% ([id]) => (id.value) %}
  | %float                  {% ([id]) => (id.value) %}
