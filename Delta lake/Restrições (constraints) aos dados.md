# Restrições (constraints) aos dados

```sql
-- exemplo de restrição para garantir uma quantidade válida de itens em um pedido de uma loja
ALTER TABLE pedidos ADD CONSTRAINT valid_qty CHECK (quantidade > 0);
```

> [!warning]- Adição de restrição a uma tabela que contém dados
> Quando adicionado uma nova restrição a base é necessário que a base de dados se comporte de acordo com essa restrição, caso contrário o processo falha e devemos resolver esses problemas antes de adicionar a restrição.

