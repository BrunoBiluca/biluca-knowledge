# Solução - Rate Limiting

A forma mais eficiente e padrão de implementar rate limiting no [[FastAPI]] é utilizando a biblioteca externa [slowapi](https://github.com/laurentS/slowapi), que é baseada na popular ferramenta `limits` do Python.

```py
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# 1. Inicializa o Limiter (Padrão: Armazenamento em memória para testes)
# Para produção com Redis use: storage_uri="redis://localhost:6379"
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()

# 2. Configura o estado do limiter e o manipulador de erro HTTP 429
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Rota com limite: Máximo de 5 requisições por minuto
@app.get("/api/v1/dados")
@limiter.limit("5/minute")
async def obter_dados(request: Request):
    return {"status": "sucesso", "mensagem": "Requisição permitida!"}

# Rota livre: Sem qualquer limitação de tráfego
@app.get("/api/v1/livre")
async def rota_livre():
    return {"status": "sucesso", "mensagem": "Esta rota é pública e ilimitada."}
```

Detalhes:

- **O parâmetro `request: Request` é obrigatório:** O `slowapi` inspeciona o objeto da requisição HTTP para extrair o endereço IP do cliente. Se você esquecer de declarar esse argumento na função da rota, o limite falhará.

- **Comportamento do Erro:** Quando o cliente faz a 6ª requisição no mesmo minuto, a API automaticamente interrompe o processamento e retorna o status `HTTP 429 Too Many Requests`.

- **Identificação do Cliente:** A função `get_remote_address` usa o IP do cliente. Se a sua API estiver rodando atrás de um Proxy Reverso (como Nginx ou Cloudflare), configure o FastAPI para ler os cabeçalhos `X-Forwarded-For`.