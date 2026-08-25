# Cache

Uma forma muito comum de melhorar performance em sistemas que dependem de outras integrações é adicionar cache ao serviço de [[Backend]]. A utilização da cache permite **reduzir chamadas às fontes originais** que geralmente são mais lentas que consultas a memória ou a serviços gerenciados como Redis.

## Redis

Redis com TTL time-to-live,

## Cache em memória

Também é possível utilizar a própria memória do servidor para armazenar dados que não são frequentemente alterados nas fontes.

Exemplo utilizando [[Cache em SQLAlchemy|Cache em SQLAlchemy]].

## Invalidação de Cache

O maior problema de cachear o banco de dados em memória é a **inconsistência**. Se o seu código atualizar um registro no banco, o cache continuará servindo o dado antigo.

Sempre que fizer um `UPDATE` ou `DELETE` no banco, lembre-se de **limpar a chave correspondente.**

