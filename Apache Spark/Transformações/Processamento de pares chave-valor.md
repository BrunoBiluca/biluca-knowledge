# Processamento de pares chave-valor

- `reduceByKey()` usado para operações de redução cumulativas e associativas.
	- Reduz a quantidade de Shuffle dos dados por performar agregações locais em cada partições antes de agregar os resultados na rede
	- Menor uso de memória

- `groupByKey()` usado para agrupamento dos dados em um coleção.
	- Intenso em memória por armazenar todos os valores de cada chave
	- Shuffle todos os dados na rede

- `aggregateByKey()` usado para agregações e a chance de trocar o tipo do valor durante o processo de agregação permitindo assim maior flexibilidade na criação de funções de agregação personalizadas.
	- É necessário definir duas funções: `seqFunc` combina o valor `U` com o valor `V` para formar o valor de saída e `combFunc` combina os valores para formar um novo valor com o mesmo tipo
	- Performa agregações personalizadas que reduz o Shuffle de dados e permite o controle de memória pela definição de funções de agregação otimizadas.

```scala
// aggregateByKey() exemplo de média de vendas por produtos

val aggregateSales = salesData.aggregateByKey((0.0, 0))(
  // seqFunc: atualiza a cada linha a soma de valores e o contador
  (salesCount, saleAmount) 
	  => (salesCount._1 + saleAmount, salesCount._2 + 1),

  // combFunc: acumulador
  (salesCount1, salesCount2) 
	  => (salesCount1._1 + salesCount2._1, salesCount1._2 + salesCount2._2)
)
val averageSales = aggregateSales.mapValues(salesCount => salesCount._1 / salesCount._2)
aggregateSales.collect().foreach(println)
averageSales.collect().foreach(println)
```


- `combineByKey()` é uma função de uso mais geral
	- Permite definir agregações personalizadas o que pode diminuir o Shuffle de dados e permite o controle de memória pela definição de funções de agregação otimizadas.