# Structured Streaming

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

[Structured Streaming](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html) é um motor de processamento de stream (fluxo contínuo) escalável e tolerante a falhas criado a partir do [[Apache Spark]].

Internamente o Structured Streaming trata o processamento como vários micro-lotes podendo ter latência baixas até 100 milisegundos, sendo considerado assim um motor de processamento contínuo em tempo real (ou quase).

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)

--- end-multi-column

#### Componentes

- **Unbound table (tabela ilimitada):** tabela de entrada, novas linhas são adicionadas a essa tabela para o processamento do micro lote
- **Result table:** tabela contendo os resultados do processamento dividida pela janela
- **Output:** modelo de output, pode ser completo, por inserção apenas ou de atualização.

#### Principais funcionalidades

- [[Agregações]]
- [[Junções (Joins)]]

> [!warning]- Operações não suportadas pelos Dataframes de streaming
> A maioria das operações são compatíveis entre os dois, existem algumas exceções como o caso da ordenação que não é possível em casos de dados streaming.

#### Principais APIs

- [[ReadStream]]
- [[WriteStream]]
- [[Checkpoits]]

# Exemplo de configuração

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


# Garantindo processamento semântico único

Um problema comum em processamentos de streaming é **garantir a escrita apenas uma vez** de um registro. 

No Structured Streaming isso é possível seguindo o formato:

- Usar `foreachBatch` para processar cada micro-lote
- E aplicar escritas idempotentes na base alvo (verificando se já existe na base)

Controlando o processo de escrita a cada micro-lote nos possibilita garantir que um registro está sendo escrito apenas uma única vez. 