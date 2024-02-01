---
tags:
  - análise_de_dados
  - engenharia_de_dados
---
[Spark](https://spark.apache.org/) is an open-source distributed general-purpose cluster computing framework. Spark’s in-memory data processing engine conducts analytics, ETL, machine learning and graph processing on data in motion or at rest. It offers high-level APIs for the programming languages: Python, Java, Scala, R, and SQL.

The Apache Spark Architecture is founded on Resilient Distributed Datasets (RDDs). These are distributed immutable tables of data, which are split up and allocated to workers. The worker executors implement the data. The RDD is immutable, so the worker nodes cannot make alterations; they process information and output results.

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