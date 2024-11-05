# Governança em Delta Lake

O [[Delta lake]] provê vários opções de controle de [[Governança de dados]].

### Visualizações dinâmicas

Tipos mais tradicionais de controles de governança como, IAM da AWS e Role-Based Access Controls da Azure, são um bom ponto de início para o gerenciamento desse controle, porém não possuem formas muito refinadas de controle, como controlar uma coluna específica ou uma visualização específica.

Para garantir acesso limitado a visualizações em LakeHouse o Delta Lake nos permite criar visualizações dinâmicas dependendo do papel do usuário. Isso é muito importante para garantir que determinados tipos de papéis dentro da organização não tenham acesso a mais informações do que eles precisam (princípio do mínimo privilégio), por exemplo PII(Person Identification Information).

```sql
CREATE OR REPLACE VIEW customers_vw AS
	SELECT 
		customer_id,
		CASE
			WHEN is_member('admins_demo') THEN email
			else 'REDACTED'
		END as email
		...
	FROM customers_silver
```

No exemplo acima restringimos a visualização do email dos clientes apenas para membros do grupo de usuários *admins_demo*.

### Propagando deleções

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

### Restrições aos dados

```sql
-- exemplo de restrição para garantir uma quantidade válida de itens em um pedido de uma loja
ALTER TABLE pedidos ADD CONSTRAINT valid_qty CHECK (quantidade > 0);
```

> [!tip] Adição de restrição
> Quando adicionado uma nova restrição a base é necessário que a base de dados se comporte de acordo com essa restrição, caso contrário o processo falha e devemos resolver esses problemas antes de adicionar a restrição.

