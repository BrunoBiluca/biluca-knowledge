
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


# Mesclagens (join)

- Emp Dataset (empDF)

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     |
| 6      | Brown    | 2               | 2010        | 50          |        | -1     |

- Dept Dataset (deptDF)

| dept_name | dept_id |
|-----------|---------|
| Finance   | 10      |
| Marketing | 20      |
| Sales     | 30      |
| IT        | 40      |

### Inner join

A junção padrão que é usado para juntar dois databases por uma coluna definida.

```python
empDF.join(deptDF, empDF["emp_dept_id"] ==  deptDF["dept_id"], "inner")
```

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary | dept_name | dept_id |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ | --------- | ------- |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   | Finance   | 10      |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   | Marketing | 20      |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   | Finance   | 10      |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   | Finance   | 10      |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     | IT        | 40      |

### Outer join

Mesclagens do tipo Outer, full, fullouter retornam todas as linhas de ambos Dataframes, quando a expressão não casa é retornado null.

```python
empDF.join(deptDF, empDF["emp_dept_id"] == deptDF["dept_id"], "outer").show(truncate=False)
empDF.join(deptDF, empDF["emp_dept_id"] == deptDF["dept_id"], "full").show(truncate=False)
empDF.join(deptDF, empDF["emp_dept_id"] == deptDF["dept_id"], "fullouter").show(truncate=False)
```

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary | dept_name | dept_id |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ | --------- | ------- |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   | Finance   | 10      |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   | Marketing | 20      |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   | Finance   | 10      |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   | Finance   | 10      |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     | IT        | 40      |
| 6      | Brown    | 2               | 2010        | 50          |        | -1     | null      | null    |
| null   | null     | null            | null        | null        | null   | null   | Sales     | 30      |
Até a linha 5 o outer join tem o mesmo comportamento do inner join, na linha 6 não foi possível encontrar uma correspondência em `deptDF` para o `emp_dept_id = 50` e na linha 7 não foi possível encontrar uma correspondência em `empDF` para o `dept_id = 30`.

### Left e Right Outer Join

