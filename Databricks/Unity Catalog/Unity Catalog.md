
> [!info] O que é?
> Unity Catalog é um sistema da Databricks que visa unificar todos os aspectos relacionados a governança de dados.
> 
> - [[Exemplo - Governança com Unity Catalog]]

Governança de dados:

- Controle de acesso
	- Controlar quem acessa os dados
- Auditoria
	- Capturar e gravar todos os acessos aos dados
- Linhagem
	- Capturar fontes upstream e consumidores downstream
- Discovery
	- Habilidade de pesquisar e descobrir ativos (assets) autorizados

> [!info]- Databricks e Gen AI
> A plataforma Databricks já utiliza IAs generativas para várias tarefas internas, facilitando criar descrições de assets, comentários e outras funções.

![[Principais funcionalidades do Unity Catalog.png|Aspectos que o Unity Catalog|500]]

O Unity Catalog unifica todos os componentes dos dados dentro de agrupamentos:

- Tabelas: por meio das tabelas é possível verificar a linhagem dos dados
	- Muito relevante para análise de impacto
- Volumes: volumes são abstrações em relação ao local físico que o dado está armazenado
- Modelos

A partir do esquema `system` podemos analisar informações de uso, contabilização e várias outras informações automaticamente geradas pela Databricks.

É possível monitorar a **qualidade dos dados** no Databricks de forma automática. Dependendo do modelo de dados a própria plataforma do Databricks exibe vários tipos de notificações relacionados a qualidade dos dados.

# Componentes do Unity Catalog

![[Elementos do Metastore.png|Elementos do Metastore|500]]


# Papéis e identidades

Papéis

- Cloud admin
	- Gerencia os recursos da nuvem, como buckets, IAM Roles, service principals
- Identity Admin
	- Gerencia usuários e grupos
- Account admin
	- Gerencia metastores em relação aos workspaces
- Metastore admin
	- Gerencia privilégios e propriedades dos dados
- Data Owner
	- Gerencia privilégios em relação aos dados que são pertencidos
- Workspace admin
	- Gerencia permissões do workspace, como acesso a clusters, usuários, permissões

Identidades

- User
- Service Principal
- Grupos

# Lakehouse federation

> [!info] O que é?
> [Documentação](https://docs.databricks.com/en/query-federation/index.html)

Ferramenta disponível pela Databricks de forma a catalogar dados no Databricks de ferramentas externas, como bancos de dados Postgres, sem a necessidade de trazer esses dados para o ambiente Databricks economizando em transferências de dados.

O query federation altera o catalogo a cada acesso buscando as novas colunas, porém uma ingestão pode quebrar caso o catalogo não esteja atualizado.
# Semântica

É possível criar um glossário, e aproveitar o uso de IA para gerar as sugestões dos termos, também é possível usar parceiros de soluções que fornecem camada semântica baseada em modelos de negócios. Mais informações: https://docs.databricks.com/pt/integrations/index.html#semantic-layer.

A IA Generativa tem essa capacidade, mas a solução para este caso de uso é ter a capacidade de ler a fonte de dados em tempo real usando (CDC) respeitando um glossário, no caso do SAP temos um dicionário que descreve as transação de negócios, e esta solução deve ser anunciada em breve. Quando o dado pousar no Databricks o LakehouseIQ irá sugerir dados para a camada semântica.

# LGPD

O Databricks fornece diversas formas de garantir compliance com suas normas de privacidade.

Podemos criar mascaramento de dados estático, dinâmico, mas dando um exemplo pratico, quando o cliente solicita o opt-out da base (remoção de todos os dados do cliente), de acordo com a LGPD você tem 24 horas para excluir os dados do cliente da sua base de dados, se você armazenar o dado PII criptografado, você pode excluir somente a chave criptográfica deste cliente, desta forma anonimizando o dado, e inutilizando o dado.

Materiais relacionados:
- https://docs.databricks.com/en/data-governance/unity-catalog/row-and-column-filters.html 

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