# Operações

### Operações de strings

| Method          | Functionality                                                     |
| --------------- | ----------------------------------------------------------------- |
| s.find(t)       | index of first instance of string t inside s (-1 if not found)    |
| s.rfind(t)      | index of last instance of string t inside s (-1 if not found)     |
| s.index(t)      | like s.find(t) except it raises ValueError if not found           |
| s.rindex(t)     | like s.rfind(t) except it raises ValueError if not found          |
| s.join(text)    | combine the words of the text into a string using s as the glue   |
| s.split(t)      | split s into a list wherever a t is found (whitespace by default) |
| s.splitlines()  | split s into a list of strings, one per line                      |
| s.lower()       | a lowercased version of the string s                              |
| s.upper()       | an uppercased version of the string s                             |
| s.title()       | a titlecased version of the string s                              |
| s.strip()       | a copy of s without leading or trailing whitespace                |
| s.replace(t, u) | replace instances of t with u inside s                            |