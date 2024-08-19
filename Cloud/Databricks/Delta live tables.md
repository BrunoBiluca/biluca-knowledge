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

### Política de re-tentativas

Caso um job de streaming falhe é recomendável configurar uma política de re-tentativa da seguinte maneira:

- Retries: Ilimitado
- Maximum concurrent runs: 1. Deve ter apenas uma instância de cada query concorrentemente ativa
- Cluster: Usar um novo cluster com a versão mais recente do Spark
- Notificações: pode configurar notificações por email em caso de falhas
- Agendamento (schedule): não configurar
- Timeout: não configurar. Queries de streaming executando por longos tempos indeterminados.

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