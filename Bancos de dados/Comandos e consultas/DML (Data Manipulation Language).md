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