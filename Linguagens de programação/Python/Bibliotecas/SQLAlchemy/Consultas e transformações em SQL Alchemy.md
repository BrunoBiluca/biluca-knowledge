# Consultas e transformações em SQL Alchemy

## Básico de execução de queries

A única finalidade do objeto [`Engine`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Engine "sqlalchemy.engine.Engine") de uma perspectiva do usuário é fornecer uma unidade de conectividade ao banco de dados chamada [`Connection`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Connection "sqlalchemy.engine.Connection ").

Com uma conexão estipulada podemos fazer qualquer tipo de operação utilizando a própria interface do [[Structured query language (SQL)]].

```python
# exemplo de uma query para recuperar registros do banco de dados para valores y superiores a 2
with engine.connect() as conn:
	result = conn.execute(text("SELECT x, y FROM some_table WHERE y > :y"), {"y": 2})
	for row in result:
		print(f"x: {row.x}  y: {row.y}")
```

Repare que nesse exemplo utilizamos **Bound Parameters** para passar o valor de `y` escolhido, isso é uma boa prática, já que o próprio driver da execução pode *sanitarizar* os dados passados, evitando qualquer tipo de injeção de SQL que pode alterar o comportamento da query e abrir brechas de segurança.

#### Commit as you go vs begin once

Para que qualquer transação tenha efeito é necessário indicar para o banco de dados para ele registrar (`commit`) o novo estado do banco. 

Esse processo pode ser feito de duas maneiras:

- **Commit as you go:** o cliente fica a responsável por indicar o momento de realizar os registros no banco de dados.

```python
# "commit as you go"
with engine.connect() as conn:
    conn.execute(text("CREATE TABLE some_table (x int, y int)"))
    conn.execute(
        text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
        [{"x": 1, "y": 1}, {"x": 2, "y": 4}],
    )
    conn.commit()
```

- **Begin once:** executa o commit ao final de todas as transformações do bloco.

```python
with engine.begin() as conn:
    conn.execute(
        text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
        [{"x": 6, "y": 8}, {"x": 9, "y": 10}],
    )
```

## Scalar Subquery

Podemos utilizar uma estrutura do SQLAlchemy core para fazer selects dentro de outras declarações.

```python
from sqlalchemy import select, bindparam
scalar_subq = (
    select(user_table.c.id)
    .where(user_table.c.name == bindparam("username"))
    .scalar_subquery()
)

with engine.connect() as conn:
    result = conn.execute(
        insert(address_table).values(user_id=scalar_subq),
        [
            {
                "username": "spongebob",
                "email_address": "spongebob@sqlalchemy.org",
            },
            {"username": "sandy", "email_address": "sandy@sqlalchemy.org"},
            {"username": "sandy", "email_address": "sandy@squirrelpower.org"},
        ],
    )
    conn.commit()
```

Nesse exemplo temos uma scalar subquery que é utilizada para inserir os Adresses relacionados pelo username. É uma forma muito mais performática de rodar essa query, que caso o contrário seria executada em duas etapas: primeiro buscando esses ids relacionados a cada username e depois inserindo os Adresses com esses parâmetros.

