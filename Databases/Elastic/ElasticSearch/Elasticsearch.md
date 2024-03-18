---
tags:
  - banco_de_dados
  - engenharia_de_dados
---
#banco_de_dados 

# Elasticsearch

# Introdução

## O que é? E para que serve? O que come?

Elasticsearch é uma das ferramentas mais em alta nos últimos tempos. É um **mecanismo de busca e análise distribuída em Json**. 

Projetos que necessitam de pesquisas rápidas ou grande abrangência de consultas, agregações e métricas em tempo real tem no Elasticsearch uma ótima das melhores ferramentas disponíveis.

Junto ao Elasticsearch também é possível utilizar o ótimo** Kibana, um sistema de visualização e gerenciamento de dados**, altamente versátil que possibilita criar dashboards incríveis e completos, exibição de dados por geolocalização, análise de logs e métricas de serviços.

Porém como nem tudo são flores o Elasticsearch é um sistema pesado para manter, utilizar o Elasticsearch para uma grande quantidade de dados e um uso grande de queries pesadas pode requisitar uma infraestrutura poderosa e consequentemente uma muito cara 💰. Isso principalmente pelos requisitos de storage rápido SSD e em grande quantidade e uma quantidade muito grande de RAM para armazenar sua tabela de indexação, somado a um uso muito grande de CPU para grandes agregações paralelas.

Para contornar esses problemas algumas medidas de otimizações devem ser tomadas, vou apresentar abaixo algumas dicas que ao longo dos projetos que participei melhoraram muito a performance do sistema e nos fez economizar um trocado bem bom.

## Ferramentas da stack do Elastic

É importante conhecer algumas ferramentas da stack do Elasticsearch para conseguir usufruir o melhor possível de cada uma em seus casos de atuações específicos.

Todos as ferramentas abaixo são gratúitas:

- Elasticsearch: entidade principal de qualquer stack Elastic, é um mecanismo de busca e análise distribuída baseado em JSON
- Kibana: fiel companheiro do Elasticsearch o Kibana é uma interface de usuário extensível, ótima para fazer análises e publicar Dashboards com os dados armazenados no ElasticSearch.
- Logstash: O Logstash é um pipeline gratuito e aberto de processamento de dados do lado do servidor que faz a ingestão de dados de inúmeras fontes, transforma-os e envia-os para o seu "esconderijo" favorito.

# Infraestrutura

Uma coisa importante de entender a respeito do Elasticsearch é a forma de utilização. Existem duas formas de utilizar o Elasticsearch:

- Single-node
- Cluster

O **single-node** é uma instância de Elasticsearch contida em uma única máquina ou VM, utilizada principalmente para desenvolvimento.

O modo **cluster** é o mais recomendado para grandes massas de dados, assim podemos distribuir nossos dados por uma rede de máquinas ou VMs e então aproveitar de toda essa paralelização para escalar horizontalmente a aplicação.

## Criação do Elasticsearch local para desenvolvimento

Para a criação do Elasticsearch local focado em desenvolvimento pode ser facilmente feito utilizando a versão **single-node**. 

Nessa versão todas as funcionalidades do Elasticsearch estão disponíveis, porém elas estão limitadas a apenas uma máquina sendo utilizada,
também não há comunicação entre os nós.

### Docker para execução single-node do ElasticSearch
```yml
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.11.1
    container_name: es01
    environment:
      - xpack.security.enabled=false
      - discovery.type=single-node
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
      - 9300:9300
  
  kibana:
    image: docker.elastic.co/kibana/kibana:7.11.1
    environment:
      - ELASTICSEARCH_HOSTS=http://es01:9200
    ports:
      - 5601:5601
    depends_on:
      - es01

volumes:
  data01:
    driver: local
```

Utilizando o `docker-compose.yml` serão inicializados 2 serviços docker:

