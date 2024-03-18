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