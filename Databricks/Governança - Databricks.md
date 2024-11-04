# Governança

O modelo de [[Governança de dados]] no Databricks é aplicado pelo [[Unity Catalog]].

# Privilégios e objetos seguros

Os objetos dentro do Databricks podem ser protegidos com uma série de [políticas de privilégios](https://docs.databricks.com/pt/data-governance/unity-catalog/manage-privileges/privileges.html).

Alguns dos privilégios mais comuns são:

| Seguro | Privilégios                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- |
| Tabela | `ALL PRIVILEGES`<br>`APPLY TAG`<br>`MODIFY` (adição, remoção e alteração de dados)<br>`SELECT` |

Cada componente do Metastore tem um tipo de privilégio específico, além disso é necessário disponibilizar privilégios para um componente em cada camada mais baixa é necessário habilitar os privilégios nas camadas superiores, caso contrário o privilégio não terá efeito algum.


> [!info]- Hive metastore (legado)
> O Hive metastore é uma modelo de controle de privilégios para objetos armazenados no Hive, esse modelo já está definido como legado e será substituído pelo [[Unity Catalog]].
> - [Privilégios do Hive metastore e objetos protegíveis](https://docs.databricks.com/pt/data-governance/table-acls/object-privileges.html#privilege-types)

# Databricks secrets

> [!info] O que é?
> Databricks secrets permitem que você armazene credenciais e as referencie em notebooks e jobs.
> 
> - [Redaction]([https://docs.databricks.com/security/secrets/redaction.html](https://docs.databricks.com/security/secrets/redaction.html))
> - [Secrets]([https://docs.databricks.com/security/secrets/index.html](https://docs.databricks.com/security/secrets/index.html))

As permissões de acesso ao secrets são:

- **MANAGE**: permite alterar toda a lista de controle de acesso, e escrever e ler do escopo do secret.
- **WRITE**: permite ler e escrever do escopo do secret
- **READ**: permite ler de todo o escopo do secrete e lista os secrets disponíveis.
- **Administradores do Workspace** e **criadores de secrets** também são papéis que podem utilizar as secrets.

Para manter as credenciais secretas quando lidas utilizando o comando `dbutils.secrets.get()`. Qualquer leitura a partir da API de segredos garante a confidencialidade da informação, mesmo que um usuário exiba como saída de uma célula os valores serão alterados para uma string `[REDACTED]`.

> [!warning]- Jeitinho para exibir um secret em texto
> É possível exibir uma senha armazenada no secrets pelo seguinte código:
> 
> ```python
> db_password = dbutils.secrets.get("prod-scope", "db-password")
> for char in db_password:
>        print(char)
> ```
> 

# Jobs

> [!info] Documentação
> - [Criar e executar jobs do Databricks](https://docs.databricks.com/pt/workflows/jobs/create-run-jobs.html#choose-the-correct-cluster-type-for-your-job)
> - [Lista de acesso de controle](https://docs.databricks.com/pt/security/auth/access-control/index.html)
> - [Permissões para Jobs](https://docs.databricks.com/security/auth-authz/access-control/jobs-acl.html#job-permissions)

# Cluster 

 [Permissões de computação](https://docs.databricks.com/pt/compute/clusters-manage.html#cluster-level-permissions) são as políticas definidas para controlar os clusters criados em nível de cluster e jobs.

Existem dois tipos de permissões de cluster:

- **Allow cluster creation**: permite criar cluster
- **Permissões em nível de cluster:** são permissões definidas para operar os clusters criados.

| Habilidade                                    | CAN ATTACH TO | CAN RESTART | CAN MANAGE |
| --------------------------------------------- | ------------- | ----------- | ---------- |
| Adicionar um notebook para processamento      | ✅             | ✅           | ✅          |
| Ver o Spark UI                                | ✅             | ✅           | ✅          |
| Ver a telemetria do cluster                   | ✅             | ✅           | ✅          |
| Ver logs do driver                            |               |             | ✅          |
| Encerrar o processamento (cluster)            |               | ✅           | ✅          |
| Iniciar e reiniciar o processamento (cluster) |               | ✅           | ✅          |
| Editar o processamento                        |               |             | ✅          |
| Adicionar uma biblioteca ao processamento     |               |             | ✅          |
| Redimensionar o processamento                 |               |             | ✅          |
| Modificar permissões                          |               |             | ✅          |

Tipos de clusters:
- **All-purpose clusters**: cluster gerais que servem principalmente para o desenvolvimento.
- **Job clusters**: encerram quando o job é finalizado, são principalmente **utilizados em produção**.

Jobs **não pode ser atribuídos a grupos de usuários**, eles devem ser atribuídos a um dono que deve ser um indivíduo.
