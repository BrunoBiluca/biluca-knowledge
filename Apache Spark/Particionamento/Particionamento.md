# Particionamento

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Em [[Apache Spark]] partições são conjuntos de dados que serão processados. Essa separação é feita para **garantir o paralelismo** entre as tarefas criadas em um Job.

Quando o Spark decide os [[Stages|estágios]] de um Job ele leva em consideração transformações aplicadas as partições para montar o fluxo de execução.

Essas transformações são:

- Transformações estreitas (Narrows) que dependem apenas da partição.
- Transformações abrangentes (Wide) que dependem de várias partições e envolve o processo de Shuffle.

--- end-column ---

> [!info] Principais referências
> -

---

> [!quote]- Referências externas
> - [Artigo - How to Optimize Your Apache Spark Application with Partitions](https://engineering.salesforce.com/how-to-optimize-your-apache-spark-application-with-partitions-257f2c1bb414/)
> 	- Bom resumo do funcionamento de partições
> 	- Apresenta um exemplo de otimização do processamento com um ganho de 40% em relação a configuração padrão

--- end-multi-column

Uma forma de organizar os dados é dividi-los em partições definidas por campos específicos da nossa base de dados. Isso melhora consideravelmente a performance em queries que utilizam filtros nesses campos, já que menos dados deverão ser carregados para o processamento.

Um exemplo simples de particionamento seria, se o processamento varre uma faixa de dados por _data de ingestão_, podemos fazer partições por data de ingestão o que limita a quantidade de dados escaneados para o filtro consequentemente carregamos menos dados para memória.

Mesmo assim é importante prestarmos atenção a nossa estratégia de particionamento, já que ela pode também criar um problema de [[Inclinação de dados (Data Skew)]] e assim levar a sérios problemas de performance.

> [!warning]- O excesso de particionamento também é um problema
> - Particionar pequenas tabelas pode levar a um aumento de armazenamento e o número total de arquivos para escaneamento
> - Se a maioria das partições tem tamanho < 1GB de dados a tabela está pode estar superparticionada
> 
> Nesses casos **executar um processo de Optimize não surte nenhum efeito**, já que o particionamento já está altamente compactado e mal definido.

> [!tip]- Junções de partições muito grandes
> Nesses casos podemos otimizar o processo de junção fazendo a **repartição** dos dados baseado nas **chaves da junção.**


### Opções

O tamanho máximo das partições pode ser alterado pela configuração:

```python
spark.conf.set("spark.sql.files.maxPartitionBytes", <valor em bytes>)
```

### Exemplo - Particionamento como limites para arquivamento ou remoção de dados

Caso o particionamento seja bem implementado por utilizar ele como fator para arquivar ou remover dados. Nesse caso ele nos ajuda facilitando a remoção de dados pela partição o que não altera os metadados de estatísticos do Delta table ([[Estatísticas de arquivos]]).

Por exemplo, uma tabela que armazena registros de pedidos por ano, as consultas a essa tabela buscam apenas pelos 10 anos mais recentes. Podemos então arquivar os a cada ano o décimo primeiro ano mais recente, isso faz remover uma partição inteira sem que seja necessário alterar nenhuma das partições mais recentes.


## Spark DataFrame repartition() vs coalesce()

> [!quote]- (Artigo) - [Spark by Examples - repartition vs coalesce](https://sparkbyexamples.com/spark/spark-repartition-vs-coalesce/)
> Apresenta a distinção entre as duas funções com exemplo em [[Resilient Distributed Dataset (RDD)]] ou Dataframes.

- `repartition()` é usado para aumentar ou diminuir partições redistribuindo todos os dados.
	- Balanceamento de dados completo
- `coalesce()` é usado para diminuir partições verificando partições que podemos ser aglutinadas em outras.
	- Não garante balanceamento

Garantir um número ótimo de partições pode melhorar consideravelmente a performance de transformações abrangentes como `groupBy` e `join` que precisam de criar partições de Shuffle para redistribuir os dados no cluster.

