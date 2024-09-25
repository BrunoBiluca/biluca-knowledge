---
tags:
  - Linguagens
---
# Python

Para fazer agruparmos os arquivos de um sistema python e gerar um executável podemos utilizar o [[PyInstaller]].

# Herança múltipla

Herança múltipla é um mecanismo fornecido por linguagens de programação que visa a reusabilidade de código, já que classes compartilham implementações e podem passar por meio da herança.

Por mais que parece um recurso útil ele várias vezes é tratado como uma prática ruim, já que pode deixar o código mais complexo, já que o desenvolvedor passa a ter que gerenciar as heranças das classes para garantir que conflitos não aconteçam entre suas implementações.

Python utiliza o MRO para definir a ordem de declaração das classes. 

```python
class A:
    num = 10
class B(A):
    pass
class C(A):
    num = 1
class D(B,C):
    pass

print(D.mro())
# [<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]
```

### Mixins

Como herança múltipla é uma prática considerada ruim por adicionar complexidade ao código foi desenvolvido um conceito que se utiliza da herança múltipla, porém define alguns comportamentos que garantem que essa complexidade adicional não extrapole e se torne um problema.

> [!info] o que é?
> Mixins é uma classe que contém métodos para uso por outras classes sem ter que ser a classe pai dessas classes.
> 
> Mixins podem ser descritos como classes de inclusão em vez de herdadas. Assim Mixins não definem o tipo daquelas classes que a incluem.

> [!warning] Diferenças entre Mixins e Herança múltipla
> - Mixins são criados para prover comportamentos específicos, devem ser pequenas e retristos
> - Mixins são criados para serem combinados e sem intensão de serem extendidos
> - Mixins podem prover recursos opcionais a uma classe (Herança múltipla garante que todo o comportamento é obrigatório)

Pegando por exemplo o sistema de requisições e respostas do werkzeug, podemos utilizar tanto herança quando Mixins.

```python
from werkzeug import BaseRequest

class Request(BaseRequest):
    pass
```

Se quisermos adicionar suporte a cabeçalhos:

```python
from werkzeug import BaseRequest, AcceptMixin

class Request(AcceptMixin, BaseRequest):
    pass
```

Também é possível adicionar suporte a outros tipos de recursos, como autenticação, etags, suporte ao user agent apenas adicionando outros Mixins:

```python
from werkzeug import BaseRequest, AcceptMixin, ETagRequestMixin, UserAgentMixin, AuthenticationMixin

class Request(AcceptMixin, ETagRequestMixin, UserAgentMixin, AuthenticationMixin, BaseRequest):
    pass
```

A diferença entre Mixins e herança múltipla é sutíl e semântica, porém sabendo dessa diferença podemos deduzir algumas práticas que devemos levar em consideração.

# Python wheel

> [!info] O que é:
> Python wheel é um formato de distribuição binário de pacotes em Python.
> 
> - [Página do padrão](https://pythonwheels.com/)


# Modos de abertura de arquivos

```python
‘r’      # leitura
‘r+’     # leitura e escrita
‘w’      # escrita
‘w+’     # escrita e leitura
‘a’      # apêndices apenas
‘rb’     # leitura em arquivo binário
‘wb’     # escrita em arquivo binário
```

# Formatação espacial de strings

A formatação espacial de strings pode ser utilizado em vários aspectos como prints e como writelines de arquivos em texto.

```python
self.nova_linha(f"{'Informação':<25}{'Minerado':>10}{'Sucesso':>10}")
for i in info_mineradas:
	self.nova_linha(f"{f'{i[0]}:':<25}{f'{i[1]}%':>10}{f'{i[2]}%':>10}")
```

Tipos de alinhamento
- `<`   :    alinhamento à esquerda
- `^`   :    alinhamento ao centro
- `>`   :    alinhamento à direita

O número após o tipo de alinhamento determina a quantidade de espaços serão utilizados para esse campo.

# Comparadores

### Comparadores de palavras

| Função          | Descrição                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------ |
| s.startswith(t) | test if s starts with t                                                                          |
| s.endswith(t)   | test if s ends with t                                                                            |
| t in s          | test if t is a substring of s                                                                    |
| s.islower()     | test if s contains cased characters and all are lowercase                                        |
| s.isupper()     | test if s contains cased characters and all are uppercase                                        |
| s.isalpha()     | test if s is non-empty and all characters in s are alphabetic                                    |
| s.isalnum()     | test if s is non-empty and all characters in s are alphanumeric                                  |
| s.isdigit()     | test if s is non-empty and all characters in s are digits                                        |
| s.istitle()     | test if s contains cased characters and is titlecased (i.e. all words in s have initial capitals |

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