---
tags:
  - engenharia_de_dados
---
> [!info] O que são?
> Stages são conjuntos de tarefas. Cada Stage é referente a um processamento específico executado em cada partição, cada execução é uma tarefa.

# Operações

### FileScanRDD

FileScan representa a leitura dos dados de um arquivo. Fornece FilePartitions que são partições RDD personalizadas com PartitionedFiles (blocos de arquivo).

### MapPartitionsRDD

MapPartitionsRDD será criado quando você usar a transformação de MapPartition.

#### SQLExecutionRDD

`SQLExecutionRDD` is Spark property that is used to track multiple Spark jobs that should all together constitute a single structured query execution.

#### WholeStageCodeGen

Um otimizador de consulta física no Spark SQL que combina vários operadores físicos.

#### Exchange

Representa o embaralhamento, ou seja, movimentação de dados no cluster (Executores).
É a operação mais cara e aumenta em custo a medida que temos mais partições.