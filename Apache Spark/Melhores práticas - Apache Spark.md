---
tags:
  - engenharia_de_dados
categoria: prática
---
# Otimizações de código

- Em código de produção ter apenas operações de escrita e leitura de arquivos. Evitar `count()`, `show()` e outras operações que executem as tasks.
- Evitar operações que são executadas no nó driver como código python/pandas unithread.
- Evitar UDFs que executem linha a linha. No lugar utilizar funções nativas do pyspark ou Pandas UDFs para UDFs vetorizados.
- Usar Dataframes e Datasets em vez de RDDs.
- Ter atenção a casos de [[Derramamento de dados (Spill)]]
# Esquema definido vs Não definido

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

# Broadcast tabelas de referência

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
