# Restrições (constraints) aos dados

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Em [[Delta lake]] é possível adicionar restrições durante o processo de ingestão dos dados. Isso é uma medida importante para garantir [[Qualidade dos dados]].

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://docs.delta.io/latest/delta-constraints.html)
>- 

---

> [!quote]- Outras referências
> - [Artigo - Delta Lake Constraints and Checks](https://delta.io/blog/2022-11-21-delta-lake-contraints-check/)
> 	- Demonstração dos conceitos da aplicação de restrições em Delta lake
> 

--- end-multi-column

> [!warning]- Adição de restrição a uma tabela que contém dados
> Quando adicionado uma nova restrição a base é necessário que a base de dados se comporte de acordo com essa restrição, caso contrário o processo falha e devemos resolver esses problemas antes de adicionar a restrição.

Imagine um exemplo de restrição para garantir uma quantidade válida de itens em um pedido de uma loja:

```sql
ALTER TABLE pedidos ADD CONSTRAINT valid_qty CHECK (quantidade > 0);
```

Quando um novo lote de registro forem adicionados a tabela a restrição será acionada.

Assim podem ocorrer dois casos:

- Todos os dados estão em conformidade com a restrição e o processamento é encerrado com sucesso
- Se algum dado não estiver conforme a restrição o lote é interrompido e nenhum dado é inserido na tabela (garantia [[ACID]]).


