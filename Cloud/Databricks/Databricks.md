---
tags:
  - engenharia_de_dados
---
Componentes da plataforma Databricks

- [[Unity Catalog]]
# Databricks Web

A interface do Databricks web é composta por personas, dessa forma o site se comporta de acordo com cada persona, facilitando assim a utilização dependendo do caso de uso.

Tipos de persona disponíveis:

- Ciência de dados e engenharia
- Machine Learning
- SQL

# Governança
## Permissões

> [!info] Documentação
> - [Permissões de computação](https://docs.databricks.com/pt/compute/clusters-manage.html#cluster-level-permissions)

Existem dois tipos de permissões de cluster

- **Allow cluster creation**: permite criar cluster
- **Permissões em nível de cluster**

| Habilidade                                | CAN ATTACH TO | CAN RESTART | CAN MANAGE |
| ----------------------------------------- | ------------- | ----------- | ---------- |
| Adicionar um notebook para processamento  | ✅             | ✅           | ✅          |
| Ver o Spark UI                            | ✅             | ✅           | ✅          |
| Ver a telemetria do cluster               | ✅             | ✅           | ✅          |
| Ver logs do driver                        |               |             | ✅          |
| Encerrar o processamento                  |               | ✅           | ✅          |
| Iniciar e reiniciar o processamento       |               | ✅           | ✅          |
| Editar o processamento                    |               |             | ✅          |
| Adicionar uma biblioteca ao processamento |               |             | ✅          |
| Redimensionar o processamento             |               |             | ✅          |
| Modificar permissões                      |               |             | ✅          |
## Databricks secrets

> [!info] Documentação
> - [Redaction]([https://docs.databricks.com/security/secrets/redaction.html](https://docs.databricks.com/security/secrets/redaction.html))
> - [Secrets]([https://docs.databricks.com/security/secrets/index.html](https://docs.databricks.com/security/secrets/index.html))

Databricks secrets permitem que você armazene credenciais e as referencie em notebooks e jobs.

Para manter as credenciais secretas quando lidas utilizando o comando `dbutils.secrets.get()` e exibidas como saída de uma célula os valores serão alterados para uma string [REDACTED].

# Notebooks

### Comandos mágicos

Comandos mágicos que podem ser utilizados nos notebooks do databricks para várias funcionalidades

```python
%python, %r, %scala, %sql # troca a linguagem na célula de comando
%sh                       # roda código shell
%fs                       # atalho para dbutils comandos do sistema de arquivos
%md                       # markdown para estilização
%run                      # executa um notebook remoto de outro notebook
%pip                      # instala novas bibliotecas python
```

Sobre o `%sh`:
- Reinicia o interpretador do Python
- Executa o código shell sobre a máquina driver local aumentando a sobrecarga de trabalho
- não pode acessar o armazenamento para persistir a saída

### Adicionando parâmetros aos Notebooks

[Widgets](https://docs.databricks.com/pt/notebooks/widgets.html)

```python
​​dbutils.widgets.text("param1", "default")
param1 = dbutils.widgets.get("param1")
```

Esse parâmetros podem ser configurados pela interface gráfica do Databricks.


# Ingestão

### Fontes externas

> [!info] Documentação
> [Objetos de banco de dados em Databrics - Tabelas não gerenciadas](https://docs.databricks.com/pt/database-objects/index.html#what-is-an-unmanaged-table)

Tabelas externas não são gerenciadas pelo Databricks, assim apenas os metadados dessas tabelas são armazenados pela Databrics.

Fontes externas podem ser extraídas por:
- Sistema de arquivos
- JDBC

É possível definir vários tipos de opções na hora de ingerir dados de fontes externas, tanto relacionado a SQL quanto pelo próprio Spark.

### SQL UDF

É possível definir funções para serem reutilizadas no código SQL dentro dos notebooks Databricks.

```sql
%sql
-- exemplo de declaração de função
CREATE OR REPLACE FUNCTION item_preference(name STRING, price INT)
RETURNS STRING
RETURN CASE
	WHEN name = "Standard" THEN "Default item"
	WHEN name = "Premium" THEN "Favorite item"
	WHEN price > 100 THEN "Caro demais"
	ELSE "É isso ai"
END;

SELECT *, item_preference(name, price) FROM item_lookup
```

### Python UDF

Função que aplica uma transformação customizada em uma coluna. Ao aplicar UDFs em python é importante ter em mente algumas considerações:

- Não são otimizadas pelo Catalyst
- São serializadas e enviadas para os executores
	- Os dados da linha são deserializados para formato binário do Spark, passado para a UDF e então os resultados são serializados novamente o formato binário
- Existe uma comunicação excedente entre o executor e o interpretador do python.

É possível registrar uma UDF em python para ser utilizada no SQL.

```python
def example_fn(thing):
	# faz alguma coisa

spark.udf.register("sql_udf", example_fn)

%sql
SELECT sql_udf(thing) as transformed_thing from table_a
```

## Auto Loader

> [!info] O que é?
> O Auto Loader processa de forma progressiva e eficiente novos arquivos de dados à medida que chegam ao armazenamento em nuvem sem qualquer configuração adicional.
> 
> [Documentação](https://docs.databricks.com/pt/ingestion/auto-loader/index.html)

# Delta lake

### Otimização no Delta lake

Como o Delta lake trabalha com logs de transação para definir seu estado, são criados vários arquivos pequenos com cada transformação feita, isso pode ocasionar problemas de performance nas consultas já que quando uma consulta é feita ela consulta esse histórico para definir o estado da base de dados.

Dessa forma é indicado utilizar o versionamento do Delta lake para versões mais recente e de tempos em tempos remover esse versionamento dos registros mais antigos.

```sql
-- exemplo de limpeza de base
VACUUM students RETAIN 0 HOURS

-- para exibir os resultados removidos antes da operação
VACUUM students RETAIN 0 HOURS DRY RUN
```

### CTAS (Create Tables as Select)

Automaticamente inferem o esquema sendo uma boa forma de consumir dados externos bem estruturados como parquet. São criadas a partir do resultado de uma consulta e não tem nenhum tipo de ligação com a tabela fonte, assim mesmo que ela for removida as tabelas criadas como CTAS continuam operando normalmente.

Para outros tipos de fontes de dados menos estruturados podemos criar uma tabela temporária fazer as transformações necessárias e importar na tabela principal.

Como Delta Lake força esquema na escrita, restrições em cada coluna são suportadas durante a escrita das tabelas.

#### Exemplo demonstrando a definição de um esquema em CTAS

```sql

-- Definição da tabela purchases através de CTAS
-- As colunas timestamp são definidas como timestamp do Unix, o que não é interessante para análises
CREATE OR REPLACE TABLE purchases AS
SELECT order_id AS id, transaction_timestamp, purchase_revenue_in_usd AS price
FROM sales;

-- | id  | transaction_timestamp | price |
-- | --- | --------------------- | ----- |
-- | 1   | 600000000             | 42.0  |

-- Definição da tabela com o esquema desejado
CREATE OR REPLACE TABLE purchase_dates (
  id STRING,
  transaction_timestamp STRING,
  price STRING,
  date DATE GENERATED ALWAYS AS (
    cast(cast(transaction_timestamp/1e6 AS TIMESTAMP) AS DATE))
    COMMENT "generated based on `transactions_timestamp` column"
  )

-- Junção dos dados da tabela criada a partir de CTAS com o esquema desejado
SET spark.databricks.delta.schema.autoMerge.enabled=true;

MERGE INTO purchase_dates a
USING purchases b 
ON a.id = b.id 
WHEN NOT MATCHED THEN INSERT *

-- | id  | transaction_timestamp | price | date         |
-- | --- | --------------------- | ----- | ------------ |
-- | 1   | 600000000             | 42.0  | "2020-06-18" |
```


### Clonar tabelas

- Deep clone: copia tudo
- Shallow clone: copia apenas os logs de transações do Delta Lake, assim qualquer alteração aos dados na tabela copiada serão armazenados separadamente, pode ser utilizado principalmente para testar consultas.

# Delta live tables

Delta live tables (DTL) são uma forma do Databricks de implementar ETL de uma forma ágil, consistente e que escale de acordo com as necessidades. Elas são views materializadas para o lakehouse definidas por SQL Query e criadas e atualizadas por pipelines.

Principais características que as DLT implementam:

- Melhores práticas Delta Lake automaticamente aplicadas: otimização, compactação automática
- DLT automaticamente gerencia os dados físicos: automaticamente executa vacuum e otimizações diárias
- Evolução de esquema: quando removidos colunas valores antigos são preservados.

Existem dois tipos de tabelas que podem ser criadas com DLT:
- Live tables: são views materializadas para o lakehouse, retornam os resultados atuais de qualquer query a cada intervalo de tempo de atualização
- Streaming live tables: são projetadas para processamento de dados perto de tempo real e incremental
	- Existe a opção de utilizar [Autoloader](https://docs.databricks.com/pt/ingestion/auto-loader/index.html) que otimiza carregamento de dados incrementais a partir do cloud object storage

> [!tip] DLT e notebooks
> DLT não foi criada para utilizar em notebooks de maneira iterativa, assim que o DLT é implementado deve fazer parte de um workflow. O que pode ser feito é criar a lógica utilizando uma sintaxe comum e depois converter para DLT quando estiver pronto para a criação do pipeline.

> [!tip] Comentários e Propriedades de tabela
> Podemos utilizar esses recursos para facilitar a organização dentro do Databricks. Comentário são bons em descrever cada tabela enquanto propriedades pode ser utilizadas para rotular tabelas
> ```python
> @dlt.table(
> 	comment = "Append only orders with valid timestamps",
> 	table_properties = {"quality": "silver"}
> )
> def orders_silver():
> 	# Implementação
> ```

## Como criar uma DLT

Passos para a criação de uma DLT
- Criar a live table
- Criar um pipeline
- Aplicar o início do pipeline

```sql
-- Cria uma tabela diária de cálculo de lucros a partir da tabela de transactions
CREATE LIVE TABLE daily_stats
AS SELECT sum(rev) - sum(costs) as profits
FROM prod_data.transactions
GROUP BY day
```

É possível aplicar restrições para definir expectativas em relação a qualidade dos dados.

```sql
-- exemplo de uma restrição que verificar o timestamp do event e remove a linha em caso de violação
CONSTRAINT valid_timestamp
EXPECT (timestamp > '2021-01-01')
ON VIOLATION DROP
```

## Streaming

Também é possível ingerir dados por meio de uma tabela de Streaming

```sql
CREATE STREAMING LIVE TABLE raw_data
AS SELECT *
FROM cloud_files("/data", "json")
```

Utilizando [Autoloader](https://docs.databricks.com/pt/ingestion/auto-loader/index.html)

```sql
-- Essa query além dos dados contidos no arquivos em núvem são adicionados dois campos:
-- processing_time: data de ingestão do dado
-- source_file: arquivo de origem do dado no armazenamento em núvem
CREATE OR REFRESH STREAMING LIVE TABLE orders_bronze
AS SELECT current_timestamp() processing_time, input_file_name() source_file, *
FROM cloud_files("${source}/orders", "json", map("cloudFiles.inferColumnTypes", "true"))
```

### Manutenção de estado (watermark)

Algumas operações são específicas para manter estado durante o processo de streaming, como: deduplicação, agregação e stream-stream joins. O progresso e estado são armazenados nos checkpoints e gerenciados pelo driver durante o processamento da consulta.

Streaming queries não mantém estado, todos os dados são computados apenas uma vez.
## Configurações

Configurações podem ser aplicadas diretamente ao código, essas configurações são cadastradas na plataforma Databricks e pode ser chamados no código tanto SQL quanto Python.

```sql
CREATE STREAMING LIVE TABLE data AS
SELECT * FROM cloud_files("${my_etl.input_path}", "json")
```

```python
@dlt.table
def data():
	input_path = spark.conf.get("my_etl.input_path")
	spark.readStream.format("cloud_files").load(input_path)
```

## DLT com Change data capture

É possível aplicar alterações em uma tabela a partir de eventos.

```sql
APPLY CHANGES INTO LIVE.cities
FROM STREAM(LIVE.city_updates)
KEYS (id)
SEQUENCE BY ts
```

Necessário definir algum campo como uma sequência:
 - Log sequence number
 - Timestamp
 - Tempo de ingestão

## Python vs SQL

Cada uma das linguagens tem suas vantagens e desvantagens.

| Python                         | SQL                                  | Notas                                                                                                                                                                        |
| ------------------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Python API                     | Proprietary SQL API                  |                                                                                                                                                                              |
| Não tem verificação de sintaxe | Tem verificação de sintaxe           | Nenhuma das duas permite executar células iterativamente durante o notebook.                                                                                                 |
| Importação explícita           | Não                                  | Em python o módulo `dlt` deve ser importado explicitamente enquanto no SQL não.                                                                                              |
| Tabelas como Dataframes        | Tabelas como resultados de consultas | Em python podemos aplicar múltiplas transformações em uma única operação. <br>Em SQL essas transformações são persistidas em tabelas temporárias que são então transformadas |
| `@dlt.table()`                 | `SELECT statement`                   | Lógica da query e sintaxe são diferentes                                                                                                                                     |

# Workflows

Databricks tem duas formas de orquestração

- Workflow jobs: qualquer processamento
	- Principais usos
		- Orquestração de processamentos dependentes
		- Machine Learning
		- Executar tarefas específicas como chamadas a APIs, scripts python com bibliotecas
- Delta Live Tables: processamentos para Delta Lake
	- Utilizado principalmente para ingestão de dados e transformação de qualquer tipo de ETL, podendo adicionar restrições de qualidade, monitoramento e logs

![[Exemplo de utilização de workflow para ML dentro do Databricks.png|Exemplo de utilização de workflow para ML dentro do Databricks|500]]

> [!tip] Componentes de um fluxo de processamento
> - Tarefas (O que?)
> - Agendamento (Quando?)
> - Cluster (Como?)

# Jobs

> [!info] Documentação
> - [Criar e executar jobs do Databricks](https://docs.databricks.com/pt/workflows/jobs/create-run-jobs.html#choose-the-correct-cluster-type-for-your-job)

Tipos de clusters:
- All-purpose clusters: cluster gerais que servem principalmente para o desenvolvimento.
- Job clusters: encerram quando o job é finalizado

> [!tip] Jobs em produção
> Para jobs que já estão em estágio de produção a Databricks recomenda utilizar cluster do tipo *Job Clusters*.

# CDC (Change data capture)

Para mais informações sobre [[Change Data Capture]].

O processo de CDC no Databricks pode ser feito fazendo a junção dos dados de uma fonte de dados para uma tabela.

```sql
MERGE INTO target_table t
USING source_updates s
ON t.key = s.key
WHEN MATCHED and t.sequence_field < s.sequence_field
	THEN UPDATE SET *
WHEN MATCHED and s.operation_field = "DELETE"
	THEN DELETE
WHEN NOT MATCHED
	THEN INSERT **
```

Cada linha da tabela deve definir um valor de sequência, esse valor é utilizado para definir qual a linha válida naquela janela de tempo. **Apenas uma entrada é capturada por janela (múltiplas entradas atualizadas geram uma exceção).**

Para garantir que apenas uma entrada seja capturada podemos utilizar a função `rank().over(window)` por exemplo ou outras funções [[Funções nativas#Window Functions]].

