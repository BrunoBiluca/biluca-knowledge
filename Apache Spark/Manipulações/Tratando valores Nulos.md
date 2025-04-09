# Tratando valores Nulos

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
