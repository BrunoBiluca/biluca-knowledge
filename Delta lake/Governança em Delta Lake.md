---
categoria: prática
---
# Governança em Delta Lake

O [[Delta lake]] provê vários opções de controle de [[Governança de dados]].

Considerações

- [[Visualizações]] dinâmicas para grupos de permissões diferentes
- [[Restrições (constraints) aos dados]] podem ser utilizadas para garantir a qualidade dos dados

# Propagando deleções

Para estar alinhado com a legislação de garantir de proteção de dados, o usuário pode requisitar a remoção de todos os seus dados do sistema.

Utilizando Delta Lake podemos fazer a seguinte forma:

- É criada uma tabela de pedidos de deleções, onde fica armazenado o pedido de cada usuário, a data da requisição e o estado.
- Fazemos a remoção dos dados relacionados a essa tabela
	- Cada tabela que existe o dado deve ser processada para o pedido de deleção
- Atualizamos o estado de cada pedido de deleção para deletado
- Como no Delta Lake temos a funcionalidade de Viagem no Tempo é necessário executar o VACUUM em cada tabela para remover os dados de versões anteriores

Exemplo simples de propagação de deleções para apenas uma tabela. Nesse caso é propagado a deleção da tabela `user_lookup` para a tabela `users`.

```sql
CREATE OR REPLACE TEMPORARY VIEW user_lookup_deletes as (
  select * from table_changes("user_lookup", 2) where _change_type = "delete"
);

MERGE INTO users u
USING user_lookup_deletes ud
ON u.alt_id = ud.alt_id
  when matched then delete;
```

