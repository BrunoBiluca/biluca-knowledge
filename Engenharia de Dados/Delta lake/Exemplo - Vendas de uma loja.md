# Exemplo - Vendas de uma loja

Para exemplificar a utilização do Delta lake vamos utilizar um exemplo simples de Vendas de uma loja ao longo do tempo. 

Serão definidos dois ciclos do desenvolvimento do [[Delta lake]], com a ideia de simular um avanço de tempo do próprio desenvolvimento:
- No **primeiro ciclo** teremos as análises de *valor total arrecadado com cada produto* e a *quantidade total de produtos vendidos*.
- No **segundo ciclo** teremos a adição de um campo (o que muda a estrutura dos dados) e isso proporciona uma nova informação para a análise de vendas
- No **terceiro ciclo** foi levantado a necessidade de ter todos os dados contidos na mesma tabela em todos os momentos, para isso deve-se utilizar mesclagem condicional de dados

### Primeiro ciclo

A loja armazena as suas vendas diariamente da seguinte forma:

```csv
data_venda,produto,categoria,quantidade,preco_unitario
2024-01-01,Produto A,Categoria 1,10,20.0
2024-01-02,Produto B,Categoria 2,5,30.0
2024-01-03,Produto C,Categoria 1,8,25.0
2024-01-04,Produto A,Categoria 2,12,18.0
....
```

Primeiramente precisamos configurar um projeto Python ([[PySpark]]) com as dependências necessárias para a execução do Apache Spark junto com o Delta Lake.

- `pip install pyspark delta-spark`

Nosso arquivo principal é responsável por iniciar a aplicação de forma a construir a sessão do spark que será utilizada como motor de processamento.

```python
# main.py
def create_spark_delta():
    import pyspark
    from delta import configure_spark_with_delta_pip

    builder = pyspark.sql.SparkSession.builder.appName("MyApp") \
        .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
        .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")

    return configure_spark_with_delta_pip(builder).getOrCreate()
```

Com o contexto do spark criado vamos implementar a consolidação das informações de vendas no nosso Delta lake. Podemos chamar esse processo de criação da **camada Prata** ([[Arquitetura medalhão]]).

```python
# sales_report.py
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

O resultados dessas transformações já nos provê o *valor total arrecadado com cada produto* e a *quantidade total de produtos vendidos*.

| Produto   | Total  | Preço Unitário | Quantidade |
| --------- | ------ | -------------- | ---------- |
| Produto A | 2413.0 | 20.0           | 117        |
| Produto B | 1395.0 | 30.0           | 45         |
| Produto C | 1942.0 | 25.0           | 77         |

### Segundo ciclo - alteração estrutural do Delta Lake

No segundo mês do projeto a informação de *valor unitário de fabricação* foi adicionada a exportação dos dados de vendas.

Após análise do time de desenvolvimento foi descoberto que com essa nova informação é possível gerar uma análise da *taxa média de lucro de cada produto*. 

```python
# sales_report.py
def data_transformation_v2(df):
    from pyspark.sql.functions import col, sum, first, avg
    from pyspark.sql.types import IntegerType, FloatType
  
    return df\
        .withColumn("quantidade", col("quantidade").cast(IntegerType()))\
        .withColumn("preco_unitario", col("preco_unitario").cast(FloatType()))\
        .withColumn("total", col("quantidade") * col("preco_unitario"))\
        .withColumn(
            "taxa_lucro",  # adição do profit_rate
            col("preco_unitario") / col("valor_unitario_fabricacao") * 100.0 - 100.0
        )
        .groupBy("produto")\
        .agg(
            sum("total").alias("total"),
            first("preco_unitario").alias("preco_unitario"),
            sum("quantidade").alias("quantidade"),
            avg("taxa_lucro").alias("taxa_lucro")  # adição do profit_rate
        )
```

A partir dessa versão da tabela Delta temos a informação da taxa de lucro de cada produto.
### Terceiro ciclo - Atualização incremental da tabela de Vendas

Da forma que o relatório de vendas foi implementado até então, temos a cada nova versão da tabela as informações dos produtos que venderam no mês corrente da análise.

Para acessar o *relatório de todos os produtos* é necessário utilizar da função de viagem no tempo, já que produtos que não venderam no mês não aparecem nos dados de vendas e por isso ficam fora da tabela consolidada pela função `data_transformation_v2()`.

O time de desenvolvimento decidiu então implementar uma solução para que a qualquer versão da tabela de vendas todos os produtos já vendidos pelo menos uma vez estejam contidos. Para isso a solução encontrada foi a **junção condicional** da tabela Delta.

A junção condicional é definida de forma que:
- Caso um **produto novo** seja encontrado vamos começar a armazenar as informações desse produto
- Caso contrário (**o produto já se encontra na base**) vamos atualizar os dados somando os valores anteriores.

```python
def conditional_merge(spark, new_df, delta_table_path):
    from delta import DeltaTable
    from pyspark.sql.functions import col
  
    DeltaTable\
        .forPath(spark, delta_table_path).alias("old") \
        .merge(new_df.alias("new"), "old.produto = new.produto") \
        .whenMatchedUpdate(set={
            "total": col("old.total") + col("new.total"),
            "quantidade": col("old.quantidade") + col("new.quantidade"),
            "taxa_lucro": col("new.taxa_lucro")
        }) \
        .whenNotMatchedInsert(values={
            "produto": col("new.produto"),
            "total": col("new.total"),
            "preco_unitario": col("new.preco_unitario"),
            "quantidade": col("new.quantidade"),
            "taxa_lucro": col("new.taxa_lucro"),
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

| Produto   | Total  | Preço Unitário | Quantidade | Taxa de Lucro |
| --------- | ------ | -------------- | ---------- | ------------- |
| Produto A | 2413.0 | 20.0           | 117        | 45.2          |
| Produto B | 1395.0 | 30.0           | 45         | 45.2          |
| Produto C | 1942.0 | 25.0           | 77         | 45.2          |
| Produto D | 5642.0 | 11.0           | 77         | 45.2          |
| Produto E | 942.0  | 12.0           | 77         | 45.2          |

Caso seja necessário ver qualquer informação histórica dessa base, podemos utilizar funcionalidade do Delta Lake de Time Travel e buscar qualquer versão disponível dos dados:

```python
def read_version(spark, delta_table_path, version):
    return spark.read\
        .format("delta")\
        .option("versionAsOf", version)\
        .load(delta_table_path)
```