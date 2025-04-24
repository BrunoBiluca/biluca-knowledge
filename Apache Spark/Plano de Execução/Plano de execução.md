# Plano de execução

O plano de execução é a forma detalhada que o processamento será executado no cluster do Spark. Ele consiste de uma DAG (Direct Acyclic Graph) composta por vários passos que serão distribuídos pelo cluster, como planos lógicos e físicos, isso inclui tarefas como análise, otimização e agendamento de operações de processamento de dados para obter o **melhor desempenho possível**.

[[Apache Spark]] usa um otimizador Catalyst, que descobre automaticamente o plano de execução Spark mais eficiente para executar as operações especificadas. Ele produz o fluxo de execução conforme abaixo:

- O código escrito é primeiro anotado como um plano **lógico não resolvido**; se for válido, o Spark o converte em um plano lógico
- O plano lógico é passado pelo **Catalyst Optimizer** para aplicar regras otimizadas.
- O **Plano Lógico Otimizado** é então convertido em um Plano Físico
- O **Plano Físico** é executado pelos executores do Spark.
- (Opcional) [[Adaptive Query Execution]] pode ser utilizado e permite que o plano de execução físico seja alterado em tempo de execução no cluster. Se utilizando de estatísticas geradas em tempo real o AQE pode alterar o plano para otimizar ainda mais a consulta. Para ver o plano de execução gerado nessa etapa é necessário visualizar a partir do Spark UI.

![[Composição do plano de execução do Apache Spark.webp|Composição do plano de execução de um job do Apache Spark|%cheio]]


> [!quote]- (Documentação) - [Plano de execuçao do Spark](https://sparkbyexamples.com/spark/spark-execution-plan/)
> Exemplo de utilização do plano de execução do spark para otimização de operações

> [!quote]- (Artigo) - [Apache Spark Logical and Physical Plans](https://www.clairvoyant.ai/blog/apache-spark-logical-and-physical-plans)
> Explicação dos planos lógicos e físicos com exemplos.

## Plano lógico

O plano lógico se refere a uma abstração de todas os passos de transformações necessárias a serem executadas, ele não provê nenhum detalhe sobre o Driver ou Executores e é utilizado para conseguir a versão mais otimizada a expressão do usuário.

O plano lógico é dividido em 3 partes:

- **Unresolved Logical Plan ou Parsed Logical Plan**
	- É um plano criado depois da análise sintática da expressão do usuário e não verifica nenhuma questão em relação aos nomes das colunas, tabelas ou qualquer outra coisa

- **Resolved Logical Plan ou Analyzed Logical Plan**
	- Nessa etapa o plano lógico é avaliado pelo *Analyzer* utilizando o *Catalog* para definir questões semânticas, nomes de colunas, tabelas e outras expressões

- **Optimized Logical Plan**
	- Pega o plano resolvido e o otimiza baseado em um conjunto de regras
	- O Catalyst Optimizer leva em consideração:
		- Checa todas as tarefas para verificar se elas são exequíveis
		- Decide a ordem de execução das consultas
		- Otimiza a consulta para avaliar os filtros antes de qualquer outra operação (Predicate pushdown)

## Plano físico

O plano físico define as tarefas que realmente serão executada pelos processos executores (ver [[Estrutura de um cluster]]). Durante esse processo o código é gerado (Spark's Tungsten Execution Engine) para executar sobre a estrutura de [[Resilient Distributed Dataset (RDD)]].

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

Nesse caso, o plano físico de transformações será executado na **seguinte ordem: Scan, Filter e Project** apenas quando uma **Ação** requisitar essas transformações.

## Execução do código

Após a análise dos planos lógicos e físicos o Spark tem um Job para ser executado.

Ele organiza o Job em [[Stages]] tentando colocar o máximo de transformações possíveis em cada um. Cada Stage é iniciado após um **Shuffle** de dados, por isso os estágios são sempre dependentes um dos outros.

Após o início do Stage o processo do Driver envia para os Executores Tasks que são executadas de forma paralela em todos os recursos disponíveis.

Durante a execução do código (caso habilitado) o [[Adaptive Query Execution]] pode mudar os planos lógicos e físicos buscando uma melhor performance.