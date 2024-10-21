
# Databricks especificidades

> [!info] Pergunta
> A data engineer is using a foreachBatch logic to upsert data in a target Delta table.
> 
> The function to be called at each new microbatch processing is displayed below with a blank:
>   
> ```sql
> def upsert_data(microBatchDF, batch_id):
>     microBatchDF.createOrReplaceTempView("sales_microbatch")
> 	 sql_query = """
> 					MERGE INTO sales_silver a
> 					USING sales_microbatch b
> 					ON a.item_id=b.item_id
> 						AND a.item_timestamp=b.item_timestamp
> 					WHEN NOT MATCHED THEN INSERT *
> 				 """
> 				 
> 	 _______________
> ```
> 
> Which option correctly fills in the blank to execute the sql query in the function on a cluster with Databricks Runtime below 10.5 ?

Antes do Databricks Runtime 10.5 se utilizava o comando `microBatchDF._jdf.sparkSession().sql(sql_query)`, já que a seção do spark não está disponível diretamente antes dessa versão.

Para versões posteriores podemos apenas utilizar o comando `spark.sql()`.

---

> [!info] Pergunta
> 
> A data engineer is using Databricks REST API to send a GET request to the endpoint ‘api/2.1/jobs/runs/get’ to retrieve the run’s metadata of a multi-task job using its run_id.
> Which statement correctly describes the response structure of this API call?

Ele irá retornar as informações da task com o `run_id` providenciado. Cada task tem um `run_id`.

---

> [!info] Pergunta
> Which of the following statements best describes DBFS ?

Abstração sobre armazenamento de objetos escalável que mapeia chamadas de sistema do tipo Unix para chamadas nativas ao armazenamento em nuvem.

É um sistema disponível nos clusters Databricks montado sobre os workspaces Databricks.

---

### Notebooks

> [!info] Pergunta
> A data engineer wants to install a Python wheel scoped to the current notebook’s session, so only the current notebook and any jobs associated with this notebook have access to that library.
> 
> Which of the following commands can the data engineer use to complete this task?


```
%pip install my_package.whl
```

---

> [!info] Pergunta
> A data engineer has noticed the comment ‘# Databricks notebook source’ on the first line of each Databricks Python file’s source code pushed to Github.
> 
> Which of the following explain the purpose of this comment ?

Esse comentário estabelece que o arquivo python age como um notebook do Databricks.

---

> [!info] Pergunta
> Which of the following statements correctly describes the sys.path Python variable ?
> 

Contém uma lista dos diretórios que o interpretador python procura por módulos.

To import modules from another directory, you must add it to sys.path

```python
import sys
sys.path.append("/path/to/dir")
```
---
### Fontes externas

> [!info] Pergunta
> The data engineering team has a large external Delta table where new changes are merged very frequently. They enabled Optimized writes and Auto Compaction on the table in order to automatically compact small data files to target files of size 128 MB. However, when they look at the table directory, they see that most data files are smaller than 128 MB.
> 
> Which of the following likely explains these smaller file sizes ?

Escritas otimizadas e auto compactação automaticamente geram arquivos de dados menores para reduzir a duração de operações MERGE futuras.

---

> [!info] Pergunta
>The data engineering team has a Delta Lake table created with following query:
>```sql
>
>CREATE TABLE customers_clone
>LOCATION 'dbfs:/mnt/backup'
>AS SELECT * FROM customers
>```
>  
>A data engineer wants to drop the table with the following query:
>
>`DROP TABLE customers_clone`
>
>Which statement describes the result of running this drop command ?

