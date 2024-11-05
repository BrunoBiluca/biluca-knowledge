# Transformação de dados

> [!info] O que é?
> [Transforms](https://www.elastic.co/guide/en/elasticsearch/reference/current/transforms.html) permite criar índices sumarizados com dados já existentes no Elasticsearch.
> 
> Por exemplo, podemos transformar dados de forma a pivotar em um formato centrado na entidade que queremos sumarizar, como usuários, sessões e outras entidades dos dados.

Existem duas formas de fazer transformações de dados no Elasticsearch: `pivot` e `latest`. Cada uma dessas formas pode ser executada de forma pontual ou contínua.

> [!warning] Considerações de performance
> Transformações executam pesquisas por agregação nos índices fonte e indexam os resultados nos índices de destino. Então nunca uma transformação usará menos tempo e recursos que essas operações precisam para serem executadas.
> 
> Utilize transformações principalmente quando:
> - É necessário um índice completo (atributos complexos calculados a partir de vários outros) em vez de um conjunto de itens mais recentes.
> - É necessário ordenar os resultados das agregações com uma agregação de pipeline
> - Podemos criar tabelas sumarizadas dos dados para queries otimizadas