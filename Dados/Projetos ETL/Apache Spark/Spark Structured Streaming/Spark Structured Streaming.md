> [!info] Documentação
> - [Guia de programação para Structured Streaming](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)


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

> [!info] Documentação
> - [Configuração de gatilhos para Structured Streaming](https://docs.databricks.com/pt/structured-streaming/triggers.html#configure-structured-streaming-trigger-intervals)

- Intervalo fixo (default, intervalo de 500ms)
- Ativado uma única vez para uma micro-batch
- Ativado uma única vez para múltiplas micro-batches
- Contínua

### Output

- **complete** - toda a *tabela resultado* irá ser escrita no armazenamento externo
- **append** - apenas novos registros serão adicionados a *tabela resultado* desde o último gatilho.
- **update** - apenas linhas que foram alteradas na *tabela resultado* desde o último gatilho serão escritas no armazenamento externo.

## Stream-Stream joins

Spark retem entradas antigas como streaming para ambas fontes, dessa forma é possível comparar para cada nova entradas com entradas antigas.

> [!info] Documentação
> - [Introdução à Stream-Stream Joins](https://www.databricks.com/blog/2018/03/13/introducing-stream-stream-joins-in-apache-spark-2-3.html)
> 	- Essa documentação apresenta um exemplo de cálculo de limite de tempo entre os dados de cada fonte que pode ser utilizado como um template.

Para **limitar o estado mantido** por junções stream-streaming é necessário saber algumas informações sobre seu caso de uso:

- Qual a razão de de tempo entre a geração dos dois em suas respectivas fontes?
- Qual a duração máxima um evento pode ser atrasado? (do momento que foi gerado até o motor de processamento)


## Streaming vs Static

> [!info] Documentação
> - [Realizando junções Stream-Static](https://docs.databricks.com/pt/structured-streaming/delta-lake.html#performing-stream-static-joins)

- Tabelas Streaming são sempre fontes de dados apenas de apêndice
- Tabelas Estáticas podem ser alteradas ou sobrescritas

Em junções do tipo streaming o responsável por ativar o processamento a adição de registros é a tabela Streaming. A tabela estática pode ser alterada e isso não resultará em nenhum tipo de processamento. **Stream-Static Joins dependem do estado no momento da operação.**

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

- Tempo do evento: horário da criação do evento
- Tempo do processamento: horário que o evento foi processado

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
> Ela lê os dados mais recentes da fonte de dados, processa incrementalmente e atualiza o resultado, então descarta os dados originais. Ele apenas mantem o mínimo do estado intermediário necessário para atualizar o resultado (ex: contadores intermediários).

### Janelas deslizantes


![[Exemplo de processamento em streaming com janelas deslizantes.png|Exemplo de processamento em streaming com janelas deslizantes|center|500]]

A configuração para janelas deslizantes é muito parecida com a janela fixa com a alteração de um segundo argumento de tempo na função `window(coluna_de_tempo, janela, deslizamento)` .

```python
words = ...  # streaming DataFrame of schema { timestamp: Timestamp, word: String }

# Group the data by window and word and compute the count of each group
windowedCounts = words.groupBy(
    window(words.timestamp, "10 minutes", "5 minutes"),
    words.word
).count()
```

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

Para garantir deduplicação de dados em streaming, podemos utilizar a função `dropDuplicates()` para eliminar a duplicação de registros em cada micro lote. Após isso é necessário garantir que os registros inseridos não estão condidos na tabela de destino e isso podemos fazer a partir de uma **mesclagem de apenas inserção.**

# Checkpoits

Características

- Armazenam o estado atual do processo de streaming para um armazenamento em cloud
- Permitem que o motor de streaming rastreie o progresso do processamento
- Não podem ser compartilhados entre streams
- Verificando com o mecanismo de escrita a frente garante tolerância a falhas para o processo de streaming