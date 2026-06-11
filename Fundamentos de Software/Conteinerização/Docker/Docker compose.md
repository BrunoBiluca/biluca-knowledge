---
tags:
  - infraestrutura
---
# Docker compose

> [!info] Definição
> Docker compose é um arquivo que permite configurar vários container e seus relacionamentos.

Principais casos de uso:

- Ambiente de desenvolvimento
- Ambiente de testes automatizado
- Publicação em host único

# Variáveis de ambiente

É possível configurar no Docker compose variáveis de ambiente de duas formas:

- Declarada no próprio `docker-compose.yml`
- Arquivo externo

Caso mais de um modo seja especificado a **ordem de precedência** é:

1. Declarada no próprio `docker-compose.yml`
2. Arquivo externo

#### Declarada no `docker-compose.yml`

```yml
services:
  database:
    image: postgres
    container_name: database
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
      POSTGRES_HOST_AUTH_METHOD: trust
```

#### Arquivo externo


```yml
services:
  database:
    image: postgres
    container_name: database
    env_file:
      - .docker-env
```

