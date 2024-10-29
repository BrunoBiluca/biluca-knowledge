# Spark web UI

O [[Apache Spark]] fornece um conjunto de UI/interfaces de usuário chamado de [Spark WEB UI](https://spark.apache.org/docs/latest/web-ui.html)que serve para monitorar o status do seu aplicativo Spark/PySpark, o consumo de recursos do cluster Spark e as configurações do Spark.

Telas que o Spark disponibiliza:
- Resource Manager: http://localhost:9870
- Spark JobTracker: http://localhost:8088/
- Node Specific Info: http://localhost:8042/

> [!quote]- Artigo - [Health check using spark ui](https://medium.com/@badwaik.ojas/health-check-using-spark-ui-b0d3d26e08a0)
> Demonstra em um exemplo como fazer o monitoramento de saúde de um cluster executando Apache Spark.
### Spark Application UI (http://localhost:4040/)

- Jobs: São exibidos nessa tela todos os jobs. Jobs são ativados por ações como por exemplo `count()` ou `saveAsTextFile()`.
- [[Stages]]: São exibidos as informações de Stages como DAG criado, cada tarefa.

# Página de detalhes da Query

Essa página exibe informações gerais sobre a execução da Query.

- Tempo de execução
- Duração
- Lista de Jobs associados
- DAG de execução

Ele também mostra métricas do SQL no bloco de operações físicas. Essas métricas podem ser úteis quando nós queremos aprofundar no detalhes de execução de cada operador. Por exemplo, "número de linhas de saída" pode responder como as linhas saem após uma operação de filtro, definido pelo tamanho do derramamento (Spill size) que pode indicar um possível problema de [[Derramamento de dados (Spill)]].