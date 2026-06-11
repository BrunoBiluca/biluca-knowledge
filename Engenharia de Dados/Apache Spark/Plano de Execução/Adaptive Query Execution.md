# Adaptive Query Execution

**Antes da versão 3.0** do [[Apache Spark]] park faz uma otimização cirando um plano de execução antes de iniciar as consultas, assim que a execução começa o Spark não muda esse plano com nenhuma otimização posterior.

**Adaptive Query Execution** é um novo processo criado que aplica um segundo nível de otimização baseado nas métricas de cada estágio melhorando a performance de forma adaptativa.

O AQE é **desabilitado por padrão** e pode ser habilitado utilizando a configuração `spark.sql.adaptive.enabled` com o valor `true`.

Algumas otimizações que podem ser feitas pelo AQE:

- **Re-otimiza o plano baseado em estatísticas** em tempo de execução
- **Dinamicamente altera o número de partições** de Shuffle como combinar partições adjacentes pequenas em partições maiores em tempo de execução
- **Altera o tipo de junção** feito dependendo do tamanho dos [[DataFrame|DataFrames]] e tabelas, por exemplo quando os DataFrames são pequenos ele altera o tipo de junção para Broadcast
