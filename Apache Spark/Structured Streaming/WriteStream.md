# Escrita (writeStream)

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

O processamento de streaming pode ser definido utilizando a configuração de gatilhos (triggers). Ele pode ser configurado em dois modos, baseados em tempo ou por lotes incrementais (processamento único).

A declaração de um trigger tem a seguinte sintaxe:

```python
# Modo de intervalo fixo de 1 segundo
df.writeStream
	.trigger(processingTime="1 second")
```

- **ProcessingTime** - Intervalo fixo (default, intervalo de 500ms)
- **AvailableNow** - Ativado uma única vez para uma micro-batch
- **AvailableNow** - Ativado uma única vez para múltiplas micro-batches
- **ProcessingTime** - Contínua

Para essa configuração é importante levar em consideração os **requisitos de latência e a taxa de chegada** dos dados na origem, já que quando **menor o intervalo do trigger mais verificações** o sistema faz para verificar a chegada de novos dados.

> [!quote]- Documentação - [modo de ativação do processamento](https://docs.databricks.com/pt/structured-streaming/triggers.html#configure-structured-streaming-trigger-intervals)
> Documentação explicando os diferentes tipos de ativação de processamento, baseados em tempo ou de processamento incremental.

Assim a diferença entre as duas configurações (`AvailableNow` e `Processingtime`) podem ser resumidas em:

- **AvailableNow**: Use quando você tem **dados estáticos** ou lotes de arquivos para processar e quer um término automático após o processamento.
- **ProcessingTime**: Use quando os **dados chegam continuamente** e você precisa de processamento em tempo real, onde novos dados devem ser coletados e processados em intervalos periódicos.

### Output mode

- **complete** - toda a *tabela resultado* irá ser escrita no armazenamento externo
- **append** - apenas novos registros serão adicionados a *tabela resultado* desde o último gatilho.
- **update** - apenas linhas que foram alteradas na *tabela resultado* desde o último gatilho serão escritas no armazenamento externo.

## Deduplicação de dados

Para garantir deduplicação de dados em streaming, podemos fazer

- Realizar `dropDuplicates()` no lote com novos dados
- Mesclagem apenas inserção na tabela de destino

[[Agregações]]