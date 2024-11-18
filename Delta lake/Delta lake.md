---
tags:
  - engenharia_de_dados
categoria: repositório de dados
---
# Delta lake

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

[Delta Lake](https://delta.io/) é um [projeto de código aberto](https://github.com/delta-io/delta) que permite construir um [[Data Lakehouse]] em cima de um [[Data Lake]]. Delta Lake fornece [transações ACID](https://docs.delta.io/latest/concurrency-control.html), manipulação escalonável de metadados e unifica processamento de dados em [streaming](https://docs.delta.io/latest/delta-streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html)  em data lakes existentes, como S3, ADLS, GCS e HDFS.

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://delta.io/learn)
> 
> Exemplos de implementação de uma solução utilizando Delta lake:
> - [[Exemplo - Vendas de uma loja]]
> - [[Exemplo - Loja de livros]]
> 
> Considerações ao utilizar Delta Lake:
> - [[Governança em Delta Lake]]
> - [[Otimizações no Delta Lake]]
> 

--- end-multi-column

Delta Lake usa arquivos Parquet versionados para armazenar seus dados em seu armazenamento em nuvem. Além das versões, Delta Lake também armazena um log de transações para acompanhar todos os commits feitos na tabela ou diretório de armazenamento de blob para fornecer transações ACID.

![[Exemplificação do uso da tecnologia Delta Lake.png|Exemplificação do uso da tecnologia Delta Lake com suas integrações e ferramentas disponíveis|center|500]]

### O que suporta?

- [[ACID]] no Spark: garante que os leitores nunca vejam dados inconsistentes.
	- Problemas resolvidos pelo ACID
		- Dificuldade em anexar (append) dados
		- Dificuldade em modificar dados existentes
		- Falha de jobs no meio do caminho, já que as alterações são registradas apenas se o job terminar em sucesso
		- Dificuldade em operações em tempo real, permite micro-batch atômicas
		- Custo de manter histórico de versões
- Manipulação escalonável de metadados: aproveita o poder de processamento distribuído do Spark para lidar com todos os metadados de tabelas em escala de petabytes com bilhões de arquivos com facilidade.
- [[Structured Streaming]]
- Aplicação de esquema: trata automaticamente variações de esquema para evitar a inserção de registros inválidos durante a ingestão.
- [[Fundamentos de Ciências da Computação/Versionamento/Versionamento|Versionamento]] de dados permite reversões, trilhas de auditoria históricas completas e experimentos de aprendizado de máquina reproduzíveis.
- [Atualizações](https://docs.delta.io/latest/delta-update.html#-delta-merge) e [exclusões](https://docs.delta.io/latest/delta-update.html #-delta-delete): oferece suporte a operações mais complexas de mesclagem de dados como **atualizações condicionais**.

### O que não suporta?

- Delta Lake não oferece suporte a transações multitabelas e chaves estrangeiras, ou seja, transações no nível da _tabela_.
	- chaves estrangeiras são atualmente suportadas no ambiente [[Databricks]] pelo Unity Catalog, porém elas são apenas informativas, ou seja servem como referências não como uma funcionalidade com é o caso de outros bancos de dados, SQL Server e MySQL, por exemplo.


# Principais conceitos

- [[Formato de uma Tabela Delta]]
- [[Particionamento]]

# Funcionalidades

- [[Change Data Feed (CDF)]]
- [[Visualizações]]
- [[Mesclagem de dados condicional]]
- [[Clonar tabelas]]
- [[Evolução de esquema]]
