# Gerenciamento do ElasticSearch

O próprio Elasticsearch apresenta várias queries que podem ser utilizadas para o seu gerenciamento, entre elas algumas das mais utilizadas seguem abaixo. 

- **index**/_cache/clear
  - POST
  - Query para resetar a cache de request para um índice específico
- /_cat/shards
  - POST
- /_cat/allocation
  - POST

Utilizar esse tipo de query pode ser interessante para criar sistemas de genreciamento automatizados no Kibana, para monitoramento personalizado do cluster de Elasticsearch.