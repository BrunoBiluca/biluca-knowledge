# Leitura (readStream)

> [!info] Documentação
> - [DataStreamReader](https://spark.apache.org/docs/latest/api/python/reference/pyspark.ss/api/pyspark.sql.streaming.DataStreamReader.html)

```python
df = (spark.readStream
	  .option("XXX"))
```

Opções
- `maxFilesPerTrigger`: máximo de arquivos por gatilho