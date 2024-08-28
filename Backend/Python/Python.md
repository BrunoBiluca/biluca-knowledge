---
tags:
  - Linguagens
---
# Python

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

# Empacotamento

Podemos empacotar um servidor python para executar como uma programa independente.

- [PyInstaller](https://pyinstaller.org/en/stable/)

