# Tratando valores Nulos

Podemos tratar linhas com valores nulos com uma API dedicada do DataFrame, `df.na`.

### Remoção

```python
drop(how='any', thresh=None, subset=None)
```

- **how** – This takes values ‘any’ or ‘all’. By using ‘any’, drop a row if it contains NULLs on any columns. By using ‘all’, drop a row only if all columns have NULL values. Default is ‘any’.
- **thresh** – This takes int value, Drop rows that have less than thresh hold non-null values. Default is ‘None’.
- **subset** – Use this to select the columns for NULL values. Default is ‘None.

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

#### Exemplo de utilização

| key | A   | B    | C    |
| --- | --- | ---- | ---- |
| 1   | a   | Null | Null |
| 2   | a   | b    | Null |
| 3   | a   | b    | c    |

```py
df.na.drop(how="all", thresh=2)
```

Resultado

| key | A   | B   | C    |
| --- | --- | --- | ---- |
| 2   | a   | b   | Null |
| 3   | a   | b   | c    |

Apenas a primeira linha não consegue alcançar o limite estabelecido, 2 colunas não nulas.

### Preenchimento

```py
# todas as colunas que são nulas são preenchidas com o <valor>
df.na.fill(<valor>)

# mapeamento de colunas, cada coluna nula é preenchida com um valor definido
df.na.fill({
	"col_1": <value_1>,
	"col_2": <value_2>
})
```
