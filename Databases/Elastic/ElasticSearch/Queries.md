# Queries

## Search

Search é provavelmente o recurso mais utilizado do Elasticsearch, com esse endpoint é possível fazer qualquer tipo de consultada, agregação ou métrica com os dados armazenados.

### Exemplo de Search

```json
GET test-index/_search
{
  "size": 0, 
  "aggs": {
    "categories": {
      "terms": {
        "field": "categories",
        "size": 10000
      }
    }
  }
}
```

## MSearch

Uma alternativa ao Search para quando precisamos de utilizar da paralelização podemos enviar múltiplas queries na mesma requisição.

### Exemplo de MSearch

```json
GET test-index/_msearch
{"index": "test-index"}
{
  "size": 0, 
  "bool": {"must": [{"terms": {"categories": "Categoria XYZ"}}]},
  "aggs": {
    "categoria_count": {
      "value_count": {"field": ""}
    }
  }
}
{"index": "test-index"}
{
  "size": 0, 
  "bool": {"must": [{"terms": {"categories": "Categoria IJK"}}]},
  "aggs": {
    "categoria_count": {
      "value_count": {"field": ""}
    }
  }
}
```

Nesse caso temos duas queries sendo enviadas na mesma requisição para o mesmo index, nesse caso as queries serão executadas em paralelo pelo Elasticsearch e possivelmente serão resolvidas mais rápido que o mesmo exemplo utilizando o `query`.

## Boolean query

A Boolean query é um dos recursos mais utilizados na criação de queries no Elasticsearch, utilizamos uma query booleana para combinar várias cláusulas montando assim consultas mais complexas>

Os tipos de ocorrências possíveis dentro de uma Boolean query são:

- `must`: A cláusula que deve aparecer em um documento e contribui para aumentar o score desse documento.
- `filter`: A cláusula que deve aparecer em um documento, porém diferente do `must` não contribui para o score do documento.
- `should`: A clásula que pode aparecer em um documento.
  - Similar ao `OR` do SQL
  - Pode ser configurada com o campo `minimum_should_match` para determinar o número mínimo de cláusulas atendidas para retornar `true` na query
- `must_not`: A cláusula que não deve aparecer em um documento, esse documento então passa a ser ignorado na consulta

### Exemplo de uma Boolean query

```json
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "title" : "Bruno" }
      },
      "filter": {
        "terms" : { "categories" : ["categoria 1", "categoria 2"] }
      },
      "must_not" : {
        "range" : {
          "createdAt" : { "gte" : "2020-01"}
        }
      },
      "should" : [
        { "terms" : { "comment" : "alegria" } },
        { "terms" : { "comment" : "felicidade" } }
      ],
      "minimum_should_match" : 1
    }
  }
}
```

## Agregações

Agregações no Elasticsearch são consultas que permitem resumir os seus dados em métricas, estatísticas e qualquer outro tipo de análise.

Elas são divididas em 3 tipos:

- Metric: agregações de cálculo de métricas
  - Cardinality
  - Sum
  - Value Count
- Bucket: agregações de agrupamento de documentos
  - Terms aggregations
- Pipeline: agregações que utilizam outras agregações como input no lugar de documentos

Outra questão é que as agregações em uma query são resolvidas de forma sequencial, assim não é possível utilizar o poder de paralelismo do cluster.

# Referências

- [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
- [Agregações](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)
- [Cardinality](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html)
- [Terms Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)