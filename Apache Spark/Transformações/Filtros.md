# Filtros

O [[DataFrame]] tem dois métodos responsáveis por fazer filtros de linhas, `where()` e `filter()`.

```py
from pyspark.sql.functions import col  

# age > 30 e gender = "male"
filtered_df = df.where((col("age") > 30) & (col("gender") == "male"))

# age > 30 ou gender = "male"
filtered_df = df.where((col("age") > 30) | (col("gender") == "male"))

# não é gender = "male"
filtered_df = df.filter(~(col("gender") == "male"))
```

Repare que os operadores lógicos são diferentes dos utilizados no [[Python]]. Isso porque os operadores nativos do Python como `and`/`or` não pode ser sobrescritos para objetos `Column` (só funcionam para operadores booleanos `True`/`False`).

> [!tip] Sempre **use parênteses** para agrupar condições no PySpark porque os operadores bitwise têm precedência diferente dos operadores lógicos

