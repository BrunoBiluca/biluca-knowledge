
# Governança

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
# Delta Table (código)

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

# Configuração de Jobs

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
> The data engineering team has a table ‘orders_backup’ that was created using Delta Lake’s SHALLOW CLONE functionality from the table ‘orders’. Recently, the team started getting an error when querying the ‘orders_backup’ table indicating that some data files are no longer present.
> Which of the following correctly explains this error ?



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



---
> [!info] Pergunta
> The data engineering team has a Delta Lake table named ‘daily_activities’ that is completely overwritten each night with new data received > from the source system.
> 
> For auditing purposes, the team wants to set up a post-processing task that uses Delta Lake Time Travel functionality to determine the difference between the new version and the previous version of the table. They start by getting the current table version via this code:
> 
> ```python
> current_version = spark.sql("SELECT max(version) FROM (DESCRIBE HISTORY daily_activities)").collect()[0][0]
> ```
> 
> Which of the following queries can be used by the team to complete this task ?

Podemos fazer isso utilizando a instrução MINUS. 
https://www.1keydata.com/pt/sql/sql-minus.php

---
> [!info] Pergunta
> The data engineering team wants to build a pipeline that receives customers data as change data capture (CDC) feed from a source system. The CDC events logged at the source contain the data of the records along with metadata information. This metadata indicates whether the specified record was inserted, updated, or deleted. In addition to a timestamp column identified by the field update_time indicating the order in which the changes happened. Each record has a primary key identified by the field customer_id.
> 
> In the same batch, multiple changes for the same customer could be received with different update_time. The team wants to store only the most recent information for each customer in the target Delta Lake table.
> 
> Which of the following solutions meets these requirements?



