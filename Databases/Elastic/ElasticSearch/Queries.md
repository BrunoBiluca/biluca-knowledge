---
tags:
  - banco_de_dados
---
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

### Filtros gerais vs filtros nas agregações

> [!tip] Melhoria de performance
> Uma coisa para ter atenção na hora de utilizar agregações é garantir que a varredura de itens será a menor possível dentro do Elasticsearch. Qualquer filtro dentro da query pode melhorar muito a performance de uma agregação.

Exemplo de query utilizando um filtro geral, será executado antes dos filtros de agregações:

```json
// Agregação geral
{
  "size": 0, 
  "query": {"bool": {"must": [{"terms": { "categories": ["A"]}}]}},
  "aggs": {"count": { "value_count": { "field": ""}}
}
```

Exemplo de query utilizando filtros nas agregações

```json
// Agregação separada (por agregregação)
{
  "size": 0, 
  "aggs": {
    "filter": {
        "bool": {"must": [{"terms": { "categories": ["A"]}}]}      
    },
    "aggs": {"count": { "value_count": { "field": ""}}
  }
}
```

Esses dois exemplos tem uma diferença de tempo na execução da consulta.
### Paralelismo de agregações

> [!tip] Estratégia de paralelização de agregações
> Uma boa estratégia pode ser quebrar as agregações em várias queries e enviar essas queries todas de uma vez utilizando da api do `msearch`.

```json
// Agregação por msearch
{"index": "test-index"}
{
  "size": 0, 
  "query": {"bool": {"must": [{"terms": { "categories": ["A"]}}]}},
  "aggs": {"count": { "value_count": { "field": ""}}
}
{"index": "test-index"}
{
  "size": 0, 
  "query": {"bool": {"must": [{"terms": { "categories": ["B"]}}]}},
  "aggs": {"count": { "value_count": { "field": ""}}
}
```

Dessa forma fazemos cada query ser referente a apenas um tipo de categoria, isso nos permite utilizar o poder de paralelismo do cluster e retornar a consulta de forma mais rápida.


## Paginação

> [!warning] Paginação pode resultar em problemas de performance
> 
> In a distributed system, the cost of sorting results grows exponentially the deeper we page.
> 
> - [Artigo entendendo paginação profunda](https://rimdev.io/elasticsearch-sinking-in-deep-paging-quicksand)
> - [Documentação sobre Paginação](https://www.elastic.co/guide/en/elasticsearch/guide/current/pagination.html)

## Ordenação

> [!tip] Ordenação de campos do tipo `text`
> Não é possível fazer a ordenação em campos do tipo `text` por se tratar de uma estrutura armazenada no índice invertido.
> 
> Para resolver esse problema, podemos armazenar uma versão do campo no formato `keyword` e assim fazer a ordenação pela ordem alfabética.

## Pesquisa de texto

### Fuzziness

Elasticsearch disponibiliza sua implementação da distância Levenshtein:

```json
// exemplo de query
{"query": {"match": {"title": "intersteller", "fuzziness": 1}}}
```

> [!info]- Distância de Levenshtein
> 
> Levenshtein distance __is a measure of the similarity between two strings, which takes into account the number of insertion, deletion and substitution operations needed to transform one string into the other.__
> 
> - **Insertion:** Adding a character to string A.
> - **Deletion:** Removing a character from string A.
> - **Replacement:** Replacing a character in string A with another character.
> 
> https://www.geeksforgeeks.org/introduction-to-levenshtein-distance/

### Indexando N-grams e Sugestões de completude

Uma técnica que podemos utilizar a indexação de N-grams para melhor a performance em pesquisas de texto, principalmente em sistema de pesquisas enquanto o usuário digita o termo pesquisado.

Dessa forma além da indexação do termo pesquisado também iremos indexar pedaços desse termo para auxiliar no momento da pesquisa.

> [!tip] Exemplo de implementação da funcionalidade de autocomplete
> - [Aulas relacionadas a Search as you Type do cruso de Elasticsearch do mano com a boina](https://www.udemy.com/course/elasticsearch-7-and-elastic-stack/learn/lecture/14728954#overview)

O analisador de autocomplete deve ser apenas utilizado durante a indexação enquanto o analisador padrão deve ser utilizado nas consultas. Isso ocorre já que não queremos que o termos digitado na query seja analisado em seus N-grams e sim como um valor completo, coisa que o analisador padrão faz.

```json
// Exemplo de analisador para autocomplete
{
"settings": {
	"analysis": { 
		"filter": {
			"autocomplete_filter": { // define o filtro
				"type": "edge_ngram",
				"min_gram": 1,
				"max_gram": 4
			}
		},
		"analyzer": { // aplica o filtro no processo de indexação
			"autocomplete": {
				"type": "custom",
				"tokenizer": "standard",
				"filter": ["lowercase", "autocomplete_filter"]
			}
		}
	}
}
```

> [!info] Documentação relacionada a N-gram
> https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html

# Profile API

É possível utilizar a api de profile para identificar pontos de melhores em queries lentas.

[Documentação da Profile API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-profile.html)

```json
GET /my-index-000001/_search
{
  "profile": true,
  "query" : {
    "match" : { "message" : "GET /search" }
  }
}
```

Nesse caso serão retornadas informações relacionadas a query e cada etapa feita durante a execução da query.
# Referências

- [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
- [Agregações](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)
- [Cardinality](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html)
- [Terms Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)