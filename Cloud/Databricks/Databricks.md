---
tags:
  - engenharia_de_dados
---
> [!info] O que é?
> Databricks é uma plataforma que implementa um Data Lakehouse sobre outros tipos de [[Armazenamento de Objetos]].

Componentes da plataforma Databricks

- [[Unity Catalog]]
- [[Delta live tables]]

# Databricks Web

A interface do Databricks web é composta por personas, dessa forma o site se comporta de acordo com cada persona, facilitando assim a utilização dependendo do caso de uso.

Tipos de persona disponíveis:

- Ciência de dados e engenharia
- Machine Learning
- SQL

# Governança

## Hive metastore (legado)

O Hive metastore é uma modelo de controle de privilégios para objetos armazenados no Hive, esse modelo já está definido como legado e será substituído pelo [[Unity Catalog]].

- [Privilégios do Hive metastore e objetos protegíveis](https://docs.databricks.com/pt/data-governance/table-acls/object-privileges.html#privilege-types)
## Permissões

- [Lista de acesso de controle](https://docs.databricks.com/pt/security/auth/access-control/index.html)

> [!important] Grupos de usuários vs Usuários
> - Grupo de usuário não podem ser dono de um Databricks Job. O dono deve ser um indivíduo.
### Cluster 

 - [Permissões de computação](https://docs.databricks.com/pt/compute/clusters-manage.html#cluster-level-permissions)

Existem dois tipos de permissões de cluster

- **Allow cluster creation**: permite criar cluster
- **Permissões em nível de cluster**

| Habilidade                                | CAN ATTACH TO | CAN RESTART | CAN MANAGE |
| ----------------------------------------- | ------------- | ----------- | ---------- |
| Adicionar um notebook para processamento  | ✅             | ✅           | ✅          |
| Ver o Spark UI                            | ✅             | ✅           | ✅          |
| Ver a telemetria do cluster               | ✅             | ✅           | ✅          |
| Ver logs do driver                        |               |             | ✅          |
| Encerrar o processamento                  |               | ✅           | ✅          |
| Iniciar e reiniciar o processamento       |               | ✅           | ✅          |
| Editar o processamento                    |               |             | ✅          |
| Adicionar uma biblioteca ao processamento |               |             | ✅          |
| Redimensionar o processamento             |               |             | ✅          |
| Modificar permissões                      |               |             | ✅          |

## Databricks secrets

> [!info] O que é?
> Databricks secrets permitem que você armazene credenciais e as referencie em notebooks e jobs.
> 
> - [Redaction]([https://docs.databricks.com/security/secrets/redaction.html](https://docs.databricks.com/security/secrets/redaction.html))
> - [Secrets]([https://docs.databricks.com/security/secrets/index.html](https://docs.databricks.com/security/secrets/index.html))

Para manter as credenciais secretas quando lidas utilizando o comando `dbutils.secrets.get()`. Qualquer leitura a partir da API de segredos garante a confidencialidade da informação, mesmo que um usuário exiba como saída de uma célula os valores serão alterados para uma string `[REDACTED]`.

As permissões de acesso ao secrets são:

- **MANAGE**: permite alterar toda a lista de controle de acesso, e escrever e ler do escopo do secret.
- **WRITE**: permite ler e escrever do escopo do secret
- **READ**: permite ler de todo o escopo do secrete e lista os secrets disponíveis.
# Notebooks

### Comandos mágicos

Comandos mágicos que podem ser utilizados nos notebooks do Databricks para várias funcionalidades

```python
%python, %r, %scala, %sql # troca a linguagem na célula de comando
%sh                       # roda código shell
%fs                       # atalho para dbutils comandos do sistema de arquivos
%md                       # markdown para estilização
%run                      # executa um notebook remoto de outro notebook
%pip                      # instala novas bibliotecas python
```

Sobre o `%sh`:
- Reinicia o interpretador do Python
- Executa o código shell sobre a máquina driver local aumentando a sobrecarga de trabalho
- Não pode acessar o armazenamento para persistir a saída

### Adicionando parâmetros aos Notebooks

Para adicionarmos parâmetros os notebook utilizamos a funcionalidade de [Widgets](https://docs.databricks.com/pt/notebooks/widgets.html)

```python
​​dbutils.widgets.text("param1", "default")
param1 = dbutils.widgets.get("param1")
```

Esse parâmetros podem ser configurados pela interface gráfica do Databricks.

### SQL UDF

É possível definir funções para serem reutilizadas no código SQL dentro dos notebooks Databricks.

```sql
%sql
-- exemplo de declaração de função
CREATE OR REPLACE FUNCTION item_preference(name STRING, price INT)
RETURNS STRING
RETURN CASE
	WHEN name = "Standard" THEN "Default item"
	WHEN name = "Premium" THEN "Favorite item"
	WHEN price > 100 THEN "Caro demais"
	ELSE "É isso ai"
END;

-- exemplo de uso da função
SELECT *, item_preference(name, price) FROM item_lookup
```

### Python UDF

Função que aplica uma transformação customizada em uma coluna. Ao aplicar UDFs em python é importante ter em mente algumas considerações:

- Não são otimizadas pelo Catalyst
- São serializadas e enviadas para os executores
	- Os dados da linha são deserializados para formato binário do Spark, passado para a UDF e então os resultados são serializados novamente o formato binário
- Existe uma comunicação excedente entre o executor e o interpretador do python.

É possível registrar uma UDF em python para ser utilizada no SQL.

```python
def example_fn(thing):
	# faz alguma coisa

spark.udf.register("sql_udf", example_fn)

%sql
SELECT sql_udf(thing) as transformed_thing from table_a
```

# Ingestão

A plataforma Databricks permite múltiplas formas de gerenciar dados por meio de ingestão.

## Fontes externas

> [!info] Documentação
> [Objetos de banco de dados em Databricks - Tabelas não gerenciadas](https://docs.databricks.com/pt/database-objects/index.html#what-is-an-unmanaged-table)

Tabelas externas não são gerenciadas pelo Databricks, assim apenas os metadados dessas tabelas são armazenados pela Databricks.

Fontes externas podem ser extraídas por:
- Sistema de arquivos
- JDBC

É possível definir vários tipos de opções na hora de ingerir dados de fontes externas, tanto relacionado a SQL quanto pelo próprio Spark.

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

# [[Delta lake]]

Essa seção está interessada em discutir os principais conceitos, funcionalidades e otimizações disponíveis apenas na plataforma da Databricks.

### Otimização no Delta lake

O Delta lake pode sofrer com **problemas de performance** a medida que seu estado é alterado. Isso ocorre porque são criados vários arquivos pequenos a cada transformação feita, o que faz a consulta desse histórico ser mais onerosa a cada consulta feita.

É indicado utilizar o **versionamento do Delta lake apenas para versões mais recentes** e de tempos em tempos remover os registros mais antigos.

```sql
-- exemplo de limpeza de base
VACUUM students RETAIN 0 HOURS

-- para exibir os resultados removidos antes da operação
VACUUM students RETAIN 0 HOURS DRY RUN
```

### CTAS (Create Tables as Select)

CTAS são tabelas que automaticamente inferem seu esquema quando criadas a partir dados externos bem estruturados como parquet. Essas tabelas são criadas a partir do resultado de uma consulta e **não tem nenhum tipo de ligação com a tabela fonte**, assim mesmo que as tabelas utilizadas como fontes forem removidas as tabelas criadas como CTAS continuam operando normalmente.

```sql
-- Definição da tabela purchases através de CTAS
-- As colunas timestamp são definidas como timestamp do Unix, o que não é interessante para análises
CREATE OR REPLACE TABLE purchases AS
SELECT order_id AS id, transaction_timestamp, purchase_revenue_in_usd AS price
FROM sales;

-- | id  | transaction_timestamp | price |
-- | --- | --------------------- | ----- |
-- | 1   | 600000000             | 42.0  |
```

Para outros tipos de fontes de **dados menos estruturados** podemos criar uma tabela temporária fazer as transformações necessárias e importar na tabela principal.

```sql
-- Definição da tabela com o esquema desejado
CREATE OR REPLACE TABLE purchase_dates (
  id STRING,
  transaction_timestamp STRING,
  price STRING,
  date DATE GENERATED ALWAYS AS (
    cast(cast(transaction_timestamp/1e6 AS TIMESTAMP) AS DATE))
    COMMENT "generated based on `transactions_timestamp` column"
  )

-- Junção dos dados da tabela criada a partir de CTAS com o esquema desejado
SET spark.databricks.delta.schema.autoMerge.enabled=true;

MERGE INTO purchase_dates a
USING purchases b 
ON a.id = b.id 
WHEN NOT MATCHED THEN INSERT *

-- | id  | transaction_timestamp | price | date         |
-- | --- | --------------------- | ----- | ------------ |
-- | 1   | 600000000             | 42.0  | "2020-06-18" |
```

Como Delta Lake força esquema na escrita, **restrições em cada coluna são suportadas** durante a escrita das tabelas.

> [!tip] Tabelas gerenciadas
> Caso a tabela seja criada sem especificar o LOCATION, essa tabela passa a ser gerenciada pelo Databricks (metadados e dados).

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

## Databricks CLI

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

# Jobs

> [!info] Documentação
> - [Criar e executar jobs do Databricks](https://docs.databricks.com/pt/workflows/jobs/create-run-jobs.html#choose-the-correct-cluster-type-for-your-job)

Tipos de clusters:
- **All-purpose clusters**: cluster gerais que servem principalmente para o desenvolvimento.
- **Job clusters**: encerram quando o job é finalizado

> [!tip] Jobs em produção
> Para jobs que já estão em estágio de produção a Databricks recomenda utilizar cluster do tipo *Job Clusters*.

> [!warning] Permissões para Jobs
> Jobs não pode ser atribuídos a grupos de usuários, eles devem ser atribuídos a um dono que deve ser um indivíduo.
> - [https://docs.databricks.com/security/auth-authz/access-control/jobs-acl.html#job-permissions](https://docs.databricks.com/security/auth-authz/access-control/jobs-acl.html#job-permissions)

# [[Change Data Capture]]

O processo de CDC no Databricks pode ser feito fazendo a junção dos dados de uma fonte de dados para uma tabela.

```sql
MERGE INTO target_table t
USING source_updates s
ON t.key = s.key
WHEN MATCHED and t.sequence_field < s.sequence_field
	THEN UPDATE SET *
WHEN MATCHED and s.operation_field = "DELETE"
	THEN DELETE
WHEN NOT MATCHED
	THEN INSERT **
```

Cada linha da tabela deve definir um valor de sequência, esse valor é utilizado para definir qual a linha válida naquela janela de tempo. **Apenas uma entrada é capturada por janela (múltiplas entradas atualizadas geram uma exceção).**

Para garantir que apenas uma entrada seja capturada podemos utilizar a função `rank().over(window)` por exemplo ou outras funções [[Funções nativas#Window Functions]].

# Visualizações (Views)

> [!info] Definição
> Visualizações são tabelas que definem um tipo específico de informação assim facilitando a leitura pelo consumidor. Essa tabelas podem ter os mais diversos formatos e configurações como: visualizações materializadas, dinâmicas ou temporárias.
> 
> - [Conceitos gerais de visualizações](https://docs.databricks.com/en/views/index.html)

- Visualizações materializadas
	- Incrementalmente calcula e atualiza os resultados retornados por uma consulta
- Visualizações temporárias
	- tem um escopo e persistência limitada
- Visualizações dinâmicas
	- Podem ser usadas para prover linhas e colunas com controle de acesso e mascaramento de dados