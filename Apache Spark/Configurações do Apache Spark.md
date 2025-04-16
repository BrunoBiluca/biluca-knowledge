# Configurações

Podemos fazer configurações sobre os aspectos que a sessão do spark é executada.

```python
spark.conf.set("<opção>", <valor>)
```

# Shuffle

- `spark.sql.shuffle.partitions`: configura o embaralhamento dos dados no cluster
	- Pode ser adicionado para alterar o número de cores no processamento e melhorar a performance (`spark.sparkContext.defaultParallelism` )
- `spark.sql.files.maxPartitionBytes`: configura o tamanho máximo de uma partição de dados
- `spark.sql.autoBroadcastJoinThreshold`: configura o número máximo de bytes que uma tabela pode ser enviada para todos os executores para efetuar uma junção.
	- Padrão (10MB)
	- Dependendo do cenário pode representar uma grande **otimização** no custo de processamento

# Memória

A [[Estrutura de um cluster]] do [[Apache Spark]] nos permite processar uma quantidade de dados que apenas uma máquina nunca conseguiria, porém para isso precisamos pensar em algumas considerações relacionadas a quantidade de memória alocada para cada tipo de processo em uma aplicação do Apache Spark.

As configurações principais sobre memória são:

- `--driver-memory XG`
- `--executor-memory XG`

 Na sessão [[Memória]] temos boas práticas para levar em consideração em relação a essa configuração.

> [!warning] Out of memory
> Erros de falta de memória ocorrem quando **um driver ou um executor** não tem memória suficiente para coletar ou processar os dados alocados.