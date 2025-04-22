# Esquema

Para definir um esquema precisamos declarar utilizando duas classes:

```scala
// Todo esquema começa com um StructType
case class StructType(
	fields: Array[StructField]
)

case class StructField(
    name: String,
    dataType: DataType,
    nullable: Boolean = true,
    metadata: Metadata = Metadata.empty
)
```

Exemplo de criação de um esquema:

```py
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StringType, IntegerType

schema_exemplo = StructType([
    StructField("nome", StringType(), True),
    StructField("idade", IntegerType(), True)
])

dados = [("Ana", 25), ("João", 30)]
df = spark.createDataFrame(dados, schema_carregado)
```

Para verificar o esquema de [[DataFrame]] podemos fazer:

```py
df.printSchema()
```

### Esquema definido

O esquema definido apresenta várias vantagens em relação a garantir da consistência de dados. Depois de uma análise exploratória, com o entendimento dos dados trabalhados, é necessário começar a buscar por formas de consistências, assim é recomendado trabalhar com dados de esquema bem definidos.

- **Vantagens:**
	- **Tipagem Forte:** O esquema fornece informações sobre os tipos de dados em cada coluna, o que impõe uma tipagem forte no DataFrame. Isso ajuda a evitar erros de tipo durante a execução.
	- **Validação de Dados:** Garante que os dados carregados no DataFrame estejam de acordo com o esquema especificado, oferecendo uma camada de validação.
	- **Otimização de Consultas:** O otimizador de consultas pode usar o conhecimento do esquema para otimizar as operações, melhorando a performance.
		- A melhoria de performance não é direta, pode depender de vários fatores como tamanho da base de dados, complexidade das operações ou dos dados entre outros. 

- **Desvantagens:**
    - **Inflexibilidade:** Pode ser menos flexível se os dados não seguirem rigidamente o esquema especificado.

### Esquema não definido

Não definir um esquema tem suas vantagens principalmente durante a exploração dos dados. Durante essa etapa temos pouca certeza sobre o estado que o dado se apresenta e ter um esquema flexível nos ajuda a entender sobre a natureza do que está sendo o objeto de estudo.

- **Vantagens:**
    - **Flexibilidade:** Pode ser mais flexível ao lidar com dados que podem ter estruturas variáveis ou desconhecidas.
    - **Menos Restrições:** Não há a necessidade de especificar um esquema, o que pode ser útil ao explorar dados desconhecidos.
- **Desvantagens:**
    - **Menos Otimização:** A ausência de um esquema pode resultar em menos otimizações durante a execução das consultas.
    - **Possíveis Erros:** Pode ser mais suscetível a erros de tipo durante a execução, já que não há garantia de tipagem forte.

### Carregando o esquema por um arquivo JSON

```python
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StringType, IntegerType
import json

# 1. Criar um schema de exemplo (substitua pelo seu arquivo schema.json)
schema_exemplo = StructType([
    StructField("nome", StringType(), True),
    StructField("idade", IntegerType(), True)
])

# Salvar schema temporariamente para demonstração
with open("schema.json", "w") as f:
    json.dump(json.loads(schema_exemplo.json()), f)

# 2. Carregar o schema do arquivo
with open("schema.json", "r") as f:
    schema_carregado = StructType.fromJson(json.load(f))

# 3. Criar DataFrame com dados de exemplo
dados = [("Ana", 25), ("João", 30)]
df = spark.createDataFrame(dados, schema_carregado)
```