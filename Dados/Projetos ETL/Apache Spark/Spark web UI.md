# Spark web UI

O Apache Spark fornece um conjunto de UI/interfaces de usuário da Web ([Jobs](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#spark-jobs), [Stages](https://sparkbyexamples. com/spark/spark-web-ui-understanding/#spark-stages), [Tarefas](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#tasks), [Armazenamento](https: //sparkbyexamples.com/spark/spark-web-ui-understanding/#storage), [Ambiente](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#environment), [Executores]( https://sparkbyexamples.com/spark/spark-web-ui-understanding/#executors) e [SQL](https://sparkbyexamples.com/spark/spark-web-ui-understanding/#sql)) para monitorar o status do seu aplicativo Spark/PySpark, o consumo de recursos do cluster Spark e as configurações do Spark.

Telas que o Spark disponibiliza:
- Resource Manager: http://localhost:9870
- Spark JobTracker: http://localhost:8088/
- Node Specific Info: http://localhost:8042/

> [!info] Documentação
> - [Health check using spark ui](https://medium.com/@badwaik.ojas/health-check-using-spark-ui-b0d3d26e08a0)
### Spark Application UI (http://localhost:4040/)

- Jobs: São exibidos nessa tela todos os jobs. Jobs são ativados por ações como por exemplo `count()` ou `saveAsTextFile()`.
- [[Stages]]: São exibidos as informações de Stages como DAG criado, cada tarefa.