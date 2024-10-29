# Structured Streaming

> [!info] Definição
> [Structured Streaming](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html) é um motor de processamento de stream (fluxo contínuo) escalável e tolerante a falhas. Foi criado de forma a garantir que o processamento em streaming seja tratado da mesma forma que o formato em lotes.
> 
> Internamento o Structured Streaming trata o processamento como vários micro-lotes podendo ter latência baixas até 100 milisegundos, sendo considerado assim um motor de processamento contínuo em tempo real (ou quase).

Exemplo de configuração de um processamento streaming:

```python
# exemplo de um job de processamento streaming
spark.readStream.format("kafka")
  # input
  .option("kafka.bootstrap.servers", ...)
  .option("subscribe", "topic")
  .load()
  # transformações
  .selectExpr("cast (value as string) as json")
  .select(from_json("json", schema).as("data"))
  # output
  .writeStream
  .format("delta")
  .option("path", "/deltaTable/")
  .outputMode("append")
  # trigger (opções do streaming)
  .trigger("1 minute")
  .option("checkpointLocation", "...")
  .start()
```

> [!tip] Operações sobre streaming Dataframes vs Dataframes estáticos
> A maioria das operações são compatíveis entre os dois, existem algumas exceções como o caso da ordenação que não é possível em casos de dados streaming.

# Leitura

> [!info] Documentação
> - [DataStreamReader](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ss/api/pyspark.sql.streaming.DataStreamReader.html)

```python
df = (spark.readStream
	  .option("XXX"))
```

Opções
- `maxFilesPerTrigger`: máximo de arquivos por gatilho

# Escrita

> [!info] Documentação
> - [DataStreamWriter](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ss/api/pyspark.sql.streaming.DataStreamWriter.html)

```python
coupon_sales_df
  .writeStream
  .outputMode("append")
  .format("delta")
  .queryName("coupon_sales")
  .trigger(processingTime="1 second")
  .option("checkpointLocation", coupons_checkpoint_path)
  .start(coupons_output_path)
```

### Opções
- `checkpointLocation`: localização de armazenamento dos checkpoints

### Triggers

