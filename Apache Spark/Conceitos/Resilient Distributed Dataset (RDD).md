---
tags:
  - engenharia_de_dados
---
# Resilient Distributed Dataset (RDD)

> [!info] Definição 
> RDD ([Resilient Distributed Dataset)](https://sparkbyexamples.com/tag/rdd/) é a estrutura de dados mais fundamental do Spark e é a principal abstração de dados no Apache Spark e no Spark Core. RDDs são coleções distribuídas de objetos imutáveis ​​e tolerantes a falhas, divididas em partições lógicas, que podem ser computadas em diferentes nós do cluster.

Vantagens
- Processamento em memória
- Imutabilidade
- Tolerância a falha  
- Lazy Evaluation: apenas executa as transformações quando necessário
- Particionamento
- Paralelismo

Spark RDDs não são boas alternativas para aplicações que mantém atualizações dos dados ao longo do tempo, como em um sistema de inventário de e-commerce. O principal objetivo da utilização de RDDs é prover um modelo eficiente para processamento de lotes.

Os RDDs são criados principalmente de duas maneiras diferentes: primeiro, [paralelizando uma coleção existente](https://sparkbyexamples.com/spark/ Different-ways-to-create-spark-rdd/) e, em segundo lugar, [referenciando um conjunto de dados em um armazenamento externo](https://sparkbyexamples.com/spark/spark-load-csv-file-into-rdd/) (`HDFS`, `S3` e muitos mais). Automaticamente os dados importados são distribuídos pelas partições disponíveis.

### Repartição de RDDs

**Às vezes** talvez seja necessário [reparticionar o RDD](https://sparkbyexamples.com/spark/spark-repartition-vs-coalesce/). O Spark oferece duas maneiras de reparticionar: primeiro usando o método `repartition()` que embaralha os dados de todos os nós, também chamado de embaralhamento completo e o segundo método [coalesce()](https://sparkbyexamples.com/spark/spark-repartition-vs-coalesce/) que embaralha dados de nós mínimos, por exemplo, se você tiver dados em quatro partições e executar `coalesce(2)` os dados serão movidos apenas em duas das repartições.

### Transformações e Ações em RDDs

[Transformações no Spark RDD](https://sparkbyexamples.com/apache-spark-rdd/spark-rdd-transformations/) retornam outro RDD. As transformações são preguiçosas, o que significa que elas não são executadas até que você chame uma ação no RDD. Algumas transformações em RDDs são `flatMap`, `map`, `reduceByKey`, `filter`, `sortByKey` que retornam um novo RDD em vez de atualizar o atual.

A operação de ação RDD retorna os [valores brutos de um RDD](https://sparkbyexamples.com/apache-spark-rdd/spark-rdd-actions/). Em outras palavras, qualquer função RDD que retorne um não-RDD é considerada uma ação. Alguns exemplos são `count`, `first`, `max`, `collect`.

### Cache em RDDs

Usando os métodos [`cache()` e `persist()`](https://sparkbyexamples.com/spark/spark-dataframe-cache-and-persist-explained/), o Spark fornece um mecanismo de otimização para armazenar a **computação intermediária de um RDD** para que possam ser reutilizados em ações subsequentes.

Quando você persiste ou armazena em cache um RDD, cada nó de trabalho armazena seus dados particionados na memória ou no disco e os reutiliza em outras ações nesse RDD. E os dados persistentes do Spark nos nós são **tolerantes a falhas**, o que significa que se alguma partição for perdida, ela será automaticamente recalculada usando as transformações originais que a criaram.

### Variáveis compartilhadas

Quando o Spark executa transformações como `map()` ou `reduce()` , ele executa em nós remotos usando as variáveis ​​que são enviadas com as tarefas (código estático) não sendo possível compartilhar essas variáveis entre as tarefas. **Variáveis ​​​​compartilhadas do Spark** resolvem esse problema de duas formas:

- Broadcast variables (read-only shared variable)

São variáveis disponíveis em todos os nós do cluster, armazenada na forma de cache. São particularmente boas em armazenar dados estáticos como tabelas de mapeamento de CEPs e endereços.

- Accumulator variables (updatable shared variables)

Os acumuladores Spark são outro tipo de variável compartilhada que só é “adicionada” por meio de uma [operação associativa e comutativa](https://sparkbyexamples.com/spark/spark-accumulators/) e são usados ​​para realizar contadores ou operações de soma.

# Referências

- [Spark RDD Tutorial](https://sparkbyexamples.com/spark-rdd-tutorial/)