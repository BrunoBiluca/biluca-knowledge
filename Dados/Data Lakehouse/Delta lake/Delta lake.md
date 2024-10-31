---
tags:
  - engenharia_de_dados
---
# Delta Lake

> [!info] Definição
> [Delta Lake](https://delta.io/) é um [projeto de código aberto](https://github.com/delta-io/delta) que permite construir um [[Data Lakehouse]] em cima de um [[Data Lake]]. Delta Lake fornece [transações ACID](https://docs.delta.io/latest/concurrency-control.html), manipulação escalonável de metadados e unifica processamento de dados em [streaming](https://docs.delta.io/latest/delta-streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html)  em data lakes existentes, como S3, ADLS, GCS e HDFS.
> 
> - [Documentação](https://delta.io/learn)
>   
> Exemplos de implementação de uma solução utilizando Delta lake:
> - [[Exemplo - Vendas de uma loja]]
> - [[Exemplo - Loja de livros]]
> 
> Considerações ao utilizar Delta Lake:
> - [[Governança em Delta Lake]]
> - [[Otimizações no Delta Lake]]

Delta Lake usa arquivos Parquet versionados para armazenar seus dados em seu armazenamento em nuvem. Além das versões, Delta Lake também armazena um log de transações para acompanhar todos os commits feitos na tabela ou diretório de armazenamento de blob para fornecer transações ACID.

![[Exemplificação do uso da tecnologia Delta Lake.png|Exemplificação do uso da tecnologia Delta Lake com suas integrações e ferramentas disponíveis|center|500]]

Sempre que se escreve no modo **delta** estamos criando uma tabela `DeltaTable` que será gerenciada no formato. Uma tabela Delta Lake é persistida no seguinte formato:

```python
delta-table
  ┣ _delta_log
  ┃   ┣ v0.json
  ┃   ┃ ... outros arquivos de controle de versão
  ┃   ┣ v10.checkpoint.parquet (otimização que consolida versões anteriores)
  ┃   ┗ vXX.json
  ┣ data0.parquet
  ┗ ... outras arquivos de dados
```

O transaction log (`_delta_log`) é o sistema de versionamento de uma Delta Table, ele utilizada arquivos no formato `.json` para persistir as alterações a cada versão e `.checkpoint.parquet` para aglutinar a cada 10 alterações de forma a remontar o esquema de forma mais performática.

### O que suporta?

- [Transações ACID](https://docs.delta.io/latest/concurrency-control.html) no Spark: garante que os leitores nunca vejam dados inconsistentes.
	- Problemas resolvidos pelo ACID
		- Dificuldade em anexar (append) dados
		- Dificuldade em modificar dados existentes
		- Falha de jobs no meio do caminho, já que as alterações são registradas apenas se o job terminar em sucesso
		- Dificuldade em operações em tempo real, permite micro-batch atômicas
		- Custo de manter histórico de versões
- Manipulação escalonável de metadados: aproveita o poder de processamento distribuído do Spark para lidar com todos os metadados de tabelas em escala de petabytes com bilhões de arquivos com facilidade.
- [[Structured Streaming]]
- Aplicação de esquema: trata automaticamente variações de esquema para evitar a inserção de registros inválidos durante a ingestão.
- [Versionamento ou Viagem no tempo](https://docs.delta.io/latest/delta-batch.html#-deltatimetravel) de dados permite reversões, trilhas de auditoria históricas completas e experimentos de aprendizado de máquina reproduzíveis.
- [Atualizações](https://docs.delta.io/latest/delta-update.html#-delta-merge) e [exclusões](https://docs.delta.io/latest/delta-update.html #-delta-delete): oferece suporte a operações mais complexas de mesclagem de dados como **atualizações condicionais**.

### O que não suporta?

- Delta Lake não oferece suporte a transações multitabelas e chaves estrangeiras, ou seja, transações no nível da _tabela_.

# Funcionalidades

- [[Change Data Feed (CDF)]]

## Delta Lake Estatísticas de arquivos

Delta Lake File Statistics.

Delta Lake analisa as primeiras 32 colunas de uma tabela para determinar:

- Total número de registros
- Mínimo valor de cada coluna
- Máximo valor de cada coluna
- Contagem de valores nulls em cada coluna

Essas estatísticas são utilizadas para pular arquivos que não são relevantes as consultas. Assim quando pedimos a contagem de registros em uma partição, o Delta Lake busca nas estatísticas dos arquivos não nos dados em si.

São considerados para a contagem de colunas:

- Campos aninhados são contabilizados para o cálculo dos 32 campos
- Estatísticas gerados por campos com alta cardinalidade são pouco úteis
	- Exemplo: campos de texto livre
	- Remover esses campos dos primeiros 32 da tabela

## Visualizações
### Visualizações materializadas (Materialized View)

Visualizações materialização são tabelas pré-processadas que mantem o estado de uma consulta, dessa forma consultas que são executadas várias vezes podem ser materializadas em uma visualização melhorando a performance.

> [!tip]- Databricks Delta Cache
> Databricks mantém o estado de uma consulta para o cluster ativo melhorando a performance caso essa consulta seja feita várias vezes.
> 
> Mesmo assim não é garantido por quanto tempo esse estado será mantido.

## Clonar tabelas

Existem 2 formas de [clonar uma tabela Delta](https://docs.databricks.com/pt/delta/clone.html):

- **Deep clone (clonagem profunda):** copia tudo
	- *Pode ocorrer de forma incremental* utilizando a expressão `CREATE OR REPLACE TABLE`.
- **Shallow clone (clonagem rasa):** copia apenas os logs de transações do Delta Lake, assim qualquer alteração aos dados na tabela copiada serão armazenados separadamente, pode ser utilizado principalmente para testar consultas.

Ambas as abordagens quando são modificadas persistem essas alterações independentes da fonte, ou seja, qualquer alteração na tabela clonada não altera a tabela original.
## Particionamento

Uma forma de organizar os dados é dividi-los em partições definidas por campos específicos da nossa base de dados. Isso melhora consideravelmente a performance em queries que utilizam filtros nesses campos, já que menos dados deverão ser carregados para o processamento.

Um exemplo simples de particionamento seria, se o processamento varre uma faixa de dados por data de ingestão, podemos fazer partições por data de ingestão o que limita a quantidade de dados escaneados para o filtro consequentemente carregamos menos dados para memória.

Mesmo assim é importante prestarmos atenção a nossa estratégia de particionamento, já que ela pode também adicionar o problema de [[Inclinação de dados (Data Skew)]] e assim levar a problema sérios de performance.

> [!warning]- O excesso de particionamento também é um problema
> - Particionar pequenas tabelas pode levar a um aumento de armazenamento e o número total de arquivos para escaneamento
> - Se a maioria das partições tem < 1GB de dados a tabela está superparticionada
> 
> Nesses casos **executar um processo de Optimize não surte nenhum efeito**, já que o particionamento já está altamente compactado e mal definido.

## Mesclagem de dados

O [[Delta lake]] suporta operações de inserção, atualização e exclusões em [Mesclagem de dados (Doc)](https://docs.databricks.com/pt/delta/merge.html). No [[Exemplo - Loja de livros#Livros]] vemos esse tipo de mesclagem de dados, onde o estado atual do livro é alterado cada vez que seu preço é modificado, isso nos permite manter um histórico de preços.

> [!warning]- Limitação da mesclagem
> A operação de mesclagem de dados não pode ser performada se múltiplas linhas da fonte combinam e tentam modificar a mesma linha da tabela alvo. Isso geraria resultados ambíguos já que não fica claro qual a linha fonte deve ser utilizada para deletar ou para remover a linha alvo.
> 
> Para corrigir esse problema é necessário reprocessar a tabela fonte para eliminar qualquer possibilidade de múltiplas combinações.
#### Deduplicação de dados

Um caso que acontece comumente no processo de ingestão de dados é a necessidade de tratar dados duplicados na tabela destino. Esses dados devem ser mantidos apenas uma única vez.

```sql
-- exemplo de inserção apenas de logs novos na tabela
MERGE INTO logs
USING newDedupedLogs
ON logs.uniqueId = newDedupedLogs.uniqueId
WHEN NOT MATCHED
  THEN INSERT *
```

Sabendo um pouco mais sobre a natureza da tabela podemos otimizar o código criado. Utilizando o exemplo de logs acima, se soubermos que na fontes os registros podem ser duplicados apenas por alguns dias, podemos fazer um filtro que especifica o intervalo de datas relevante ao nosso caso.

```sql
-- abordagem mais eficiênte, pois busca logs cadastrados para os últimos 7 dias em vez da tabela inteira
MERGE INTO logs
USING newDedupedLogs
ON logs.uniqueId = newDedupedLogs.uniqueId AND logs.date > current_date() - INTERVAL 7 DAYS
WHEN NOT MATCHED AND newDedupedLogs.date > current_date() - INTERVAL 7 DAYS
  THEN INSERT *
```