- es01: Aplicação do Elasticsearch no modo single-node
  - [http://localhost:9200]()
- kibana: Aplicação do Kibana com várias funcionalidades para mostrar informações persistidas no Elasticsearch
  - [http://localhost:5601]()

## Criação do Elasticsearch local modo cluster

### Docker para execução cluster do ElasticSearch
```yml
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.11.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic
  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.11.1
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data02:/usr/share/elasticsearch/data
    networks:
      - elastic
  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.11.1
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic
  
volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local
  
networks:
  elastic:
    driver: bridge
```

## Shards e Replicas

- Shards: são os containers dos dados. Quando um documento é indexado, o Elasticsearch verifica em qual shard esse documento será armazenado e então ele é persistido lá.

- Réplicas: são replicações dos shards criados, réplicas **podem ser utilizadas para melhorar a performance de consultas e agregações**, já que aumentam a parelelização a execução dessas queries pelo cluster. Uma replica pode espelhar um shard é sempre persistida em um datanode diferente. Outra vantagem do uso de réplicas é a garantia da disponibilidade dos dados no seu sistema. A principal disvantagem de utilizar réplicas é a quantidade de armazenamento necessário, dependendo da quantidade de dados armazenados no Elasticsearch, será necessário gastar o dobro ou mais.

# Mapeamento

O Mapeamento é uma configuração que é passada apenas na criação do **Index**, cada tipo de campo no Elasticsearch tem uma forma de armazenagem e de indexação diferente.

Por padrão todo novo campo contido em um documento enviado para um index será indexado de acordo com a política padrão. Para alterar o comportamento padrão é necessário fornecer um arquivo de mapeamento com a configuração desejada.

## Principais tipos de campos

- Keyword
- Text
- Long
- Date

No caso de ter uma lista o campo de lista é mapeado como o tipo do primeiro elemento da lista, e não é possível criar uma lista com tipos diferentes de dados. Isso porque cada elemento da lista é indexado individualmente, por esse fato deixar elementos em listas não reduz a performances das consultas feitas ao Elasticsearch.

## Parâmetros do mapeamento

Alguns dos parâmetros mais utilizado para a criação de mapeamento

- **coerce:** adicionar coerce no mapeamento de um campo é uma tentativa de limpar o dado quando este não vier no tipo mapeado do campo.
	-  Strings will be coerced to numbers.
	- Floating points will be truncated for integer values.
- **eager_global_ordinals:** cada vez que o shard é atualizado esses campos serão carregados antes. Isso pode ajudar muito na performance de queries no formato **Per-Document Basis** como quando utilizamos ```terms``` em campos como ```keyword```. Dessa forma passamos o **custo de performance na hora do re-index** no lugar de fazer o mesmo processo na hora que a query é requisitada.
- **ignore_malformed:** garante o formato necessário para o campo no quando o campo está num formato não de acordo com o mapeamento
- **enabled:** Podemos desativar a indexação de um campo, o campo pode ser recuperado, mas perde a funcionalidade de ser pesquisado
  - Muito útil para diminuir o uso de storage e o uso de RAM consumida

## Exemplo de json de mapeamento

```json
"properties": {
    "title": { 
        "type": "text", 
    },  
    "author": {
        "type": "keyword",
        "eager_global_ordinals": true
    },
    "categories": {"type": "keyword"},
    "content": { "type": "text" }, 
    "createdAt": { "type": "date" },     
    "comments": { 
        "type": "object",
        "enabled": false
    }
}
```

Utilizando esse mapeamento de dados podemos ver uma melhoria muito grande no storage do Elasticsearch

![Diferença do mapeamento em relação a storage](storage_diff_mapping.PNG)

## Routing

Um tópico importante de tratar sobre Mapeamento é a forma que o seu dados é armazenado no Elasticsearch, principalmente se você tem vários nós com vários shards e réplicas.

Por padrão o Elasticsearch utiliza a seguinte conta para indexar os seus dados:

`shard_num = hash(_routing) % num_primary_shards`

Onde o `_routing` é o `_id` do documento.

Fazendo dessa forma você permite que os seus documentos estejam melhores distribuídos por todos os seus datanodes, otimizando o storage.

Porém a utilização dessa estratégia para agregações mais complexas pode representar uma perda de performance muito grande. Isso ocorre porque os dados deverão ser agrupados em cada shard para então serem agrupados no datanode e finalmente agrupados em nível do Elasticsearch.

Utilizando uma rota customizada podemos garantir que todos os dados necessários para aquela agregação esteja em um mesmo shard melhorando a performance.

Uma **boa estratégia** para garantir o roteamente é utilizar campos que sempre serão utilizados nos **filtros gerais** das agregações. Campos muito utilizados para isso são campos referentes a datas ou ids de clientes, já que a agregação sempre será feita utilizando esse filtro.

Para garantir que a rota deva ser enviada na inserção dos dados é necessário apenas criar um mapeamento utilizando:

```json
{
  "mappings": {
    "_routing": {
      "required": true 
    }
  }
}
```

O insert de documentos deve ser feito então da seguinte maneira:

```json
{
  "_routing": "CategoriaA_2021",
  "title": "Pesquisa elástica",  
  "author": "Senhor elástico",
  "content": "Era uma vez um menino que conseguia fazer contorcionismo", 
  "categories": ["CategoriaA"],
  "createdAt": "2021-03-04",     
  "comments": [
    "Bão demais da conta",
    "5 estrelas",
    "Curti muito não"
  ]
}
```

Dessa forma eu garanto que todos os dados do Autor referentes ao ano de 2021 estão no mesmo shard e agregações que utilizem dessa informação serão feitas mais facilmente. Por exemplo analisar todos os comentários em busca de comentários positivos de todos os livros referentes a categoria CategoriaA no ano de 2021.

# Ingestão dos dados

## Ingestão direta

- Ingestão documento a documento

Para inserir documentos no Elasticsearch é necessário apenas enviar no body da requisição o documento no formato Json que se deseja. Caso o documento tenha algum campo não existente no mapeamento este será mapeado de acordo com o motor do Elasticsearch. 

- Ingestão em bulk

Outra forma de enviar documentos para o Elasticsearch é enviar todos os documentos em apenas uma única chamada, fazendo então uma opção de Bulk.

Quando se utiliza a ingestão por bulk é necessário enviar dois objetos para cada documento ingerido, o objeto do índice e o próprio objeto do documento.

- Ingestão utilizando Apache Spark

Quando estamos utilizando o Apache Spark é necessário utilizar um conector específico do Haddop e Elasticsearch para fazer o envio das informações.

Nesse caso as informações são enviadas de forma paralela para o Elasticsearch. Uma consideração a se fazer é, no caso de uma grande massa de dados ser enviada para o Elasticsearch o processo de indexação desses dados por ser pesada o suficiente para os recursos disponíveis no cluster Elasticsearch como CPU serem totalmente utilizados, e isso pode deixar o cluster do Elasticsearch sobrecarregado para executar agregações.

---

### Demonstração de performance

```python
from elasticsearch import Elasticsearch
es = Elasticsearch([{"host": "localhost", "port": 9200}])

# Envio individual de objetos
for i in range(10000):
	res = es.index(index, body=random_object())

# Envio em buld dos objetos
body = []
for i in range(10000):
	body.append({'index': {}})
	body.append(random_object())

res = es.bulk(body, index=index, doc_type='_doc')
```

Podemos notar uma diferença muito grande no tempo de ingestão entre os tipos de ingestão simples e no modelo bulk. Esse valores foram feitos utilizando o ambiente local.

![Diferença entre os tipos de ingestão de dados](insert_diff.PNG)

- Insert simples: 589s
- Bulk: 36s

## Ingestão utilizando pipelines

Pipelines podem ser utilizados para corrigir ou modificar algum documento que está sendo inserido no Elasticsearch, dessa forma garantimos uma sanidade dos dados em um índice ou podemos também em tempo de inserção criar novos dados a partir do documento enviado a fim de melhorar performance em consultas ou agregações ou removendo dados que podem ser ignorados quando utilizados no Elasticsearch.

Outra vantagem de utilizar Pipelines é poder compartilhar pipelines entre vários indexes possibilitando assim uma consistência maior dos dados.

Um pipeline é constituído como uma lista de `processors`.

Principais processors utilizados:

- `set`: atribuir um valor ao campo, pode ser um valor estático ou uma valor do documento a ser injetado
- `append`: adiciona elementos a um array já existem em um documento
- `json`: converte uma string json para um json estruturado
  - Muito utilizado quando a sua fonte de dados só consegue enviar strings para o Elasticsearch, como é o caso do conector de Hadoop quando enviamos um DataFrame para persistir.
- `script`: podemos utilizar de uma linguagem de script (por padrão painless) para formatarmos os dados
- `pipeline`: podemos chamar um próximo pipeline de execução

```json
// "routing_processor"
{
	"description": "Pipeline responsável por garantir o campo de rotas do indexes baseados em livros",
	"processors": [
		{
			"set": {
				"field": "_routing",
				"value": "{{author}}_{{releaseYear}}"
			}
		},
		{
			"script": {
				"source": """
					ctx.comment_count = ctx.comments.length
				"""
			}
		}
	]
}
```

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

Agregações no Elasticsearch são formas de você resumir os seus dados em métricas, estatísticas e qualquer outro tipo de análise.

Elas são divididas em 3 tipos:

- Metric: agregações de cálculo de métricas
  - Cardinality
  - Sum
  - Value Count
- Bucket: agregações de agrupamento de documentos
  - Terms aggregations
- Pipeline: agregações que utilizam outras agregações como input no lugar de documentos

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

Exemplo de query utilizando filtros nas aggregações

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

Outra questão é que as agregações em uma query são resolvidas de forma sequencial, não sendo utilizado assim a paralelização do cluster.

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
```

Fazendo o exemplo das categorias temos o seguinte resultado dos tempos das queries:

![](query_diff.PNG)

Nesse caso como estamos trabalhando com um único nó do ElasticSearch o msearch se mostrou mais lento que os demais, porém em um cluster com vários nós, isso provavelmente não seria assim.
## Gerenciamento do ElasticSearch

O próprio Elasticsearch apresenta várias queries que podem ser utilizadas para o seu gerenciamento, entre elas algumas das mais utilizadas seguem abaixo. 

- **index**/_cache/clear
  - POST
  - Query para resetar a cache de request para um índice específico
- /_cat/shards
  - POST
- /_cat/allocation
  - POST

Utilizar esse tipo de query pode ser interessante para criar sistemas de genreciamento automatizados no Kibana, para monitoramento personalizado do cluster de Elasticsearch.

# Referências

- Documentação a respeito do mapeamento
	- [Mapeamento explícito](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//explicit-mapping.html)
	- [Mapeamento de arrays](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//array.html)
	- [Text](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//text.html)
	- [Coerce](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//coerce.html)
	- [Eager global ordinals](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//eager-global-ordinals.html#eager-global-ordinals)
	- [Ignore Malformed](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//ignore-malformed.html)
	- [Enabled](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//enabled.html)
- Documenta relacionada a queries
	- [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
	- [Agregações](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)
	- [Cardinality](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html)
	- [Terms Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)