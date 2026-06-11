
### Operadores básicos

| Operator   | Behavior                                                                        |
| ---------- | ------------------------------------------------------------------------------- |
| .          | Wildcard, matches any character                                                 |
| `^abc`     | Matches some pattern abc at the start of a string                               |
| abc$       | Matches some pattern abc at the end of a string                                 |
| [abc]      | Matches one of a set of characters                                              |
| [A-Z0-9]   | Matches one of a range of characters                                            |
| ed\|ing\|s | Encontra uma das strings especificadas (disjunção)                              |
| *          | Zero or more of previous item, e.g. a*, [a-z]* (also known as _Kleene Closure_) |
| +          | One or more of previous item, e.g. a+, [a-z]+                                   |
| ?          | Zero or one of the previous item (i.e. optional), e.g. a?, [a-z]?               |
| {n}        | Exactly n repeats where n is a non-negative integer                             |
| {n,}       | Ao mesmo `n` repetições                                                         |
| {,n}       | Não mais que `n` repetições                                                     |
| {m,n}      | At least m and no more than n repeats                                           |
| a(b\|c)+   | Parentheses that indicate the scope of the operators                            |

### Símbolos

| Symbol | Function                                                     |
| ------ | ------------------------------------------------------------ |
| \b     | Word boundary (zero width)                                   |
| \d     | Any decimal digit (equivalent to [0-9])                      |
| \D     | Any non-digit character (equivalent to [^0-9])               |
| \s     | Any whitespace character (equivalent to [ \t\n\r\f\v])       |
| \S     | Any non-whitespace character (equivalent to [^ \t\n\r\f\v])  |
| \w     | Any alphanumeric character (equivalent to [a-zA-Z0-9_])      |
| \W     | Any non-alphanumeric character (equivalent to [^a-zA-Z0-9_]) |
| \t     | The tab character                                            |
| \n     | The newline character                                        |