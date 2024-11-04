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
- [[Databricks API]]
- [[Notebooks]]
	- [[CTAS (Create Tables as Select)]]
- [[Workflows]]

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


# AI e Machine Learning
### Registros e carregamento de modelos

> [!quote]- Documentação - [Log, load, register, and deploy MLflow models](https://docs.databricks.com/en/mlflow/models.html)
> Documentação abrangente sobre os principais tópicos relacionados a utilização de modelos no formato MLFlow Models dentro da plataforma Databricks.
> 
> Essa documentação também direciona para outras funcionalidades dentro do Databricks de desenvolvimento de AI e ML.

Modelos de Machine Learning podem ser armazenados no Databricks por meio do [[MLFlow]].

Além das formas de armazenamento do MLFlow é possível armazenar os modelos de ML dentro do Databricks por meio:

- [Manage model lifecycle in Unity Catalog](https://docs.databricks.com/en/machine-learning/manage-model-lifecycle/index.html)
- [Manage model lifecycle using the Workspace Model Registry (legacy)](https://docs.databricks.com/en/machine-learning/manage-model-lifecycle/workspace-model-registry.html)

#### Exemplo - Separação do treinamento do uso de modelos de ML com MLFlow

Podemos fazer o treinamento independente da utilização desse modelo. Nesse exemplo temos o primeiro script que treina e registra o modelo `LogisticRegression` em um volume do Databricks (utilizando o gerenciamento do [[Unity Catalog]]).

```python
# training_model.py
from mlflow import spark
from pyspark.ml.classification import LogisticRegression

# Train a Spark MLlib model
lr = LogisticRegression(maxIter=2)
model = lr.fit(train_data)

# Log the model as an MLflow artifact
with mlflow.start_run() as run:
    mlflow.spark.log_model(model, "caminho/do/modelo")
```

Quando o processamento de [[Structured Streaming]] ou o processamento em lotes do [[Apache Spark]] precisa do modelo, ele é carregado no mesmo volume definido e então utilizado.

```python
# job.py
loaded_model = mlflow.pyfunc.load_model("caminho/do/modelo")
```

Podemos como o exemplo acima mostra separar o desenvolvimento do modelo 