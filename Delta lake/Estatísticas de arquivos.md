# Estatísticas de arquivos

[Delta Lake File Statistics](https://docs.databricks.com/pt/delta/data-skipping.html#specify-delta-statistics-columns) é um processo que o [[Delta lake]] ([[Apache Spark]]) executa a fim de analisar os arquivos para extrair informações que podem ser utilizadas para impulsionar a performance de processamentos futuros.

Delta Lake analisa as primeiras 32 colunas de uma tabela para determinar:

- Total número de registros
- Mínimo valor de cada coluna
- Máximo valor de cada coluna
- Contagem de valores nulls em cada coluna

Essas estatísticas são utilizadas para efetuar o [[Salto de dados (Data skipping)]] não relevantes as consultas. Assim quando pedimos a contagem de registros em uma partição, o Delta Lake busca nas estatísticas dos arquivos não nos dados em si.

São considerados para a contagem de colunas:

- Campos aninhados são contabilizados para o cálculo dos 32 campos
- Estatísticas gerados por campos com alta cardinalidade são pouco úteis
	- Exemplo: campos de texto livre
	- Remover esses campos dos primeiros 32 da tabela

Uma forma de visualizar essas informações é utilizar o comando:

```py
# informações gerais, como contagem, média, desvio padrão, mínimo, máximo
df.describe("coluna") 

# retorna as estatísticas para todas as colunas do dataframe
df.summary()

# retorna as estatísticas selecionadas para todas as colunas do dataframe
df.summary("tipo") # tipo: stddev, count, avg, mean
```

Todos os métodos de estatística retorna um novo [[DataFrame]], assim para ser exibido é necessário aplicar uma ação como `show()` ou `display()`.