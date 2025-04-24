# Unicidade de valores

### DropDuplicates

Diferente do `distinct()` que remove duplicatas em relação a todas as colunas o `dropDuplicates()` permite definir um subconjunto de colunas para aplicar a comparação.

```py
df.dropDuplicates(subset: List[str]).show()
```

### Valores únicos entre colunas diferentes

É muito comum precisarmos de retornarmos todos os valores únicos entre colunas diferentes. Para isso podemos utilizar uma combinação do `union()` e `distinct()`.

```py
# Retorna os valores distintos entre as colunas 'value' e 'productId'
transactionsDf
	.select('value')
	.union(transactionsDf.select('productId'))
	.distinct()
```
