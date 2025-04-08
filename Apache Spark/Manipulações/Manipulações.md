# Manipulações

- Consultas
	- `select`
	- `selectExpr` usada para aplicar expressões mais complexas do SQL


## Ordenação

Podemos querer ordenar os dados para melhorar a apresentação:

```py
from pyspark.sql.functions import desc_nulls_last, desc, asc

df1 = spark.createDataFrame([(0, None),
                             (1, "Bob"),
                             (2, "Alice"),
                             (3, "Bruno"),
                             (4, "Bruno")], ["age", "name"])
df1.sort(
	desc_nulls_last(df1.name), # Ordena primeiro pelo nome colocando os nulos no final
	desc("age") # Quando existem nomes iguais, ordena de forma descrescente em relação a idade
).show()

+---+-----+
|age| name|
+---+-----+
|  4|Bruno|
|  3|Bruno|
|  1|  Bob|
|  2|Alice|
|  0| null|
+---+-----+
```