# Paginação

## Estratégias

### OFFSET/LIMIT

Esse é uma das estratégias mais simples utilizadas para paginação. Não é recomendada para conjuntos grandes, pois faz o banco percorrer registros já descartados, crescendo o custo de processamento linearmente.

```sql
SELECT id, nome, criado_em 
FROM usuarios 
ORDER BY id ASC 
LIMIT 10 OFFSET 10000;
```

No exemplo acima demonstra o principal problema dessa estratégia, o banco precisa ler 10.010 linhas para entregar apenas 10.

### Cursor-based

Você usa um valor opaco (o "cursor", geralmente o ID do último item codificado em Base64) para indicar de onde continuar. O desempenho é constante, não importa quão "fundo" você vá na lista.

```sql
-- Suponha que o último ID recebido foi 500
SELECT id, nome, criado_em 
FROM usuarios 
WHERE id > 500 
ORDER BY id ASC 
LIMIT 10;
```

A estratégia baseado em cursores precisa de um campo que seja ordenável como referência, por esse caso se o `id` da tabela utilizar UUIDv4, deve ser utilizado um outro campo que garanta a ordem dos registro, como o `criado_em`, por exemplo.

> [!tip] UUID v7
> O UUID v7 possui um timestamp embutido nos seus primeiros 48 bits, permitindo que eles sejam ordenáveis pelo tempo.

### Keyset Pagination com campos indexados

Você usa colunas de ordenação combinadas (como `criado_em` e `id`) que possuem índices no banco de dados. É a forma mais rápida e segura para ordenações complexas (por exemplo, ordenar por data e ID para evitar empates).

```sql
-- Suponha que o último item visto tinha criado_em = '2026-01-10 10:00:00' e id = 500
SELECT id, nome, criado_em 
FROM usuarios 
WHERE (criado_em, id) > ('2026-01-10 10:00:00', 500)
ORDER BY criado_em ASC, id ASC 
LIMIT 10;
```

O exemplo acima exige um índice composto em `(criado_em, id)` no banco de dados.