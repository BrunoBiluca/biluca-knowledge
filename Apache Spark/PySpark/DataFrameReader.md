# DataFrameReader

### pathGlobFilter

A opção `pathGlobFilter` é utilizado para **filtrar arquivos em um diretório** utilizando um padrão de glob especificado.

```py
# versão utilizando .option(key, value)
data_frame = spark.read.option("pathGlobFilter", "*.csv").csv("path_to_your_folder")

# versão utilizando .options(**options)
data_frame = spark.read.options(pathGlobFilter="*.csv").csv("path_to_your_folder")
```

**Filename globbing** não utiliza um formato de expressões regulares, ele utiliza a combinação de nomes de arquivos e diretórios utilizando wildcards `*`