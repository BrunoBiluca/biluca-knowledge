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

### Individual vs Bulk (REST)

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

Podemos notar uma diferença muito grande no tempo de ingestão entre os tipos de ingestão simples e no modelo bulk. Esse valores foram feitos utilizando o ambiente local. Temos nesse caso para Insert simples: 589s e para o Bulk: 36s uma melhor considerável no tempo de ingestão.

Além da utilização do bulk para a inserção dos dados, utilizar de um cliente multi-thread para enviar esses dados pode ser muito vantajoso. O Elasticsearch de tempos em tempos persiste as informações indexadas em disco, caso várias requisições sejam feitas, teremos mais uso de disco enquanto outras threads estão fazendo o trabalho de indexação, reduzindo o tempo ocioso do cluster enquanto faz a escrita.

## Ingestão utilizando pipelines

Pipelines podem ser utilizados para corrigir ou modificar algum documento que está sendo inserido no Elasticsearch, dessa forma garantimos uma sanidade dos dados em um índice ou podemos também em tempo de inserção criar novos dados a partir do documento enviado a fim de melhorar performance em consultas ou agregações ou removendo dados que podem ser ignorados quando utilizados no Elasticsearch.

Outra vantagem de utilizar Pipelines é poder compartilhar pipelines entre vários indexes possibilitando assim uma consistência maior dos dados.

Um pipeline é constituído como uma lista de `processors`.

Principais processors utilizados:

- `set`: atribuir um valor ao campo, pode ser um valor estático ou uma valor do documento a ser injetado
- `append`: adiciona elementos a um array já existem em um documento
- `json`: converte uma string json para um json estruturado
  - Muito utilizado quando a sua fonte de dados só consegue enviar strings para o Elasticsearch, como é o caso do conector de Hadoop quando enviamos um DataFrame para persistir.
- `script`: podemos utilizar de uma linguagem de script (por padrão [painless](https://www.elastic.co/guide/en/elasticsearch/painless/8.12/painless-guide.html)) para formatarmos os dados
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

# Otimizações


> [!tip] Deligar `replica` e `refresh` durante escrita de grande quantidade de dados
> [Terceira dica do artigo de otimizações em um cluster do Elasticsearch](https://betterprogramming.pub/boosting-elasticsearch-cluster-performance-3-proven-tips-9b718a9114bc)
> 
> A ideia é desligar durante a operação de bulk e após essa operação ser concluída ligar novamente. Dessa forma (pelo que o artigo explica) o cluster não disponibilizará recursos para a replicação desses dados enquanto eles estão sendo indexados melhorando a performance do cluster no geral.
