---
tags:
  - análise_de_dados
  - engenharia_de_dados
---
[Spark](https://spark.apache.org/) is an open-source distributed general-purpose cluster computing framework. Spark’s in-memory data processing engine conducts analytics, ETL, machine learning and graph processing on data in motion or at rest. It offers high-level APIs for the programming languages: Python, Java, Scala, R, and SQL.

The Apache Spark Architecture is founded on Resilient Distributed Datasets (RDDs). These are distributed immutable tables of data, which are split up and allocated to workers. The worker executors implement the data. The RDD is immutable, so the worker nodes cannot make alterations; they process information and output results.

- Funcionalidades
[[Funções nativas]]

- Desenvolvimento e fluxo de trabalho
[[Docker básico para submits locais]]
[[Empacotamento de arquivo do PySpark]]

- Cloud
[[Implementações na AWS]]

# Casos de uso

- Treinamento de modelos de aprendizado de máquina em escala
- Consultar conjuntos de big data usando SQL
- Processamento de dados em tempo real com Spark Streaming

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

### Melhoria de performance nos testes

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
# Referências

- [Using VirtualEnv with PySpark - Cloudera Community - 245932](https://community.cloudera.com/t5/Community-Articles/Using-VirtualEnv-with-PySpark/ta-p/245932)
- [Unit testing PySpark code using Pytest | Engineering for Data Science](https://engineeringfordatascience.com/posts/pyspark_unit_testing_with_pytest/)
	- Bom exemplo de utilização do Pytest para executar os testes
- [How to Install Apache Spark on Windows 10 (phoenixnap.com)](https://phoenixnap.com/kb/install-spark-on-windows-10)
	- No passo de instalação do windowutils, não é para criar uma pasta apenas com o .exe sugerido no arquivo, é para baixar a pasta completa