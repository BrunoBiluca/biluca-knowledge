# DDL (Data Definition Language)

É usada para **definir, modificar e excluir a estrutura** do banco de dados (esquemas, tabelas, índices, etc.).

- Afeta a **estrutura** do banco, não os dados em si.    
- Geralmente usado por **administradores de banco de dados (DBAs)**.
- Operações são **auto-commit** (não podem ser desfeitas com `ROLLBACK` em alguns SGBDs).

| Comando        | Função                                                      | Exemplo                                              |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| **`CREATE`**   | Cria objetos (tabelas, views, índices)                      | `CREATE TABLE clientes (id INT, nome VARCHAR(100));` |
| **`ALTER`**    | Modifica a estrutura de objetos existentes                  | `ALTER TABLE clientes ADD COLUMN email VARCHAR(50);` |
| **`DROP`**     | Remove objetos do banco de dados                            | `DROP TABLE clientes;`                               |
| **`TRUNCATE`** | Remove todos os dados de uma tabela, mas mantém a estrutura | `TRUNCATE TABLE clientes;`                           |
| **`RENAME`**   | Renomeia objetos                                            | `RENAME TABLE clientes TO usuarios;`                 |