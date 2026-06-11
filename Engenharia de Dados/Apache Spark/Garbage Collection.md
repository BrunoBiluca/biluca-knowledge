# Garbage Collection

O [[Apache Spark]] roda sobre a Java Virtual Machine (JVM), assim quando grandes massas de dados são carregados tem uma dependência muito grande do gerenciamento de memória e do coletor de lixo do Java.

> [!tip] Aplicações com **uso pesado de computação em memória** (HEAP muito utilizada) exigem ajustes no GC. 
> Uma configuração ruim pode degradar a performance em até 2 vezes.
 
Alguns sintomas comuns de uso excessivo do GC:

- Velocidade da aplicação
- Timeout do heartbeat do executor
- GC erro de passar do limite

O GC remove objetos, mesmo os persistidos como o caso de [[Resilient Distributed Dataset (RDD)]] seguindo o formato LRU (least recently used). Quanto menos espaço de memória um RDD ocupa **mais espaço na Heap da JVM é deixado livre o que aumenta a eficiência do GC**; ao contrário, quanto mais memória é consumida pelo RDD mais perda de performance temos devido a quantidade de objetos acumulados. 

> [!tip] Para o GC quanto menos objetos são carregados mais fácil é a tarefa de fazer a limpeza, assim a **performance para poucos objetos grandes é melhor** do que para vários objetos menores.

A [[Spark web UI]] exibe informações sobre consumo de CPU para a tarefa de Garbage Collection no detalhe do [[Stages]], essa é uma boa maneira de verificar quando o processamento está sendo utilizado para GC em vez de para o processamento real da aplicação Spark.

> [!info] Project Tungsten
> Uma iniciativa para **melhorar o gerenciamento de memória em aplicações do Spark** é o Project Tungsten, que permite um gerenciamento mais direto o que pode resolver muitos problemas relacionados ao GC.

> [!quote]- (Artigo) - [Tuning Java Garbage Collection for Apache Spark Applications](https://www.databricks.com/blog/2015/05/28/tuning-java-garbage-collection-for-spark-applications.html)
> Descreve o GC no Spark e trás várias dicas de configurações.

Em aplicações Java existem algumas estratégias para recolhimento de lixo (GC):

- Concurrent Mark Sweep (CMS)
- Parallel (**Default**)
- Garbage-First (G1 GC) pode ser uma boa opção já que permite customização e a possibilidade de evitar `Full GC`.
	- Também é particularmente performático para o Spark, por dividir a Heap de múltiplas regiões de forma dinâmica em comparação com o GC Parallel

Um dos principais fatores de **degradação da performance** relacionado com o Garbage Collector é quando ele executa uma operação de `Full GC`, nesse momento o processamento da aplicação é pausado para que o GC faça a operação. Uma forma de evitar essa operação é configurar os valores de ocupação da Heap (`InitiatingHeapOccupancyPercent`) de forma a executar operações do GC mais cedo ou aumentar o número de threads responsáveis por marcar a memória (`ConcGCThreads`).


