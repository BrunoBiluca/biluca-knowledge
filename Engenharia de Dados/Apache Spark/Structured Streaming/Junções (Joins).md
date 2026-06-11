# Junções (Joins)

Da mesma forma que as operações em Dataframes estáticas, o [[Structured Streaming]] também permite a realização de junções entre Dataframes. 

As junções pode ser feitas de duas formas:

- Junções Stream-Stream
- Junções Stream-Static

# Junções Stream-Stream

O Structured Streaming disponibiliza a utilização de junções entre Dataframes stream, nesses casos ele **retem entradas antigas para ambas fontes**, dessa forma é possível comparar para cada nova entradas com entradas antigas.

Para **limitar o estado mantido** por junções stream-streaming é necessário saber algumas informações sobre seu caso de uso:

- Qual a razão de tempo entre a geração de dados em suas respectivas fontes?
- Qual a duração máxima um evento pode ser atrasado? (do momento que foi gerado até o motor de processamento)

> [!quote]- Artigo - [Introdução à Stream-Stream Joins](https://www.databricks.com/blog/2018/03/13/introducing-stream-stream-joins-in-apache-spark-2-3.html)
> Essa documentação demonstra o funcionamento em detalhes de operações de junção Stream-Stream. 
> Também apresenta um **cálculo de retenção de eventos** para otimizar o gerenciamento de estado necessário para a execução do processamento.

# Junções Streaming-Static

Outra forma de realizar junções é entre um [dataframe stream e um dataframe estático](https://docs.databricks.com/pt/structured-streaming/delta-lake.html#performing-stream-static-joins).

- Tabelas Streaming são sempre fontes de dados apenas de apêndice
- Tabelas Estáticas podem ser alteradas ou sobrescritas

O processamento é ativado sempre que **novos registros são adicionados** a tabela de Streaming. Qualquer alteração à tabela estática não resulta em nenhum tipo de processamento. Por isso junções Stream-Static dependem do estado no momento da operação.
