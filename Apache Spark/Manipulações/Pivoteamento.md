# Pivoteamento

A função `pivot()` é utilizada para rotacionar ou transpor dados de uma coluna para várias colunas, ou o contrário utilizando `stack()`.

Síntaxe

```python
pivot_df = original_df
	.groupBy("grouping_column")
	.pivot("pivot_column")
	.agg({"agg_column": "agg_function"})
```

Operações de pivoteamento exigem combinações únicas de agrupamento e as colunas pivôs. No exemplo abaixo fazermos o agrupamento dos produtos e o pivoteamento pelo País, ou seja, entre essas colunas não existem valores duplicados já que cada produto irá ser mostrado para cada país, caso existissem produtos ou países duplicados seria necessário utilizar algum outro tipo de agrupamento para resover esses conflitos.

Exemplo

| Product | Amount | Country |
| ------- | ------ | ------- |
| Banana  | 1000   | USA     |
| Carrots | 1500   | USA     |
| Beans   | 1600   | USA     |
| Orange  | 2000   | USA     |
| Orange  | 2000   | USA     |
| Banana  | 400    | China   |
| Carrots | 1200   | China   |
| Beans   | 1500   | China   |
| Orange  | 4000   | China   |
| Banana  | 2000   | Canada  |
| Carrots | 2000   | Canada  |
| Beans   | 2000   | Mexico  |
Podemos fazer a transposição desse conjunto de dados para saber por País a quantidade de produtos.

```python
pivotDF = df.groupBy("Product").pivot("Country").sum("Amount")
```

| Product | Canada | China | Mexico | USA  |
|---------|--------|-------|--------|------|
| Orange  | null   | 4000  | null   | 4000 |
| Beans   | null   | 1500  | 2000   | 1600 |
| Banana  | 2000   | 400   | null   | 1000 |
| Carrots | 2000   | 1200  | null   | 1500 |
Todos os países que não tem correspondente de produto são identificados por `null`.

Podemos fazer a operação inversa utilizando a função `stack`.

Sintaxe

```python
stack(n, expr1, expr2.. exprn)
```

onde `n` é o número de linhas que serão criadas para cada linha da tabela pivô, os outros atributos são expressões SQL que podem ser utilizadas, como adicionar um texto literal `'Texto literal'` ou utilizar o valor da coluna `<nome da coluna>`.

```python
from pyspark.sql.functions import expr
unpivotExpr = "stack(3, 'Canada', Canada, 'China', China, 'Mexico', Mexico) as (Country,Total)"
unPivotDF = pivotDF
	.select("Product", expr(unpivotExpr))
    .where("Total is not null")
```

Decomposição da expressão stack utilizada

```python
stack(
	  3, # número de linhas criadas para cada linha da tabela pivoteada
	  'Canada', Canada, # primeira linha
	  'China', China,   # segunda linha
	  'Mexico', Mexico  # terceira linha
) as (Country,Total)
```

|Product|Country|Total|
|---|---|---|
|Orange|China|4000|
|Beans|China|1500|
|Beans|Mexico|2000|
|Banana|Canada|2000|
|Banana|China|400|
|Carrots|Canada|2000|
|Carrots|China|1200|