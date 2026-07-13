# Fivetran

[Fivetran](https://www.fivetran.com/?r=0) é uma plataforma de movimentação, gerenciamento e transformação de dados. É uma plataforma escalável que permite operacionalizar fluxos complexos sempre muita configuração.

> [!info] Considerações em 2026
> Fivetran tem que um [Free plan](https://www.fivetran.com/pricing/free-plan) para pequenas quantidades de dados sem a necessidade de cartão de crédito.
> O plano gratuito permite todas as funcionalidades do plano Standart com a limitação do volume de ingestão.

Conceitos comuns ao utilizar o Fivetran:

| Term               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **source**         | The application, database, storage, or event service from which Fivetran replicates data to your destination.                                                                                                                                                                                                                                                                                                                                                           |
| **destination**    | The system where Fivetran loads your replicated source data. Fivetran supports cloud data warehouses, databases, data lakes, and online data platforms. Each destination is linked to exactly one group.                                                                                                                                                                                                                                                                |
| **connection**     | A data pipeline that replicates data from your source to your destination.                                                                                                                                                                                                                                                                                                                                                                                              |
| **connector type** | The pre-built component that determines which source type Fivetran connects to. For example, Salesforce is a connector type                                                                                                                                                                                                                                                                                                                                             |
| **group**          | A group maps users to the destination. Each group is mapped on a 1:1 basis to its destination. We do this mapping using the group's `id` value that we automatically generate when you create a group, and the destination's `group_id` value that you specify when you create a destination. This means that you must create a group in your Fivetran account before you can create a destination in it. Users and connections can be provisioned within these groups. |

# Fivetran API

O Fivetran disponibiliza uma API Rest que permite executar várias operações da plataforma de forma programável.

### Validação da Autenticação

```shell
curl -u "sua_api_key:seu_api_secret" "https://api.fivetran.com/v1/groups"
```

### Conexão entre Postgres e Snowflake

Etapas:

1. Autenticação
	- Scoped API Key
2. Criação dos recursos
	- Grupo
	- Destino
	- Origem
3. Conexão (processamento)

Pensando em algum tipo de automação da conexão entre origem e destino, podemos passar diretamente para a etapa 3, já que todos os demais elementos estarão criados.

#### Criação do Grupo

Antes de definir o processamento de dados é necessário definir um Grupo. Todo grupo é mapeado 1:1 em relação ao destino.

```shell
curl -X POST "https://api.fivetran.com/v1/groups" \
     -u "$FIVETRAN_API_KEY:$FIVETRAN_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Meu Grupo de Dados"
         }'
```

Essa chamada irá retornar o `group_id` que será utilizado para vincular as pontas do processamento.

#### Criação do Destino

Todo destino é relacionado a um Grupo.

```shell
curl -X POST "https://api.fivetran.com/v1/destinations" \
     -u "$FIVETRAN_API_KEY:$FIVETRAN_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
           "group_id": "SEU_GROUP_ID",
           "service": "snowflake_db",
           "config": {
             "host": "seu-conta.snowflakecomputing.com",
             "port": 443,
             "database": "SEU_BANCO_DADOS",
             "user": "SEU_USUARIO",
             "password": "SUA_SENHA",
             "auth": "PASSWORD"
           }
         }'
```

Esse destino fica vinculado a partir do `group_id` e o resultado dessa resposta é o `destination_id`.

#### Criação da Origem

A Origem é definida depois que já temos um Grupo configurado e seu destino definido.

```shell
curl -X POST "https://api.fivetran.com/v1/connections" \
     -u "$FIVETRAN_API_KEY:$FIVETRAN_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
		  "group_id": "SEU_GROUP_ID",
		  "service": "postgres_db",
		  "trust_certificates": true,
		  "trust_fingerprints": true,
		  "run_setup_tests": true,
		  "paused": false,
		  "sync_frequency": 1440,
		  "config": {
		    "schema_prefix": "seu_prefixo", 
		    "host": "endereco.do.seu.postgres",
		    "port": 5432,
		    "database": "nome_do_banco",
		    "user": "usuario_fivetran",
		    "password": "senha_do_usuario",
		    "auth": "PASSWORD"
		  }
		}'
```

- `group_id` - grupo relacionado
- `service` - o conector utilizado pelo Fivetran para fazer a integração
- `trust_certificates` - define se o Fivetran deve confiar automaticamente no certificado SSL do servidor PostgreSQL.
- `trust_fingerprints` - permite que o Fivetran confie na impressão digital (fingerprint) do certificado SSL, mesmo que não seja assinado por uma CA confiável.
- `run_setup_tests` - Controla se o Fivetran deve executar os testes de conexão imediatamente após a criação.
	- `true` - O Fivetran testa se consegue conectar ao banco, ler tabelas, e verifica permissões. Se falhar, a criação é rejeitada.
	- `false` - A conexão é criada sem testes imediatos (útil para configurações assíncronas).
- `paused` - obrigatório, define se a conexão inicia pausada ou ativa.
	- `false`: A sincronização começa automaticamente após a configuração bem-sucedida.
	- `true`: A conexão é criada, mas fica pausada (você precisará ativá-la manualmente via API ou dashboard).
- `sync_frequency` - opcional, frequência com que o Fivetran deve executar sincronizações incrementais.
- `config` - define o objeto com as credenciais de conexão ao seu PostgreSQL

#### Configuração de extração apenas de esquemas

Também é possível definir esquemas específicos para fazer a extração. 

Para isso é necessário criar a conexão em modo pausado, fazer a configuração dos esquemas específicos e então submeter novamente a conexão para então ser processada.

```shell
PATCH /v1/connections/{connectionId}/schemas
{
  "schema_change_handling": "BLOCK_ALL",
  "schemas": {
    "nome_do_seu_esquema": {
      "enabled": true
    }
  }
}
```

- `schema_change_handling` - BLOCK_ALL trava a ingestão para todos os schemas.

```shell
PATCH /v1/connections/{connectionId}
{
  "paused": false
}
```
