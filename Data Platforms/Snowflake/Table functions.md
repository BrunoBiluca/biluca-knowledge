# Table functions

[Documentação de Table functions](https://docs.snowflake.com/en/sql-reference/functions-table)


#### Table() function

A função `table()` retorna um conjunto de linhas a partir de uma função, gerando assim uma representação de tabela temporária para a clausula `FROM`.

Pode ser utilizado principalmente para funções do próprio [[Snowflake]] sem a necessidade de criar tabelas físicas, como é o caso do `FROM table(result_scan(last_query_id()))` que retorna o resultado no formato em tabela da última query executada.