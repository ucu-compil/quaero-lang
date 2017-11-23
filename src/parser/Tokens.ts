export const tokens = {

  // Punctuation
  ':':          ':',
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
  '+':          /\+(?!\+)/,
  '++':         '++',
  '-':          /-(?!-)/,
  '--':         '--',
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
  ',':          ',',


  // Keywords
  'if':         'if',
  'else':       'else',
  'true':       'true',
  'false':      'false',
  'return':     'return',
  'null':       'null',

  // Atoms
  inf:          { match: /Infinity/, value:(x: string) => (parseInt(x)) },
  nan:          { match: /NaN/, value:(x: string) => (parseInt(x)) },
  float:        { match: /[0-9]+\.[0-9]+(?:[eE][-+]?[0-9]+)?/, value: (x: string) => (parseFloat(x)) },
  hex:          { match: /0[xX][0-9a-f-A-F]+/, value: (x: string) => (parseInt(x,16)) },
  integer:      { match: /[0-9]+/, value: (x: string) => (parseFloat(x)) },
  lit:          { match:/"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,value: (x: string) => (x) },

  // Identifiers
  identifier:   /[a-zA-Z_][a-zA-Z0-9_]*/,

  // Ignored tokens
  _comment:     { match: /\/\*.*?\*\//, lineBreaks: true },
  _ws:          { match: /[ \t\r\n\f\v]+/, lineBreaks: true },
};
