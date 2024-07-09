
# Principais conceitos

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

Triggers

- Intervalo fixo (default, intervalo de 500ms)
- Ativado uma única vez para uma micro-batch
- Ativado uma única vez para múltiplas micro-batches
- Contínua

> [!info] Operações sobre streaming Dataframes vs Dataframes estáticos
> A maioria das operações são compatíveis entre os dois, existem algumas exceções como o caso da ordenação que não é possível em casos de dados streaming.


