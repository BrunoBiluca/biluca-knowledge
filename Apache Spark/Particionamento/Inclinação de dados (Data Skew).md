# Inclinação de dados (Data Skew)

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Distribuição desigual de ados entre diferentes partições ou nós.

--- end-column ---

> [!info] Principais referências
> -

--- end-multi-column

Esse é um problema de otimização de processamento de dados. Essa diferença no balanceamento das partições pode levar a problemas de performance já que o tempo total do processo será relacionado ao tempo da tarefa mais lenta.

Redistribuindo os dados e ajustando as atribuições das tarefas podemos aumentar o paralelismo e reduzir o tempo ocioso de recursos.

Por exemplo em Spark para verificar se seus dados estão desbalanceados podemos

```python
# Verifica quantidade de registros por partição
import pyspark.sql.functions as F  
df.groupBy(F.spark_partition_id()).count().show()

# Dados balanceados
| SPARK_PARTICION_ID() | count |
| -------------------- | ----- |
| 0                    | 100   |
| 1                    | 100   |
| 2                    | 100   |
| 3                    | 100   |

# Dados desbalanceados
| SPARK_PARTICION_ID() | count |
| -------------------- | ----- |
| 0                    | 100   |
| 1                    | 10    |
| 2                    | 500   |
| 3                    | 2000  |
```

Soluções

- **Repartição baseado em colunas** que aumenta a eficiência do embaralhamento de dados
- **Repartição por um "salt" aleatório**
	- Cria uma coluna com um valor aleatório e faz a repartição por esse valor
	- Pode ser utilizado quando **não sabemos** quais colunas são as melhores para fazer a distribuição

