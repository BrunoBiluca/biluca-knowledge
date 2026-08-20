# CTAS (Create Tables as Select)

Na plataforma [[Databricks]] podemos utilizar de [expressões CTAS](https://docs.databricks.com/pt/sql/language-manual/sql-ref-syntax-ddl-create-table-using.html) para criar tabelas ([[Delta lake]]) que automaticamente inferem seu esquema a partir dados externos bem estruturados como parquet. 

Essas tabelas são criadas a partir do resultado de uma consulta e **não tem nenhum tipo de ligação com a tabela fonte (base)**, assim mesmo que as tabelas utilizadas como fontes forem removidas as tabelas criadas como CTAS continuam operando normalmente.

```sql
-- Definição da tabela purchases através de CTAS
-- As colunas timestamp são definidas como timestamp do Unix, o que não é interessante para análises
CREATE OR REPLACE TABLE purchases AS
SELECT order_id AS id, transaction_timestamp, purchase_revenue_in_usd AS price
FROM sales;

-- | id  | transaction_timestamp | price |
-- | --- | --------------------- | ----- |
-- | 1   | 600000000             | 42.0  |
```

Para outros tipos de fontes de **dados menos estruturados** podemos criar uma tabela temporária fazer as transformações necessárias e importar na tabela principal.

```sql
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

Como Delta Lake força esquema na escrita, **restrições em cada coluna são suportadas** durante a escrita das tabelas.

> [!tip] Tabelas gerenciadas
> Caso a tabela seja criada sem especificar o *LOCATION*, essa tabela passa a ser gerenciada pelo Databricks (metadados e dados).