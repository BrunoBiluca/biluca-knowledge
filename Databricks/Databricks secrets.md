# Databricks secrets

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

[[Databricks]] secrets permitem que você armazene credenciais e as referencie em notebooks e jobs.

--- end-column ---

> [!info] Principais referências
> - [Redaction]([https://docs.databricks.com/security/secrets/redaction.html](https://docs.databricks.com/security/secrets/redaction.html))
> - [Secrets]([https://docs.databricks.com/security/secrets/index.html](https://docs.databricks.com/security/secrets/index.html))
>- [Lista de controle de acessos de Screts](https://docs.databricks.com/en/security/auth/access-control/index.html#secret-acls)
>- 

--- end-multi-column

As permissões de acesso ao secrets são:

- **MANAGE**: permite alterar toda a lista de controle de acesso, e escrever e ler do escopo do secret.
- **WRITE**: permite ler e escrever do escopo do secret
- **READ**: permite ler de todo o escopo do secret e lista os secrets disponíveis.
- **Administradores do Workspace** e **criadores de secrets** também são papéis que podem utilizar as secrets.

Podemos ler as credenciais secretas pela api `dbutils.secrets.get()`. Qualquer leitura a partir da API de segredos garante a confidencialidade da informação, mesmo que um usuário exiba como saída de uma célula os valores serão alterados para uma string `[REDACTED]`.

> [!warning]- Jeitinho para exibir um secret em texto
> É possível exibir uma senha armazenada no secrets pelo seguinte código:
> 
> ```python
> db_password = dbutils.secrets.get("prod-scope", "db-password")
> for char in db_password:
>        print(char)
> ```
> 

> [!warning]- Secrets não são editados nos logs do Driver
> **Secrets não são editados** nos logs do driver do cluster Spark `stdout` e `stderr`, por isso Databricks define a política de visualizar logs para os `CAN MANAGE`. Para habilitar para outros níveis de usuários o acesso aos logs é necessário configurar `spark.databricks.acl.needAdminPermissionToViewLogs` para falso.

#### Exemplo de utilização do Secrets

```python
password = dbutils.secrets.get(scope="db_creds", key="kdbc_password")

print(passwork) # Irá exibir [REDACTED]

df = (spark
	 .read
	 .format("jdbc")
	 .option("url", connection)
	 .option("dbtable", tablename)
	 .option("user", username)
	 .option("password", password)) # Conexão é feita com sucesso
```

