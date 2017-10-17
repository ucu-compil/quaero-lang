@preprocessor typescript

@{%

import {
  QTBool,
  QTInt,
  QTNumeral,
  Numeral,
  Int,
  TruthValue,
  Variable
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


# Sentencias


# Expresiones
value ->
    "(" exp ")"             {% ([, exp, ]) => (exp) %}
  | number                  {% ([num]) => (new Numeral(num)) %}
  | "true"                  {% () => (new TruthValue(true)) %}
  | "false"                 {% () => (new TruthValue(false)) %}
  | identifier              {% ([id]) => (new Variable(id)) %}
  | int                     {% ([int]) => (new Int(int)) %}


type ->
   "int"                    {% () => (QTInt.Instance)%}
 | "boolean"                {% () => (QTBool.Instance)%}
 | "num"                    {% () => (QTNumeral.Instance)%}


# Atoms

identifier ->
    %identifier             {% ([id]) => (id.value) %}

number ->
  %hex                    {% ([id]) => (id.value) %}
  | %float                  {% ([id]) => (id.value) %}

  int ->
    %integer                {% ([id]) => (id.value) %}
