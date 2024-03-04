---
tags:
  - engenharia_de_dados
---

# Valores mínimos
Nesse exemplo temos um dataset estruturado para fazer uma operação de buscar os valores mínimos para um determinado identificador.

```python
from pyspark.sql import SparkSession
from pyspark.sql import functions as func
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, FloatType

spark = SparkSession.builder.appName("MinTemperatures").getOrCreate()

schema = StructType([ \
	StructField("stationID", StringType(), True), \
	StructField("date", IntegerType(), True), \
	StructField("measure_type", StringType(), True), \
	StructField("temperature", FloatType(), True)
])

df = spark.read.schema(schema).csv("files/1800.csv")
df.printSchema()

# output
# root
#  |-- stationID: string (nullable = true)
#  |-- date: integer (nullable = true)
#  |-- measure_type: string (nullable = true)
#  |-- temperature: float (nullable = true)

df\
	.filter(df.measure_type == "TMIN")\
	.select("stationID", "temperature")\
	.groupBy("stationID")\
	.min("temperature")\
	.withColumn(
		"temperature",
		func.round(func.col("min(temperature)") * 0.1 * (9.0 / 5.0) + 32.0, 2) # conversão de temperatura
	)\
	.select("stationID", "temperature").sort("temperature")\
	.collect()

# +-----------+----------------+
# |  stationID|min(temperature)|
# +-----------+----------------+
# |ITE00100554|          -148.0|
# |EZE00100082|          -135.0|
# +-----------+----------------+
```

# Referências

- [https://www.udemy.com/course/taming-big-data-with-apache-spark-hands-on/](https://www.udemy.com/course/taming-big-data-with-apache-spark-hands-on/)
	- Ótimo curso para aprender o básico do Apache Spark em relação a processamento de dados (big data)