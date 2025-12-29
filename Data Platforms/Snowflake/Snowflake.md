# Snowflake

A plataforma [Snowflake](https://www.snowflake.com/pt_br/) é um **data cloud** baseado em nuvem que oferece um **data warehouse** como serviço (DWaaS).

Snowflake não é construído sobre nenhuma outra tecnologia de banco de dados (como [[Apache Hadoop]]) ele disponibiliza uma **Arquitetura Única (Multi-cluster Shared Data)** que separa **computação** e **armazenamento**, permitindo escalar cada um independentemente com vários workloads podem acessar os mesmos dados simultaneamente sem conflitos.

Sua arquitetura consiste em 3 camadas:

- **Database Storage**
	- Snowflake manages all aspects of how this data is stored — the organization, file size, structure, compression, metadata, statistics, and other aspects of data storage

- **Query Processing**
	- Snowflake processes queries using “virtual warehouses”
	- Possui várias funções específicas que permitem criar visualizações em tabelas ricas
		- [[SQL Reference]]
		- [[Table functions]]

- **Cloud Services**
	- Authentication
	- Infrastructure management
	- Metadata management
	- Query parsing and optimization
	- Access control

- Precificação
	- Cobra por créditos baseados no warehouse virtual, muito simples de gerenciar e prever os gastos

# Visualizações seguras (Secure View)

Visualizações seguras são principalmente projetadas para garantir privacidade de dados ([[Segurança de dados]]). Elas tem sua definição expostas apenas para usuários autorizados e permitem a configurar restrições baseados no controle de acesso para a recuperação de dados.

São criadas adicionando a palavra `SECURE` no momento de criação da view.

### Exemplo de controle de acesso por papel do usuário

Nesse exemplo vamos considerar duas tabelas `widgets` e `widget_access_rules` para construir uma visualização segura de acordo com o controle de acesso dos usuários.

```sql
CREATE TABLE widgets (
    id NUMBER(38,0) DEFAULT widget_id_sequence.nextval, 
    name VARCHAR,
    color VARCHAR,
    price NUMBER(38,0),
    created_on TIMESTAMP_LTZ(9)
);

CREATE TABLE widget_access_rules (
    widget_id NUMBER(38,0),
    role_name VARCHAR
);

CREATE OR REPLACE SECURE VIEW widgets_view AS
    SELECT w.*
	FROM widgets AS w
	WHERE w.id IN (
		SELECT widget_id
		   FROM widget_access_rules AS a
		   WHERE upper(role_name) = CURRENT_ROLE()
	);
```

Apenas são permitidas recuperar dados quando de `widgets` quando o `role_name` do usuário bate com o `CURRENT_ROLE()`. Dessa forma garantimos que usuários tem acesso apenas aos dados disponíveis.

Agora podemos utilizar a visualização segura em qualquer consulta.

```sql
SELECT *
    FROM widgets_view
    WHERE color = 'Purple';
```

Caso um usuário que tem acesso apenas a *widgets vermelhos* faça a consulta acima, como os dados são previamente filtrados de acordo com o seu papel, não serão retornados nenhum widget com a cor roxa.