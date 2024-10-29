---
tags:
  - engenharia_de_dados
---
# PySpark

Exemplos
- [[Exemplo - Criando uma coluna baseada no retorno de uma função]]
- [[Exemplo - Valores mínimos]]

Melhores práticas
- [[Empacotamento de arquivo do PySpark]]

# PySpark e testes automatizados

### Melhoria de performance nos testes

Quando estamos implementando testes automatizados para o desenvolvimento de projetos com PySpark um dos principais problemas encontrados é na **performance da execução**. Criar uma nova sessão do spark a cada teste pode impactar profundamente na performance do sistema.

Uma solução para esse problema é criar e **compartilhar a mesma sessão do spark sobre toda a bateria de testes**.

# PySpark com Venv

### Configurações

| Property | Description |
| ---- | ---- |
| spark.pyspark.virtualenv.enabled | Property flag to enable virtualenv |
| spark.pyspark.virtualenv.type | Type of virtualenv. Valid values are “native”, “conda” |
| spark.pyspark.virtualenv.requirements | Requirements file (optional, not required for interactive mode) |
| spark.pyspark.virtualenv.bin.path | The location of virtualenv executable file for type native or conda executable file for type conda |
| spark.pyspark.virtualenv.python_version | Python version for conda. (optional, only required when you use conda in interactive mode) |
# Pypark vs Pandas

Tanto o [[Apache Spark]] quanto o Pandas são frameworks para manipulação de dados com ampla utilização no mercado, mesmo que tenham interfaces parecidas elas tem casos de uso diferentes.

Quando pensamos em escalabilidade e desempenho para grandes volumes de dados o mais indicado é o [[Apache Spark]], já que o Pandas é normalmente executado em apenas uma máquina.

Para análise exploratória e pela performance em bases dados menores o Pandas pode ser uma ótima opção. Apenas essa análise ser levantada podemos então implementar os jobs Spark para a execução da massa completa.

# DataFrameWriter

[DataFrameWriter](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrameWriter.html) é a interface utilizada para escrever um dataframe a um sistema de armazenamento externo.

Por meio dessa interface podemos definir vários comportamentos de escrita.

#### .mode()

Especifica o comportamento quando os dados ou a tabela já existem. 
Ele pode ser configurado com os seguintes valores

- `append`: apende conteúdo aos dados existente
- `overwrite`: sobrescreve os dados
- `error` ou `errorifexists`: lança exceção se o dado já existe
- `ignore`: ignora operações quando dados já existem

