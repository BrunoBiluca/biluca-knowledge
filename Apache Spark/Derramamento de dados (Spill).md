# Derramamento de dados (Spill)

Esse problema ocorre quanto a base de dados é grande demais para caber na memória RAM de um cluster [[Apache Spark]]. Caso esse problema não seja resolvido pode ocorrer **erro OOM (Out of Memory**).

Exemplos comuns de ocorrer derramamento

- `spark.sql.files.maxPartictionBytes` muito grande
- `explode()` de até listas pequenas
- `join()` ou `crossJoin()` de tabelas que geram muitos dados novos
- `join()` ou `crossJoin()` de tabelas por uma chave desbalanceada
- `groupBy()` onde a coluna tem baixa cardinalidade
- `countDistinct()` e `size(collect_set())`
- `spark.sql.shuffle_partitions` baixo demais ou uso errado do `repartition()`

No Spark UI ([artigo com exemplos da Spark UI](https://medium.com/road-to-data-engineering/spark-performance-optimization-series-2-spill-685126e9d21f)), o derramamento é exibido como dois valores:

- Spill (Memory)
- Spill (Disk)

Esses valores aparecem em várias partes da Spark UI como: Summary metrics, Aggregated metrics by executor, Tasks table e na tela de [[Plano de execução]].

> [!tip] Dados em disco vs memória
> Sempre os dados em disco serão menores que os dados me memória devido ao ganho de compressão durante o processo de serialização.