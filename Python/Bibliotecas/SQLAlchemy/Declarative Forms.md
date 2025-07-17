# Declarative Forms

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
