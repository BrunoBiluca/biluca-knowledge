# Exemplo - Vendas de loja

Para exemplificar a utilização do Delta lake vamos utilizar um exemplo simples de Vendas de uma loja ao longo do tempo. A loja armazenas as suas vendas diariamente da seguinte forma:

```csv
data_venda,produto,categoria,quantidade,preco_unitario
2024-01-01,Produto A,Categoria 1,10,20.0
2024-01-02,Produto B,Categoria 2,5,30.0
2024-01-03,Produto C,Categoria 1,8,25.0
2024-01-04,Produto A,Categoria 2,12,18.0
....
```

Vamos criar um lake que armazene por **produto a quantidade e receita totais de cada produto**. Também devemos conseguir buscar esses dados históricos, para saber quanto foi vendido até um determinado período.

Primeiramente precisamos configurar um projeto Python (por exemplo, para teste de unidade), você pode instalar o Delta Lake usando `pip install delta-spark` e, em seguida, configurar o SparkSession com a função de utilitário `configure_spark_with_delta_pip()` no Delta Lake:

```python
def create_spark_delta():
    import pyspark
    from delta import configure_spark_with_delta_pip

    builder = pyspark.sql.SparkSession.builder.appName("MyApp") \
        .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
        .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")

    return configure_spark_with_delta_pip(builder).getOrCreate()
```

Agora com o contexto do spark criado vamos implementa a primeira versão das transformações pretendidas para o lake.

```python
def data_transformation_v1(df):
    from pyspark.sql.functions import col, sum, first
    from pyspark.sql.types import IntegerType, FloatType
  
    return df\
        .withColumn("quantidade", col("quantidade").cast(IntegerType()))\
        .withColumn("preco_unitario", col("preco_unitario").cast(FloatType()))\
        .withColumn("total", col("quantidade") * col("preco_unitario"))\
        .groupBy("produto")\
        .agg(
            sum("total").alias("total"),
            first("preco_unitario").alias("preco_unitario"),
            sum("quantidade").alias("quantidade")
        )
```

Com essas transformações já conseguimos o valor total arrecadado com cada produto e a quantidade total de produtos vendidos.

```
+---------+------+--------------+----------+ 
|  produto| total|preco_unitario|quantidade| 
+---------+------+--------------+----------+ 
|Produto A|2413.0|          20.0|       117| 
|Produto B|1395.0|          30.0|        45| 
|Produto C|1942.0|          25.0|        77| 
+---------+------+--------------+----------+
```

No segundo mês do projeto a informação de valor unitário de fabricação foi adicionada a exportação dos dados de vendo. Isso nos permite criar outros tipos de indicadores para os dados que temos, como por exemplo a taxa média de lucro de cada produto. Vamos alterar então a nossa implementação para adicionar esse indicador.

```python
def data_transformation_v2(df):
    from pyspark.sql.functions import col, sum, first, avg
    from pyspark.sql.types import IntegerType, FloatType
  
    return df\
        .withColumn("quantidade", col("quantidade").cast(IntegerType()))\
        .withColumn("preco_unitario", col("preco_unitario").cast(FloatType()))\
        .withColumn("total", col("quantidade") * col("preco_unitario"))\
        .withColumn(
            "profit_rate",  # adição do profit_rate
            col("preco_unitario") / col("valor_unitario_fabricacao") * 100.0 - 100.0
        )
        .groupBy("produto")\
        .agg(
            sum("total").alias("total"),
            first("preco_unitario").alias("preco_unitario"),
            sum("quantidade").alias("quantidade"),
            avg("profit_rate").alias("profit_rate")  # adição do profit_rate
        )
```

Agora que temos uma tabela Delta (DeltaTable) armazenada precisamos fazer a junção dos dados antigos com os dados atualizados. Caso um produto novo seja encontrado vamos começar a armazenar as informações desse produto, caso contrário (o produto já se encontra na base) vamos atualizar os dados somando os valores anteriores.

```python
def conditional_merge(spark, new_df, delta_table_path):
    from delta import DeltaTable
    from pyspark.sql.functions import col
  
    DeltaTable\
        .forPath(spark, delta_table_path).alias("old") \
        .merge(new_df.alias("old"), "old.produto = new.produto") \
        .whenMatchedUpdate(set={
            "total": col("old.total") + col("new.total"),
            "quantidade": col("old.quantidade") + col("new.quantidade")
        }) \
        .whenNotMatchedInsert(values={
            "produto": col("new.produto"),
            "total": col("new.total"),
            "preco_unitario": col("new.preco_unitario"),
            "quantidade": col("new.quantidade")
        }) \
        .execute()
```

> [!tip]- Junção condicional (Condicional merge)
> Esse é uma funcionalidade muito importante do Delta Lake, com ela podemos fazer a junção dos dados com o que já existe na base de forma muito simples e performática.
> 
> Antes do Delta Lake isso não era possível de fazer. Para ter algo parecido podíamos recorrer a duas formas: 
>-  Processamento deveria garantir a consistência dos dados (por exemplo, salvando uma versão de todos os dados a cada processamento)
>- Buscar toda a base de dados reprocessá-la e então fazer a consolidação

Com isso temos atualizados os dados antigos e conseguimos adicionar novos produtos a nossa tabela delta.

```
+---------+------+--------------+----------+----------+
|  produto| total|preco_unitario|quantidade|    profit|
+---------+------+--------------+----------+----------+
|Produto A|2413.0|          20.0|       117|      45.2|
|Produto B|1395.0|          30.0|        45|      45.2|
|Produto C|1942.0|          25.0|        77|      45.2|
|Produto D|5642.0|          11.0|        77|      45.2|
|Produto E| 942.0|          12.0|        77|      45.2|
+---------+------+--------------+----------+----------+
```

Caso seja necessário ver qualquer informação histórica dessa base, podemos utilizar funcionalidade do Delta Lake de Time Travel e buscar qualquer versão disponível dos dados:

```python
def read_version(spark, delta_table_path, version):
    return spark.read\
        .format("delta")\
        .option("versionAsOf", version)\
        .load(delta_table_path)
```
