[SQLAlchemy](https://docs.sqlalchemy.org/en/latest/) é considerado um dos ORMs mais **maduros e completos** disponíveis, oferecendo uma grande variedade de recursos para lidar com bancos de dados. Ele é uma boa escolha para projetos de médio e grande escala.

SQLAlchemy’s `asyncio` support depends upon the [greenlet](https://pypi.org/project/greenlet/) project.

# Conceitos básicos

A explicação dos conceitos básicos irá seguir a adotada pelo tutorial unificado contido na própria documentação do SQLAlchemy.

### Engine

O início de qualquer aplicativo SQLAlchemy é um objeto chamado [`Engine`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Engine "sqlalchemy.engine.Engine") . Esse objeto atua como uma fonte central de conexões para um banco de dados específico, fornecendo tanto uma fábrica quanto um espaço de armazenamento chamado [pool de conexões](https://docs.sqlalchemy.org/en/20/core/pooling.html ) para essas conexões de banco de dados.

```python
from sqlalchemy import create_engine
engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)
```

A string de conexão informa a `engine` 3 fatores principais:
- Tipo do banco de dados (sqlite)
- DBAPI utilizada (pysqlite)
- Localização do banco de dados (:memory:)

### Básico de execução de queries

A única finalidade do objeto [`Engine`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Engine "sqlalchemy.engine.Engine") de uma perspectiva do usuário é fornecer uma unidade de conectividade ao banco de dados chamada [`Connection`](https://docs.sqlalchemy.org/en/20/core/connections.html#sqlalchemy.engine.Connection "sqlalchemy.engine.Connection ").

Com uma conexão estipulada podemos fazer qualquer tipo de operação utilizando a própria interface do [[Structured query language (SQL)]].

```python
# exemplo de uma query para recuperar registros do banco de dados para valores y superiores a 2
with engine.connect() as conn:
	result = conn.execute(text("SELECT x, y FROM some_table WHERE y > :y"), {"y": 2})
	for row in result:
		print(f"x: {row.x}  y: {row.y}")
```

Repare que nesse exemplo utilizamos **Bound Parameters** para passar o valor de `y` escolhido, isso é uma boa prática, já que o próprio driver da execução pode sanitarizar os dados passados, evitando qualquer tipo de injeção de SQL que pode alterar o comportamento da query e abrir brechas de segurança.
#### Commit as you go vs begin once

Para que qualquer transação tenha efeito é necessário indicar para o banco de dados para ele registrar (`commit`) o novo estado do banco. Esse processo pode ser feito de duas

- Commit as you go: o cliente fica a responsável por indicar o momento de realizar os registros no banco de dados.

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

- Begin once: executa o commit ao final de todas as transformações do bloco.

```python
with engine.begin() as conn:
    conn.execute(
        text("INSERT INTO some_table (x, y) VALUES (:x, :y)"),
        [{"x": 6, "y": 8}, {"x": 9, "y": 10}],
    )
```

### ORM Session

A utilização da estrutura Session se dá quando utilizamos o módulo ORM e é muito parecida com a utilizada pela Connection.

```python
from sqlalchemy.orm import Session

stmt = text("SELECT x, y FROM some_table WHERE y > :y ORDER BY x, y")
with Session(engine) as session:
    result = session.execute(stmt, {"y": 6})
    for row in result:
        print(f"x: {row.x}  y: {row.y}")
```

### Metadata, table e column

Metadata é um objeto utilizado como um Facade em torno do dicionário em Python que declara várias Tabelas (tables) chaveados pelo seu nome definido em string.

Dentro do Metadata temos informações das tabelas, colunas, chaves, chaves estrangeiras e qualquer outro tipo de restrição envolvida ao banco de dados.

```python
# exemplo de definição de uma tabela
from sqlalchemy import MetaData
metadata_obj = MetaData()

from sqlalchemy import Table, Column, Integer, String
user_table = Table(
    "user_account",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("name", String(30)),
    Column("fullname", String),
)

address_table = Table(
    "address",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("user_id", ForeignKey("user_account.id"), nullable=False),
    Column("email_address", String, nullable=False),
)
```

O objeto Metadata criado no exemplo acima pode ser utilizado como o processo de criação dessa estrutura no próprio banco de dados. Esse processo é chamado de emitir o DDL (Data Definition Language) ao banco de dados.

```python
metadata_obj.create_all(engine)

''' SQL gerado

BEGIN (implicit) 
PRAGMA main.table_...info("user_account") 
...
PRAGMA main.table_...info("address") 
... 
CREATE TABLE user_account ( 
	id INTEGER NOT NULL, 
	name VARCHAR(30), 
	fullname VARCHAR, 
	PRIMARY KEY (id) 
) 
... 
CREATE TABLE address ( 
	id INTEGER NOT NULL, 
	user_id INTEGER NOT NULL, 
	email_address VARCHAR NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES user_account (id) 
) 
... 
COMMIT
```

> [!tip] Ferramentas de migrações são mais apropriadas
> A utilização da funcionalidade do Metadata de criação de estruturas no banco de dados é útil para casos de teste e ou aplicações que viverão por pouco tempo. Para gerenciar um esquema de banco de dados em uma aplicação é mais recomendado utilizar ferramentas de migração como o [Alembic](https://alembic.sqlalchemy.org/), que permitem mais controle sobre o processo de alteração do banco de dados orquestrando esse processo por meio de aportes incrementais ao esquema.

#### Declarative Forms

Esse é outra forma de criação do esquema do banco de dados. Essa forma prioriza o formato da declaração por meio de classes e outras estruturas declarativas.

```python
from sqlalchemy.orm import DeclarativeBase
class Base(DeclarativeBase):
    pass

############################################
from typing import List
from typing import Optional
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user_account"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]]
    addresses: Mapped[List["Address"]] = relationship(back_populates="user")
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(Base):
    __tablename__ = "address"
    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("user_account.id"))
    user: Mapped[User] = relationship(back_populates="addresses")
    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"
```

> [!info] Table reflection
> Caso o banco de dados já esteja criado é possível fazer um processo de criação das estruturas mapeadas por meio do próprio banco. Esse processo é chamado [Reflecting Database Objects](https://docs.sqlalchemy.org/en/20/core/reflection.html)
> 

### Unit of work

A software architecture where a persistence system such as an object relational mapper maintains a list of changes made to a series of objects, and periodically flushes all those pending changes out to the database.

SQLAlchemy’s [`Session`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session "sqlalchemy.orm.Session") implements the unit of work pattern, where objects that are added to the [`Session`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session "sqlalchemy.orm.Session") using methods like [`Session.add()`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session.add "sqlalchemy.orm.Session.add") will then participate in unit-of-work style persistence.

### Scalar Subquery

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


# Referências

- [Tutorial unificado do SQLAlchemy para versões 2.0 e acima](https://docs.sqlalchemy.org/en/20/tutorial/index.html)
	- Esse tutorial visa demonstrar as principais funcionalidades da biblioteca junto com sua arquitetura.