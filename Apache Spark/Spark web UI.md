# Spark web UI

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

O [[Apache Spark]] fornece um conjunto de UI/interfaces de usuário chamado de [Spark WEB UI](https://spark.apache.org/docs/latest/web-ui.html) que serve para monitorar o status do seu aplicativo Spark/PySpark, o consumo de recursos do cluster Spark e as configurações do Spark.

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://spark.apache.org/docs/latest/web-ui.html)

--- end-multi-column

Telas que o Spark disponibiliza:
- Resource Manager: http://localhost:9870
- Spark JobTracker: http://localhost:8088/
- Node Specific Info: http://localhost:8042/

> [!quote]- Artigo - [Health check using spark ui](https://medium.com/@badwaik.ojas/health-check-using-spark-ui-b0d3d26e08a0)
> Demonstra em um exemplo como fazer o monitoramento de saúde de um cluster executando Apache Spark.


Principais abas da tela:

- **Jobs tab** mostra informações gerais sobre os jobs como estado, duração, progresso...
	- **Jobs detail** mostra informações como linha do tempo de eventos, DAG , lista de estágios
- **Stages Tab** mostra informações de todos os estágios em todos os jobs submetidos
	- **Stage detail** mostra informações agregadas de todas as tarefas executadas junto com várias métricas, como duração, tempo de deserialização, tempo de GC, métricas relacionadas a Shuffle (Leitura e Escrita, [[Derramamento de dados (Spill)]])
- **Storage Tab** exibe os [[Resilient Distributed Dataset (RDD)]] e [[DataFrame]] armazenados na aplicação
- **Environment Tab** exibe os valores de variáveis de configuração e de ambiente, incluindo JVM, Spark e propriedade do sistema
- **Executors Tab** resume informações de executores criados para a aplicação, não só provê informações dos recursos mas também de performance como tempo de GC e métricas de Shuffle
- **SQL Tab** se a aplicação executa Spark SQL essa tela exibe informações gerais como duração, jobs, e [[Plano de execução]] 
	- **SQL Metrics**
- **Structured Streaming Tab** se a aplicação executa jobs em micro-batch mode com [[Structured Streaming]] essa tela exibe informações gerais sobre o job, como *input rate, process rate, input rows, batch duration, operation duration*...
- **Streaming (DStreams) Tab** se a aplicação utiliza DStream API
- **JDBC/ODBC Server Tab** Se Spark estiver sendo executado como um motor de SQL distribuído essa janela irá exibir informações sobre sessões e operações de SQL submetidas.

# Spark Application UI

A Spark Application UI pode ser visualizada no caminho http://localhost:4040/.

- Jobs: São exibidos nessa tela todos os jobs. Jobs são ativados por ações como por exemplo `count()` ou `saveAsTextFile()`.
- [[Stages]]: São exibidos as informações de Stages como DAG criado, cada tarefa.

# SQL Tab

Essa página exibe informações gerais sobre a execução da Query (**SQL Metrics**).

- Tempo de execução
- Duração
- Lista de Jobs associados
- DAG de execução

Ele também mostra métricas do SQL no bloco de operações físicas. Essas métricas podem ser úteis quando nós queremos aprofundar no detalhes de execução de cada operação. Por exemplo, "número de linhas de saída" pode responder como as linhas saem após uma operação de filtro, ou também o tamanho do derramamento (Spill size) que pode indicar um possível problema de [[Derramamento de dados (Spill)]].