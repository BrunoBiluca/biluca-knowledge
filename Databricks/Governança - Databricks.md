---
categoria: prática
---
# Governança

O modelo de [[Governança de dados]] no Databricks é aplicado pelo [[Unity Catalog]].

> [!info]- Hive metastore (legado)
> O Hive metastore é uma modelo de controle de privilégios para objetos armazenados no Hive, esse modelo já está definido como legado e será substituído pelo [[Unity Catalog]].
> - [Privilégios do Hive metastore e objetos protegíveis](https://docs.databricks.com/pt/data-governance/table-acls/object-privileges.html#privilege-types)

Componentes da [[Databricks]] que possibilitam melhorar a segurança da operação

- [[Databricks secrets]]

# Privilégios e objetos seguros

Os objetos dentro do Databricks podem ser protegidos com uma série de [políticas de privilégios](https://docs.databricks.com/pt/data-governance/unity-catalog/manage-privileges/privileges.html).

Alguns dos privilégios mais comuns são:

| Seguro | Privilégios                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------- |
| Tabela | `ALL PRIVILEGES`<br>`APPLY TAG`<br>`MODIFY` (adição, remoção e alteração de dados)<br>`SELECT` |

Cada componente do Metastore tem um tipo de privilégio específico, além disso é necessário disponibilizar privilégios para um componente em cada camada mais baixa é necessário habilitar os privilégios nas camadas superiores, caso contrário o privilégio não terá efeito algum.

# Jobs

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Tipos de permissões de Jobs

- **NO PERMISSIONS** 
- **CAN VIEW**: utilizado para usuários que precisam de visualização sobre o Job
- **CAN MANAGE RUN**: usuários que controlam a execução do JOB
- **IS OWNER**: usuários que gerenciam o Job, podem alterar, deletar ou modificar permissões do Job
- **CAN MANAGE**: mesma coisa do IS OWNER.

--- end-column ---

> [!info] Documentação
> - [Criar e executar jobs do Databricks](https://docs.databricks.com/pt/workflows/jobs/create-run-jobs.html#choose-the-correct-cluster-type-for-your-job)
> - [Lista de acesso de controle](https://docs.databricks.com/pt/security/auth/access-control/index.html)
> - [Permissões para Jobs](https://docs.databricks.com/security/auth-authz/access-control/jobs-acl.html#job-permissions)

--- end-multi-column

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
| Encerrar o processamento (cluster)            |               | ✅           | ✅          |
| Iniciar e reiniciar o processamento (cluster) |               | ✅           | ✅          |
| Ver logs do driver                            |               |             | ✅          |
| Editar o processamento                        |               |             | ✅          |
| Adicionar uma biblioteca ao processamento     |               |             | ✅          |
| Redimensionar o processamento                 |               |             | ✅          |
| Modificar permissões                          |               |             | ✅          |
Tipos de clusters:

- **All-purpose clusters**: cluster gerais que servem principalmente para o desenvolvimento.
- **Job clusters**: encerram quando o job é finalizado, são principalmente **utilizados em produção**.

> [!important] Jobs **não pode ser atribuídos a grupos de usuários**, eles devem ser atribuídos a um dono que deve ser um indivíduo.

# Qualidade dos dados

A preocupação com a qualidade dos dados é um elemento dentro da [[Governança de dados]] que garante a saúde do lake.

[Documentação do Databricks sobre restrições de dados](https://docs.databricks.com/en/tables/constraints.html)

As principais formas de garantir a qualidade dos dados são:

- Forçando restrições as informações dos dados
	- Por exemplo: períodos válidos de tempo, faixas válidas de latitude e longitude
- Verificar por valores NULL
- Relacionar informações (PRIMARY KEY e FOREIGN)
	- Nesse caso, não é possível forçar as relações como em um banco de dados relacional, no [[Unity Catalog]] essas chaves são informativas.
