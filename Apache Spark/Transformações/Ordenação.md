# Ordenação

Utilizando os métodos `sort()` ou `orderBy()` é possível ordenar [[DataFrame]] em ordem ascendente ou descendente baseado em uma ou múltiplas colunas.

`sort()`

```python
# Sorting different columns in different orders
df.sort("column1", "column2", ascending=[True, False]) 
df.sort(col("department").asc(), col("state").asc())
```

`orderBy()`

```python
# Sorting DataFrame using orderBy()
df.orderBy("department", "state")
df.orderBy(col("department"), col("state"))
df.orderBy(col("department").asc(), col("state").asc())
```

**Por padrão ordena** de forma ascendente e com os nulos em primeiro. Caso seja indicado `ascending=False` a forma será descendente com os nulos ao final.

### Ordenação de NULLs

Por padrão Spark trata valores nulos como os menores valores possíveis, assim quando os dados são ordenados de forma ascendente os nulos ficam no início do Dataframe e de forma descendente os nulos ficam ao final do Dataframe.

Por esse motivo existe algumas funções para mudar esse comportamento:

- `asc_nulls_first` nulos no início
	- Padrão quando a ordenação ascendente é definida
- `asc_nulls_last` nulos ao final
- `desc_nulls_first` nulos no início
- `desc_nulls_last` nulos ao final
	- Padrão quando a ordenação descendente é definida

```py
from pyspark.sql.functions import desc_nulls_last, desc, asc

df1 = spark.createDataFrame([
		(0, None),
		(1, "Bob"),
		(2, "Alice"),
		(3, "Bruno"),
		(4, "Bruno")
	], 
	["age", "name"])
	
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
