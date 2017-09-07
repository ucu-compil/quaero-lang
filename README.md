# Proyecto de curso

Planteo de proyecto final para el curso de Compiladores 2017 (Ing. en Informática, FIT, UCU). Se trata de la implementación de un lenguaje imperativo para manejo de datos llamado _Quaero_.

# Lenguaje

El lenguaje Quaero es un lenguaje imperativo simple, cuya intención es el manejo de datos de diferentes fuentes. Su sintaxis está inspirada en lenguajes como Java, JavaScript y Haskell.

Un programa Quaero se compone de una secuencia de definiciones de funciones y un cuerpo principal. Las construcciones se dividen en sentencias y expresiones.

## Expresiones

Las expresiones manejan los siguientes casos base:

+ Constantes de verdad o _booleanas_: `true` y `false`.

+ Numerales (con una sintaxis similar a Java): enteros en base diez (`123`), enteros en base hexadecimal (`0xC4f3`), punto flotante (`0.51`), punto flotante en notación científica (`1e-4`, 0.5E-11) y dos constantes `Infinity` y `NaN`. No se soporta la base octal, ergo el numeral `010` tiene el valor 10 y no 8.

+ Literales de tipo _string_: misma sintaxis que Java entre comillas dobles (`""`, `"¡hola mundo!"`, `"\u00a1\"hola\tmundo!\""`).

+ Valor nulo: `null`.

+ Variables, cuyos identificadores comienzan con un infraguión o letra (minúscula o mayúscula) y siguen con cero o más de estos o dígitos numéricos. Por ejemplo: `x`, `x1`, `x1Y2`, `X1_y2`, `_1_`, etc.

El lenguaje maneja dos tipos de _colecciones_: _listas_ de elementos con un orden definido, y _conjuntos_ de elementos sin orden definido. Los elementos de ambos tipos de colecciones pueden tener _claves_ de tipo _string_ asociadas. No todos los elementos tienen que tener clave. Un elemento puede tener más de una clave, pero una clave no puede estar asociada a más de un elemento. Los elementos pueden ser de cualquier tipo, incluyendo colecciones.

Las listas van encerradas entre paréntesis rectos, mientras que los conjuntos van entre llaves. Cuando se definen por extensión, los elementos se enumeran separados por comas. Los elementos con claves asociadas se escriben como pares `clave : valor`. Si la clave cumple con la sintaxis para los identificadores, se puede escribir como tal, sino se utiliza la sintaxis de literal string. Por ejemplo `[]`, `[1, 2, 3]`, `[x:1, y:2, z:3]`, `[1, "!":2, _:3]`, `{}`, `{1, 2, 3}`, `{x:1, y:2, z:3}`, `{1, "y":2, 3}`.

Las operaciones disponibles son:

+ Operaciones aritméticas: opuesto `-x`, suma `(1 + 2.3)`, resta `(2 - 1)`, producto `(x * 2)`, división `(1 / p)`.

Las operaciones aritméticas son exclusivamente entre números.

+ Comparaciones: igual `(x == y)`, distinto `(x /= y)`, menor `(x < y)`, mayor `(x > y)`, menor o igual `(x <= y)`, mayor o igual `(x >= y)`.

Las comparaciones aplican a todos los tipos. Para booleanos `true` se considera mayor que `false`. Todas las comparaciones de un número con `NaN` deben dar `false`. Las listas son iguales si tienen los mismos elementos en el mismo orden. Las listas se comparan por orden lexicográfico. Los strings se comparan de la misma forma que las listas. Para conjuntos `s < S` se entiende como _s incluído en S_, y `S > s` como _s incluye a S_.

+ Operaciones booleanas: negación `!b`, conjunción `p && q`, disyunción `p || q`.

Las operaciones booleanas son exclusivamente entre valores de verdad.

+ Operaciones de conjuntos y listas: cardinalidad `#xs`, pertenencia `x <- xs`, indización `xs[i]`, indización abreviada con clave identificador `xs.k`, concatenación `xs ++ ys`, `unión` `xs \/ ys`, intersección `xs /\ ys`, diferencia `xs -- ys`.

