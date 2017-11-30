export const tokens = {

  // Punctuation
  '.':          '.',
  '/\\':        '/\\',
  '&&':         '&&',
  '||':         '||',
  '(':          '(',
  ')':          ')',
  '{':          '{',
  '}':          '}',
  '[':          '[',
  ']':          ']',  
  '*':          '*',
  '/':          /\/(?!\*)/,
  '+':          '+',
  '-':          '-',
  ':':          ':',
  ';':          ';',
  ',':          ',',
  '..':         '..',
  '<-':         '<-',
  '<=':         '<=',
  '>=':         '>=',
  '<':          '<',
  '>':          '>',
  '!=':         '/=',
  '==':         '==',
  '=':          '=',
  '!':          '!',
  'print':      'print',
  '#':         '#',

  // Keywords
  'do':         'do',
  'while':      'while',
  'if':         'if',
  'then':       'then',
  'else':       'else',
  'true':       'true',
  'false':      'false',
  'int':        'int',
  'string':     'string',
  'boolean':    'boolean',
  'number':      'number',
  'function':    'function',
  'div':          'div',
  'mod':          'mod',
  'return':       'return',

  // Atoms
  float:        { match: /[0-9]+\.[0-9]+(?:[eE][-+]?[0-9]+)?/, value: (x: string) => (parseFloat(x)) },
  hex:          { match: /0[xX][0-9a-f-A-F]+/, value: (x: string) => (parseInt(x,16)) },
  integer:      { match: /[0-9]+/, value: (x: string) => (parseFloat(x)) },
  characters:       { match: /"(?:[^"\\]|\\.)*"/, value: (x: string) => (x.slice(1, -1)) },

  // Identifiers o Variables
  identifier:   /[a-zA-Z_][a-zA-Z0-9_]*/,

  // Ignored tokens
  _comment:     { match: /\/\*.*?\*\//, lineBreaks: true },
  _ws:          { match: /[ \t\r\n\f\v]+/, lineBreaks: true },
};
