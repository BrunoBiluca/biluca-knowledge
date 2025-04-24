# Pandas API em Spark

É possível criar DataFrame do panda em Spark passando os valores como um dicionário de objetos.

```py
import pyspark.pandas as ps

psdf = ps.DataFrame(
    {'a': [1, 2, 3, 4, 5, 6],
     'b': [100, 200, 300, 400, 500, 600],
     'c': ["one", "two", "three", "four", "five", "six"]},
    index=[10, 20, 30, 40, 50, 60])
```

Principais casos de uso

- **Migração de código existe**
	- Se já existe código implementado em Pandas e é necessário fazer o processamento distribuído

- **Análise exploratória de dados**
	- O Pandas apresenta uma API mais completa para AED do que o próprio PySpark

- **Visualização de dados**
	- O Pandas tem melhor integração com outras bibliotecas de visualização como matplotlib, seaborn ou plotly
