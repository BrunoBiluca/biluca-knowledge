# Curso - Data Engineer Zoomcamp

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Data Engineer Zoomcamp é uma curso gratuito que busca ensinar os fundamentos da profissão de engenheiro de dados a partir aulas e projetos.

--- end-column ---

> [!info] Principais referências
>- [Github - Página do curso](https://github.com/DataTalksClub/data-engineering-zoomcamp)

--- end-multi-column

![[Pasted image 20250325151000.jpg|Escopo completo do curso|%cheio]]


> [!important] **Meu principal objetivo** com o curso é desenvolver minhas habilidades na área de engenharia de dados enquanto experimento algumas tecnologias que não são do meu arcabouço de atuação.

### Modules

[Module 1: Containerization and Infrastructure as Code](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/01-docker-terraform)

[Module 2: Workflow Orchestration](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/02-workflow-orchestration)

[Workshop 1: Data Ingestion](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/cohorts/2025/workshops/dlt/README.md)

[Module 3: Data Warehousing](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/03-data-warehouse)

[Module 4: Analytics Engineering](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/04-analytics-engineering)

[Module 5: Batch Processing](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/05-batch)

[Module 6: Streaming](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/06-streaming)

[Final Project](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/projects)

# Notas

## Module 1: Containerization and Infrastructure as Code

Na primeira aula o professor apresenta o [[Docker]] e como utiliza-lo na criação de um sistema de processamento de dados simples.

Por que utilizar o Docker para engenharia de dados?

- Desenvolver experimentos locais com vários tipos de tecnologia sem a necessidade de instalação
- Testes de integração (CI/CD)
- Reproducibilidade - Docker nos permite reproduzir a mesma configuração em ambientes diferentes
- Execução de pipelines na nuvem (AWS Batch, Kubernetes jobs...)

 Para o banco de dados foi utilizado o [[postgres]] e o [[pgcli]] para execução de comandos para testes do banco de dados.

Uma boa forma de conhecer o esquema de uma tabela antes da sua criação é utilizar o comando `get_schema`

```py
import pandas as pd
pd.io.sql.get_schema(df, name="alguma coisa")
# Retonar a consulta SQL gerada para a criação da tabela
```

Assim podemos corrigir alguns campos que não foram analisados corretamente na leitura do arquivo.

Para a conexão com o banco de dados ele utiliza [[SQLAlchemy]] como motor para criação das tabelas e recuperação dos dados. Isso facilita a conexão em vez de utilizar diretamente o pandas para essa conexão.