# Otimização

O banco de dados geralmente é um dos elementos de um sistema [[Backend]]  que mais tem espaço para otimização. Isso se dá porque é um dos elementos mais lentos do sistema.

## Índices

Índices são estruturas permitem filtrar os dados utilizando seus próprios valores. Isso pode gerar um ganho de performance crucial para grandes conjuntos de dados.

Análise dos índices pode ser feita a partir do plano de execução da query (ex. EXPLAIN no [[Postgres]]).

Índices também podem ser compostos, por exemplo, em um tabela de projetos, criar um índice componente por (status + data_criacao).

## Particionamento

Particionamento é utilizado para segregar os dados de acordo com seus valores de forma a limitar a quantidade de registros avaliados (SCAN) em uma consulta. O particionamento é imprescindível para grandes conjuntos de dados.

Exemplos de particionamento:

- Data (mês ou ano)
- Região (Brasil, Índia, China...)

## Leitura vs Escrita (CQRS)

Para um cenário com muitas leituras, usaria **réplicas de leitura**, redirecionando consultas pesadas para as réplicas, enquanto as escritas vão para o primário.

## Materialized Views / Summary tables

Se houver consultas com SUM, AVG ou GROUP BY frequentes (ex: total de projetos por status), criaria **materialized views** ou tabelas de sumarização atualizadas via trigger ou job agendado.

## Queries

Para verificar se uma query está pronta para ir para produção podemos fazer os seguintes passos:

- Criação de um **dataset de teste com volume semelhante** usando ferramentas de geração de dados, por exemplo .
- Rodaria as queries com `EXPLAIN ANALYZE` e ferramentas como **Azure Database Studio** ou **pgAdmin**. Também usaria **load testing** com k6 ou JMeter para simular múltiplos usuários simultâneos.