# Collection functions

> [!quote]- (Documentação) - [Collection Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#collection)
> Definição e exemplos de funções nativas relacionadas a coleções.

- `size()` - retorna o tamanho de um array
- `array_distinct()`: remove valores duplicados do array


### sort_array()

Também é possível ordenar arrays.

```py
df = spark.createDataFrame([([2, 1, None, 3],),([1],),([],)], ['data'])

>>> df.select(sort_array(df.data).alias('r')).collect()
[Row(r=[None, 1, 2, 3]), Row(r=[1]), Row(r=[])]

>>> df.select(sort_array(df.data, asc=False).alias('r')).collect()
[Row(r=[3, 2, 1, None]), Row(r=[1]), Row(r=[])]
```

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

> [!quote]- (Artigo) - [Working with nested data using higher order functions in sql on databricks](https://www.databricks.com/blog/2017/05/24/working-with-nested-data-using-higher-order-functions-in-sql-on-databricks.html)
> Demonstra a funcionalidade de manipulação de dados aninhados em SQL

Acessando elementos dentro de um campo aninhado:

```sql
-- tabela: events
-- coluna: value 
-- atributo da coluna value: event_name
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

#### Exemplo de agregação em dados aninhados

Seja a tabela nested_data abaixo:

| key | values     |
| --- | ---------- |
| A   | [2, 8]     |
| B   | [3, 3, 9]  |
| C   | [1, 4, 16] |

Podemos aplicar a média geométrica entre cada elemento em `values`.

```sql
-- média geométrica de todos os valores do array
SELECT key,
	values,
	AGGREGATE(values,
	   (1.0 AS product, 0 AS N), -- define o valor inicial da agregação (buffer)
	   (buffer, value) -> (value * buffer.product, buffer.N + 1),
	   buffer -> Power(buffer.product, 1.0 / buffer.N)
	) geomean
FROM nested_data
```

Na consulta acima temos os valores da agregação persistidos em um buffer com dois elementos, `product` produto entre valores e o `N` número de valores.

Como resultado teremos:

| key | values     | geomean           |
| --- | ---------- | ----------------- |
| A   | [2, 8]     | 4.0 (√(2×8))      |
| B   | [3, 3, 9]  | 4.3267 (∛(3×3×9)) |
| C   | [1, 4, 16] | 4.0 (∛(1×4×16))   |
