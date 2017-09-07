export const tokens = {

  // Punctuation
  '..':         '..',
  '.':          '.',
  '&&':         '&&',
  '||':         '||',
  '(':          '(',
  ')':          ')',
  '{':          '{',
  '}':          '}',
  '*':          '*',
  '/\\':        '/\\',
  '\\/':        '\\/',
  '/=':         '/=',
  '/':          /\/(?!\*)/,
  '++':         '++',
  '+':          '+',
  '--':         '--',
  '-':          '-',
  ';':          ';',
  '<-':         '<-',
  '<=':         '<=',
  '>=':         '>=',
  '<':          '<',
  '>':          '>',
  '==':         '==',
  '=':          '=',
  '!':          '!',
  '[':          '[',
  ']':          ']',
  '#':          '#',

  // Keywords
  'if':         'if',
  'else':       'else',
  'true':       'true',
  'false':      'false',
  'print':      'print',
  'div':        'div',
  'mod':        'mod',
  'string':     'string',
  'number':     'number',
  'boolean':    'boolean',

  // Atoms
  inf:          { match: /Infinity/, value:(x: string) => (parseInt(x)) },
  nan:          { match: /NaN/, value:(x: string) => (parseInt(x)) },
  float:        { match: /[0-9]+\.[0-9]+(?:[eE][-+]?[0-9]+)?/, value: (x: string) => (parseFloat(x)) },
  hex:          { match: /0[xX][0-9a-f-A-F]+/, value: (x: string) => (parseInt(x,16)) },
  integer:      { match: /[0-9]+/, value: (x: string) => (parseFloat(x)) },
  str:       { match: /"[^"\n]*?"/, value: (x: string) => (JSON.parse(x)) }, //hay que cambiarlo

  // Identifiers
  identifier:   /[a-zA-Z_][a-zA-Z0-9_]*/,

  // Ignored tokens
  _comment:     { match: /\/\*.*?\*\//, lineBreaks: true },
  _ws:          { match: /[ \t\r\n\f\v]+/, lineBreaks: true },
};
