---
tags:
  - engenharia_de_dados
---
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
# Apache Spark vs Pandas

Tanto o [[Apache Spark]] quanto o Pandas são frameworks para manipulação de dados com ampla utilização no mercado, mesmo que tenham interfaces parecidas elas tem casos de uso diferentes.

Quando pensamos em escalabilidade e desempenho para grandes volumes de dados o mais indicado é o [[Apache Spark]], já que o Pandas é normalmente executado em apenas uma máquina.

Para análise exploratória e pela performance em bases dados menores o Pandas pode ser uma ótima opção. Apenas essa análise ser levantada podemos então implementar os jobs Spark para a execução da massa completa.