---
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
> ```
> 
> Which option correctly fills in the blank to execute the sql query in the function on a cluster with Databricks Runtime below 10.5 ?

⁉️ Verificar as adições ao Databricks runtime 10.5
Antes do Databricks Runtime 10.5 se utilizava o comando `microBatchDF._jdf.sparkSession().sql(sql_query)`

---
> [!info] Pergunta
> The data engineering team has a singleplex bronze table called ‘orders_raw’ where new orders data is appended every night. They created a new Silver table called ‘orders_cleaned’ in order to provide a more refined view of the orders data.
> 
> The team wants to create a batch processing pipeline to process all new records inserted in the orders_raw table and propagate them to the orders_cleaned table.
> 
> Which solution minimizes the compute costs to propagate this batch of data?



---
> [!info] Pergunta 
> The data engineering team has a Silver table called ‘sales_cleaned’ where new sales data is appended in near real-time.
> 
> They want to create a new Gold-layer entity against the ‘sales_cleaned’ table to calculate the year-to-date (YTD) of the sales amount. The new entity will have the following schema:
> 
> country_code STRING, category STRING, ytd_total_sales FLOAT, updated TIMESTAMP
> 
> It’s enough for these metrics to be recalculated once daily. But since they will be queried very frequently by several business teams, the data engineering team wants to cut down the potential costs and latency associated with materializing the results.
> 
> Which of the following solutions meets these requirements?



---
> [!info] Pergunta
> A data engineer wants to calculate predictions using a MLFlow model logged in a given “model_url”. They want to register the model as a Spark UDF in order to apply it to a test dataset.
> Which code block allows the data engineer to register the MLFlow model as a Spark UDF ?



---
> [!info] Pergunta
> “A Delta Lake’s functionality that automatically compacts small files during individual writes to a table by performing two complementary operations on the table”
> 
> Which of the following is being described in the above statement?

⁉️ Verificar o que esse auto compaction faz
Auto compaction

---
> [!info] Pergunta
> The data engineering team has a large external Delta table where new changes are merged very frequently. They enabled Optimized writes and Auto Compaction on the table in order to automatically compact small data files to target files of size 128 MB. However, when they look at the table directory, they see that most data files are smaller than 128 MB.
> 
> Which of the following likely explains these smaller file sizes ?



---
> [!info] Pergunta
> Which statement regarding streaming state in Stream-Stream Joins is correct?
> 



---
> [!info] Pergunta
> Which statement regarding static Delta tables in Stream-Static joins is correct?
> 



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

Watermark

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



---
> [!info] Pergunta
> Which statement regarding checkpointing in Spark Structured Streaming is **Not** correct?



---
> [!info] Pergunta
> Which of the following statements best describes Delta Lake Auto Compaction?
> 



---
> [!info] Pergunta
> Which of the following statements best describes Auto Loader ?
> 



---
> [!info] Pergunta
> Which of the following functions can a data engineer use to return a new DataFrame containing the distinct rows from a given DataFrame based on multiple columns?
> 



---
> [!info] Pergunta
> Which of the following approaches allows to correctly perform streaming deduplication ?
> 



---
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



---
> [!info] Pergunta
> The data engineering team maintains a Type 1 table that is overwritten each night with new data received from the source system.
> 
> A junior data engineer has suggested enabling the Change Data Feed (CDF) feature on the table in order to identify those rows that were updated, inserted, or deleted.
> 
> Which response to the junior data engineer's suggestion is correct?



---
> [!info] Pergunta
> A data engineer wants to ingest input json data into a target Delta table. They want the data ingestion to happen incrementally in near real-time.
> Which option correctly meets the specified requirement ?




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

? Verificar se a sintaxe do trigger é essa mesmo

```python
...
.trigger(processingTime="2 minutes")
...
```

---
> [!info] Pergunta
> Which statement regarding Delta Lake File Statistics is correct?
> 



---
> [!info] Pergunta
> A data engineer uses the following SQL query:
> 
> `GRANT USAGE ON DATABASE sales_db TO finance_team`
> 
> Which of the following is the benefit of the USAGE privilege ?



---
> [!info] Pergunta
> The data engineering team is using the LOCATION keyword for every new Delta Lake table created in the Lakehouse.
> 
> Which of the following describes the purpose of using the LOCATION keyword in this case ?



---
> [!info] Pergunta
> A data engineer wants to create a Delta Lake table for storing user activities of a website. The table has the following schema:
> 
> user_id LONG, page STRING, activity_type LONG, ip_address STRING, activity_time TIMESTAMP, activity_date DATE
> 
> Based on the above schema, which column is a good candidate for partitioning the Delta Table?



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



---
> [!info] Pergunta
> Which of the following is the benefit of Delta Lake File Statistics ?

? Verificar as características do Delta Lake File Statistics
Utilizar o Delta Lake File Statistics permite possibilitar o pulo de arquivos de dados em algumas queries para melhor performance.

---
> [!info] Pergunta
> The data engineering team created a new Databricks job for processing sensitive financial data. A financial analyst asked the team to transfer the "Owner" privilege of this job to the “finance” group.
> 
> A junior data engineer that has the “CAN MANAGE” permission on the job is attempting to make this privilege transfer via Databricks Job UI, but it keeps failing.
> 
> Which of the following explains the cause of this failure?


---
> [!info] Pergunta
> The data engineering team noticed that a partitioned Delta Lake table is suffering greatly. They are experiencing slowdowns for most general queries on this table.
> 
> The team tried to run an OPTIMIZE command on the table, but this did not help to resolve the issue.
> 
> Which of the following likely explains the cause of these slowdowns?



---
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

Esse é um caso de utilizar o VACCUM, já que os dados irão continuar no histórico e de acordo com a legislação é necessário remover todo o histórico do usuário.

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



---
> [!info] Pergunta
> The data engineering team has a secret scope named ‘DataOps-Prod’ that contains all secrets needed by DataOps engineers in a production workspace.
> 
> Which of the following is the minimum permission required for the DataOps engineers to use the secrets in this scope ?



---
> [!info] Pergunta
> Which of the following is **Not** part of the Ganglia UI ?

O Ganglia UI apresenta todos os recursos computacionais do cluster, porém não tem informações específicas de eventos que estão ocorrendo no cluster.

---
> [!info] Pergunta
> 
> A data engineer is using Databricks REST API to send a GET request to the endpoint ‘api/2.1/jobs/runs/get’ to retrieve the run’s metadata of a multi-task job using its run_id.
> Which statement correctly describes the response structure of this API call?



---
> [!info] Pergunta
> A data engineer has noticed the comment ‘# Databricks notebook source’ on the first line of each Databricks Python file’s source code pushed to Github.
> 
> Which of the following explain the purpose of this comment ?

Esse comentário estabelece que o arquivo python age como um notebook do Databricks.

---
> [!info] Pergunta
> Which of the following statements best describes DBFS ?

Abstração sobre o Lakehouse da Databricks que provê uma solução aberta para compartilhar dados entre qualquer plataforma de computação.

---
> [!info] Pergunta
> A data engineer wants to install a Python wheel scoped to the current notebook’s session, so only the current notebook and any jobs associated with this notebook have access to that library.
> 
> Which of the following commands can the data engineer use to complete this task?

? Verificar se pacotes wheel são instalados dessa forma mesmo

```
%pip install my_package.whl
```

---
> [!info] Pergunta
> Which of the following statements correctly describes the sys.path Python variable ?
> 

?

---
> [!info] Pergunta
> Which of the following statements correctly describes assertions in unit testing ?

Uma asserção é uma expressão booleana que verifica se as premissas feitas no código ainda permanecem verdadeiras após o desenvolvimento.

---
> [!info] Pergunta
> Which of the following statements correctly describes End-to-End Testing ?
> 

É uma técnica de testes que verificar se os sub-sistemas funcionam como esperado quando testados como um grupo.

