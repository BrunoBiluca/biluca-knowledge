---
tags:
  - engenharia_de_dados
  - banco_de_dados
  - mineração
---
# Structured query language (SQL)

SQL é uma linguagem declarativa, em vez de codificar o processamento dos dados, escritores de SQL estipulam as características do resultado final, enquanto que o compilador e o otimizador determinam os passos para chegar nesse resultado.

Uma das principais limitações do SQL é que ele não inclui o conceito de bibliotecas e de código reutilizável.

#### Exemplos de consultas

- [[Diferença entre GROUP BY e WINDOW]]
- [MINUS](https://www.1keydata.com/pt/sql/sql-minus.php)

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

# DML (Data Manipulation Language)

É usada para **inserir, consultar, atualizar e excluir dados** dentro das tabelas.

- Opera sobre os **dados**, não na estrutura.
- Pode ser **revertido** com `ROLLBACK` (em transações).
- Usado por **desenvolvedores e analistas** em operações do dia a dia.

|Comando|Função|Exemplo|
|---|---|---|
|**`SELECT`**|Consulta dados|`SELECT * FROM clientes WHERE id = 1;`|
|**`INSERT`**|Adiciona novos registros|`INSERT INTO clientes (id, nome) VALUES (1, 'João');`|
|**`UPDATE`**|Modifica dados existentes|`UPDATE clientes SET nome = 'Maria' WHERE id = 1;`|
|**`DELETE`**|Remove registros|`DELETE FROM clientes WHERE id = 1;`|
|**`MERGE`**|Combina inserções, atualizações e exclusões em uma única operação|`MERGE INTO target USING source ON (...) WHEN MATCHED THEN UPDATE...`|
# DCL (Data Control Language)

Gerencia permissões (`GRANT`, `REVOKE`).

# TCL (Transaction Control Language)

Controla transações (`COMMIT`, `ROLLBACK`).