# Docker no Windows

O Docker no Windows tem algumas limitações em relação a sua versão no Linux, além de algumas funções estarem desabilitadas, algumas configurações devem ser feitas de forma diferente.

#### Compartilhamento da rede Host

Para utilizar a configuração `network-mode: host` no Windows é necessário configurar a seguinte configuração:

![[Configuração para habilitar o modo host de rede no Windows.png| Configuração para habilitar o modo host de rede no Windows|%cheio]]

Sem isso não é possível utilizar esse modo de rede.

#### Docker engine

O Docker engine é o programa responsável por instanciar os containers, esse programa pode ser acessado de várias formas:

- Docker CLI: modo padrão de utilização do Docker engine
- Docker Python SDK: biblioteca disponível em python para executar várias funções do Docker engine
- HTTP API: por requisições

Por padrão o Windows não disponibiliza a interface http do Docker Engine, para isso é necessário habilitar a seguinte configuração.

![[Configuração para habilitar o docker engine no Windows.png|Configuração para expor o docker engine no Windows|%cheio]]
