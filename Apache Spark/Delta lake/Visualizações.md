# Visualizações

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Visualizações são uma forma de disponibilizar dados apenas de leitura a partir de uma consulta.

--- end-column ---

> [!info] Principais referências
> - [Documentação - Conceitos gerais de visualizações](https://docs.databricks.com/en/views/index.html)
>- 

--- end-multi-column

Em [[Delta lake]] temos principalmente 3 formas de criar visualizações:

- **Visualizações materializadas**
	- Incrementalmente calcula e atualiza os resultados retornados por uma consulta
- **Visualizações temporárias**
	- tem um escopo e persistência limitada como em [[Notebooks]] e Jobs que seu escopo é restribo ao nível no código, ou seja, não pode ser acessado externamente.
- **Visualizações dinâmicas**
	- Podem ser usadas para prover linhas e colunas com controle de acesso e mascaramento de dados

### Visualizações materializadas (Materialized View)

Visualizações materialização são tabelas **pré-processadas** que mantem o estado de uma consulta, dessa forma consultas que são executadas várias vezes podem ser materializadas em uma visualização melhorando a performance.

> [!tip]- Databricks Delta Cache
> Databricks mantém o estado de uma consulta para o cluster ativo melhorando a performance caso essa consulta seja feita várias vezes.
> 
> Mesmo assim não é garantido por quanto tempo esse estado será mantido.

```sql
CREATE MATERIALIZED VIEW mv1
AS SELECT
  date, sum(sales) AS sum_of_sales
FROM
  base_table1
GROUP BY
  date;
```

Para criar uma visualização materializada o usuário precisa ter os seguintes privilégios:

- `SELECT` nas tabelas referenciadas
- `USE CATALOG` e `USE SCHEMA` no catálogo e no esquema que contém as tabelas referenciadas.
- `USE CATALOG` e `USE SCHEMA` no catálogo e no esquema destino da visualização criada
- `CREATE TABLE` e `CREATE MATERIALIZED VIEW` no esquema destino da visualização criada.

### Visualizações dinâmicas

Tipos mais tradicionais de controles de governança como, IAM da AWS e Role-Based Access Controls da Azure, são um bom ponto de início para o gerenciamento desse controle, porém não possuem formas muito refinadas de controle, como **controlar uma coluna específica ou uma visualização específica**.

Para garantir acesso limitado a visualizações em [[Data Lakehouse]] o [[Delta lake]] nos permite criar visualizações dinâmicas que definem comportamento dependendo do papel do usuário. Assim é possível garantir que determinados tipos de papéis dentro da organização não tenham acesso a mais informações do que eles precisam (princípio do mínimo privilégio), por exemplo PII(Person Identification Information).

```sql
CREATE OR REPLACE VIEW customers_vw AS
	SELECT 
		customer_id,
		CASE
			WHEN is_member('admins_demo') THEN email
			else 'REDACTED'
		END as email
		...
	FROM customers_silver
```

No exemplo acima restringimos a visualização do email dos clientes apenas para membros do grupo de usuários *admins_demo*.
