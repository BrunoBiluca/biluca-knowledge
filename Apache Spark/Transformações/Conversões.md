# Conversões

É muito comum no processamento de dados precisarmos alterar formatos, esquemas e estruturas.

# `.cast()`

```py
from pyspark.sql.functions import col

# DataFrame de exemplo
data = [(1, "João"), (2, "Maria"), (3, "Pedro")]
df = spark.createDataFrame(data, ["id", "nome"])

# Método 1: Usando cast()
df = df.withColumn("id_str", col("id").cast("string"))

# Método 2: Usando a função format_string (com formatação)
from pyspark.sql.functions import format_string
df = df.withColumn("id_formatado", format_string("%03d", col("id")))

# Convertendo para inteiro
df = df.withColumn("id_int", col("id_str").cast("integer"))
```

# Datas (dates)

Para a conversão de datas o [[Apache Spark]] utiliza a formatação baseada no [SimpleDateFormat](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/text/SimpleDateFormat.html).

**Conversão de `StringType` para `DateType`:**

```python
from pyspark.sql.functions import to_date
df.select(to_date(lit("09-13-1992"), "MM-dd-yyyy").alias("date"))
```

**Conversão de `DateType` para `StringType`:**

```python
from pyspark.sql.functions import date_format, current_date
df.select(date_format(current_date(), "MM-dd-yyyy").alias("date"))
```

**Conversão de `StringType` para `Timestamp`:**

```python
df.select(to_timestamp(lit('06-24-2019 12:01:19.000'),'MM-dd-yyyy HH:mm:ss.SSSS'))
```

## Unix time

- `unix_timestamp()` é usado para recuperar o horário corrente e converter a string

- `from_unixtime()` é usado para converter o número de segundos desde **Unix epoch** (`1970-01-01 00:00:00 UTC`) para uma representação em String

