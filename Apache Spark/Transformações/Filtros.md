# Filtros

O [[DataFrame]] tem dois métodos responsáveis por fazer filtros de linhas, `where()` e `filter()`.

```py
from pyspark.sql.functions import col  

# age > 30 e gender = "male"
filtered_df = df.where((col("age") > 30) & (col("gender") == "male"))

# age > 30 ou gender = "male"
filtered_df = df.where((col("age") > 30) | (col("gender") == "male"))
```

Repare que os operadores lógicos são diferentes dos utilizados no [[Python]].
