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
  Clave
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';
import { Exp } from '../ast/ASTNode';

const lexer = new MyLexer(tokens);

%}

@lexer lexer

inicial ->
    conjunto      {% id %}
  | lista         {% id %}

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

elemento -> 
    value                   {% id %}
  | lista                   {% id %}
  | conjunto                {% id %}
  | clave                   {% id %}

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
