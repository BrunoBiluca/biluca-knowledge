# Agregações

Como qualquer operação em Dataframes o [[Structured Streaming]] também permite a realização de agregações.

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