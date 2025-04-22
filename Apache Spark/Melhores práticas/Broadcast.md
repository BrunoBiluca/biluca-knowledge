# Broadcast

Modo de propagação de variáveis Broadcast em uma aplicação do [[Apache Spark]]:

![[Broadcast propagação de variáveis|Modos de propagação de variáveis de Broadcast entre os nós executores|%cheio|]]

# Broadcast de tabelas de referência

Podemos transmitir tabelas de referência que sejam pequenas para todos os executores. Essa otimização garante uma acesso mais rápidos a esses dados evitando carregamentos desnecessários.

```python
import pyspark.sql import functions as F

#  Tabela: customers
#  | name             | country_code |
#  | ---------------- | ------------ |
#  | Bruno            | BR           |
#  | Comandante Fidel | CU           |

result = spark.readStream
	.table("customers")
	.join(F.broadcast(df_country_lookup), F.col("country_code") == F.col("code"), "inner")

display(result)

#  | name             | country_code | country |
#  | ---------------- | ------------ | ------- |
#  | Bruno            | BR           | Brasil  |
#  | Comandante Fidel | CU           | Cuba    |
```