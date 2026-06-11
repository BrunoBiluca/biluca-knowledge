---
tags:
  - engenharia_de_dados
  - docker
---
# Docker para Apache Spark

Configuração inicial utilizando a imagem fornecida pelo bitnami.

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

O projeto [[Projeto - Breweries Case]] também utiliza uma imagem do [[Apache Spark]], só que nesse caso também utiliza o [[Apache Airflow]] como orquestrador e o Dremio como plataforma de Lake House.