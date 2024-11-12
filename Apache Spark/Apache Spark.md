---
tags:
  - análise_de_dados
  - engenharia_de_dados
categoria: framework
---
# Apache Spark

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

**Apache Spark** é uma estrutura de computação em cluster distribuída de código aberto e de uso geral. O mecanismo de processamento de dados na memória do Spark conduz análises, ETL, aprendizado de máquina e processamento em grafo de dados em movimento ou em repouso. Oferece APIs de alto nível para as linguagens de programação: Python, Java, Scala, R e SQL.

--- end-column ---

> [!info] Principais referências
> - [Site do Apache Spark](https://spark.apache.org/)

--- end-multi-column
A arquitetura Apache Spark é baseada em conjuntos de dados distribuídos resilientes (Resilient Distributed Datasets, RDDs). Estas são tabelas de dados imutáveis ​​​​distribuídas, que são divididas e alocadas aos nós trabalhadores. O RDD é imutável, portanto os nós trabalhadores não podem fazer alterações; eles processam informações e produzem resultados.

Apache Spark utiliza o otimizador Catalyst para automaticamente revelar o plano de execução mais eficiente dado qualquer processamento.

O Apache Spark também pode ser utilizado com uma camada escrita para a linguagem Python chamada [[PySpark]]. Atualmente a performance do PySpark é tão boa quando a versão Java/Scala o que é uma ótima alternativa para equipes com habilidade na linguagem.

Funcionalidades

- [[Plano de execução]]
- [[Funções nativas]]
- [[Spark web UI]]

Conceitos
- [[Stages]]
- [[Resilient Distributed Dataset (RDD)]]

Desenvolvimento e fluxo de trabalho
- [[Docker básico para submits locais]]

Cloud
- [[EMR Serverless]]

# Casos de uso

- Treinamento de modelos de aprendizado de máquina em escala
- Consultar conjuntos de big data usando SQL
- Processamento de dados em tempo real com Spark Streaming

# Instalação

Programas necessários
- Java 8+
- Apache Hadoop
- Apache Spark
- winutils.exe (todos os arquivos da pasta bin do repositório devem ser copiados)
- PySpark (pip)

Variáveis de ambiente
- JAVA_HOME
- HADOOP_HOME
- SPARK_HOME
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

# Diferença entre estruturas de dados

Existe principalmente 3 estruturas de dados que podem ser utilizadas para o processamento distribuído em Apache Spark: RDD, DataFrame, DataSet.

| CONTEXT                      | RDD                                                                                                                         | DATAFRAME                                                                                                | DATASET                                                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                              |                                                                                                                             |                                                                                                          |                                                                                                                                                                                   |
| Interoperability             | Can be easily converted to DataFrames and vice versa using the `toDF()` and `rdd()` methods.                                | Can be easily converted to RDDs and Datasets using the `rdd()` and `as[]` methods respectively.          | Can be easily converted to DataFrames using the `toDF()` method, and to RDDs using the `rdd()` method.                                                                            |
| Type safety                  | Not type-safe                                                                                                               | DataFrames are not type-safe, todos os erros relacionados a tipagem são levantados em tempo de execução. | Datasets are type-safe, A estrutura dos dados é feita em tempo de compilação.                                                                                                     |
| Performance                  | Maior controle sobre os dados, porém menos otimizações.                                                                     | Optimized for performance, with high-level API, Catalyst optimizer, and code generation.                 | Datasets são mais rápidos pode permitirem otimizações em nível da JVM.                                                                                                            |
| Memory Management            | Controle completo e possibilidade de cache em memória ou disco                                                              | Mais otimizado por contar com Apache SQL.                                                                | support most of the available dataTypes                                                                                                                                           |
| Serialization                | A sobrecarga de serialização de objetos Java e Scala individuais é cara e requer o envio de dados e estrutura entre nós.    | DataFrames use a generic encoder that can handle any object type.                                        | Datasets are serialized using specialized encoders that are optimized for performance.                                                                                            |
| APIs                         | Baixo nível                                                                                                                 | Alto nível                                                                                               | API mais expressiva que pode ser escrita tanto no paradigma orientado a objetos quanto funcional.                                                                                 |
| Schema enforcement           | Do not have an explicit schema, and are often used for unstructured data.                                                   | DataFrames enforce schema at runtime. Have an explicit schema that describes the data and its types.     | Datasets enforce schema at compile time.                                                                                                                                          |
| Programming Language Support | RDD APIs are available in Java, Scala, Python, and R languages. Hence, this feature provides flexibility to the developers. | Available In 4 languages like Java, Python, Scala, and R.                                                | Only available in Scala and Java.                                                                                                                                                 |
| Optimization                 | Sem otimizações imbutidas                                                                                                   | Catalyst optimizer.                                                                                      | Catalyst optimizer.                                                                                                                                                               |
| Data types                   | Suitable for structured and semi-structured data processing with a higher level of abstraction.                             | DataFrames supports most of the available dataTypes                                                      | Datasets support all of the same data types as DataFrames, but they also support user-defined types. Datasets are more flexible when it comes to working with complex data types. |
| Use Cases                    | Suitable for low-level data processing and batch jobs that require fine-grained control over data                           | Suitable for structured and semi-structured data processing with a higher-level of abstraction.          | Suitable for high-performance batch and stream processing with strong typing and functional programming.                                                                          |

# Configurações

Podemos fazer configurações sobre os aspectos que a sessão do spark é executada.

```python
spark.conf.set("<opção>", <valor>)
```

Opções:

- `spark.sql.shuffle.partitions`: configura o embaralhamento dos dados no cluster
	- Pode ser adicionado para alterar o número de cores no processamento e melhorar a performance (`spark.sparkContext.defaultParallelism` )
- `spark.sql.files.maxPartitionBytes`: configura o tamanho máximo de uma partição de dados

# Referências

- [Using VirtualEnv with PySpark - Cloudera Community - 245932](https://community.cloudera.com/t5/Community-Articles/Using-VirtualEnv-with-PySpark/ta-p/245932)
- [Unit testing PySpark code using Pytest | Engineering for Data Science](https://engineeringfordatascience.com/posts/pyspark_unit_testing_with_pytest/)
	- Bom exemplo de utilização do Pytest para executar os testes
- [How to Install Apache Spark on Windows 10 (phoenixnap.com)](https://phoenixnap.com/kb/install-spark-on-windows-10)
	- No passo de instalação do windowutils, não é para criar uma pasta apenas com o .exe sugerido no arquivo, é para baixar a pasta completa
- [Plano de execuçao do Spark](https://sparkbyexamples.com/spark/spark-execution-plan/)
	- Exemplo de utilização do plano de execução do spark para otimização de operações
- [Exemplo de execução do Spark com sua representação no Spark UI](://sparkbyexamples)

