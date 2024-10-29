# Criando uma coluna baseada no retorno de uma função

Existem duas formas de fazer essa operação em pyspark

- `Dataframe.withColumn` method:
 
```python
# predict_udf é uma função
test_df.withColumn("prediction", custom_udf(*column_list))
```

- Or using `Dataframe.select` method:

```python
# custom_udf é uma função

test_df.select(
	custom_udf(*column_list).allas("prediction")
)

test_df.select('record_id', # em relação a coluna record_id
			   custom_udf(*column_list).allas("prediction"))

test_df.select('*', # em relação a todas as colunas
			   custom_udf(*column_list).allas("prediction"))

```

`Dataframe.select` permite que selecione uma coluna ou muitas pelo símbolo `*`.
