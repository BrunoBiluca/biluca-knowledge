# Data Sampling

Data Sampling é mais usado por Analistas ou Cientistas de dados a fim de obter estatísticas em um subconjunto da base de dados antes de aplicar a base inteira

[[Apache Spark]] disponibiliza 3 interfaces para amostragem:

- Spark DataFrame Sampling
- Spark Stratified Sampling
- Spark RDD Sampling

### Spark DataFrame Sampling

```py
sample(withReplacement, fraction, seed=None)
```

`fraction` – Fraction of rows to generate, range [0.0, 1.0]. **Não garante retornar o número especificado.**

`seed` – Seed for sampling (default a random seed). Used to reproduce same random sampling

`withReplacement` – Sample with replacement or not (default False). 
- `True` permite duplicatas
- `False` não permite duplicatas

### Spark Stratified Sampling

Use `sampleBy()` do `DataFrameStatFunctions

```python
sampleBy(col, fractions, seed=None)
```

`fractions` são mapeamentos da chance de selecionar um objetivo dentro do DataFrame

```python
# Cria um Dataframe com valores 0, 1, 2
df2 = df.select((df.id % 3).alias("key"))

sampleBy = df2.sampleBy(
	"key", 
	{
		0: 0.1, # chance de 10% de selecionar valores de key=0
		1: 0.2  # chance de 20% de selecionar valores de key=1
	},
	0
)

print(sampleBy.collect())
# Output: [Row(key=0), Row(key=1), Row(key=1), Row(key=1), Row(key=0), Row(key=1), Row(key=1), Row(key=0), Row(key=1), Row(key=1), Row(key=1)]
```