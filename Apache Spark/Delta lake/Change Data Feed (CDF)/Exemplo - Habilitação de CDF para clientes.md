## Exemplo - Habilitação de CDF para clientes

Vamos considerar a habilitação de CDF para uma tabela de clientes.

**Tabela de clientes v1**

| Nome             | País |
| ---------------- | ---- |
| Bruno            | null |
| Comandando Fidel | Cuba |

Habilitamos a opção de CDF pelo código:

```sql
ALTER TABLE customers
SET TBLPROPERTIES (delta.enableChangeDataFeed = true)
```

Nesse caso quando essa tabela receber novos registros suas alterações serão catalogadas automaticamente.

Vamos adicionar mais um cliente para nossa tabela e alterar o País do Bruno.

**Tabela de clientes v2**

| Nome             | País   |
| ---------------- | ------ |
| Bruno            | Brasil |
| Comandando Fidel | Cuba   |
| Júlio            | Brasil |

Agora vamos fazer a **consulta das alterações** a partir da versão 2 da tabela (após a habilitação do CDF):

```sql
SELECT *
FROM table_changes("customers", 2) -- (nome_tabela, versão)
```

| Nome  | País   | _change_type    | _commit_version | _commit_timestamp       |
| ----- | ------ | --------------- | --------------- | ----------------------- |
| Bruno | null   | update_preimage | 3               | 2024-07-23 11:40:00.000 |
| Bruno | Brasil | update_posimage | 3               | 2024-07-23 11:40:00.000 |
| Júlio | Brasil | insert          | 3               | 2024-07-23 11:40:00.000 |
**Apenas os registros alterados ou inseridos estão catalogados nas alterações**, o registro do Comandante Fidel não teve alteração então não existem registros catalogados.
