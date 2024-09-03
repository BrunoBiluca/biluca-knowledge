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

# PyInstaller

Podemos empacotar um servidor python para executar como uma programa independente.

- [PyInstaller](https://pyinstaller.org/en/stable/)

### Empacotamento de arquivos

Junto ao código que será empacotado muitas vezes precisamos ter acesso a outros arquivos para o funcionamento do servidor, como arquivos de logs, csvs e outros. Nesses casos precisamos declarar esses arquivos ou pastas para que o processo tenha acesso. Fazemos isso pela linha de comando ou pelo arquivo de configuração criado:

```python
a = Analysis(
    ['src/api.py'],
    pathex=['src'],
    datas=[('./resources/classification_train.csv', './resources')], # classification_train.csv -> resources
    # ... demais configurações
)
pyz = PYZ(a.pure)

# ... demais configurações
```

- `pathex`: define o caminho raiz do pacote. Necessário para definir o contexto e garantir que todos os links não quebrem
- `datas`: define os arquivos de extras carregados no pacote

Porém se apenas fizermos isso não garantimos que estamos acessando o contexto correto do arquivo, já que a hierarquia do pacote é criada da seguinte maneira:

```
- server_win
	- _internal
		- resources
			- classification_train.csv
	- server_win.exe
```

Ou seja, é adicionado uma pasta chamada `_internal` que não utilizamos durante o desenvolvimento. Para contornar esse problema precisamos definir se estamos acessando algo de um pacote ou do próprio código fonte.

Foi definido um módulo python chamado `bundle_resources.py` que será utilizado em todos os pontos do código que irão acessar algum tipo de recurso. 

```python
# bundle_resources.py
import os
import sys


def base_path():
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        print('running in a PyInstaller bundle')
        return os.path.abspath(os.path.dirname(__file__)) + "/"

    print('running in a normal Python process')
    return ""


def open_file(file_name):
    return open(base_path() + file_name, encoding="utf8")


def exists(file_name):
    return os.path.isfile(base_path() + file_name)
```

O caminho base é então definido de acordo com o tipo de processo:
- caso seja um processo do tipo `frozen` sabemos que estamos executando a partir do pacote e então precisamos definir o caminho base como a pasta `_internal`
- caso estejamos executando a partir de um teste ou pelo próprio código fonte o caminho base é o contexto da execução

> [!warning] Cuidado com os caminhos que tomamos
> Esse caso só funciona pois o módulo `bundle_resources.py` é empacotado na raiz do diretório com o código fonte, caso ele seja alterado para outro caminho esse código para de funcionar e deve ser necessário outro tipo de solução.