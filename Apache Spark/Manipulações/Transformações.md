# Transformações

Em [[Apache Spark]] existe principalmente dois tipos de transformações:

- **Transformações estreitas (Narrows)** que dependem apenas da partição. Nesse caso cada partição de um [[DataFrame]] está relacionado diretamente com a partição resultante da transformação. 
	- São exemplos de transformações estreitas
		- Filter
		- Select
		- Union
		- Map
		- FlapMap
		- MapPartitions

- **Transformações abrangentes (Wide)** que dependem de várias partições e envolve o processo de Shuffle.
	- São exemplos de transformações abrangentes
		- Joins

Dentre esses tipos de transformações podemos utilizar várias funções disponíveis:

- [String Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#string)
- [Date & Time Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#date-time)
- [Math Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#math)
- [Aggregate Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#aggregate)
- Sorting functions
- `cast` usado para alterar o tipo de uma coluna
- [[Collection functions]]
- [[WithColumn]]
- [[Window Functions]]
- [[Mesclagens (join)]]
- [[Pivoteamento]]
- [[Processamento de pares chave-valor]]

> [!tip] Dica de performance
> Sempre que possível tente utilizar a biblioteca padrão Spark SQL, ela é um pouco mais rápida na compilação, trata valores nulos e performa um pouco melhor que UDFs

## Tratando valores Nulos

Podemos tratar linhas com valores nulos com uma API dedicada do DataFrame, `df.na`.

**Para remoção de valores nulos:**

```py
# todas as colunas são nulas
df.na.drop("all")

# todas as colunas definidas são nulas
df.na.drop("all", ["col_1", "col_2"])

# qualquer coluna é nula
df.na.drop("any")

# qualquer coluna definida é nula
df.na.drop("any", ["col_1", "col_2"])
```

**Para preenchimento de valores nulos:**

```py
# todas as colunas que são nulas são preenchidas com o <valor>
df.na.fill(<valor>)

# mapeamento de colunas, cada coluna nula é preenchida com um valor definido
df.na.fill({
	"col_1": <value_1>,
	"col_2": <value_2>
})
```
