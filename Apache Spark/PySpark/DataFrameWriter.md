# DataFrameWriter

[DataFrameWriter](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrameWriter.html) é a interface utilizada para escrever um Dataframe a um sistema de armazenamento externo no [[PySpark]].

Por meio dessa interface podemos definir vários comportamentos de escrita.

#### .mode()

Especifica o comportamento quando os dados ou a tabela já existem. 
Ele pode ser configurado com os seguintes valores

- `append`: apende conteúdo aos dados existente
- `overwrite`: sobrescreve os dados
- `error` ou `errorifexists`: lança exceção se o dado já existe
- `ignore`: ignora operações quando dados já existem

O modo padrão do DataFrameWritter é `error` ou `errorifexists`. Se a tabela já existe será lançada um exceção de **Error: pyspark.sql.utils.AnalysisException: table already exists**.
