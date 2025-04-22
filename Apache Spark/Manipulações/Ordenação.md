# Ordenação

Utilizando os métodos `sort()` ou `orderBy()` é possível ordenar [[DataFrame]] em ordem ascendente ou descendente baseado em uma ou múltiplas colunas.

### `sort()`

```python
# Sorting different columns in different orders
df.sort("column1", "column2", ascending=[True, False]) 
df.sort(col("department").asc(),col("state").asc()).show(truncate=False)
```

Por padrão ordena de forma ascendente.

### `orderBy()`

```python
# Sorting DataFrame using orderBy()
df.orderBy("department","state").show(truncate=False)
df.orderBy(col("department"),col("state")).show(truncate=False)
df.orderBy(col("department").asc(),col("state").asc()).show(truncate=False)
```

Por padrão ordena de forma ascendente.

### Ordenação de NULLs

Por padrão Spark trata valores nulos como os menores valores possíveis, assim quando os dados são ordenados de forma ascendente os nulos ficam no início do Dataframe e de forma descendente os nulos ficam ao final do Dataframe.

Por esse motivo existe algumas funções para mudar esse comportamento:

- `asc_nulls_first` nulos no início
- `asc_nulls_last` nulos ao final
- `desc_nulls_first` nulos no início
- `desc_nulls_last` nulos ao final

### Ordenação colunas de arrays

Também é possível ordenar arrays.

```py
df = spark.createDataFrame([([2, 1, None, 3],),([1],),([],)], ['data'])

>>> df.select(sort_array(df.data).alias('r')).collect()
[Row(r=[None, 1, 2, 3]), Row(r=[1]), Row(r=[])]

>>> df.select(sort_array(df.data, asc=False).alias('r')).collect()
[Row(r=[3, 2, 1, None]), Row(r=[1]), Row(r=[])]
```