# Configurações

Podemos fazer configurações sobre os aspectos que a sessão do spark é executada.

```python
spark.conf.set("<opção>", <valor>)
```

Opções:

- `spark.sql.shuffle.partitions`: configura o embaralhamento dos dados no cluster
	- Pode ser adicionado para alterar o número de cores no processamento e melhorar a performance (`spark.sparkContext.defaultParallelism` )
- `spark.sql.files.maxPartitionBytes`: configura o tamanho máximo de uma partição de dados

# Memória

A [[Estrutura de um cluster]] do [[Apache Spark]] nos permite processar uma quantidade de dados que apenas uma máquina nunca conseguiria, porém para isso precisamos pensar em algumas considerações relacionadas a quantidade de memória alocada para cada tipo de processo em uma aplicação do Apache Spark.

As configurações principais sobre memória são:

- `--driver-memory XG`
- `--executor-memory XG`

 [[Melhores práticas - Apache Spark]] na sessão de memória