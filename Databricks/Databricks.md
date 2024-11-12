---
tags:
  - engenharia_de_dados
---
# Databricks

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Databricks é uma plataforma que implementa um Data Lakehouse sobre outros tipos de [[Armazenamento de Objetos]].

--- end-column ---

> [!info] Principais referências
> 
> Melhores práticas
> 
> - [[Governança - Databricks]]
> - [[Otimizações - Databricks]]

--- end-multi-column

Componentes da plataforma Databricks

- [[Unity Catalog]]
- [[Delta live tables]]
- [[Databricks API]]
- [[Notebooks]]
	- [[CTAS (Create Tables as Select)]]
- [[Workflows]]

# Databricks Web

A interface do Databricks web é composta por personas, dessa forma o site se comporta de acordo com cada persona, facilitando assim a utilização dependendo do caso de uso.

Tipos de persona disponíveis:

- Ciência de dados e engenharia
- Machine Learning
- SQL

# Gestão dos dados

A plataforma Databricks permite múltiplas formas de gerenciar dados por meio de ingestão.

- [[Auto Loader]]
- Fontes externas
- Bases e tabelas gerenciadas

## Fontes externas

Tabelas externas [não são gerenciadas pelo Databricks](https://docs.databricks.com/pt/database-objects/index.html#what-is-an-unmanaged-table), assim apenas os metadados dessas tabelas são armazenados pela Databricks.

Fontes externas podem ser extraídas por:
- Sistema de arquivos
- JDBC

## Bases de dados e tabelas gerenciadas

Além do processo de ingestão também podemos [criar bases de dados e tabelas próprias](https://docs.databricks.com/sql/language-manual/sql-ref-syntax-ddl-create-schema.html) na plataforma Databricks. 

As bases de dados e tabelas quando criados eles passam a ser **gerenciados pela plataforma**.

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

No Databricks podemos utilizar o [[Exemplo - Separação do treinamento do uso de modelos de ML com MLFlow]] para demonstrar a utilização da biblioteca MLFlow.