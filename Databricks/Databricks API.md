# Databricks API

A plataforma[[Databricks]] provê uma [API completa](https://docs.databricks.com/api/workspace/introduction) para gerenciamento de forma automatizada de seus componentes.

É possível utilizar o Databricks API de várias formas:

- [[Databricks CLI]]: aplicação na linha de comando com acessos a plataforma Databricks em qualquer sistema operacional
- Databricks SDK: kit de desenvolvimento para várias linguagens de programação como [[Python]], Java e GO.

A API do Databricks pode ser utilizada para várias funcionalidades, principalmente quando queremos informações mais detalhadas do que as apresentadas na interface WEB. 

Um exemplo de utilização da API do Databricks é: recuperar todos os eventos de um cluster por meio da API do Databricks (`GET api/2.1/clusters/events`) o que não é possível apenas pela interface web. Para além da perspectiva de visualização podemos também automatizar esse processo a fim de detalhar o funcionamento de escalonamento dos nós no cluster, o que possibilita criar estratégias de redução de custos.

# Endpoints

## api/2.1/jobs

A API de Jobs permite criar, atualizar, remover e recuperar informações de tarefas e execuções.

#### [POST /create](https://docs.databricks.com/api/workspace/jobs/create)

Esse endpoint nos permite criar quantas execuções quisermos de um JOB. Cada execução nova criada retorna um novo `job_id` que pode ser utilizado para recuperar informações.

Esse endpoint não inicia o processamento, apenas cria o job no cluster.

```json
// Exemplo de configuração
{
	"name": "Ingest new data",
	"existing_cluster_id": "xxxx-xxxxxx-xxxxxxx",
	"notebook_task": {
		"notebook_path": "/Prod/ingest.py"
	}
}
```

#### [GET /get](https://docs.databricks.com/api/workspace/jobs/get)

Esse endpoint nos permite recuperar informações sobre um job definido pelo `job_id`.

#### [GET /runs/get](https://docs.databricks.com/api/workspace/jobs/getrun)

Recupera os metadados relacionados a execução do Job pelo `run_id` enviado.

Metadados:
- Informações do Job registrado
- Agendamento
- Cluster de execução
- Estado atual da execução, aqui podemos saber se ela está executando, bloqueada ou finalizada com sucesso ou falha.


