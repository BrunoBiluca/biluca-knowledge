---
tags:
  - engenharia_de_dados
---
# [Apache Hadoop](https://hadoop.apache.org/)

> [!info] Definição
> Apache Hadoop™ é uma coleção de software de código aberto para análise de big data que permite que grandes conjuntos de dados sejam processados ​​com clusters de computadores trabalhando em paralelo. 

Inclui o **Hadoop MapReduce**, o **Hadoop Distributed File System (HDFS)** e o **YARN (Yet Another Resource Negotiator)**. O HDFS permite que um único conjunto de dados seja armazenado em vários dispositivos de armazenamento diferentes, como se fosse um único arquivo. Ele funciona lado a lado com o algoritmo MapReduce, que determina como dividir uma grande tarefa computacional (como uma contagem ou agregação estatística) em tarefas muito menores que podem ser executadas em paralelo em um cluster de computação.

Foi um dos primeiros frameworks que permitiam a coleção e análise de grandes quantidades de dados não estruturados. Atualmente o Hadoop foi praticamente substituído pelo Apache Spark (mesmo que o Spark utilize o Hadoop por baixo dos panos) por por ser complexo, ter uma baixa performance, segurança limitada e falta de suporte para streaming de dados.