Apenas os metadados da tabela serão removidos enquanto os dados são mantidos no armazenamento.
[[Databricks#Fontes externas]]

---


> [!info] Pergunta
> The data engineering team is using the LOCATION keyword for every new Delta Lake table created in the Lakehouse.
> 
> Which of the following describes the purpose of using the LOCATION keyword in this case ?

`LOCATION` é a palavra utilizada para configurar a tabela Delta criada como uma tabela externa, ou seja, essa tabela tem seus dados armazenados em um armazenamento externo ao Databricks.

---

> [!info] Pergunta
> Given the following commands:
> 
> ```sql
> CREATE DATABASE db_hr;
> LOCATION '/mnt/hr_external';
> 
> USE db_hr;
> CREATE TABLE employees;
> ```
> 
> In which of the following locations will the employees table be located?

Como estamos criando uma tabela utilizando Location, ela é tratada como uma tabela externa no caminho informado.

Nesse caso a tabela `employees` irá ser criada sob o diretório do banco de dados definido `/mnt/hr_external/db_hr.db`. O `.db` é um sufixo adicionado a pasta que contem uma base de dados.

---

## Configuração de Jobs

> [!info] Pergunta
> A data engineer wants to pass multiple parameters from a Databricks Job to a notebook. They already configured the key and value of each parameter in the configurations of the job.
> Which of the following utilities can the data engineer use to read the passed parameters inside the notebook ?

dbutils.widgets
[[Databricks#Adicionando parâmetros aos Notebooks]]

---

> [!info] Pergunta
> For production Databricks jobs, which of the following cluster types is recommended to use?
> 

Job Clusters
[[Databricks#Jobs]]

---


> [!info] Pergunta
> Given the following code block in a notebook
> ```sql
> db_password = dbutils.secrets.get(scope="dev", key="database_password")
> print (db_password)
> ```
> Which statement describes what will happen when the above code is executed?

A string *REDACTED* será exibida.
[[Databricks#Databricks secrets]]

---
> [!info] Pergunta
> A junior data engineer is using the %sh magic command to run some legacy code. A senior data engineer has recommended refactoring the code instead.
> Which of the following could explain why a data engineer may need to avoid using the %sh magic command ?
> 

- Reinicia o interpretador do Python
- Executa o código shell sobre a máquina driver local aumentando a sobrecarga de trabalho
- não pode acessar o armazenamento para persistir a saída

[[Databricks#Comandos mágicos]]

---

> [!info] Pergunta
> A data engineer has the following streaming query with a blank:
> 
> ```sql
> spark.readStream
>        .table("orders_cleaned")
>        ____________________________
>        .groupBy(
>            "order_timestamp",
>            "author")
>        .agg(
>            count("order_id").alias("orders_count"),
>            avg("quantity").alias("avg_quantity"))
>      .writeStream
>         .option("checkpointLocation", "dbfs:/path/checkpoint")
>         .table("orders_stats")
> ```
> 
> For handling late-arriving data, they want to maintain the streaming state information for 30 minutes.
> 
> Which option correctly fills in the blank to meet this requirement ?

Watermark.

[[Spark Structured Streaming#Manipulação de dados atrasados (Watermark)]]

---

> [!info] Pergunta
> The data engineering team created a new Databricks job for processing sensitive financial data. A financial analyst asked the team to transfer the "Owner" privilege of this job to the “finance” group.
> 
> A junior data engineer that has the “CAN MANAGE” permission on the job is attempting to make this privilege transfer via Databricks Job UI, but it keeps failing.
> 
> Which of the following explains the cause of this failure?

Grupo de usuário não podem ser dono de um Databricks Job. O dono deve ser um indivíduo.

---

> [!info] Pergunta
> Que tipo de informação é exibida na Ganglia UI? E que tipo não é?

O Ganglia UI apresenta todos os recursos computacionais do cluster, porém não tem informações específicas de eventos que estão ocorrendo no cluster. Por exemplo as tasks do Spark

---

> [!info] Pergunta
> For production Structured Streaming jobs, which of the following retry policies is recommended to use ?

Re-tentativas ilimitadas com no máximo uma execução concorrente.

[[Databricks#Política de re-tentativas]]

---
### CDC e CDF

> [!info] Pergunta
> The data engineering team wants to build a pipeline that receives customers data as change data capture (CDC) feed from a source system. The CDC events logged at the source contain the data of the records along with metadata information. This metadata indicates whether the specified record was inserted, updated, or deleted. In addition to a timestamp column identified by the field `update_time` indicating the order in which the changes happened. Each record has a primary key identified by the field `customer_id`.
> 
> In the same batch, multiple changes for the same customer could be received with different update_time. The team wants to store only the most recent information for each customer in the target Delta Lake table.
> 
> Which of the following solutions meets these requirements?

Usar o `MERGE INTO` para atualizar apenas a entrada mais recente de cada `customer_id` na tabela.

---

> [!info] Pergunta
> Given the following query on the Delta table ‘customers’ on which Change Data Feed is enabled:
> 
> ```python
> spark.readStream
>         .option("readChangeFeed", "true")
>         .option("startingVersion", 0)
>         .table ("customers")
>         .filter (col("_change_type").isin(["update_postimage"]))
>     .writeStream
>         .option ("checkpointLocation", "dbfs:/checkpoints")
>         .trigger (availableNow=True)
>         .table("customers_updates")
> ```
>   
> Which statement describes the results of this query each time it is executed ?

Novas atualizações são adicionadas a tabela `customers_updates`.

Databricks suporta a leitura das alterações capturadas pelo CDF. Isso possibilita ler apenas as alterações desde a última vez que o streaming foi executado.

[[Change Data Feed (CDF)]]

Como não foi especificado o modo de escrita, o padrão é `append`.

---

> [!info] Pergunta
> Given the following query on the Delta table customers on which Change Data Feed is enabled:
> 
> ```python
> spark.read
>         .option("readChangeFeed", "true")
>         .option("startingVersion", 0)
>         .table ("customers")
>         .filter(col("_change_type").isin(["update_postimage"]))
>     .write
>         .mode("overwrite")
>         .table("customers_updates")
> ```
> 
> Which statement describes the results of this query each time it is executed ?

O histórico de todas as atualizações de registros irá sobrescrever os registros na tabela `customers_updates`.

Como a consulta é definida pelo `spartk.read` estamos buscando uma versão estática da tabela customer, ou seja, todos os registros serão lidos.

---

> [!info] Pergunta
> The data engineering team maintains a Type 1 table that is overwritten each night with new data received from the source system.
> 
> A junior data engineer has suggested enabling the Change Data Feed (CDF) feature on the table in order to identify those rows that were updated, inserted, or deleted.
> 
> Which response to the junior data engineer's suggestion is correct?

CDF é usado quando são efetuadas alterações em poucos registros a cada processamento da tabela. Como a tabela é sempre sobrescrita CDF não é uma opção porque o CDF irá capturar que toda a base foi modificado e então não terá ganho nenhum nessa informação.

[[Change Data Feed (CDF)]]

---
## Arquitetura


> [!info] Pergunta
> The data engineering team has a singleplex bronze table called ‘orders_raw’ where new orders data is appended every night. They created a new Silver table called ‘orders_cleaned’ in order to provide a more refined view of the orders data.
> 
> The team wants to create a batch processing pipeline to process all new records inserted in the orders_raw table and propagate them to the orders_cleaned table.
> 
> Which solution minimizes the compute costs to propagate this batch of data?

Usar Spark Structured Streaming para processar os novos registros no `order_raw` em modo batch assim que estiver disponível (`trigger(availableNow=True)`).

Databricks suporta gatilhos para o Delta Lake e fontes providas por Auto Loader. Essa opção consome todos os dados disponíveis de forma incremental.

[[Databricks#Auto Loader]]

---

> [!info] Pergunta 
> The data engineering team has a Silver table called ‘sales_cleaned’ where new sales data is appended in near real-time.
> 
> They want to create a new Gold-layer entity against the ‘sales_cleaned’ table to calculate the year-to-date (YTD) of the sales amount. The new entity will have the following schema:
> 
> `country_code STRING, category STRING, ytd_total_sales FLOAT, updated TIMESTAMP`
> 
> It’s enough for these metrics to be recalculated once daily. But since they will be queried very frequently by several business teams, the data engineering team wants to cut down the potential costs and latency associated with materializing the results.
> 
> Which of the following solutions meets these requirements?

Configurar um processamento em lotes para recalcular as métricas e armazenar esses dados em uma tabela sobrescrevendo para cada atualização.

Essa decisão é tomada pelas diferentes entre o armazenamento entre visualizações e tabelas.

Consideramos utilizar visualizações quando:
- A consulta não é complexa. A view é re-computada cada vez que é consultada, então consultas complexas com agregações e junções aumentam o custo de processamento
- Queremos reduzir o custo de armazenamento. Visualização não ocupam espaço adicional

Consideramos utilizar tabelas quando:
- Vários consumidores consultam a tabela, então devemos evitar o re-processamento de computação complexa
- Consultas devem ser computadas incrementalmente a partir da fonte de dados que cresce continuamente.

---


> [!info] Pergunta
> A data engineer wants to create a Delta Lake table for storing user activities of a website. The table has the following schema:
> 
> `user_id LONG, page STRING, activity_type LONG, ip_address STRING, activity_time TIMESTAMP, activity_date DATE`
> 
> Based on the above schema, which column is a good candidate for partitioning the Delta Table?

`activity_date`

Para escolher a coluna de partição é importante pensar qual o formato que os dados serão incrementados e então escolher uma coluna que otimize o tamanho da partição para não ser muito grande e que também consiga facilmente arquivar partições que já não sejam mais tão relevantes. 

Nesse caso os dados chegam com o passar do tempo, assim utilizar a `activity_date` como a coluna de partição nos permite criar um tamanho limitado de registros para cada partição (registros do dia) e facilmente arquivar partições antigas  que já não estão sendo relevantes para a análise corrente.

[[Delta lake#Particionamento]]

---

> [!info] Pergunta
> The data engineering team has a large Delta table named ‘users’. A recent query on the table returned some entries with negative values in the ‘age’ column.
> 
> To avoid this issue and enforce data quality, a junior data engineer decided to add a CHECK constraint to the table with the following command:
> 
> `ALTER TABLE users ADD CONSTRAINT valid_age CHECK (age> 0);`
> 
> However, the command fails when executed.
> 
> Which statement explains the cause of this failure?

A tabela já apresenta registros que violam essa nova regra. Deve então adequar a tabela a nova regra antes de definir a restrição.

[[Qualidade de dados]]

---


> [!info] Pergunta
> The data engineering team noticed that a partitioned Delta Lake table is suffering greatly. They are experiencing slowdowns for most general queries on this table.
> 
> The team tried to run an OPTIMIZE command on the table, but this did not help to resolve the issue.
> 
> Which of the following likely explains the cause of these slowdowns?

A tabela está superparticionada ou particionada incorretamente. Isso necessita uma reescrita de todos os dados para resolver o problema.

[[Delta lake#Particionamento]]

---

> [!info] Pergunta
> Which of the following statements correctly describes assertions in unit testing ?

Uma asserção é uma expressão booleana que verifica se as premissas feitas no código ainda permanecem verdadeiras após o desenvolvimento.

---

> [!info] Pergunta
> Which of the following statements correctly describes End-to-End Testing ?
> 

É uma abordagem que simula a experiência do usuário para garantir que a aplicação rode sobre cenários baseados no mundo real

# Governança

## Permissões

> [!info] Pergunta
> Which of the following describes the minimal permissions a data engineer needs to view the metrics and Spark UI of an existing cluster ?
> 

"Can attach to"
[[Databricks#Permissões]]

---

> [!info] Pergunta
> Which of the following describes the minimal permissions a data engineer needs to start and terminate an existing cluster ?
> 

"Can restart"
[[Databricks#Permissões]]

---

> [!info] Pergunta
> Which of the following describes the minimal permissions a data engineer needs to edit the configurations of an existing cluster ?
> 

Privilégio "Can Manage"
[[Databricks#Permissões]]

---


> [!info] Pergunta
> A data engineer uses the following SQL query:
> 
> `GRANT USAGE ON DATABASE sales_db TO finance_team`
> 
> Which of the following is the benefit of the USAGE privilege ?

Não acontece nada, porém é necessário para fazer qualquer operação sobre a base de dados `sales_db`. A partir dessa permissão podem ser atribuídas outras permissões ao time de finanças.

---

> [!info] Pergunta
> The data engineering team has a secret scope named ‘DataOps-Prod’ that contains all secrets needed by DataOps engineers in a production workspace.
> 
> Which of the following is the minimum permission required for the DataOps engineers to use the secrets in this scope ?

READ para o escopo inteiro do DataOps-Prod.

[[Databricks#Databricks secrets]]

---
### Remoção de dados

> [!info] Pergunta
> The data engineering team has the following query for processing customers’ requests to be forgotten:
> 
> ```sql
> DELETE FROM customers
> WHERE customer_id IN
> (SELECT customer_id FROM delete_requests)
> ```
> 
> Which statement describes the results of executing this query ?

Esse é um caso de utilizar o VACUUM, já que os dados irão continuar no histórico e de acordo com a legislação é necessário remover todo o histórico do usuário.

[[Delta lake#Propagando deleções]]

---

# Delta Table

> [!info] Pergunta
> The data engineering team has a Delta Lake table created with following query:
> ```sql
> CREATE TABLE target
> AS SELECT * FROM source
> ```
> A data engineer wants to drop the source table with the following query:
> `DROP TABLE source`
> Which statement describes the result of running this drop command ?
> 

Apenas a tabela fonte será deletada enquanto a tabela target não será afetada.
[[Databricks#CTAS (Create Tables as Select)]]

---

> [!info] Pergunta
> Given a Delta table ‘products’ with the following schema:
> 
> name STRING, category STRING, expiration_date DATE,  price FLOAT
> 
> When executing the below query:
> 
> ```sql
> SELECT * FROM products
> WHERE price > 30.5
> ```
> 
> Which of the following will be leveraged by the query optimizer to identify the data files to load?

Os arquivos de estatísticas ficam no Delta transaction log.

Para esse caso em específico o Delta lake irá consultar os arquivos de estatísticas para verificar os valores mínimos e máximos do campo `price` e serão carregados para o processamento apenas arquivos que são relevantes.

[[Delta lake#Delta Lake Estatísticas de arquivos]]

---

> [!info] Pergunta
> “A Delta Lake’s functionality that automatically compacts small files during individual writes to a table by performing two complementary operations on the table”
> 
> Which of the following is being described in the above statement?

Auto Optimize.

Auto Optimize é uma funcionalidade que permite ao Delta Lake automaticamente compactar arquivos pequenos. Ele é composto de dois processos:

- Optimized writes: com essa funcionalidade ativa, Databricks tenta escrever arquivos de 128MB por repartição.
- Auto compaction: verifica se o arquivo pode ser ainda mais compactado. Em caso positivo, executa um processo OPTIMIZE com arquivos de tamanho 128MB (em vez de 1GB do tamanho padrão do processo OPTIMIZE).

[[Delta lake#Otimizações]]

---

> [!info] Pergunta
> A data engineer has added a CHECK constraint to the **sales** table using the following command:
> 
> ```sql
> ALTER TABLE sales ADD CONSTRAINT valid_date CHECK (item_date >= '2024-01-01');
> ```
> 
> In addition, they have added a comment on the **item_date** column using the following command:
> 
> ```sql
> ALTER TABLE sales ALTER COLUMN item_date COMMENT "Date must be newer than Jan 1, 2024";
> ```
> 
> Which of the following commands allows the data engineer to verify that both the constraint and the column comment have been successfully added on the table ?

`DESCRIBE EXTENDED sales` ou `DESCRIBE TABLE EXTENDED`.

Exibe
- A condição atual da restrição imposta a tabela
- Também mostra as informações detalhadas da tabela

---
### Batch


> [!info] Pergunta
> The data engineering team has a Delta Lake table named ‘daily_activities’ that is completely overwritten each night with new data received from the source system.
> 
> For auditing purposes, the team wants to set up a post-processing task that uses Delta Lake Time Travel functionality to determine the difference between the new version and the previous version of the table. They start by getting the current table version via this code:
> 
> ```python
> current_version = spark.sql("SELECT max(version) FROM (DESCRIBE HISTORY daily_activities)").collect()[0][0]
> ```
> 
> Which of the following queries can be used by the team to complete this task ?

Para fazer a diferença entre a versão anterior e atual de uma tabela podemos utilizar a seguinte consulta:

```
SELECT * FROM daily_activities
EXCEPT
SELECT * FROM daily_activities@v{current_version-1}
```

Cada alteração na tabela cria uma nova versão da tabela que pode ser consultada utilizando o seguinte formato: `<table>@<id_versão>`.

Utilizando o operador `EXCEPT` (também chamado de MINUS em algumas bases), recuperamos apenas as diferenças entre a versão atual e a anterior.

---

> [!info] Pergunta
> Which functions can a data engineer use to return a new DataFrame containing the distinct rows from a given DataFrame based on multiple columns?
> 

`pyspark.sql.DataFrame.dropDuplicates`

Restringir as colunas utilizadas no dropDuplicates pode melhorar a performance do processo.

---
### Streaming

> [!info] Pergunta
> A junior data engineer is testing the following code block to get the newest entry for each item added in the ‘sales’ table since the last table update.
> 
> ```python
> from pyspark.sql import functions as F
> from pyspark.sql.window import Window
> window = Window.partitionBy("item_id").orderBy(F.col("item_time").desc())
> ranked_df = (spark.readStream
>                     .table("sales")
>                     .withColumn("rank", F.rank().over(window))
>                     .filter("rank == 1")
>                     .drop("rank")
>             )
> display(ranked_df)
> ```
> 
> However, the command fails when executed.
> 
> Which statement explains the cause of this failure?

Operações de janela de tempo não podem ser utilizadas para streaming de dados, é necessário executar uma lógica para cada microbatch.

Que nem no [[Exemplo - Loja de livros#Clientes]], onde essa tabela é criada utilizando uma lógica similar.

---


> [!info] Pergunta
> How can a Data Engineer perform streaming deduplication ?
> 

Deduplicar os registros em cada lote, e então mesclar os resultados em uma tabela final de apenas inserção.

[[Exemplo - Loja de livros#Clientes]] tem um exemplo desse tipo de processamento, lá são deduplicados os eventos relacionados aos clientes e então adicionados apenas os novos valores a tabela final.

---

> [!info] Pergunta
> Given the following streaming query:
> 
> ```sql
> spark.readStream
>         .table("orders_cleaned")
>         .withWatermark("order_timestamp", "10 minutes")
>         .groupBy(
>             window("order_timestamp", "5 minutes").alias("time"),
>             "author")
>         .agg(
>             count("order_id").alias("orders_count"),
>             avg("quantity").alias("avg_quantity"))
>      .writeStream
>          .option("checkpointLocation", "dbfs:/path/checkpoint")
>          .table("orders_stats")
> ```
>   
> Which of the following statements best describe this query ?

Essa consulta calcula em nível de negócio para cada janela de 5 minutos não-sobrepostas. O estado dos registros passados é mantido por cada 10 minutos.

Caso a opção `slideDurantion` for provida as janelas passam a ser sobrepostas pelo tempo configurado.

[[Funções nativas#Window Functions]]

---

> [!info] Pergunta
> Which statement regarding streaming state in Stream-Stream Joins is correct?
> 

Spark retem entradas antigas como streaming para ambas fontes, dessa forma é possível comparar para cada nova entradas com entradas antigas. A quantidade de entradas antigas retidas pelo Spark pode ser configurado a partir do `Wartermark()`.

[[Spark Structured Streaming]]

---

> [!info] Pergunta
> Em uma junção Stream-Static, qual a versão da tabela estática é retornada? Existe algum tipo de cache que o Spark pode fazer em relação a essa tabela?
> 

A última versão da tabela estática será retornada cada vez que for consultada. O spark não faz nenhum tipo de cache em relação a tabela.

---

> [!info] Pergunta
> A data engineer wants to ingest input json data into a target Delta table. They want the data ingestion to happen incrementally in near real-time.
> Which option correctly meets the specified requirement?

```python
spark.readStream
           .format("cloudFiles")
           .option ("cloudFiles.format", "json")
           .load(source_path)
.writeStream
           .option("checkpointLocation", checkpointPath)
           .start("target_table")
```

Para ingerir dados em quase tempo real utilizamos o Auto Loader. Ele provê uma fonte Structured Streaming chamada `cloudFiles` que por padrão fazer o processamento a cada 500 ms equivalente a opção `tigger(processingTime="500ms")`.

[[Spark Structured Streaming#Triggers]]

---

> [!info] Pergunta
> Given the following Structured Streaming query:
> ```python
> (spark.table("orders")
>         .withColumn("total_after_tax", col("total")+col("tax"))
>     .writeStream
>         .option("checkpointLocation", checkpointPath)
>         .outputMode("append")
>         ._____________
>         .table("new_orders")
> )
> ```
> Fill in the blank to make the query executes a micro-batch to process data every 2 minutes

```python
...
.trigger(processingTime="2 minutes")
...
```

[[Spark Structured Streaming#Triggers]]

---
## Clonagem de tabelas


> [!info] Pergunta
> The data engineering team has a table ‘orders_backup’ that was created using Delta Lake’s SHALLOW CLONE functionality from the table ‘orders’. Recently, the team started getting an error when querying the ‘orders_backup’ table indicating that some data files are no longer present.
> Which of the following correctly explains this error ?

O comando VACUUM foi executado na tabela orders.

Shallow clone apenas faz uma cópia dos metadados da tabela (transaction logs), assim qualquer remoção de dados da tabela original utilizando o comando VACUUM deleta informações dos logs de transação o que impacta na tabela clonada.
[[Delta lake#Clonar tabelas]]

---

> [!info] Pergunta
> A data engineer has a Delta Lake table named ‘orders_archive’ created using the following command:
> 
> ```sql
> CREATE TABLE orders_archive
> DEEP CLONE orders
> ```
> 
> They want to sync up the new changes in the orders table to the clone.
> 
> Which of the following commands can be run to achieve this task ?

Clonagem pode ocorrer de forma incremental utilizando a expressão `CREATE OR REPLACE TABLE`.

```sql
CREATE OR REPLACE TABLE orders_archive
DEEP CLONE orders
```

[[Delta lake#Clonar tabelas]]

---

# MLFlow

> [!info] Pergunta
> A data engineer wants to calculate predictions using a MLFlow model logged in a given “model_url”. They want to register the model as a Spark UDF in order to apply it to a test dataset.
> Which code block allows the data engineer to register the MLFlow model as a Spark UDF ?

`predict_udf = mlflow.pyfunc.spark_udf(spark, "model_url")`

---


# Não rotuladas
