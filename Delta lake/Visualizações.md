# Visualizações

- Visualizações materializadas
	- Incrementalmente calcula e atualiza os resultados retornados por uma consulta
- Visualizações temporárias
	- tem um escopo e persistência limitada
- Visualizações dinâmicas
	- Podem ser usadas para prover linhas e colunas com controle de acesso e mascaramento de dados


> [!quote]- (Documentação) - [Conceitos gerais de visualizações](https://docs.databricks.com/en/views/index.html)
> Apresentação das formas de criação de visualizações em um [[Delta lake]].

### Visualizações materializadas (Materialized View)

Visualizações materialização são tabelas pré-processadas que mantem o estado de uma consulta, dessa forma consultas que são executadas várias vezes podem ser materializadas em uma visualização melhorando a performance.

> [!tip]- Databricks Delta Cache
> Databricks mantém o estado de uma consulta para o cluster ativo melhorando a performance caso essa consulta seja feita várias vezes.
> 
> Mesmo assim não é garantido por quanto tempo esse estado será mantido.

### Visualizações dinâmicas

Tipos mais tradicionais de controles de governança como, IAM da AWS e Role-Based Access Controls da Azure, são um bom ponto de início para o gerenciamento desse controle, porém não possuem formas muito refinadas de controle, como controlar uma coluna específica ou uma visualização específica.

Para garantir acesso limitado a visualizações em [[Data Lakehouse]] o Delta Lake nos permite criar visualizações dinâmicas dependendo do papel do usuário. Isso é muito importante para garantir que determinados tipos de papéis dentro da organização não tenham acesso a mais informações do que eles precisam (princípio do mínimo privilégio), por exemplo PII(Person Identification Information).

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