É possível definir o [modo de ativação do processamento](https://docs.databricks.com/pt/structured-streaming/triggers.html#configure-structured-streaming-trigger-intervals):

```python
# Modo de intervalo fixo de 1 segundo
df.writeStream
	.trigger(processingTime="1 second")
```

- Intervalo fixo (default, intervalo de 500ms)
- Ativado uma única vez para uma micro-batch
- Ativado uma única vez para múltiplas micro-batches
- Contínua

Para essa configuração é importante **levar em consideração os requisitos de latência e a taxa de chegada dos dados na origem**, já que quando **menor o intervalo do trigger mais verificações** o sistema faz para verificar a chegada de novos dados.

### Output

- **complete** - toda a *tabela resultado* irá ser escrita no armazenamento externo
- **append** - apenas novos registros serão adicionados a *tabela resultado* desde o último gatilho.
- **update** - apenas linhas que foram alteradas na *tabela resultado* desde o último gatilho serão escritas no armazenamento externo.

## Junções Stream-Stream

O Structured Streaming disponibiliza a utilização de junções entre dataframes stream, nesses casos ele **retem entradas antigas para ambas fontes**, dessa forma é possível comparar para cada nova entradas com entradas antigas.

Para **limitar o estado mantido** por junções stream-streaming é necessário saber algumas informações sobre seu caso de uso:

- Qual a razão de de tempo entre a geração dos dois em suas respectivas fontes?
- Qual a duração máxima um evento pode ser atrasado? (do momento que foi gerado até o motor de processamento)

> [!quote]- Artigo - [Introdução à Stream-Stream Joins](https://www.databricks.com/blog/2018/03/13/introducing-stream-stream-joins-in-apache-spark-2-3.html)
> Essa documentação demonstra o funcionamento em detalhes de operações de junção Stream-Stream. 
> Também apresenta um **cálculo de retenção de eventos** para otimizar o gerenciamento de estado necessário para a execução do processamento.

## Junções Streaming-Static

Outra forma de realizar junções é entre um [dataframe stream e um dataframe estático](https://docs.databricks.com/pt/structured-streaming/delta-lake.html#performing-stream-static-joins).

- Tabelas Streaming são sempre fontes de dados apenas de apêndice
- Tabelas Estáticas podem ser alteradas ou sobrescritas

O processamento é ativado sempre que **novos registros são adicionados** a tabela de Streaming. Qualquer alteração à tabela estática não resulta em nenhum tipo de processamento. Por isso junções Stream-Static dependem do estado no momento da operação.

## Agregações

O processamento de streaming pode ser feito com ou sem manutenção do estado:

- **Sem estado:** transformações simples que não precisam de informações de entradas anteriores
	- Ex: Ingestão de dados, simples junções dimensionais
- **Com estado:** transformações que levam em consideração as entradas anteriores.
	- Ex: Agregações sobre tempo, Detecção de fraude e anomalias

Uma forma de fazer essas transformações é definir janelas de tempo que as operações são aplicadas. Podemos ter dois tipos de janelas de tempo:

- **Janela fixa (Tumbling Window)**
	- Não existe sobreposição de janelas
	- Cada evento será agregado em apenas uma janela (ex: 1:00-2:00, 2:00-3:00)
- **Janela deslizante (Sliding Window)**
	- Existe sobreposição de janelas
	- Cada evento pode ser agregado em múltiplas janelas (ex: 1:00-2:00, 1:30-2:30, 2:00-3:00)

Para a construção dessas janelas de tempo é necessário entender o conceito de *tempo do evento e tempo do processamento:*

- **Tempo do evento:** horário da criação do evento (geralmente esse é o tempo que nos importa na análise)
- **Tempo do processamento:** horário que o evento foi processado

### Janelas fixas

```python
# Create DataFrame representing the stream of input lines from connection to localhost:9999
lines = spark \
    .readStream \
    .format("socket") \
    .option("host", "localhost") \
    .option("port", 9999) \
    .load()

# Split the lines into words
words = lines.select(
   explode(
       split(lines.value, " ")
   ).alias("word")
)

# Generate running word count
wordCounts = words.groupBy("word").count()

 # Start running the query that prints the running counts to the console
query = wordCounts \
    .writeStream \
    .outputMode("complete") \
    .format("console") \
    .start()

query.awaitTermination()
```

![[Exemplo de janela fixa na contagem de palavras.png| Exemplo de janela fixa para um fluxo de registros na contagem de palavras|center|500]]

> [!tip] Structured Streaming não materializa toda a tabela.
> Ela lê os dados mais recentes da fonte de dados, processa incrementalmente e atualiza o resultado, então descarta os dados originais. Ele apenas mantem o **mínimo do estado intermediário** necessário para atualizar o resultado (ex: contadores intermediários).

### Janelas deslizantes

A configuração para janelas deslizantes é muito parecida com a janela fixa com a alteração de um segundo argumento de tempo na função `window(coluna_de_tempo, janela, deslizamento)` .

```python
words = ...  # streaming DataFrame of schema { timestamp: Timestamp, word: String }

# Group the data by window and word and compute the count of each group
windowedCounts = words.groupBy(
    window(words.timestamp, "10 minutes", "5 minutes"),
    words.word
).count()
```

![[Exemplo de processamento em streaming com janelas deslizantes.png|Exemplo de processamento em streaming com janelas deslizantes|center|500]]

### Manipulação de dados atrasados (Watermark)

É possível que eventos criados cheguem ao processamento com algum atraso, nesse caso é necessário garantir que este seja processado relacionado a janela correta.

A janela correta de comparação deve ser relacionada a **coluna definida para o cálculo da janela**. No exemplo abaixo a data de criação do evento na origem é o que define a janela correta que o dado tem que ser computado.

![[Exemplo de manipulação de dados atrasados em uma janela deslizante.png|Exemplo de manipulação de dados atrasados em uma janela deslizante. Nesse caso o tempo de criação do evento é o que define a janela correta que o evento deve ser computado.|center|500]]

> [!tip] Dados atrasados e performance
> Dados atrasados são manipulados de acordo com a janela correta da criação do evento, porém isso pode levar o sistema a manter o estado de várias janelas de tempo. Ao longo do tempo isso gera um aumento na utilização de memória do driver o que ocasiona instabilidades no sistema ou até a sua derrubada.
> 
> Melhorias para não deixar isso acontecer:
> - Aumentar o tamanho das janelas, dessa forma agregando mais eventos
> - Adicionar um limite de atraso, e jogar fora eventos que já não teria mais relevância

## Deduplicação de dados

Para garantir deduplicação de dados em streaming, podemos fazer

- Realizar `dropDuplicates()` no lote com novos dados
- Mesclagem apenas inserção na tabela de destino

## Checkpoits

Características

- Armazenam o estado atual do processo de streaming para um armazenamento em cloud
- Permitem que o motor de streaming rastreie o progresso do processamento
- Não podem ser compartilhados entre streams
- Verificando com o mecanismo de escrita a frente garante tolerância a falhas para o processo de streaming
