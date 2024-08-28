
Automaticamente gera atualizações [[Change Data Capture]] para todas as tabelas Delta Lake.

| ✅ Usar quando                                                    | 🛑 Não usar quando                                                      | Justificativa                                                                                                                                |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Tabelas que incluem atualizações e deleções                      | Tabelas que apenas inserem registros                                    | Não existe ganho nenhum em catalogar apenas inserções já que não existe nenhum registro de alteração                                         |
| Apenas uma pequena parcela dos registros são atualizados por vez | A maioria dos registros são atualizados por vez                         | Não existem ganhos caso todos os registros forem atualizados ou sobreescritos já que o CDF seria apenas um processo a mais no pipelines sem. |
| Dados são recebidos por fontes externas no formato CDC           | Dados recebidos compreendem carregamentos destrutivos (dados faltantes) |                                                                                                                                              |
| Envia dados para aplicações consumidoras                         | Descobre e ingere dados fora do Lakehouse                               |                                                                                                                                              |

### Habilitando CDF

```sql
CREATE TABLE myTable (...)
TBLPROPERTIES (delta.enableChangeDataFeed = true)

ALTER TABLE myTable
SET TBLPROPERTIES (delta.enableChangeDataFeed = true)
```

```sql
DESCRIBE TABLE EXTENDED customers
```

| col_name         | data_type                              | comment |
| ---------------- | -------------------------------------- | ------- |
| ...              | ...                                    | ...     |
| Table Properties | [delta.enableChangeDataFeed=true, ...] |         
Lendo as alterações

```sql
SELECT *
FROM table_changes('table_name', start_version, [end_version])
```

> [!info] Lendo uma versão anterior a habilitação do CDF
> Não é possível ler versões anteriores a habilitação do CDF, nesses casos será lançado uma exceção:
> 
> `AnalysisException: Error getting change data for range [0 , 2] as change data was not recorded for version [0]...`
### Leitura na versão python
Também é possível fazer a mesma consulta com a API do PySpark

```python
 cdf_df = (spark.readStream
.format("delta")
.option("readChangeData", True) # Habilita a leitura das alterações capturas pelo CDF
.option("startingVersion", 2)
.table("customers"))
```
### Campos

Quando consultamos as alterações dos dados temos 3 novas colunas:
- `_change_type`: tipo de alteração efetuada: atualização, inserção ou remoção.
- `_commit_version`: versão do registro da tabela. Cada nova fornada de atualizações na tabela essa versão é acrescida em 1
- `_commit_timestamp`: horário da verificação da tabela

### Armazenamento das alterações de dados

 As alterações de dados são armazenadas em uma pasta junto aos próprios dados da tabela.
  
  ```python
  🗃️ customers
  ┣ 📂 _delta_log            # alterações da tabela delta
  ┣ 📂 _change_data          # alterações dos registros da tabela
  ┗ ... dados da tabela
  ```

### Exemplo

Vamos considerar a habilitação de CDF para uma tabela de clientes.

| Nome             | País |
| ---------------- | ---- |
| Bruno            | null |
| Comandando Fidel | Cuba |

Habilitamos a opção de CDF pelo código:

```sql
ALTER TABLE customers
SET TBLPROPERTIES (delta.enableChangeDataFeed = true)
```

Como podemos perceber as propriedades da tabela foram alteradas e agora temos CDF habilitado. Nesse caso quando essa tabela receber novos registros suas alterações serão catalogadas automaticamente.

Vamos adicionar mais um cliente para nossa tabela e alterar o País do Bruno.

| Nome             | País   |
| ---------------- | ------ |
| Bruno            | Brasil |
| Comandando Fidel | Cuba   |
| Júlio            | Brasil |

```sql
SELECT *
FROM table_changes("customers", 2) -- (nome_tabela, versão)
```

| Nome  | País   | _change_type    | _commit_version | _commit_timestamp       |
| ----- | ------ | --------------- | --------------- | ----------------------- |
| Bruno | null   | update_preimage | 3               | 2024-07-23 11:40:00.000 |
| Bruno | Brasil | update_posimage | 3               | 2024-07-23 11:40:00.000 |
| Júlio | Brasil | insert          | 3               | 2024-07-23 11:40:00.000 |
Apenas os registros alterados ou inseridos estão catalogados nas alterações, o registro do Comandante Fidel não teve alteração então não existem registros catalogados.
