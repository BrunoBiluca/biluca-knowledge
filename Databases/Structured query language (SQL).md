---
tags:
  - engenharia_de_dados
  - banco_de_dados
  - mineração
---
> [!info] Essa página tem como objetivo registrar conceitos gerais utilizados para a execução de consultas utilizando SQL que são implementadas por uma grande variedade de ferramentas, banco de dados, processadores de dados e aplicações.

# Diferença entre GROUP BY e WINDOW

Em SQL, tanto o `GROUP BY` quanto as funções de janela (como `OVER`) podem ser usados para fazer agregações, como calcular médias. 

Suponha que temos uma tabela `products` com os seguintes dados:

```sql
| product_id | category | price |
|------------|----------|-------|
| 1          | A        | 10    |
| 2          | A        | 15    |
| 3          | B        | 20    |
| 4          | B        | 25    |
| 5          | A        | 12    |
```

No entanto, há diferenças significativas entre os dois:

1. **GROUP BY**:
    - O `GROUP BY` é usado para agrupar linhas que possuem valores idênticos em uma ou mais colunas especificadas.
    - Ele é usado em conjunto com funções de agregação, como `COUNT`, `SUM`, `AVG`, `MAX`, `MIN`, etc.
    - O `GROUP BY` retorna uma linha por grupo, calculando a agregação para cada grupo.
    - O resultado final é uma linha para cada grupo de valores.

Exemplo de uso do `GROUP BY` para calcular a média:

```sql
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category;
```

```sql
// Resultado
| category | avg_price |
|----------|-----------|
| A        | 12.3333   |
| B        | 22.5      |
```

2. **Funções de Janela**:
    - As funções de janela são usadas para realizar cálculos em um conjunto de linhas relacionadas a uma linha específica em um resultado de consulta.
    - Elas não agrupam os dados como o `GROUP BY`; em vez disso, operam em um conjunto de linhas relacionadas definido por uma "janela".
    - As funções de janela geralmente são usadas em conjunto com a cláusula `OVER`.
    - Elas permitem calcular estatísticas, como média, para cada linha do resultado, mas sem necessariamente agrupar os dados.

Exemplo de uso de funções de janela para calcular a média:

```sql
SELECT 
	product_id, 
	price, 
	AVG(price) OVER (PARTITION BY category) 
AS avg_price_by_category 
FROM products;
```

```sql
| product_id | category | price | avg_price_by_category |
|------------|----------|-------|-----------------------|
| 1          | A        | 10    | 12.3333               |
| 2          | A        | 15    | 12.3333               |
| 5          | A        | 12    | 12.3333               |
| 3          | B        | 20    | 22.5                  |
| 4          | B        | 25    | 22.5                  |
```

Nesse exemplo, `AVG(price) OVER (PARTITION BY category)` calcula a média dos preços para cada categoria, mas retorna a média para cada linha individualmente, sem agrupar os resultados.

Em resumo, a diferença principal é que o `GROUP BY` é usado para agrupar e resumir dados em grupos, enquanto as funções de janela operam em conjuntos de linhas individuais, permitindo calcular estatísticas relacionadas a cada linha individualmente.