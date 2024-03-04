---
tags:
  - análise_de_dados
  - engenharia_de_dados
---
[Spark](https://spark.apache.org/) é uma estrutura de computação em cluster distribuída de código aberto e de uso geral. O mecanismo de processamento de dados na memória do Spark conduz análises, ETL, aprendizado de máquina e processamento em grafo de dados em movimento ou em repouso. Oferece APIs de alto nível para as linguagens de programação: Python, Java, Scala, R e SQL.

A arquitetura Apache Spark é baseada em conjuntos de dados distribuídos resilientes (Resilient Distributed Datasets, RDDs). Estas são tabelas de dados imutáveis ​​​​distribuídas, que são divididas e alocadas aos nós trabalhadores. O RDD é imutável, portanto os nós trabalhadores não podem fazer alterações; eles processam informações e produzem resultados.

Apache Spark utiliza o otimizador Catalyst para automaticamente revelar o plano de execução mais eficiente dado qualquer processamento.

- Funcionalidades
[[Plano de execução]]
[[Funções nativas]]

- Conceitos
[[Stages]]

- Desenvolvimento e fluxo de trabalho
[[Docker básico para submits locais]]
[[Empacotamento de arquivo do PySpark]]

- Cloud
[[EMR Serverless]]

O Apache Spark também pode ser utilizado com uma camada escrita para a linguagem Python chamada [[PySpark]]. Atualmente a performance do PySpark é tão boa quando a versão Java/Scala o que é uma ótima alternativa para equipes com habilidade na linguagem.

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

# Spark web UI

O Apache Spark fornece um conjunto de UI/interfaces de usuário da Web ([Jobs](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#spark-jobs), [Stages](https://sparkbyexamples. com/spark/spark-web-ui-understanding/#spark-stages), [Tarefas](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#tasks), [Armazenamento](https: //sparkbyexamples.com/spark/spark-web-ui-understanding/#storage), [Ambiente](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#environment), [Executores]( https://sparkbyexamples.com/spark/spark-web-ui-understanding/#executors) e [SQL](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#sql)) para monitorar o status do seu aplicativo Spark/PySpark, o consumo de recursos do cluster Spark e as configurações do Spark.

Telas que o Spark disponibiliza:
- Resource Manager: http://localhost:9870
- Spark JobTracker: http://localhost:8088/
- Node Specific Info: http://localhost:8042/

### Spark Application UI (http://localhost:4040/)

- Jobs: São exibidos nessa tela todos os jobs. Jobs são ativados por ações como por exemplo `count()` ou `saveAsTextFile()`.
- [[Stages]]: São exibidos as informações de Stages como DAG criado, cada tarefa.



# Referências

- [Using VirtualEnv with PySpark - Cloudera Community - 245932](https://community.cloudera.com/t5/Community-Articles/Using-VirtualEnv-with-PySpark/ta-p/245932)
- [Unit testing PySpark code using Pytest | Engineering for Data Science](https://engineeringfordatascience.com/posts/pyspark_unit_testing_with_pytest/)
	- Bom exemplo de utilização do Pytest para executar os testes
- [How to Install Apache Spark on Windows 10 (phoenixnap.com)](https://phoenixnap.com/kb/install-spark-on-windows-10)
	- No passo de instalação do windowutils, não é para criar uma pasta apenas com o .exe sugerido no arquivo, é para baixar a pasta completa
- [Plano de execuçao do Spark](https://sparkbyexamples.com/spark/spark-execution-plan/)
	- Exemplo de utilização do plano de execução do spark para otimização de operações
- [Exemplo de execução do Spark com sua representação no Spark UI](://sparkbyexamples)