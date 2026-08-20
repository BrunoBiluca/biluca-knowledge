# Cache

Usando os métodos [`cache()` e `persist()`](https://sparkbyexamples.com/spark/spark-dataframe-cache-and-persist-explained/), o [[Apache Spark]] fornece um mecanismo de otimização para armazenar a **computação intermediária de um RDD** possibilitando seu reuso em ações subsequentes.

Quando você persiste ou armazena em cache um RDD, **cada nó de trabalho armazena** (o Driver não tem dados armazenados) seus dados particionados na memória ou no disco e os reutiliza em outras ações nesse RDD. Os dados persistentes do Spark nos nós são **tolerantes a falhas**, o que significa que se alguma partição for perdida, ela será automaticamente recalculada usando as transformações originais que a criaram (lineage).

- `cache()` armazena por padrão no nível de armazenamento `MEMORY_AND_DISK`

- `persist()`, exatamente igual ao `cache()`, porém, permite definir qual o nível de armazenamento será utilizado como:
	- `MEMORY_AND_DISK`
		- Armazena no espaço disponível na memória, caso seja insuficiente armazena no disco
	- `MEMORY_ONLY`, `DISK_ONLY`
		- Armazena apenas no nível especificado, caso seja insuficiente os dados que não estão armazenados são recalculados
	- `MEMORY_ONLY_SER`, `MEMORY_AND_DISK_SER`
		- adicionam serialização aos objetos armazenados, o que ocupa menos espaço
	- `MEMORY_ONLY_2`,`MEMORY_AND_DISK_2`
		- adicionam réplicas em cada partição

Ambos são **operações preguiçosas (Lazy operation)**, ou seja, apenas ocorrerá o armazenamento quando uma ação for acionada.

Apache Spark automaticamente monitora o uso de cada nós e remove dados persistidos quando não estão sendo usados ou usando o algoritmo de mais recentemente usado (least-recently-used LRU) (veja [[Garbage Collection]]). Para remover manualmente os dados armazenados pode-se utilizar o método `unpersist()`.
