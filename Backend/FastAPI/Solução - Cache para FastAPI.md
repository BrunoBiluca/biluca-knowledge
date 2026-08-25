# Solução - Cache para FastAPI

Solução simples de cache para um serviço utilizando [[FastAPI]]

```py
from fastapi import FastAPI, HTTPException
import redis.asyncio as redis
import json
import asyncio
from typing import Optional

app = FastAPI()

# Conexão Redis
redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)

# Exemplo de dado que seria buscado no banco
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    cache_key = f"user:{user_id}"
    
    # 1. Tenta buscar no cache
    cached = await redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # 2. Cache miss - busca no banco
    user = await get_user_from_db(user_id)
    if not user:
        raise HTTPException(404, "User not found")
    
    # 3. Armazena no cache (expira em 60 segundos)
    await redis_client.setex(cache_key, 60, json.dumps(user))
    
    return user

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    # Invalida cache quando o dado é alterado
    await redis_client.delete(f"user:{user_id}")
    return {"message": "Cache invalidated"}

@app.on_event("shutdown")
async def shutdown():
    await redis_client.close()
```

Também é possível criar um decorator para cache reduzindo quantidade de código.

```py
def cache(ttl: int = 60):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Cria chave baseada nos argumentos
            key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            cached = await redis_client.get(key)
            if cached:
                return json.loads(cached)
            
            result = await func(*args, **kwargs)
            await redis_client.setex(key, ttl, json.dumps(result))
            return result
        return wrapper
    return decorator

@app.get("/users/{user_id}")
@cache
async def get_user(user_id: int):
	user = await get_user_from_db(user_id)
    if not user:
        raise HTTPException(404, "User not found")

    return user

```