# Clonar tabelas

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

O [[Databricks]] fornece a possibilidade de clonar tabelas. A utilização da clonagem possibilita uma replicação completa da tabela, assim dados e metadados são duplicados nesse processo.

--- end-column ---

> [!info] Principais referências
> - [Documentação - Clonar uma tabela Delta](https://docs.databricks.com/pt/delta/clone.html)
>- 

--- end-multi-column

Existem 2 formas de clone de tabelas no [[Databricks]]:

- **Deep clone (clonagem profunda):** copia tudo
	- *Pode ocorrer de forma incremental* utilizando a expressão `CREATE OR REPLACE TABLE` que sincroniza os dados.
	- Pode ser utilizada para arquivamento, já que temos os dados e histórico de transações que podem ser utilizado em futuras auditorias.

```sql
CREATE TABLE target_table CLONE source_table; -- Create a deep clone of source_table as target_table

CREATE OR REPLACE TABLE target_table CLONE source_table; -- Replace the target

CREATE TABLE IF NOT EXISTS target_table CLONE source_table; -- No-op if the target table exists
```

- **Shallow clone (clonagem rasa):** copia apenas os logs de transações do Delta Lake, assim qualquer alteração aos dados na tabela copiada serão armazenados separadamente, pode ser utilizado principalmente para testar consultas.
	- A execução do comando VACUUM na tabela origem pode causar perda de dados na tabela clone também, já que a clone depende dos dados da original. 
		- Executar o comando de clone com REPLACE pode reparar a tabela clone
	- Podem ser utilizadas para fazer experimentos de ML de curto prazo sem perder nenhum tipo de informação.

```sql
CREATE TABLE target_table SHALLOW CLONE source_table;

CREATE TABLE target_table SHALLOW CLONE source_table VERSION AS OF version;

-- timestamp can be like “2019-01-01” or like date_sub(current_date(), 1)
CREATE TABLE target_table SHALLOW CLONE source_table TIMESTAMP AS OF timestamp_expression; 
```

Ambas as abordagens quando são modificadas **persistem alterações independentes da fonte**, ou seja, qualquer alteração na tabela clonada não altera a tabela original.