# Exemplo - Governança com Unity Catalog

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

Precisamos **adicionar permissões** para que outros usuários tenham acesso a essa visualização. Para isso criamos um grupo de usuário chamado `account users` (melhores práticas: permissões para usuários específicos são desencorajadas) e adicionamos privilégios em toda a hierarquia responsável pela visualização.

```sql
-- Todos os usuários do grupo account users tem acesso a visualização agg_heartrate
GRANTE USAGE ON CATALOG ${DA.my_new_catalog} TO `account users`;
GRANTE USAGE ON SCHEMA "example" TO `account users`;
GRANTE USAGE ON VIEW agg_heartrate TO `account users`;
```

> [!tip] Privilégios concedidos
> Perceba que é necessário atribuir privilégios a **todos os elementos da cadeia** de pertencimento da visualização. Caso seja necessário revogar todos os privilégios de uma vez, é necessário apenas revogar o privilégio do nível mais superior.
> 
> Outra coisa, é que não precisamos atribuir privilégios para a tabela que gera a visualização, apenas para o elemento diretamente utilizado pelo grupo de usuários.

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

A visualização para um **usuário proprietário do dado continua normal** enquanto um usuário do grupo `account users` irá visualizar:

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