## Collection functions

> [!quote]- (Documentação) - [Collection Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#collection)
> Definição e exemplos de funções nativas relacionadas a coleções.

- `size()`
- `array_distinct()`: remove valores duplicados do array

### flatten()

Nivela elementos de lista dentro de listas para uma lista única

```python
from pyspark.sql import Row
from pyspark.sql.functions import flatten

df = spark.createDataFrame([
    Row(column=[[1,2,3], [4, 5], [6, 7,8, 9]]),
])

display(df.select(flatten("column")))

| flatten(column)     |
+ ------------------- +
| [1,2,3,4,5,6,7,8,9] |
```

### collect_set() 
Retorna todos os valores de uma coluna de entrada com os valores duplicados removidos.

```python
df.select(collect_set("salary"))

|collect_set(salary)                 |
+------------------------------------+
|[4600, 3000, 3900, 4100, 3300, 2000]|
```

### explode()

`explode()` explode um conjunto de dados aninhados para que cada item desse conjunto forme uma linha exclusiva.

```python
# exemplo: explode a coluna de itens para cada linha ser um item
df.withColumn("items", explode(col("items")))
```

Antes

| pedido | itens                                                                                                                                                                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | [{"coupon":null,"item_id":"M_PREM_F","item_name":"Premium Full Mattress","item_revenue_in_usd":1695,"price_in_usd":1695,"quantity":1},{"coupon":null,"item_id":"P_FOAM_S","item_name":"Standard Foam Pillow","item_revenue_in_usd":59,"price_in_usd":59,"quantity":1}] |
Depois do `explode()`:

| pedido | itens                                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1      | {"coupon":null,"item_id":"M_PREM_F","item_name":"Premium Full Mattress","item_revenue_in_usd":1695,"price_in_usd":1695,"quantity":1} |
| 1      | {"coupon":null,"item_id":"P_FOAM_S","item_name":"Standard Foam Pillow","item_revenue_in_usd":59,"price_in_usd":59,"quantity":1}      |
### Manipulação de dados aninhados em SQL

- [Artigo de apresentação da funcionalidade de manipulação nativa de dados aninhados](https://www.databricks.com/blog/2017/05/24/working-with-nested-data-using-higher-order-functions-in-sql-on-databricks.html)

Acessando elementos dentro de um campo aninhado:

```sql
SELECT * FROM events where value:event_name = "finalize"
```

Transformando campos aninhados:
```sql
SELECT key,
values,
TRANSFORM(values, value -> value + 1) AS values_plus_one
FROM nested_data
```

outras funções disponíveis:
- `exists`
- `filter`
- `reduce`
- `aggregate`

```sql
-- média geométrica de todos os valores do array
SELECT key,
	values,
	AGGREGATE(values,
	   (1.0 AS product, 0 AS N), -- define o valor inicial da agregação
	   (buffer, value) -> (value * buffer.product, buffer.N + 1),
	   buffer -> Power(buffer.product, 1.0 / buffer.N)
	) geomean
FROM nested_data
```