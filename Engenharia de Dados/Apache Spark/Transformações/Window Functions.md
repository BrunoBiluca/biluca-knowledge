# Window Functions

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