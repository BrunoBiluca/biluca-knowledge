# Unicidade de valores


### DropDuplicates

Diferente do `distinct()` que remover duplicatas em relação a todas as colunas o `dropDuplicates()` permite definir um subconjunto de colunas para aplicar a comparação.

```py
df.dropDuplicates(subset: List[str]).show()
```

### Valores únicos em uma coluna

```py
transactionsDf
	.select('value')
	.union(transactionsDf.select('productId'))
	.distinct()
```