La indización se puede usar con el valor string de una clave para ambos conjuntos y listas. Indizar con un número entero solo se puede hacer con listas. Las operaciones de conjuntos (unión, intersección y diferencia) pueden aplicarse a listas y generan listas. Las operaciones de listas pueden aplicarse a strings, y éstas se tratan como listas de strings de largo 1, uno por caracter.

+ Enumeraciones: `[0..10]` es equivalente a `[0,1,2,3,4,5,6,7,8,9,10]`, `[0,2..10]` es equivalente a `[0,2,4,6,8,10]`, `[0,3..10]` es equivalente a `[0,3,6,9]`, `[10,7..0]` es equivalente a `[10,7,4,1]`, `[0,0.31..1]` es equivalente a `[0,0.31,0.62,0.93]`.

Las enumeraciones calculan listas de números, dado un inicio, un fin y opcionalmente un segundo valor (por defecto _inicio + 1_). Las enumeraciones pueden usarse para construir conjuntos, poniéndose entre llaves.

+ Expresión condicional: `(vt if b else vf)`.

+ Conjuntos o listas por comprensión: `[x * 2 for x <- {0..3}]`, `{x * y for x <- [1..3], y <- [1..3], x <= y}`.

Las expresiones de conjuntos o listas por comprensión utilizan las condiciones de pertenencia `x <- xs` con variables no ligadas para definir las recorridas de otros conjuntos o listas. Otras condiciones se utilizan como filtros.

+ Llamadas a funciones: `join([0..10], ",")`, `signum(x - y)`.

## Sentencias

Las sentencias tienen los siguientes casos:

+ Asignaciones: `x = e;`.

Las variables no se declaran, y pasan a existir cuando se asignan. Las asignaciones _no_ pueden estar en expresiones como sucede en Java o Javascript.

+ Condicional: `if (x > 0) y = x; else y = -x;`, `if (x < 0) x = -x;`.

A diferencia de la expresión condicional, en la sentencia condicional puede omitirse el `else`.

+ Bucles: `for (x <- xs) y = y * x;`, `for (x <- [1..3], y <- [1..3], x <= y) z = z + x * y;`.

Los bucles `for` tienen un comportamiento muy similar a las listas por comprensión.

+ Secuencias y bloques: `{ x = 1; y = x + 1; }`.

Dos sentencias en secuencia se ejecutan en orden. Para agruparlas como cuerpos de condicionales o bucles se ponen entre llaves. El cuerpo principal de programa es un bloque.

+ Expresiones como sentencias: `print(x);`, `1 + x;`.

Se permite embeber expresiones a nivel de sentencias para poder llamar a funciones descartando el resultado.

## Funciones

Las funciones deben declararse antes del cuerpo principal del programa. Pueden definirse de la siguiente manera:

```
function potencia(b, e) {
	r = 1;
	for (_ <- [1..e])
		r = r * b;
	return r;
}
```

Las funciones que deben estar predefinidas en el entorno de ejecución son:

+ `print`: Toma un valor y lo imprime por pantalla:

+ `div` y `mod`: División entera y resto de la división entera.

+ `string`: Convierte un valor dado a texto.

+ `int`: Convierte un valor dado a número entero (truncando a la parte entera de ser necesario).

+ `number`: Convierte un valor dado a número.

+ `boolean`: Convierte a un valor de verdad. Los valores `0`, `null`, `""`, `[]` y `{}` se entienden como `false`. Todo lo demás es `true`.

# Implementación

La implementación de Quaero a realizar incluye un intérprete que toma código fuente en forma de texto y lo ejecuta. El intérprete debe programarse en [TypeScript](https://www.typescriptlang.org/), usando las herramientas vistas en el curso: [Gulp](https://gulpjs.com), [Nearley](https://nearley.js.org/) y [Moo](https://github.com/no-context/moo).

El intérprete debe poder correr en modo [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) y en modo batch tomando el código fuente de un archivo o de la entrada estándar. Los fuentes deben tener la extensión `.qr`.
