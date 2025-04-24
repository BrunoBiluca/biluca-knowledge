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
> - [[Instalação]]

--- end-multi-column

A arquitetura Apache Spark é baseada em conjuntos de dados distribuídos resilientes (Resilient Distributed Datasets, RDDs). Estas são tabelas de dados imutáveis ​​​​distribuídas, que são divididas e alocadas aos nós trabalhadores. O RDD é imutável, portanto os nós trabalhadores não podem fazer alterações; eles processam informações e produzem resultados.

Uma das suas otimizações é o uso do **Catalyst** que automaticamente revela o plano de execução mais eficiente dado qualquer processamento.

O Apache Spark também pode ser utilizado com uma camada escrita para a linguagem Python chamada [[PySpark]]. Atualmente a performance do PySpark é tão boa quando a versão Java/Scala o que é uma ótima alternativa para equipes com habilidade na linguagem.

**Funcionalidades**

- [[Apache Spark/Transformações/Transformações|Transformações]]
- [[Spark web UI]]

**Arquitetura e componentes**

- [[Estrutura de um cluster]]
- [[Plano de execução]]

**Estruturas de dados**

- [[Resilient Distributed Dataset (RDD)]]
- [[Diferença entre estruturas de dados]]

**Desenvolvimento e fluxo de trabalho**

- [[Configurações do Apache Spark]]
- [[Docker para Apache Spark]]
- [[Spark SQL API]]

**Cloud**

- [[EMR Serverless]]

# Casos de uso

- Treinamento de modelos de aprendizado de máquina em escala
- Consultar conjuntos de big data usando SQL
- Processamento de dados em tempo real com Spark Streaming
- [[Exemplo - Loja de livros]]

# Melhores práticas

- [[Otimizações de código]]
- [[Esquema em Apache Spark]]
- [[Broadcast]]
- [[Memória]]
- [[Cache]]

# Principais diferenças entre Spark 2 e Spark 3

Apache Spark 3 foi lançado em 2020 e trouxe várias melhorias em relação ao seu antecessor Apache Spark 2 (2016)

- Performance: o [[Adaptive Query Execution]] é uma funcionalidade que automaticamente otimiza consultadas baseadas em várias características dos dados além das melhorias com o Apache Arrow para integração.
- Python API: melhoria na integração do python principalmente na utilização do Pandas.
- SQL Engine
- Machine Learning
- Nova interface para Streaming de dados
- [[Dynamic Partition Pruning]]