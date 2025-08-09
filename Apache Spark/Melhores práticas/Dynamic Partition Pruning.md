# Dynamic Partition Pruning

Essa é uma funcionalidade introduzida no [[Apache Spark]] 3.

**Dynamic Partition Pruning** (Pode dinâmica de partições) é uma técnica utilizada por vários motores de consulta como [[Apache Spark]] e Presto para ignorar dados que são irrelevantes a consulta, melhorando assim a performance.

O Dynamic Partition Pruning é uma combinação de duas outras otimizações:

- **Predicate Push Down (Antecipação de predicados)** é utilizado para antecipar a aplicação de filtro sobre os dados, fazendo com que menos dados sejam varridos no momento de fazer o processamento

- **Broadcast Hash Join** onde um lado (DataFrame) da Junção é transformado em um filtro dinâmico enviado em broadcast sobre o outro lado que é bem maior.
	- No caso, uma Hash é criada no processo do Driver relacionada as chaves da Junção

Algumas **limitações** são:

- Tabelas que precisam ser cortadas (pruning), precisam ser particionadas com qualquer uma das chaves utilizadas na junção
- Funciona apenas com Equi-join (Junções com a condição `=`)
- DPP não pode ser aplicado para sub-consultas correlatas


> [!quote]- (Artigo) - [Spark 3.0 Feature — Dynamic Partition Pruning (DPP) to avoid scanning irrelevant Data](https://medium.com/@prabhakaran.electric/spark-3-0-feature-dynamic-partition-pruning-dpp-to-avoid-scanning-irrelevant-data-1a7bbd006a89)
> Apresenta um exemplo bem completo sobre a otimização

#### Exemplo para ilustrar o que acontece por baixo dos panos

Seja uma junção feita entre duas tabelas, uma fato e uma dimensão:

```sql
SELECT f.col1, d.col2 FROM fact f 
JOIN dimension d ON f.join_col = d.join_col
WHERE d.partition_col < some_val
```

A tabela dimensão tem um filtro aplicado (`WHERE dimension.partition_col < some_val`) o que reduz bastante o seu tamanho, assim, ela é então "transformada" em uma variável de broadcast e enviada para a rede, formando uma consulta muito similar a:

```sql
SELECT f.col1 FROM fact  
WHERE f.partition_col IN (  
	SELECT d.partition_col FROM dimension  
	WHERE dimension.partition_col < some_val  
)
```

Nesse exemplo temos as duas otimizações aplicas:

- Predicate Push Down com o filtro da tabela dimensão
- Transformação da tabela em variável de broadcast

**Perceba** que a tabela de dimensão deve estar particionada pela coluna `join_col` para isso ser feito.