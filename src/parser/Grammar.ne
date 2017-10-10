@preprocessor typescript

@{%

import {
  Opuesto
} from '../ast/AST';

import { tokens } from './Tokens';
import { MyLexer } from './Lexer';

const lexer = new MyLexer(tokens);

%}

@lexer lexer


# Sentencias


# Expresiones


# Atoms



