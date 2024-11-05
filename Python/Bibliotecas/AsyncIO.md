---
tags:
  - python
  - asynchronous_programming
categoria: biblioteca
---
Asyncio refere-se à programação assíncrona com corrotinas em Python.

Envolve mudanças na linguagem de programação Python para suportar corrotinas, com novos tipos e expressões como `async def`, `async with`, `async for` e `await`.

Motivos para utilizar `asyncio`.
1. Use `asyncio` para adotar corrotinas em seu programa.
    1. Use corrotinas (gerenciadas pelo interpretador do python) como alternativa a threads e processos (gerenciadas pelo OS)
	    1. Corrotinas são utilizadas já que é possível ter mais corrotinas do que threads.
    2. Obtenha a escalabilidade oferecida pelas corrotinas em comparação aos threads.
2. Use `asyncio` para usar o paradigma de programação assíncrona.
3. Use `asyncio` para usar E/S sem bloqueio.

Mesmo assim o módulo `asyncio` não é uma bala de prata e deve ser utilizado caso um desses motivos seja contemplado. Caso contrário o código pode ser mais complexo de criar, ou não terá nenhum ganho de performance.
# Corrotinas vs Threads e Processos

[Coroutines](https://superfastpython.com/python-coroutine) are another unit of concurrency, like threads and processes.

We may want to use coroutines because we can have many more concurrent coroutines in our program than concurrent threads.

### Threads

A **concorrência baseada em thread** é fornecida pelo módulo de `threading` e é suportada pelo sistema operacional subjacente. É adequado para bloquear tarefas de E/S, como leitura e gravação de arquivos, soquetes e dispositivos.

```python
import threading

def gravar_arquivo(nome_arquivo, dados):
    with open(nome_arquivo, 'w') as arquivo:
        arquivo.write(dados)
    print(f'Arquivo {nome_arquivo} gravado com sucesso.')

def gravar_arquivo_async(nome_arquivo, dados):
    thread = threading.Thread(target=gravar_arquivo, args=(nome_arquivo, dados))
    thread.start()
    print(f'Thread para gravação do arquivo {nome_arquivo} iniciada.')

# Exemplo de uso
nome_do_arquivo = 'exemplo.txt'
dados_para_gravar = 'Conteúdo a ser gravado no arquivo.'

gravar_arquivo_async(nome_do_arquivo, dados_para_gravar)
print('Continuando a execução do programa enquanto a gravação do arquivo ocorre em segundo plano...')
```

No exemplo acima utilizamos a concorrência baseada em Threads para gravar informações em um arquivo. O arquivo é gravado em segundo plano e a execução do código segue sem esperar finalizar a gravação.

### Processos

A **concorrência baseada em processo** é fornecida pelo módulo de `multiprocessing` e também é suportada pelo sistema operacional subjacente, como threads. É adequado para tarefas vinculadas à CPU que não exigem muita comunicação entre processos, como tarefas de computação.

```python
import multiprocessing

def gravar_arquivo(nome_arquivo, dados):
    with open(nome_arquivo, 'w') as arquivo:
        arquivo.write(dados)
    print(f'Arquivo {nome_arquivo} gravado com sucesso.')

def gravar_arquivo_process(nome_arquivo, dados):
    processo = multiprocessing.Process(target=gravar_arquivo, args=(nome_arquivo, dados))
    processo.start()
    print(f'Processo para gravação do arquivo {nome_arquivo} iniciado.')

# Exemplo de uso
nome_do_arquivo = 'exemplo.txt'
dados_para_gravar = 'Conteúdo a ser gravado no arquivo.'

gravar_arquivo_process(nome_do_arquivo, dados_para_gravar)
print('Continuando a execução do programa enquanto a gravação do arquivo ocorre em segundo plano...')

```

No exemplo acima utilizamos a concorrência baseada em processos para fazer a gravação de informações em um arquivo. É muito parecido com a versão de Threads, porém quando um novo processo é criado não existe uma comunicação direta entre o processo inicial e o de gravação de arquivos.

### Corrotinas

Corrotinas são uma alternativa fornecida pela linguagem Python em tempo de execução (interpretador padrão) suportadas pelo módulo `asyncio`. Eles são adequados para E/S sem bloqueio com subprocessos e soquetes (comunicação, requisições), no entanto, E/S de bloqueio e tarefas vinculadas à CPU podem ser usadas de maneira simulada sem bloqueio usando threads e processos por baixo dos panos.

As corrotinas são mais leves que as Thread. Isso significa que eles são mais rápidas para iniciar e usam menos memória. Essencialmente, uma corrotina é um tipo especial de função, enquanto um thread é representado por um objeto Python e está associado a uma thread no sistema operacional com o qual o objeto deve interagir.

```python
import asyncio
import concurrent.futures

async def gravar_arquivo(nome_arquivo, dados):
    loop = asyncio.get_event_loop()
    with concurrent.futures.ThreadPoolExecutor() as pool:
        await loop.run_in_executor(pool, _gravar_arquivo, nome_arquivo, dados)
    print(f'Arquivo {nome_arquivo} gravado com sucesso.')

def _gravar_arquivo(nome_arquivo, dados):
    with open(nome_arquivo, 'w') as arquivo:
        arquivo.write(dados)

# Exemplo de uso
async def main():
    nome_do_arquivo = 'exemplo.txt'
    dados_para_gravar = 'Conteúdo a ser gravado no arquivo.'

    await gravar_arquivo(nome_do_arquivo, dados_para_gravar)
    print('Continuando a execução do programa enquanto a gravação do arquivo ocorre em segundo plano...')

asyncio.run(main())
```

Para utilizar `asyncio` em Python para operações bloqueantes de E/S, geralmente se usa `asyncio.run()` para rodar uma corrotina principal. No entanto, para operações que são genuinamente bloqueantes (como operações de I/O em arquivos), é melhor usar o `loop` de eventos de `asyncio` em conjunto com o executor de threads.

# Programação Assíncrona

Assíncrono significa não ao mesmo tempo, em oposição a síncrono que é ao mesmo tempo.

Na programação, assíncrono significa que a ação é solicitada, embora não seja executada no momento da solicitação, ela é realizada posteriormente.

Por exemplo, podemos fazer uma [chamada de função assíncrona](https://en.wikipedia.org/wiki/Asynchronous_procedure_call). Isso emitirá a solicitação para fazer a chamada de função e não aguardará a conclusão da chamada. Podemos optar por verificar o status ou resultado da chamada de função posteriormente. Dessa forma os recursos de execução são liberados para que outra ação seja executada, até que o resultado da chamada seja retornado.

A programação assíncrona pode ser usada **independentemente de E/S sem bloqueio**. Como vimos anteriormente, as corrotinas podem executar E/S sem bloqueio de forma assíncrona, mas o módulo asyncio também fornece a facilidade para executar E/S de bloqueio e tarefas vinculadas à CPU de maneira assíncrona, simulando o não bloqueio nos bastidores por meio de threads e processos.

### Non-Blocking I/O

Entrada/Saída ou E/S, abreviadamente, significa ler ou escrever de um recurso.

Exemplos comuns incluem:

- **Unidade de disco rígido**: Ler, gravar, anexar, renomear, excluir, etc.
- **Periféricos**: mouse, teclado, tela, impressora, serial, câmera, etc.
- **Internet**: download e upload de arquivos, obtenção de uma página web, consulta de RSS, etc.
- **Banco de dados**: Selecionar, atualizar, excluir, etc. Consultas SQL.
- **E-mail**: Enviar e-mail, receber e-mail, consultar caixa de entrada, etc.

Essas operações são lentas em comparação com o cálculo executados diretamente na CPU.

> [!quote] **Non-blocking I/O**
> Performing I/O operations via asynchronous requests and responses, rather than waiting for operations to complete.

O módulo `asyncio` em Python foi adicionado especificamente para adicionar suporte para E/S sem bloqueio com subprocessos (por exemplo, execução de comandos no sistema operacional) e com fluxos (streams) (por exemplo, programação de soquete TCP) à biblioteca padrão do Python.

# Referências

- [When to use asyncio in python](https://superfastpython.com/when-to-use-asyncio-in-python/)
	- Ótimo resumo sobre programação assíncrona e a utilização em python.