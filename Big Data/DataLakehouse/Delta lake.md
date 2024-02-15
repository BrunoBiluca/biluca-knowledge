---
tags:
  - engenharia_de_dados
---
# Delta Lake

> [!info] Definição
> [Delta Lake](https://delta.io/) é um [projeto de código aberto](https://github.com/delta-io/delta) que permite construir um [[DataLakehouse]] em cima de [[Datalake]]. Delta Lake fornece [transações ACID](https://docs.delta.io/latest/concurrency-control.html), manipulação escalonável de metadados e unifica [streaming](https://docs.delta.io/latest/delta -streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html) processamento de dados em data lakes existentes, como S3, ADLS, GCS e HDFS.

Delta Lake usa arquivos Parquet versionados para armazenar seus dados em seu armazenamento em nuvem. Além das versões, Delta Lake também armazena um log de transações para acompanhar todos os commits feitos na tabela ou diretório de armazenamento de blob para fornecer transações ACID.

![[Exemplificação do uso da tecnologia Delta Lake.png|Exemplificação do uso da tecnologia Delta Lake com suas integrações e ferramentas disponíveis|center|500]]

### O que suporta?

- [Transações ACID](https://docs.delta.io/latest/concurrency-control.html) no Spark: níveis de isolamento serializáveis ​​garantem que os leitores nunca vejam dados inconsistentes.
- Manipulação escalonável de metadados: aproveita o poder de processamento distribuído do Spark para lidar com todos os metadados de tabelas em escala de petabytes com bilhões de arquivos com facilidade.
- [Streaming](https://docs.delta.io/latest/delta-streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html) unificação: uma tabela em Delta Lake há uma tabela de lote, bem como uma fonte e um coletor de streaming. Ingestão de dados de streaming, preenchimento de histórico em lote e consultas interativas funcionam imediatamente.
- Aplicação de esquema: trata automaticamente variações de esquema para evitar a inserção de registros inválidos durante a ingestão.
- [Versionamento](https://docs.delta.io/latest/delta-batch.html#-deltatimetravel) de dados permite reversões, trilhas de auditoria históricas completas e experimentos de aprendizado de máquina reproduzíveis.
- [Atualizações](https://docs.delta.io/latest/delta-update.html#-delta-merge) e [exclusões](https://docs.delta.io/latest/delta-update.html #-delta-delete): oferece suporte a operações de mesclagem, atualização e exclusão para permitir casos de uso complexos, como operações de captura de dados alterados, de dimensão de mudança lenta (SCD), upserts de streaming e assim por diante.

### O que não suporta?

- Delta Lake não oferece suporte a transações multitabelas e chaves estrangeiras. Delta Lake oferece suporte a transações no nível da _tabela_.

# Delta lake com Pyspark

Para configurar um projeto Python (por exemplo, para teste de unidade), você pode instalar o Delta Lake usando `pip install delta-spark` e, em seguida, configurar o SparkSession com a função de utilitário `configure_spark_with_delta_pip()` no Delta Lake:

```python
from delta import *

builder = pyspark.sql.SparkSession.builder.appName("MyApp") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")

spark = configure_spark_with_delta_pip(builder).getOrCreate()

# Cria uma tabela no formato delta
# Utiliza o esquema inferido pelo DataFrame
data = spark.range(0, 5)
data.write.format("delta").save("/tmp/delta-table")

# Leitura
df = spark.read.format("delta").load("/tmp/delta-table") 
df.show()

# Sobreescrita
data = spark.range(5, 10)
data.write.format("delta").mode("overwrite").save("/tmp/delta-table")

```

> [!tip] Formatos
> Você pode usar o código Spark SQL existente e alterar o formato de parquet, csv, json e assim por diante para delta.


# Referências

- https://delta.io/learn]
	- Documentação do Delta Lake