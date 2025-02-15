
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


