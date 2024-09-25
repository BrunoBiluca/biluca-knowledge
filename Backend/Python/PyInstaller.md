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