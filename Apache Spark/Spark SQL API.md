# Spark SQL API

Para permitir implementar consultas SQL com base em [[DataFrame]] fazemos:

```py
from pyspark.sql import SparkSession

# Criar SparkSession
spark = SparkSession.builder.appName("ExemploSQL").getOrCreate()

# Criar um DataFrame de exemplo
data = [("João", 28), ("Maria", 34), ("Pedro", 45)]
df = spark.createDataFrame(data, ["nome", "idade"])

# Registrar o DataFrame como uma view temporária
df.createOrReplaceTempView("pessoas")

# Executar consulta SQL
resultado = spark.sql("SELECT nome, idade FROM pessoas WHERE idade > 30")
resultado.show()
```
