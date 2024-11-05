---
tags:
  - banco_de_dados
  - python
  - backend
categoria: biblioteca
---
Alembic é a biblioteca que implementa as ferramentas de migração do SQLAlchemy.

# Exemplo - Básico

Esse exemplo mostramos a utilização do Alembic na criação de um sistema de migrações para um banco de dados que consiste em Produtos e Usuários.

O módulo `db` fica responsável pelo modelo do banco de dados, o módulo `migration` é responsável por criar e efetivar as migrações feitas.

Evolução da base de dados:
- Inicial: criação do modelo de Usuário
- Criação do modelo de Produto
- Adição do campo de email para Usuário

```python
# db.py
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database

Base = declarative_base()

# Modelo inicial do banco de dados
class Usuario(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    idade = Column(Integer)
    email = Column(String) # Coluna adicionada

# Modelo adicionado
class Produto(Base):
    __tablename__ = 'produtos'
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    preco = Column(Integer)

def setup_database():
    DATABASE_URL = 'sqlite:///exemplo.db'
    engine = create_engine(DATABASE_URL)
    if not database_exists(engine.url):
        create_database(engine.url)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    return Session()

```

```python
# migrations.py
from alembic import command
from alembic.config import Config

def create_migration():
    alembic_cfg = Config("alembic.ini")
    alembic_cfg.set_main_option("script_location", "migrations")
    command.revision(alembic_cfg, autogenerate=True, message="Adicionando tabela de produtos")

def apply_migration():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")

```

```python
# main.py
from db import Usuario, Produto, setup_database
from migrations import create_migration, apply_migration

def main():
    session = setup_database()
    session.add(Usuario(nome='Alice', idade=30))
    session.add(Usuario(nome='Bob', idade=25))
    session.commit()

    create_migration()
    apply_migration()

if __name__ == "__main__":
    main()

```

Nesse exemplo para cada alteração feita ao modelo do banco de dados é necessário chamar a função `create_migration()` que analisa a diferença entre o modelo declarado no módulo `db` com o que realmente está implementado no banco de dados.