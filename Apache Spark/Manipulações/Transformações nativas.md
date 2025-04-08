# Transformações nativas

Em [[Apache Spark]] existe principalmente dois tipos de transformações:

- **Transformações estreitas (Narrows)** que dependem apenas da partição.
- **Transformações abrangentes (Wide)** que dependem de várias partições e envolve o processo de Shuffle.

Dentre esses tipos de transformações podemos utilizar várias funções disponíveis:

- [String Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#string)
- [Date & Time Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#date-time)
- [Math Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#math)
- [Aggregate Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#aggregate)
- Sorting functions
- Consultas
	- `select`
	- `selectExpr` usada para aplicar expressões mais complexas do SQL
- `cast` usado para alterar o tipo de uma coluna
- [[Collection functions]]
- [[WithColumn]]
- [[Window Functions]]
- [[Mesclagens (join)]]
- [[Pivoteamento]]
- [[Processamento de pares chave-valor]]

> [!tip] Dica de performance
> Sempre que possível tente utilizar a biblioteca padrão Spark SQL, ela é um pouco mais rápida na compilação, trata valores nulos e performa um pouco melhor que UDFs
