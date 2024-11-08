# Workflows

Databricks tem duas formas de orquestração

- Workflow jobs: qualquer processamento
	- Principais usos
		- Orquestração de processamentos dependentes
		- Machine Learning
		- Executar tarefas específicas como chamadas a APIs, scripts python com bibliotecas
- Delta Live Tables: processamentos para Delta Lake
	- Utilizado principalmente para ingestão de dados e transformação de qualquer tipo de ETL, podendo adicionar restrições de qualidade, monitoramento e logs

![[Exemplo de utilização de workflow para ML dentro do Databricks.png|Exemplo de utilização de workflow para ML dentro do Databricks|500]]

> [!tip] Componentes de um fluxo de processamento
> Quando pensamos em um fluxo de processamento é crucial pensar basicamente em 3 coisas:
> 
> - Tarefas (O que?)
> - Agendamento (Quando?)
> - Cluster (Como?)
>   
> Essas 3 perguntas são importantes para definirmos o projeto a fim de otimizarmos sua eficiência, seja na questão dos custos, performance, qualidade entre outras questões.

### Fluxo de execução de Jobs

A execução dos JOBs sequem uma DAG criada

![[Exemplo de DAG criada no Databricks Workflow.png|Exemplo de DAG criada no Databricks Workflow|center|500]]

Caso uma tarefa nesse fluxo falhe, todas as tarefas dependentes são puladas.

A falha de uma tarefa é sempre parcial, o que significa que as operações no notebook antes da tarefa falhar são persistidas, enquanto após a falha todas as operações são puladas. [Guia de reparo de jobs](https://docs.databricks.com/pt/jobs/repair-job-failures.html).

### Configurações de jobs de streaming

Para reiniciar jobs de streaming em casos de falha é recomendável a seguinte configuração:

- **Retries:** Set to Unlimited.    
- **Maximum concurrent runs:** Set to 1. There must be only one instance of each query concurrently active.
- **Cluster:** Set this always to use a new job cluster and use the latest Spark version (or at least version 2.1). Queries started in Spark 2.1 and above are recoverable after query and Spark version upgrades.
- **Notifications:** Set this if you want email notification on failures.
- **Schedule:** Do not set a schedule.
- **Timeout:** Do not set a timeout. Streaming queries run for an indefinitely long time.

A Databricks oferece uma documentação auxiliar de [configurações do cluster](https://docs.databricks.com/en/compute/cluster-config-best-practices.html#complex-batch-etl) para melhor performance e garantia de resistência a falhas.

### Processamentos complexos de ETL

Para operações complexas que envolvam muita distribuição de dados no cluster, como é o caso de JOINS e UNIONS, Databricks recomenda utilizar menos instâncias de trabalhadores no cluster com mais recursos.