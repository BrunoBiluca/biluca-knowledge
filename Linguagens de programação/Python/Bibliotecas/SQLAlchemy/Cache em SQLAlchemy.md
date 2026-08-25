# Cache em SQLAlchemy

[[SQLAlchemy]] já disponibiliza uma forma de utilizar cache utilizando a função decorada com `@lru_cache`.

```python
from functools import lru_cache
from sqlalchemy.orm import Session
from my_models import Usuario  # Seu modelo do SQLAlchemy

# O cache usa os argumentos da função como chave.
# IMPORTANTE: Não passe o objeto 'db' (Session) como argumento, 
# pois ele muda a cada requisição e quebraria o cache.
def buscar_usuario_com_cache(db: Session, usuario_id: int):
    
    # Função interna pura que recebe apenas argumentos imutáveis
    @lru_cache(maxsize=500)
    def _buscar(u_id: int):
        print(f"--- CONSULTA FEITA NO BANCO DE DADOS PARA O ID: {u_id} ---")
        return db.query(Usuario).filter(Usuario.id == u_id).first()
        
    return _buscar(usuario_id)
```
