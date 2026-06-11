# WithColumn

`WithColumn` é usada para criar uma nova coluna a partir de uma transformação de uma ou mais colunas no mesmo conjunto.

```python
df.withColumn(<nome>, <função>)

# exemplo: substitui a coluna items por uma com os valores explodidos
df.withColumn("items", explode(col("items")))
```

Para transformações mais complexas pode ser necessário definir um [[UDFs]] para aplicar a transformação.

> [!tip] Sempre dê prioridade a funções nativas do Spark por serem mais eficientes.