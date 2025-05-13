---
categoria: ferramenta
---
# Great Expectations

A ferramenta [Great Expectations (GX)](https://greatexpectations.io/) disponibiliza uma série de funções para testar os dados em relação a [[Qualidade dos dados]].

> [!quote]- (Artigo) - [Data quality unit tests in PySpark using Great Expectations](https://towardsdatascience.com/data-quality-unit-tests-in-pyspark-using-great-expectations-e2e2c0a2c102/)
> Exemplo de utilização da ferramenta Great Expectations junto ao PySpark

### Passo a passo de utilização

0. **Instalação e Importação da biblioteca**

```py
import great_expectations as gx
```

1. **Criação do contexto de dados (Data context)**

Entrada o código interagir com os componentes do GX. 

```py
context = gx.get_context()
```

2. **Conectar os dados e criar um Batch**

Aqui é necessário a criação de 4 componentes.

- Data Source
- Data Asset
- Batch Definition
- Batch

3. **Crie as expectativas**

As expectativas são aplicadas as fontes de dados a fim de verificar suas conformidades em relação as regras de negócio.

```py
expectation = gx.expectations.ExpectColumnValuesToBeBetween(
    column="passenger_count", min_value=1, max_value=6
)
```

4. **Validação das expectativas**

As expectativas são executadas em relação ao Batch definido no passo 2

```py
validation_result = batch.validate(expectation)
```

5. **Exibição dos resultados**

```json
{
    "success": false,                           // resultado geral das expectativas
    "results": [                                // resultados individuais das expectativas
        {
            "success": true,                    // resultado de um expectativa
            "expectation_config": {},           // configuração da expectativa
            "result": {},                       // detalhes do resultado
                                                // Em caso de falha demonstra a motivo da falha
            "meta": {},
            "exception_info": {}
        },
        // ... outras expectativas configuradas
    ],
    "suite_name": "kickstarter_expectation_suite",
    "suite_parameters": {},
    "statistics": {},
    "meta": {},                                 // informações gerais da bateria de validação
    "id": null
}
```

## Componentes

A ferramenta Great Expectations utiliza uma série de componentes que colocados juntos permitem uma variedade grande de funcionalidades na hora de avaliar os dados. Entre eles os principais são:

- Data context
- Data source
- Data asset
- Batch Definition
- Batch
- Expectations

Alguns componentes que permitem expandir as funcionalidades da ferramenta:

- Checkpoints
- Validation Definition

### Data Context

O contexto de dados define um local para armazenar os metadados relacionados ao processo de validação, como as fontes de dados, expectativas, checkpoints...

- **File Data Context:** contexto armazenado em um arquivo no formato yaml que pode ser utilizado em vários processamentos
- **Ephemeral Data Context:** contexto criado apenas na sessão do python
- GX Cloud data context

### Data source

O data source é o componente que define onde os dados estão armazenados. Cada Data Source deve ter um nome único no mesmo Data Context.

Existem vários tipos de data sources possíveis como `add_postgres`, `add_databricks_sql`, isso irá depender do tipo de fonte de dados que está sendo avaliada.

```py
# exemplo da adição de um Data source do tipo Apache Spark
data_source = context.data_sources.add_spark("spark_datasource")
```

### Data Assets

Um data asset é um conjunto de registros de um data source, ele determina quais registros estão disponíveis para acesso. Esses registros podem ser tanto os registros de uma tabela ou um subconjunto definido por uma consulta.

```py
# exemplo da adição de uma dataframe asset para o data_source do tipo SparkDatasource
data_asset = data_source.add_dataframe_asset("kickstarter_projects")
```

### Batch definitions

O Batch definitions define como os registros provenientes de um Data Asset são recuperados, ou seja, se são recuperados de forma integral, um subconjunto de dados definidos em uma consulta e etc. Um Data Asset pode ter múltiplas Batch Definitions (nomes únicos), isso pode ser utilizado para avaliar conjuntos de dados diferentes.

É possível também utilizar o Batch Definitions para limitar o conjunto dos dados avaliados.

```py
full_table_batch_definition = data_asset.add_batch_definition_whole_table(name="FULL_TABLE")
```

Retorna um Batch que representa todo o [[Dataframe]].

### Validation Definition

Uma Validation Definition é uma referência fixa que liga uma Batch de dados a uma bateria de expectativas (Expectation Suite).

### Checkpoints

Um checkpoint pode executar um ou mais Validation Definitions e então performar um conjunto de ações sobre os resultados levantados.

## Executando ações baseados nos resultados da validação

É possível criar um Checkpoint para definir um conjuntos de ações a partir do resultado de uma validação.

Ações podem incluir:

- Atualizar a documentação dos dados com os novos resultados
- Enviar alertas quando resultados falham
- Ações personalizadas

```py
# 1. Validação definida anteriormente
validation_definitions = [
    context.validation_definitions.get("my_validation_definition")
]

# 2. Definição das ações
action_list = [
    # This Action sends a Slack Notification if an Expectation fails.
    SlackNotificationAction(
        name="send_slack_notification_on_failed_expectations",
        slack_token="${validation_notification_slack_webhook}",
        slack_channel="${validation_notification_slack_channel}",
        notify_on="failure",
        show_failed_expectations=True,
    ),
    # This Action updates the Data Docs static website with the Validation
    #   Results after the Checkpoint is run.
    UpdateDataDocsAction(
        name="update_all_data_docs",
    ),
]

# 3. Criação do Checkpoint
checkpoint_name = "my_checkpoint"
checkpoint = gx.Checkpoint(
    name=checkpoint_name,
    validation_definitions=validation_definitions,
    actions=action_list,
    result_format={"result_format": "COMPLETE"},
)

# 4. Adição do checkpoint ao contexto
context.checkpoints.add(checkpoint)
```

## Data Docs

Data docs traduzem as informações de Expectativas, resultados de validação e outros metadados em uma documentação legível para o ser humano salva em páginas web estáticas.

## Great expectations para PySpark

Great expectations tem uma integração nativa com os Dataframes do [[PySpark]].

Como Dataframes são estruturas que residem na memória, não é necessário configurar o caminho dos dados como é feito quando configurado para acessar um banco de dados SQL. Nesse caso passamos o próprio objeto do Dataframe para como um Data asset.

```py
context = gx.get_context()
data_source = context.data_sources.add_spark("spark_datasource")
data_asset = data_source.add_dataframe_asset("kickstarter_projects")
batch_definition = data_asset.add_batch_definition_whole_dataframe("batch definition")
# o dataframe (raw_df) é passado em tempo de execução como parâmetro para o BatchDefinition
batch = batch_definition.get_batch(batch_parameters={"dataframe": raw_df})
```
