# Mesclagem de dados condicional

O [[Delta lake]] suporta operações de inserção, atualização e exclusões em [Mesclagem de dados (Doc)](https://docs.databricks.com/pt/delta/merge.html). 

No [[Exemplo - Loja de livros]] existe esse tipo de mesclagem de dados, onde o estado atual do livro é alterado cada vez que seu preço é modificado, isso nos permite manter um histórico de preços.

> [!warning]- Limitação da mesclagem
> A operação de mesclagem de dados **não pode ser performada** se múltiplas linhas da fonte combinam e tentam modificar a mesma linha da tabela alvo. Isso geraria resultados ambíguos já que não fica claro qual a linha fonte deve ser utilizada para alterar ou para remover a linha alvo.
> 
> Para corrigir esse problema é necessário reprocessar a tabela fonte para **eliminar qualquer possibilidade de múltiplas combinações**.

Um caso que acontece comumente no processo de ingestão de dados é a necessidade de tratar **dados duplicados na tabela destino**. Esses dados devem ser mantidos apenas uma única vez.

```sql
-- exemplo de inserção apenas de logs novos na tabela
MERGE INTO logs
USING newDedupedLogs
ON logs.uniqueId = newDedupedLogs.uniqueId
WHEN NOT MATCHED
  THEN INSERT *
```

Sabendo um pouco mais sobre a natureza da tabela podemos otimizar o código criado. 

Utilizando o exemplo de logs acima, se soubermos que na fontes os registros podem ser duplicados apenas por alguns dias, podemos fazer um filtro que especifica o intervalo de datas relevante ao nosso caso.

```sql
-- abordagem mais eficiênte, pois busca logs cadastrados para os últimos 7 dias em vez da tabela inteira
MERGE INTO logs
USING newDedupedLogs
ON logs.uniqueId = newDedupedLogs.uniqueId AND logs.date > current_date() - INTERVAL 7 DAYS
WHEN NOT MATCHED AND newDedupedLogs.date > current_date() - INTERVAL 7 DAYS
  THEN INSERT *
```

