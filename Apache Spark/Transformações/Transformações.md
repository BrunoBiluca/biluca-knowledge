# Transformações

Em [[Apache Spark]] existe principalmente dois tipos de transformações:

- **Transformações estreitas (Narrows)** que dependem apenas da partição. Nesse caso cada partição de um [[DataFrame]] está relacionado diretamente com a partição resultante da transformação. 
	- São exemplos de transformações estreitas
		- [[Filtros]]
		- Consultas
			- `select`
			- `selectExpr` usada para aplicar expressões mais complexas do SQL
		- [String Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#string)
		- [Date & Time Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#date-time)
		- [Math Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#math)
		- [[Uniões]]
		- Map
		- FlapMap
		- MapPartitions
		- [[Conversões]]

- **Transformações abrangentes (Wide)** que dependem de várias partições e envolve o processo de Shuffle.
	- Também podemos falar que transformações abrangentes são quando uma partição de entrada pode contribuir com dados para múltiplas partições de saída
	- São exemplos de transformações abrangentes
		- [[Mesclagens (join)]]
		- [[Agrupamento]]
		- Distinct
		- Repartition
		- [[Ordenação]]

Dentre esses tipos de transformações podemos utilizar várias funções disponíveis:

- [[Collection functions]]
- [[WithColumn]]
- [[Window Functions]]
- [[Pivoteamento]]
- [[Processamento de pares chave-valor]]
- [[Tratando valores Nulos]]
- [[Unicidade de valores]]
