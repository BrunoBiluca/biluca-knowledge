# Seleção

- `select`
- `selectExpr` usada para aplicar expressões mais complexas do SQL

A nomenclatura de uma expressão mais complexa pode ser ajustada a partir do método `alias()`.

```py
transactionsDf.select(corr(col("predError"), col("value")))
# retorna um df com uma coluna chamada 'corr(col("predError"), col("value"))'

transactionsDf.select(corr(col("predError"), col("value")).alias("corr"))
# retorna um df com uma coluna chamada 'corr'
```