Funcionam como o [[#Outer join]], porém retornam apenas as linhas relacionadas a direção do Dataframe desejado.

### Left Semi Join

É similar ao [[#Inner join]] porém retorna apenas as colunas do Dataframe á esquerda para as linhas que correspondem a expressão.

```python
empDF.join(deptDF, empDF["emp_dept_id"] ==  deptDF["dept_id"], "leftsemi")
```

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     |
### Left anti join

É exatamente o oposto do [[#Left Semi Join]], `leftanti` retorna apenas as colunas do Dataframe à esquerda que não correspondem a expressão definida.

```python
empDF.join(deptDF, empDF["emp_dept_id"] ==  deptDF["dept_id"], "leftanti")
```

| emp_id | name  | superior_emp_id | year_joined | emp_dept_id | gender | salary |
| ------ | ----- | --------------- | ----------- | ----------- | ------ | ------ |
| 6      | Brown | 2               | 2010        | 50          |        | -1     |
### Self join

Não existe um tipo específico de auto mesclagem disponível no Spark, porém podemos utilizar qualquer um dois outros tipos para fazer essa operação.

```scala
empDF.as("emp1").join(
  empDF.as("emp2"),
  col("emp1.superior_emp_id") === col("emp2.emp_id"),
  "inner"
)
.select(
  col("emp1.emp_id"),col("emp1.name"),
  col("emp2.emp_id").as("superior_emp_id"),
  col("emp2.name").as("superior_emp_name")
)
```

No caso acima estamos buscando os contratados superiores de cada empregado.

| emp_id | name     | superior_emp_id | superior_emp_name |
| ------ | -------- | --------------- | ----------------- |
| 2      | Rose     | 1               | Smith             |
| 3      | Williams | 1               | Smith             |
| 4      | Jones    | 2               | Rose              |
| 5      | Brown    | 2               | Rose              |
| 6      | Brown    | 2               | Rose              |

### Cross join

Retorna o produto cartesiano de dois Dataframes, ou seja, cada possibilidade de combinação entre duas linhas

```python
df1 = spark.createDataFrame([(1, 'Alice', 25), (2, 'Bob', 30)], ['id', 'name', 'age']) 
df2 = spark.createDataFrame([('Tom', 80), ('Bob', 85), ('Alice', 70)], ['name', 'height']) 

cross_join_result = df1.crossJoin(df2) cross_join_result.show()
```

Nesse caso todas as combinações entre os dois Dataframes são 2 (linhas em df1) e 3 (linhas em df2) assim 6 no total.

| id  | name  | age | name  | height |
| --- | ----- | --- | ----- | ------ |
| 1   | Alice | 25  | Tom   | 80     |
| 1   | Alice | 25  | Bob   | 85     |
| 1   | Alice | 25  | Alice | 70     |
| 2   | Bob   | 30  | Tom   | 80     |
| 2   | Bob   | 30  | Bob   | 85     |
| 2   | Bob   | 30  | Alice | 70     |
### Expressões SQL

Também é possível fazer qualquer operação de mesclagem a partir da notação SQL.

```scala
empDF.createOrReplaceTempView("EMP")
deptDF.createOrReplaceTempView("DEPT")

spark.sql("select * from EMP e, DEPT d where e.emp_dept_id == d.dept_id")

spark.sql("select * from EMP e INNER JOIN DEPT d ON e.emp_dept_id == d.dept_id")
```


# Pivoteamento

A função `pivot()` é utilizada para rotacionar ou transpor dados de uma coluna para várias colunas, ou o contrário utilizando `stack()`.

Síntaxe

```python
pivot_df = original_df
	.groupBy("grouping_column")
	.pivot("pivot_column")
	.agg({"agg_column": "agg_function"})
```

Operações de pivoteamento exigem combinações únicas de agrupamento e as colunas pivôs. No exemplo abaixo fazermos o agrupamento dos produtos e o pivoteamento pelo País, ou seja, entre essas colunas não existem valores duplicados já que cada produto irá ser mostrado para cada país, caso existissem produtos ou países duplicados seria necessário utilizar algum outro tipo de agrupamento para resover esses conflitos.

Exemplo

| Product | Amount | Country |
| ------- | ------ | ------- |
| Banana  | 1000   | USA     |
| Carrots | 1500   | USA     |
| Beans   | 1600   | USA     |
| Orange  | 2000   | USA     |
| Orange  | 2000   | USA     |
| Banana  | 400    | China   |
| Carrots | 1200   | China   |
| Beans   | 1500   | China   |
| Orange  | 4000   | China   |
| Banana  | 2000   | Canada  |
| Carrots | 2000   | Canada  |
| Beans   | 2000   | Mexico  |
Podemos fazer a transposição desse conjunto de dados para saber por País a quantidade de produtos.

```python
pivotDF = df.groupBy("Product").pivot("Country").sum("Amount")
```

| Product | Canada | China | Mexico | USA  |
|---------|--------|-------|--------|------|
| Orange  | null   | 4000  | null   | 4000 |
| Beans   | null   | 1500  | 2000   | 1600 |
| Banana  | 2000   | 400   | null   | 1000 |
| Carrots | 2000   | 1200  | null   | 1500 |
Todos os países que não tem correspondente de produto são identificados por `null`.

Podemos fazer a operação inversa utilizando a função `stack`.

Sintaxe

```python
stack(n, expr1, expr2.. exprn)
```

onde `n` é o número de linhas que serão criadas para cada linha da tabela pivô, os outros atributos são expressões SQL que podem ser utilizadas, como adicionar um texto literal `'Texto literal'` ou utilizar o valor da coluna `<nome da coluna>`.

```python
from pyspark.sql.functions import expr
unpivotExpr = "stack(3, 'Canada', Canada, 'China', China, 'Mexico', Mexico) as (Country,Total)"
unPivotDF = pivotDF
	.select("Product", expr(unpivotExpr))
    .where("Total is not null")
```

Decomposição da expressão stack utilizada

```python
stack(
	  3, # número de linhas criadas para cada linha da tabela pivoteada
	  'Canada', Canada, # primeira linha
	  'China', China,   # segunda linha
	  'Mexico', Mexico  # terceira linha
) as (Country,Total)
```

|Product|Country|Total|
|---|---|---|
|Orange|China|4000|
|Beans|China|1500|
|Beans|Mexico|2000|
|Banana|Canada|2000|
|Banana|China|400|
|Carrots|Canada|2000|
|Carrots|China|1200|
