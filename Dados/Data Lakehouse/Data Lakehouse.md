---
tags:
  - engenharia_de_dados
---
# Data Lakehouse

> [!info] Definição
> A arquitetura do Data Lakehouse tem como objetivo resolver estes desafios enfrentados no DW e DL para reduzir os custos operacionais, simplificar o processo de transformação e melhorar a governança. O lakehouse se tornou uma forma de centralizar e unificar as fontes de dados e esforços de engenharia na organização. Essencialmente, o uso do lakehouse permite que todos os usuários possam explorar os dados, independente de suas capacidades técnicas.

A ideia chave do Lakehouse é ter um sistema de armazenamento de dados de baixo custo no data lake, utilizando um formato aberto de arquivos, como Parquet e ORC.

![[Exemplificação de um DataLakehouse.webp|Exemplificação de um DataLakehouse|center|500]]

Como podemos ver o DataLakehouse provê uma camada de metadados, cache, e indexação para permitir que as funcionalidades de um DW sejam possíveis como transações ACID, gerenciamento, versionamento, auditoria, indexação, cache e otimização de consultados sejam possíveis.

Como os lakehouses também separam o processamento de armazenamento, diferentes aplicações podem rodar sob demanda em um cluster separado. Por exemplo, você pode subir um cluster Hadoop na nuvem sob demanda, rodar jobs Spark sobre os dados do data lake e depois derrubar o cluster, pagando apenas pelo que usou de processamento. Assim não é preciso manter o cluster rodando 24x7, já que eles estão armazenados em um barramento de dados compartilhado no data lake.
# Comparação: [[Delta Lake]], [Apache Iceberg](https://iceberg.apache.org/) e [Apache Hudi](https://hudi.apache.org/)

![[Comparação entre framewords de Data Lakehouse.webp|Comparação entre os frameworks Delta Lake, Apache Iceberg e Apache Hudi|center|500]]


# Referências

- [Lakehouse: unindo o Data Lake e o Data Warehouse](https://medium.com/data-hackers/lakehouse-unindo-o-data-lake-e-o-data-warehouse-1428be2dda21)
	- Artigo comparando Data Lakehouse com DataLakes e DataWarehouses
	- Também discute uma comparação entre os frameworks de criação de DataLakehouse
	- Por fim o artigo apresenta uma arquitetura na AWS de referência

# Melhores práticas

- Dados brutos devem ser armazenados sem perdas
	- [[Arquitetura medalhão#Bronze]]
- Garantir a segurança do Lakehouse com acesso baseado a funções e controles de visualizações
	- [[Delta lake#Visualizações dinâmicas]]
-  Construir resiliência e transações ACID no Lakehouse
	- [[ACID]]
	- [[Serialização e compressão para dados]]
-  Catalogue seus dados
	- [[Unity Catalog]]
- Qualidade de dados
	- [[Delta lake#Restrições dos dados]]
