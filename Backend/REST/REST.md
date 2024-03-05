---
tags:
  - backend
---
# REST

Por que APIs?

- Provêm uma interface comum
- Facilidade de implementação

Modelagem comum

- Banco de dados
- Serviços
- APIs

API First

![[api_first.PNG|Diagrama exemplificando as vantagens de uma modelagem API First. Com ela é possível descoplar o backend e o front end já que a API criada é autocontida|center|500]]
## Padronização REST

- Representational State Transfer
- Estilo arquitetural que utiliza o HTTP visando maior interoperabilidade entre aplicações distribuídas

- Client-Server
  - O client é responsável pela parte do frontend e não se preocupa com a forma que está implementado o backend, mesma coisa o contrário
  - Por exemplo, não é necessário saber o nome do método para acessar uma lista de produtos, isso é definido por um endpoint que será publicado e disponibilizado publicamente, o cliente tem a visão apenas desse contrato feito pelo endpoint e não tem nenhum conhecimento sobre sua implementação

Características
- Stateless
- Cacheable
- Layered System
  - As responsabilidades podem ser distribuídas em aplicações (camadas, servers)
- Interface/Uniform
- Contract

> [!info] RESTful
> Uma API RESTFul é uma api que implementa todos os conceitos do REST

### Por que REST?

- Web já construída em cima do HTTP
- Fácil de entender
- Variedade de implementações

# Design de APIs

### Domínio & URI

> [!tip] URI
> Ter o nome da api no caminho do endpoint pode ajudar na rastreabilidade da informação. Atualmente existem outras formas de fazer esse rastreamento como API Tracker.

URI (Uniform Resource Identifier) é o nome dado a cada recurso disponibilizado por uma API REST.

Nomenclatura
```python
<protocolo>://<sub>.<domain>/<nome-api>/<versão>/<recursos>

# <protocolo> - HTTP ou HTTPS
# <sub> - Subdomínio que representa um conjunto de serviços ou produto
# <dominio> - Domínio principal que representa a instituição como um todo
# <nome-api> - Nome opcional
# <versão> - Versão do recurso
# <recursos> - Nome do recurso disponível
```

Ambientes (Environments)
- Production: https://api.mycompany.com/
- Sandbox: https://api-sandbox.mycompany.com/
- Homologation: https://api.mycompany.com/homolog

Todos os elementos do REST são construídos em cima dos conceitos do [[HTTP]].
## Resource

São os recursos disponíveis para a realização de operações como Criar, Listar, Atualizar e Remover.

![[resources.PNG|Exemplos de recursos e suas principais características|center|500]]

### Granularidade

É possível que um recursos interaja ou possua outros recursos, podemos utilizar desses relacionamentos para criar os endpoints relacionados.

![[granularidade.PNG|Exemplos de recursos e suas granularidades|center|500]]

### Versionamento

O versionamento de recursos é uma possibilidade que visa garantir o contrato entre cliente e servidor.

Quando uma API REST é versionada é criado um contrato (interface) para cada versão que será lançada. Esse contrato deve ser seguido pelo cliente e cumprido pelo servidor.

O cliente então se compromete a consumir uma versão específica ficando a seu encargo implementar as modificações necessárias quando se pretende utilizar uma nova versão. Do outro lado o servidor se compromete a cumprir o contrato não sendo permitido nenhum tipo de alteração que possa alterar o resultado esperado pelo cliente

Essa é uma ótima forma de desacoplar cliente e servidor, porém exige uma boa comunicação entre os times.
