---
tags:
  - análise_de_dados
  - engenharia_de_dados
---
[Spark](https://spark.apache.org/) is an open-source distributed general-purpose cluster computing framework. Spark’s in-memory data processing engine conducts analytics, ETL, machine learning and graph processing on data in motion or at rest. It offers high-level APIs for the programming languages: Python, Java, Scala, R, and SQL.

The Apache Spark Architecture is founded on Resilient Distributed Datasets (RDDs). These are distributed immutable tables of data, which are split up and allocated to workers. The worker executors implement the data. The RDD is immutable, so the worker nodes cannot make alterations; they process information and output results.

# Funções nativas
> [!tip] When possible try to leverage Spark SQL standard library functions as they are a little bit more compile-time safety, handles null and perform better when compared to UDF’s.

- [String Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#string)
- [Date & Time Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#date-time)
- [Collection Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#collection)
- [Math Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#math)
- [Aggregate Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#aggregate)
- Sorting functions
## [Window Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#window)
Funções de janela operam sobre um grupo de linhas e retorna uma único valor para cada linha em relação a janela desejada. Window não é uma forma de agregação, mas uma forma atribuir valores a cada uma das linhas que compõem esse conjunto.

Existem 3 tipos de funções de janela no Spark:
- [ranking functions](https://sparkbyexamples.com/spark/spark-sql-window-functions/#ranking-functions)
- [analytic functions](https://sparkbyexamples.com/spark/spark-sql-window-functions/#analytic-functions)
- [aggregate functions](https://sparkbyexamples.com/spark/spark-sql-window-functions/#aggregate-functions)

Usando como exemplo a lista de salários dos integrantes de uma empresa:

```scala
import spark.implicits._

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
  
	+-------------+----------+------+
	|employee_name|department|salary|
	+-------------+----------+------+
	|        James|     Sales|  3000|
	|      Michael|     Sales|  4600|
	|       Robert|     Sales|  4100|
	|        Maria|   Finance|  3000|
	|        James|     Sales|  3000|
	|        Scott|   Finance|  3300|
	|          Jen|   Finance|  3900|
	|         Jeff| Marketing|  3000|
	|        Kumar| Marketing|  2000|
	|         Saif|     Sales|  4100|
	+-------------+----------+------+
```

### row_count (função de ranking)
Podemos saber qual a posição de cada integrante em relação ao seu salário aplicando a função `row_count`, função de ranking.

```scala
import org.apache.spark.sql.functions._
import org.apache.spark.sql.expressions.Window

//row_number: Returns a sequential number starting from 1 within a window partition
val windowSpec = Window.partitionBy("department").orderBy("salary") // ascendente
df.withColumn("row_number", row_number.over(windowSpec))
	.show()
  
+-------------+----------+------+----------+
|employee_name|department|salary|row_number|
+-------------+----------+------+----------+
|        James|     Sales|  3000|         1|
|        James|     Sales|  3000|         2|
|       Robert|     Sales|  4100|         3|
|         Saif|     Sales|  4100|         4|
|      Michael|     Sales|  4600|         5|
|        Maria|   Finance|  3000|         1|
|        Scott|   Finance|  3300|         2|
|          Jen|   Finance|  3900|         3|
|        Kumar| Marketing|  2000|         1|
|         Jeff| Marketing|  3000|         2|
+-------------+----------+------+----------+

```

### cume_dist (função analítica)
Distância do cume, avalia a distância em relação a uma propriedade para com o seu valor mais alto na janela.
Nesse caso a **janela selecionada foi o departamento e a ordem o salário**, então o valor da distância do cume é a posição que cada salário representa em relação ao maior valor.

No departamento de Sales até 40% das pessoas recebe $3000, 80% das pessoas recebem até $4100 e todas as pessoas recebem até $4600.

```scala
import org.apache.spark.sql.functions._
import org.apache.spark.sql.expressions.Window

val windowSpec = Window.partitionBy("department").orderBy("salary") // ascendente
df.withColumn("cume_dist", cume_dist().over(windowSpec))
    .show()
  
+-------------+----------+------+------------------+
|employee_name|department|salary|         cume_dist|
+-------------+----------+------+------------------+
|        James|     Sales|  3000|               0.4|  # 3000 / 4600
|        James|     Sales|  3000|               0.4|
|       Robert|     Sales|  4100|               0.8|
|         Saif|     Sales|  4100|               0.8|
|      Michael|     Sales|  4600|               1.0|
|        Maria|   Finance|  3000|0.3333333333333333|
|        Scott|   Finance|  3300|0.6666666666666666|
|          Jen|   Finance|  3900|               1.0|
|        Kumar| Marketing|  2000|               0.5|
|         Jeff| Marketing|  3000|               1.0|
+-------------+----------+------+------------------+
```



# Principais diferenças entre Spark 2 e Spark 3
Apache Spark 3 foi lançado em 2020 e trouxe várias melhorias em relação ao seu antecessor Apache Spark 2 (2016)

- Performance: o Adaptive Query Execution é uma funcionalidade que automaticamente otimiza consultadas baseadas em várias características dos dados além das melhorias com o Apache Arrow para integração.
- Python API: melhoria na integração do python principalmente na utilização do Pandas.
- SQL Engine
- Machine Learning
- Nova interface para Streaming de dados

### Adaptive Query Execution
Prior to 3.0, Spark does the optimization by creating an execution plan before the query starts executing, once execution starts Spark doesn’t do any further optimization which is based on metrics it collects during runtime. AQE bridges this gap by applying the second level of optimization based on the metrics it sees with each stage.

Adaptive Query Execution is disabled by default. In order to enable Set `spark.sql.adaptive.enabled` configuration property to `true`.

# PySpark e testes automatizados

### How should you create a SparkSession for your tests?

Initiating a new spark session for each test would dramatically increase the time to run the tests and introduce a ton of boiler-plate code to your tests.

Efficiently, creating and sharing a SparkSession across your tests is vital to keep the performance of your tests at an acceptable level.

# PySpark com VEnv

### Configurações

| Property | Description |
| ---- | ---- |
| spark.pyspark.virtualenv.enabled | Property flag to enable virtualenv |
| spark.pyspark.virtualenv.type | Type of virtualenv. Valid values are “native”, “conda” |
| spark.pyspark.virtualenv.requirements | Requirements file (optional, not required for interactive mode) |
| spark.pyspark.virtualenv.bin.path | The location of virtualenv executable file for type native or conda executable file for type conda |
| spark.pyspark.virtualenv.python_version | Python version for conda. (optional, only required when you use conda in interactive mode) |
# Docker básico para submits

```yml
version: '3.7'

services:
  spark-master:
    image: bitnami/spark:latest
    container_name: spark-master
    command: bin/spark-class org.apache.spark.deploy.master.Master
    ports:
      - "9090:8080"
      - "7077:7077"
    volumes:
      - ./src:/opt/bitnami/spark/src
      - ./tests:/opt/bitnami/spark/tests  

  spark-worker-1:
    image: bitnami/spark:latest
    container_name: spark-worker-1
    command: bin/spark-class org.apache.spark.deploy.worker.Worker spark://spark-master:7077
    depends_on:
      - spark-master
    environment:
      SPARK_MODE: worker
      SPARK_WORKER_CORES: 2
      SPARK_WORKER_MEMORY: 2g
      SPARK_MASTER_URL: spark://spark-master:7077

  spark-worker-2:
    image: bitnami/spark:latest
    container_name: spark-worker-2
    command: bin/spark-class org.apache.spark.deploy.worker.Worker spark://spark-master:7077
    depends_on:
      - spark-master
    environment:
      SPARK_MODE: worker
      SPARK_WORKER_CORES: 2
      SPARK_WORKER_MEMORY: 2g
      SPARK_MASTER_URL: spark://spark-master:7077
```

# Submissão de jobs

### Utilização do múltiplos arquivos

Digamos que temos o seguinte projeto:

```
- src
   |- jobs
   |   L job_1.py
   |- common
   |   L common.py
   L main.py
```

Comando de submissão para a execução do projeto, partindo como o script `main.py` como entrada.

```
spark-submit --py-files src.zip main.py
```

Os scripts deve ter a referência a partir da pasta raiz

```python
# jobs_1.py
import src.common.common
common_function()

# main.py
from src.jobs import jobs_1
jobs_1.start()
```

Dessa forma os caminhos estarão corretos no projeto.

# Implementações na AWS

## EMR Serverless

[Running jobs from the AWS CLI - Amazon EMR](https://docs.aws.amazon.com/emr/latest/EMR-Serverless-UserGuide/jobs-cli.html) (Melhor documentação para os parâmetros) define a interface padrão por CLI utilizada para executar as operações em relação ao EMR Serverless.

# Referências

- [Using VirtualEnv with PySpark - Cloudera Community - 245932](https://community.cloudera.com/t5/Community-Articles/Using-VirtualEnv-with-PySpark/ta-p/245932)
- [Unit testing PySpark code using Pytest | Engineering for Data Science](https://engineeringfordatascience.com/posts/pyspark_unit_testing_with_pytest/)
	- Bom exemplo de utilização do Pytest para executar os testes
- [How to Install Apache Spark on Windows 10 (phoenixnap.com)](https://phoenixnap.com/kb/install-spark-on-windows-10)
	- No passo de instalação do windowutils, não é para criar uma pasta apenas com o .exe sugerido no arquivo, é para baixar a pasta completa