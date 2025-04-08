# Plano de execução

O plano de execução é a forma detalhada que o processamento será executado no cluster do Spark. Ele consiste de uma DAG (Direct Acyclic Graph) composta por vários passos que serão distribuídos pelo cluster, como planos lógicos, físicos, isso inclui tarefas como análise, otimização e agendamento de operações de processamento de dados para obter o **melhor desempenho possível**.

[[Apache Spark]] usa um otimizador Catalyst, que descobre automaticamente o plano de execução Spark mais eficiente para executar as operações especificadas. Ele produz o fluxo de execução conforme abaixo:

- O código escrito é primeiro anotado como um plano lógico não resolvido; se for válido, o Spark o converte em um plano lógico
- O plano lógico é passado pelo Catalyst Optimizer para aplicar regras otimizadas.
- O Plano Lógico Otimizado é então convertido em um Plano Físico
- O Plano Físico é executado pelos executores do Spark.
- (Opcional) Adaptive Query Execution pode ser utilizado e permite que o plano de execução físico seja alterado em tempo de execução no cluster. Se utilizando de estatísticas geradas em tempo real o AQE pode alterar o plano para otimizar ainda mais a consulta. Para ver o plano de execução gerado nessa etapa é necessário visualizar a partir do Spark UI.

![[Composição do plano de execução do Apache Spark.webp|Composição do plano de execução de um job do Apache Spark|%cheio]]


> [!quote]- (Documentação) - [Plano de execuçao do Spark](https://sparkbyexamples.com/spark/spark-execution-plan/)
> Exemplo de utilização do plano de execução do spark para otimização de operações

## Plano físico

O plano físico define as tarefas que realmente serão executada pelos processos executores (ver [[Estrutura de um cluster]]).

Por exemplo, seja um Dataframe de clientes e queremos aplicar algumas transformações, o plano de execução irá otimizar todas essas transformações até realmente ser necessário sua execução.

```py
df = (customer_df
	.read
	.format("json")
	.load("customer.json")
	.withColumnRenamed("email_address", "mail")
	.withColumn("Developer_Site", lit("insightahead.com"))
	.drop("birth_country", "address_id")
	.filter(dayofmonth("birthdate") < 20))

df.explain("formatted")
# == Physical Plan ==
# * Project (3)
# +- * Filter (2)
# 	+- Scan json (1)
```

Nesse caso, o plano físico de transformações será executado na **seguinte ordem, Scan, Filter e Project** isso quando uma **Ação** requisitar essas transformações.