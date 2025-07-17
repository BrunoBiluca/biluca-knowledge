---
categoria: biblioteca
---
# SQLAlchemy

[SQLAlchemy](https://docs.sqlalchemy.org/en/latest/) é considerado um dos ORMs mais **maduros e completos** disponíveis, oferecendo uma grande variedade de recursos para lidar com bancos de dados. Ele é uma boa escolha para projetos de médio e grande escala.

Principais funcionalidades:

- [[Consultas e transformações em SQL Alchemy]]
- [[Declarative Forms]]

Bibliotecas relacionadas:

- [[Alembic]] para a criação de Migrações e gestão do Banco de dados físico

# Conceitos básicos

A explicação dos conceitos básicos irá seguir a adotada pelo [tutorial unificado](https://docs.sqlalchemy.org/en/20/orm/quickstart.html) contido na própria documentação do SQLAlchemy.

- Engine - conexão mais dirata
- Session - conexão modelo ORM

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

#### Unit of work

A software architecture where a persistence system such as an object relational mapper maintains a list of changes made to a series of objects, and periodically flushes all those pending changes out to the database.

SQLAlchemy’s [`Session`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session "sqlalchemy.orm.Session") implements the unit of work pattern, where objects that are added to the [`Session`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session "sqlalchemy.orm.Session") using methods like [`Session.add()`](https://docs.sqlalchemy.org/en/20/orm/session_api.html#sqlalchemy.orm.Session.add "sqlalchemy.orm.Session.add") will then participate in unit-of-work style persistence.

### Metadata, table e column

**Metadata** é um objeto utilizado como um Facade em torno do dicionário em Python que declara várias Tabelas (tables) chaveados pelo seu nome definido em string.

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

> [!warning] Ferramentas de migrações são mais apropriadas
> A utilização da funcionalidade do Metadata de criação de estruturas no banco de dados é útil para casos de teste e ou aplicações que viverão por pouco tempo. 
> 
> Para gerenciar um esquema de banco de dados em uma aplicação é mais recomendado utilizar ferramentas de migração como o [[Alembic]], que permitem mais controle sobre o processo de alteração do banco de dados orquestrando esse processo por meio de aportes incrementais ao esquema.
