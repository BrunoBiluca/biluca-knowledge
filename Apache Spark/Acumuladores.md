# Acumuladores

Acumuladores são variáveis compartilhadas (entre todos os executores) do [[Apache Spark]] que são apenas para operações associativas e comutativas a fim de possibilitar a criação de contadores e somatórios.

Spark permite criar acumuladores de qualquer **tipos numéricos** e provê a capacidade de adicionar acumuladores de **tipos personalizáveis** utilizando `AccumulatorParam.

Acumuladores podem ser visualizados na [[Spark web UI]] na aba de "Accumulator".

```python
# Exemplo de criação de um acumulador
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("accumulator").getOrCreate()

rdd = spark.sparkContext.parallelize([1,2,3,4,5])

accum = spark.sparkContext.accumulator(0)
rdd.foreach(lambda x: accum.add(x))

print(accum.value) #Accessed by driver
```

Os valores de uma acumulador só podem ser **lidos a partir do processo do Driver**.

### Comportamento de atualizações

Por ser uma variável compartilhada no cluster um acumulador apresenta um comportamento diferente dependendo de onde está sendo aplicado, seja em ações ou transformações.

- Quando **aplicados em ações** (ex. `foreach()`) o Spark garante que a atualização do acumulador seja **aplicada apenas uma única vez**
- Quando **aplicado em transformações** (ex. `map()`) cada tarefa pode aplicar uma **atualização mais de uma vez**, quando a tarefa ou job form reexecutado

Dessa forma quando declaramos um acumulador dentro de uma transformação precisamos levar em consideração alguns casos que garantem a atualização apenas uma vez:

- ✅ Quando uma falha de uma tarefa acontece por um erro no código, o Spark irá retornar ao último estado do acumulador antes da falha

- ❌ Quando um [[Stages]] falha por causa de um nó faltante pode ocasionar uma reexecução de um dos nós

- ❌ Quando uma tarefa é lenta demais, o Spark pode lançar uma cópia dessa tarefa para outro nó executor

- ❌ Quando um RDD é persistido ([[Cache]]) parcialmente em memória, a parte que não for persistida precisa ser recomputada toda vez que necessário

### Principais casos de uso

Acumuladores pode ser utilizados principalmente para obter estatísticas a partir da processamento dos dados como:

- Qualidade de dados: contas valores nulos, fora de um intervalo definido
- Monitoramento de regras de negócio

### Considerações de performance

O custo de utilização de Acumuladores é relativamente pequeno e pode ser até negligenciado para grandes volumes de dados, mesmo assim algumas considerações são importantes para um uso mais eficiente:

1. **Use accumulators moderadamente**
    - Evite criar centenas de accumulators no mesmo job
    - Prefira acumular métricas em poucos accumulators complexos em vez de muitos simples

2. **Atualize com moderação**
    - Evite atualizar accumulators dentro de loops muito apertados

```py
# Ruim - atualiza accumulator para cada elemento
for item in data:
    if condition(item):
        accumulator.add(1)

# Melhor - agregar localmente primeiro
count = sum(1 for item in data if condition(item))
accumulator.add(count)
```

3. **Prefira tipos nativos**   
    - Accumulators numéricos (Int, Long, Double) têm melhor performance que tipos customizados

4. **Use para métricas, não para dados**
    - Não use accumulators para coletar grandes volumes de dados (para isso use collect() ou outras abordagens)

5. Utilizar **acumuladores dentro de `map` ou `filter`** pode gerar resultados incorretos por causa do comportamento de Lazy Evaluation do Spark

```scala  
val spark = SparkSession.builder().appName("IncorrectUsage").getOrCreate()  
val sc = spark.sparkContext  
  
val wordCount = sc.longAccumulator("wordCount")  
val data = sc.textFile("input.txt")                // Número de palavras: 15
                                                   
data.map(line => {                                 // Lazy Evaluation:
		val words = line.split(" ")                // map() não é executado
		wordCount.add(words.length)                // essa linha nunca é executada
		line                                       // Não transforma o rdd já que retorna o mesmo número de linhas
	})
	.count()                                       // count() é resolvido no rdd original data sem executar o map()
  
println("Total words: " + wordCount.value)         // valor esperado: 15 - valor obtido: 0
```