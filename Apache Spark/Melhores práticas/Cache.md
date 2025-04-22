# Cache

Usando os métodos [`cache()` e `persist()`](https://sparkbyexamples.com/spark/spark-dataframe-cache-and-persist-explained/), o [[Apache Spark]] fornece um mecanismo de otimização para armazenar a **computação intermediária de um RDD** para que possam ser reutilizados em ações subsequentes.

Quando você persiste ou armazena em cache um RDD, cada nó de trabalho armazena seus dados particionados na memória ou no disco e os reutiliza em outras ações nesse RDD. E os dados persistentes do Spark nos nós são **tolerantes a falhas**, o que significa que se alguma partição for perdida, ela será automaticamente recalculada usando as transformações originais que a criaram.

- `cache()` armazena por padrão no nível de armazenamento `MEMORY_AND_DISK`

- `persist()`, exatamente igual ao `cache()`, porém, permite definir qual o nível de armazenamento será utilizado como:
	- `MEMORY_ONLY`, `MEMORY_AND_DISK`, `DISK_ONLY`
	- `MEMORY_ONLY_SER`, `MEMORY_AND_DISK_SER` (adicionam serialização aos objetos armazenados, o que ocupa menos espaço)
	- `MEMORY_ONLY_2`,`MEMORY_AND_DISK_2` (adicionam réplicas em cada partição)

Ambos são **operações preguiçosas (Lazy operation)**, ou seja, apenas ocorrerá o armazenamento quando uma ação for acionada.

Apache Spark automaticamente monitora o uso de cada nós e remove dados persistidos quando não estão sendo usados ou usando o algoritmo de mais recentemente usado (least-recently-used LRU). Para remover manualmente os dados armazenados pode-se utilizar o método `unpersist()`.