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
	- Também podemos falar que transformações abrangentes são quando uma partição de entrada pode contribuir com dados para múltiplas partições de saída
	- São exemplos de transformações abrangentes
		- Joins
		- GroupBy
		- Distinct
		- Repartition
		- Coalesce
		- OrderBy

Dentre esses tipos de transformações podemos utilizar várias funções disponíveis:

- [String Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#string)
- [Date & Time Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#date-time)
- [Math Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#math)
- [Aggregate Functions](https://sparkbyexamples.com/spark/spark-sql-functions/#aggregate)
- Sorting functions
- [[Conversões]]
- [[Collection functions]]
- [[WithColumn]]
- [[Window Functions]]
- [[Mesclagens (join)]]
- [[Pivoteamento]]
- [[Processamento de pares chave-valor]]
- [[Tratando valores Nulos]]
- [[Agrupamento]]
- [[Broadcast]]
