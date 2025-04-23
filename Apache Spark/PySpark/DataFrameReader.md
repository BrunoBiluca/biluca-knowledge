# DataFrameReader

### pathGlobFilter

A opção `pathGlobFilter` é utilizado para filtrar arquivos quando estão sendo lidos dados de um diretório utilizando um padrão de glob especificado.

```py
# irá buscar todos os arquivos csv dentro do caminho especificado
data_frame = spark.read.option("pathGlobFilter", "*.csv").csv("path_to_your_folder")
```

Filename globbing não utiliza um formato de expressões regulares, ele utiliza a combinação de nomes de arquivos e diretórios utilizando wildcards `*`