## Clonar tabelas

Existem 2 formas de [clonar uma tabela Delta](https://docs.databricks.com/pt/delta/clone.html):

- **Deep clone (clonagem profunda):** copia tudo
	- *Pode ocorrer de forma incremental* utilizando a expressão `CREATE OR REPLACE TABLE` que sincroniza os dados.
- **Shallow clone (clonagem rasa):** copia apenas os logs de transações do Delta Lake, assim qualquer alteração aos dados na tabela copiada serão armazenados separadamente, pode ser utilizado principalmente para testar consultas.
	- A execução do comando VACUUM causa perda de dados na tabela clonada também.

Ambas as abordagens quando são modificadas persistem essas alterações independentes da fonte, ou seja, qualquer alteração na tabela clonada não altera a tabela original.