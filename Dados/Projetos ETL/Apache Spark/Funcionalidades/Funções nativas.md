
> [!tip] When possible try to leverage Spark SQL standard library functions as they are a little bit more compile-time safety, handles null and perform better when compared to UDF’s.

# Funções

- [String Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#string)
- [Date & Time Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#date-time)
- [Math Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#math)
- [Aggregate Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#aggregate)
- Sorting functions

## Collection functions
- [Collection Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#collection)

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
### Manipulação de dados aninhados

- [Artigo de apresentação da funcionalidade de manipulação nativa de dados aninhados](https://www.databricks.com/blog/2017/05/24/working-with-nested-data-using-higher-order-functions-in-sql-on-databricks.html)

Acessando elementos dentros de um campo aninhado:
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
## WithColumn

`WithColumn` é usada para criar uma nova coluna a partir de uma transformação de uma ou mais colunas no mesmo conjunto.

```python
df.withColumn(<nome>, <função>)

# exemplo: substitui a coluna items por uma com os valores explodidos
df.withColumn("items", explode(col("items")))
```

## Window Functions

> [!info] Documentação
> - [Funções em Janelas](https://sparkbyexamples.com/spark/spark-sql-functions/#window)

Funções de janela operam sobre um grupo de linhas e retorna uma único valor para cada linha em relação a janela desejada. Window não é uma forma de agregação, mas uma forma atribuir valores a cada uma das linhas que compõem esse conjunto.

Existem 3 tipos de funções de janela no Spark:
- [ranking functions](https://sparkbyexamples.com/spark/spark-sql-window-functions/#ranking-functions)
- [analytic functions](https://sparkbyexamples.com/spark/spark-sql-window-functions/#analytic-functions)
- [aggregate functions](https://sparkbyexamples.com/spark/spark-sql-window-functions/#aggregate-functions)

Usando como exemplo a lista de salários dos integrantes de uma empresa:

```scala
import spark.implicits._
import org.apache.spark.sql.functions._
import org.apache.spark.sql.expressions.Window

val simpleData = Seq(
	("James", "Sales", 3000),
	("Michael", "Sales", 4600),
	("Robert", "Sales", 4100),
	("Maria", "Finance", 3000),
	("James", "Sales", 3000),
	("Scott", "Finance", 3300),
	("Jen", "Finance", 3900),
	("Jeff", "Marketing", 3000),
	("Kumar", "Marketing", 2000),
	("Saif", "Sales", 4100)
)
  
simpleData.toDF("employee_name", "department", "salary")

val windowSpec = Window.partitionBy("department").orderBy("salary")
df
	.withColumn("row_number", row_number().over(windowSpec))
	.withColumn("cume_dist", cume_dist().over(windowSpec))
	.withColumn("rank", rank().over(windowSpec))
```

Resultado

| employee_name | department | salary | row_number | cume_dist          | rank |
| ------------- | ---------- | ------ | ---------- | ------------------ | ---- |
| James         | Sales      | 3000   | 1          | 0.4                | 1    |
| James         | Sales      | 3000   | 2          | 0.4                | 1    |
| Robert        | Sales      | 4100   | 3          | 0.8                | 3    |
| Saif          | Sales      | 4100   | 4          | 0.8                | 4    |
| Michael       | Sales      | 4600   | 5          | 1.0                | 5    |
| Maria         | Finance    | 3000   | 1          | 0.3333333333333333 | 1    |
| Scott         | Finance    | 3300   | 2          | 0.6666666666666666 | 2    |
| Jen           | Finance    | 3900   | 3          | 1.0                | 3    |
| Kumar         | Marketing  | 2000   | 1          | 0.5                | 1    |
| Jeff          | Marketing  | 3000   | 2          | 1.0                | 2    |

| Function  | Type     | Description                                                                                     | Explicação do exemplo                                                                                                                                                                                                                                                                                                       |
| --------- | -------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rank      | ranking  | retornar o rank das linhas dentro de uma partição de janela baseado em seus valores             | Parecido com o resultado de `row_count`, porém pode apresentar buracos entre os valores em caso de empates, já que o mesmo rank é aplicado a linhas com valores iguais.                                                                                                                                                     |
| row_count | ranking  |                                                                                                 | Determina a posição de cada integrante dado o seu salário em relação ao departamento                                                                                                                                                                                                                                        |
| cume_dist | analytic | window function is used to get the cumulative distribution of values within a window partition. | Nesse caso a **janela selecionada foi o departamento e a ordem o salário**, então o valor da distância do cume é a posição que cada salário representa em relação ao maior valor.<br><br>No departamento de Sales até 40% das pessoas recebe $3000, 80% das pessoas recebem até $4100 e todas as pessoas recebem até $4600. |

### Window aggregate functions

```scala
val windowSpec  = Window.partitionBy("department").orderBy("salary")
val windowSpecAgg  = Window.partitionBy("department")
val aggDF = df
	.withColumn("row", row_number.over(windowSpec))
    .withColumn("avg", avg(col("salary")).over(windowSpecAgg))
    .withColumn("sum", sum(col("salary")).over(windowSpecAgg))
    .withColumn("min", min(col("salary")).over(windowSpecAgg))
    .withColumn("max", max(col("salary")).over(windowSpecAgg))
    .where(col("row") === 1) # acredito que isso seja para consolidar apenas a primeira linha e evitar duplicatas
    .select("department","avg","sum","min","max")
    .show()

+----------+------+-----+----+----+
|department|   avg|  sum| min| max|
+----------+------+-----+----+----+
|     Sales|3760.0|18800|3000|4600|
|   Finance|3400.0|10200|3000|3900|
| Marketing|2500.0| 5000|2000|3000|
+----------+------+-----+----+----+

```