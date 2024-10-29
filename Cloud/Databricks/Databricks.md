---
tags:
  - engenharia_de_dados
---
# Databricks

> [!info] O que é?
> Databricks é uma plataforma que implementa um Data Lakehouse sobre outros tipos de [[Armazenamento de Objetos]].

Componentes da plataforma Databricks

- [[Unity Catalog]]
- [[Delta live tables]]

Funcionalidades da plataforma

- [[Notebooks]]
- [[CTAS (Create Tables as Select)]]

Melhores práticas
- [[Governança - Databricks]]
- [[Otimizações - Databricks]]

# Databricks Web

A interface do Databricks web é composta por personas, dessa forma o site se comporta de acordo com cada persona, facilitando assim a utilização dependendo do caso de uso.

Tipos de persona disponíveis:

- Ciência de dados e engenharia
- Machine Learning
- SQL

# Ingestão

A plataforma Databricks permite múltiplas formas de gerenciar dados por meio de ingestão.

## Fontes externas

Tabelas externas [não são gerenciadas pelo Databricks](https://docs.databricks.com/pt/database-objects/index.html#what-is-an-unmanaged-table), assim apenas os metadados dessas tabelas são armazenados pela Databricks.

Fontes externas podem ser extraídas por:
- Sistema de arquivos
- JDBC

## Auto Loader

> [!info] O que é?
> O Auto Loader processa de forma progressiva e eficiente novos arquivos de dados à medida que chegam ao armazenamento em nuvem sem qualquer configuração adicional.
> 
> [Documentação](https://docs.databricks.com/pt/ingestion/auto-loader/index.html)
> [Configurando o processamento de lotes incrementais](https://docs.databricks.com/pt/structured-streaming/triggers.html#configuring-incremental-batch-processing)

Databricks suporta gatilhos para o Delta Lake e fontes providas por Auto Loader. Essa opção consome todos os dados disponíveis de forma incremental.

Opções:

- `AvailableNow`: consome todos os registros disponíveis como lotes incrementais
- [Descontinuada] `Once`

## Criação de bases de dados e tabelas

Podemos [criar bases de dados e tabelas](https://docs.databricks.com/sql/language-manual/sql-ref-syntax-ddl-create-schema.html) na plataforma Databricks. Quando criados eles passam a ser gerenciados pela plataforma.

Exemplo

```sql
CREATE DATABASE db_hr;
USE db_hr;
CREATE TABLE employees;
```

Como nenhuma localização foi explicitamente definida o Databricks cria essa estrutura da seguinte maneira:

- `db_hr` é criado no caminho padrão `dbfs:/user/hive/warehouse/db_hr.db`
- `employees`  é criado sobre o diretório `db_hr.db`

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

Para reiniciar jobs de stremaing em casos de falha é recomendável a seguinte configuração:

- **Retries:** Set to Unlimited.    
- **Maximum concurrent runs:** Set to 1. There must be only one instance of each query concurrently active.
- **Cluster:** Set this always to use a new job cluster and use the latest Spark version (or at least version 2.1). Queries started in Spark 2.1 and above are recoverable after query and Spark version upgrades.
- **Notifications:** Set this if you want email notification on failures.
- **Schedule:** Do not set a schedule.
- **Timeout:** Do not set a timeout. Streaming queries run for an indefinitely long time.

# Databricks CLI

A plataforma[[Databricks]] provê uma [API completa](https://docs.databricks.com/api/workspace/introduction) para gerenciamento de forma automatizada de seus componentes.

### Criando um workflow

Criando um workflow programaticamente utilizando a própria API do Databricks:

```python
import time

from databricks_cli.sdk.api_client import ApiClient
from databricks_cli.pipelines.api import PipelinesApi

# Set up the entry point with authentication
api_client = ApiClient(
  host  = db_instance,
  token = db_token
)

# Instantiate a PipelinesApi object
pipelines_api = PipelinesApi(api_client)

pipeline = pipelines_api.get(f"{DA.pipeline_id}")
try:
  state = pipeline.get("latest_updates")[0]["state"]
  # Check if running
  not_done = ["WAITING_FOR_RESOURCES", "INITIALIZING", "SETTING_UP_TABLES", "RUNNING"]
  done = ["COMPLETED", "FAILED", "CANCELED"]

  if state in not_done:
      print(f"Pipeline is running (State: {state})")
      print("Excellent work!!")
  elif state in done:
      print(f"Pipeline is done (State: {state})")
      print("Excellent work!!")
  else:
      print("Something must be wrong. Double-check that you started the pipeline")
except:
  print("Something must be wrong. Double-check that you started the pipeline")
```


### Criando um job

```
POST api/2.1/jobs/create
```

Esse endpoint nos permite criar quantas execuções quisermos de um JOB. Cada execução nova criada retorna um novo `job_id` que pode ser utilizado para recuperar informações.