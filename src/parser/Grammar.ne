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


# Sentencias

stmt ->
    stmtelse                              {% id %}
  | "if" exp "then" stmt                  {% ([, cond, , thenBody]) => (new IfThen(cond, thenBody)) %}

stmtelse ->
    type identifier ";"                   {% ([type, identifier, ]) => (new Declaration(type, identifier)) %}
  | type identifier "=" exp ";"           {% ([type, identifier, , exp, ]) => (new DeclarationAssignment(type, identifier, exp)) %}
  | identifier "=" exp ";"                {% ([id, , exp, ]) => (new Assignment(id, exp)) %}
  | "{" stmt:* "}"                        {% ([, statements, ]) => (new Sequence(statements)) %}
  | "while" exp "do" stmt                 {% ([, cond, , body]) => (new WhileDo(cond, body)) %}
  | "if" exp "then" stmtelse "else" stmt  {% ([, cond, , thenBody, , elseBody]) => (new IfThenElse(cond, thenBody, elseBody)) %}


# Expresiones



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

muldiv ->
    muldiv "*" neg          {% ([lhs, , rhs]) => (new Multiplication(lhs, rhs)) %}
  | muldiv "/" neg          {% ([lhs, , rhs]) => (new Division(lhs, rhs)) %}
  | neg                     {% id %}

neg ->
    "!" value               {% ([, exp]) => (new Negation(exp)) %}
  | value                   {% id %}

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
