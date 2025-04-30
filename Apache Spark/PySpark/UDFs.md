# UDFs

UDF são funções definidas pelo usuário, são principalmente utilizadas para extender as [[Apache Spark/Transformações/Transformações|Transformações]] nativas e reutilizar essas funções em múltiplos [[DataFrame]].

> [!quote]- (Artigo) - [PySpark UDF (User Defined Function)](https://sparkbyexamples.com/pyspark/pyspark-udf-user-defined-function/)
> Demonstra a utilização de UDF em PySpark e ao final trás algumas considerações importantes sobre sua utilização.
> Considerações:
> - Tratamento de valores nulos
> - Ordem de execução de funções
> - Degradação de performance

UDF são **suscetíveis a erros** então é importante que erros sejam tratados dentro das funções para não encerrar o processamento abruptamente.

#### Declaração

```py
from pyspark.sql.functions import col, udf
from pyspark.sql.types import StringType

def upperCase(str):
    return str.upper()

# quando a função recebe apenas um parâmetro
custom_udf = udf(upperCase, return_type=StringType())

# para mais parâmetros podemos declarar como uma função lambda
custom_udf = udf(lambda z: upperCase(z), return_type=StringType())
```

> [!tip]- UDF com parâmetros além da linha do DataFrame
> Uma prática muito comum é passar outros parâmetros para as UDF, isso pode ser uma variável do código python como uma configuração por exemplo. 
> 
> Nesses casos é muito comum declarar a UDF como uma função lambda onde o primeiro parâmetro representa a linha e os demais são diretamente preenchidos:
> 
> ```py
> def add(i, base):
>     return i + base
> 
> custom_udf = udf(lambda row: add(row, 3), return_type=IntegerType())
> ```
> 
> Repare que o parâmetro base é definido a priori a todas as execuções da UDF

O tipo de retorno padrão de um UDF é `StringType`, assim, para **qualquer outro tipo é necessário declarar explicitamente** para ter o resultado desejado.

#### Utilização

Existem duas formas de fazer utilizar um UDF no [[PySpark]]

- `Dataframe.withColumn` method:
 
```python
# predict_udf é uma função
test_df.withColumn("prediction", custom_udf(*column_list))
```

- Or using `Dataframe.select` method:

```python
test_df.select(custom_udf(*column_list).allas("prediction"))

test_df.select('record_id', # em relação a coluna record_id
			   custom_udf(*column_list).allas("prediction"))

test_df.select('*', # em relação a todas as colunas
			   custom_udf(*column_list).allas("prediction"))
```

`Dataframe.select` permite que selecione uma coluna ou muitas pelo símbolo `*`.

### Registrando PySpark UDF para uso em SQL

Nesse caso é necessário registrar na sessão do Spark:

```python
spark.udf.register("convertUDF", convertCase, StringType())

df.createOrReplaceTempView("NAME_TABLE")

spark.sql("select Seqno, convertUDF(Name) as Name from NAME_TABLE") \
     .show(truncate=False)
```
