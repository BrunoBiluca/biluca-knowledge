
> [!info] O que é?
> Unity Catalog é um sistema da Databricks que visa unificar todos os aspectos relacionados a governança de dados.

Governança de dados:

- Controle de acesso
	- Controlar quem acessa os dados
- Auditoria
	- Capturar e gravar todos os acessos aos dados
- Linhagem
	- Capturar fontes upstream e consumidores downstream
- Discovery
	- Habilidade de pesquisar e descobrir ativos (assets) autorizados

> [!info] Databricks e Gen AI
> A plataforma Databricks já utiliza IAs generativas para várias tarefas internas, facilitando criar descrições de assets, comentários e outras funções.

![[Principais funcionalidades do Unity Catalog.png|Aspectos que o Unity Catalog|500]]

O Unity Catalog unifica todos os componentes dos dados dentro de agrupamentos que definnem:

- Tabelas: por meio das tabelas é possível verificar a linhagem dos dados
	- Muito relevante para análise de impacto
- Volumes: volumes são abstrações em relação ao local físico que o dado está armazenado
- Modelos

O Modelo de gestão é unificado entre todos os elementos dentro do Databricks.

A partir do esquema `system` podemos analisar informações de uso, contabilização e várias outras informações automaticamente geradas pela Databricks.

É possível monitorar a `qualidade dos dados` no Databricks de forma automática. Dependendo do modelo de dados a própria plataforma do Databricks exibe vários tipos de aspectos relacionados a qualidade dos dados.

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

### Exemplo de um governança de dados com UC

Para esse exemplo iremos utilizar uma base de dados de coletas de batimentos cardíacos. Essa base tem o seguinte formato:

| Tabela: heart_device |      |            |             |                |
| -------------------- | ---- | ---------- | ----------- | -------------- |
| cpf                  | nome | batimentos | data_coleta | id_dispositivo |
| 0000000000-01        | AAA  | 10         | 12/06/2024  | 1              |
| 0000000000-02        | BBB  | 10         | 12/06/2024  | 1              |
| 0000000000-03        | CCC  | 10         | 12/06/2024  | 1              |
| 0000000000-01        | AAA  | 12         | 13/06/2024  | 1              |
| 0000000000-02        | BBB  | 8          | 13/06/2024  | 1              |
Quando criamos essa tabela nós somos o proprietário dos dados dessa tabela e precisamos liberar permissões para que demais usuários consigam manipular esses dados.

Podemos liberar para a visualização externa uma visualização dessa tabela com a média dos batimentos por pessoa:

| VIEW: agg_heartrate |      |                     |
| ------------------- | ---- | ------------------- |
| cpf                 | nome | média de batimentos |
| 0000000000-01       | AAA  | 11                  |
| 0000000000-02       | BBB  | 9                   |
| 0000000000-03       | CCC  | 10                  |

Precisamos adicionar permissões para que outros usuários tenham acesso a essa visualização. Para isso criamos um grupo de usuário chamado `account users` (melhores práticas: permissões para usuários específicos são desencorajadas) e adicionamos privilégios em toda a hierarquia responsável pela visualização.

```sql
-- Todos os usuários do grupo account users tem acesso a visualização agg_heartrate
GRANTE USAGE ON CATALOG ${DA.my_new_catalog} TO `account users`;
GRANTE USAGE ON SCHEMA "example" TO `account users`;
GRANTE USAGE ON VIEW agg_heartrate TO `account users`;
```

> [!tip] Privilégios concedidos
> Perceba que é necessário atribuir privilégios a todos os elementos da cadeia de pertencimento da visualização. Caso seja necessário revogar todos os privilégios de uma vez, é necessário apenas revogar o privilégio do nível mais superior.
> 
> Outra coisa é que não precisamos atribuir privilégios para a tabela que gera a visualização.

Agora digamos que queremos criar uma visualização dinâmica que restrinja a visualização de informações sensíveis para usuário do grupo `account users`. Para isso podemos reimplementar a visualização da seguinte maneira

```sql
CREATE OR REPLACE VIEW agg_heartrate AS
SELECT
	CASE WHEN
		is_account_group_member("account users") THEN "RESTRITO"
		ELSE cpf
	END AS cpf,
	CASE WHEN
		is_account_group_member("account users") THEN "RESTRITO"
		ELSE nome
	END AS nome,
	MEAN() "média de batimentos"
	FROM heart_device
	GROUP BY cpf, nome
```

A visualização para um usuário proprietário do dado continua normal enquanto um usuário do grupo `account users` irá visualizar:

| VIEW: agg_heartrate |          |                     |
| ------------------- | -------- | ------------------- |
| cpf                 | nome     | média de batimentos |
| RESTRITO            | RESTRITO | 11                  |
| RESTRITO            | RESTRITO | 9                   |
| RESTRITO            | RESTRITO | 10                  |
Podemos melhorar a visualização do usuário do `account users` alterando em vez de retornar restrito retornar uma máscara permitindo algum tipo de diferenciação entre as linhas. 

Para isso podemos criar uma função que faz esse tipo de máscara:

```sql
CREATE OR REPLACE FUNCTION mask(x STRING)
	RETURNS STRING
	RETURN CONCAT(
		REPEAT("*", LENGTH(x) - 2), RIGHT(x, 2))
	)

CREATE OR REPLACE VIEW agg_heartrate AS
SELECT
	CASE WHEN
		is_account_group_member("account users") THEN mask(cpf)
		ELSE cpf
	END AS cpf,
	CASE WHEN
		is_account_group_member("account users") THEN mask(nome)
		ELSE nome
	END AS nome,
	MEAN() "média de batimentos"
	FROM heart_device
	GROUP BY cpf, nome
```

| VIEW: agg_heartrate |       |                     |
| ------------------- | ----- | ------------------- |
| cpf                 | nome  | média de batimentos |
| `**********01`      | `**A` | 11                  |
| `**********02`      | `**B` | 9                   |
| `**********03`      | `**C` | 10                  |
Podemos também verificar as permissões concedidas por cada elemento do catálogo:

```sql
SHOW GRANTS ON VIEW agg_heartrate;
SHOW GRANTS ON SCHEMA example;
SHOW GRANTS ON CATALOG ${DA.my_new_catalog};
```

| Principal     | ActionType  | ObjectType | ObjectKey                     |
| ------------- | ----------- | ---------- | ----------------------------- |
| account users | SELECT      | TABLE      | catalog.example.agg_heartrate |
|               |             |            |                               |
| account users | USE SCHEMA  | SCHEMA     | catalog.example               |
| analysts      | USE SCHEMA  | SCHEMA     | catalog.example               |
|               |             |            |                               |
| account users | USE CATALOG | CATALOG    | catalog                       |

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
