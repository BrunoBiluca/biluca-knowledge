## WithColumn

`WithColumn` é usada para criar uma nova coluna a partir de uma transformação de uma ou mais colunas no mesmo conjunto.

```python
df.withColumn(<nome>, <função>)

# exemplo: substitui a coluna items por uma com os valores explodidos
df.withColumn("items", explode(col("items")))
```

O [[Exemplo - Criando uma coluna baseada no retorno de uma função]] demonstra outra capacidade do `WithColumn`, que no caso é utilizar em conjunto com UDFs.