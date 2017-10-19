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
  Division,
  Declaration,
  DeclarationAssignment,
  IfThen,
  IfThenElse,
  Assignment,
  Sequence,
  WhileDo
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


# Colecciones
conjunto -> 
"{"  "}"                {% ([,]) => (new Conjunto([])) %} 
|"{" elementos "}"      {% ([,]) => (new Conjunto(elementos)) %} 

lista -> 
<<<<<<< HEAD
"["  "]"                {% ([,]) => (new Lista([])) %} 
|"[" elementos "]"      {% ([,]) => (new Lista(elementos)) %} 
=======
"["  "]"                {% ([,]) => (new Lista()) %}
|"[" elementos "]"      {% ([,elementos,]) => (new Lista(elementos)) %}
>>>>>>> 2ebc3115d5ec3aae2127adbde2489d3ab58fcdc0

elementos->
elemento                 {% ([elemento]) => [elemento] %} 
|elementos "," elemento  {% ([elementos, ,elemento]) => elementos.push(elemento) %} //tiene que retornar elementos

elemento -> 
value                   {% id %}
|lista                  {% id %}
|conjunto               {% id %}
|clave                  {% id %}


clave ->
identifier ":" value        {% ([id,,valor]) => (new Clave(id,valor)) %}
|string ":" value           {% ([id,,valor]) => (new Clave(id,valor)) %}

value ->
  string                    {% ([string]) => (new String(string)) %}
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
