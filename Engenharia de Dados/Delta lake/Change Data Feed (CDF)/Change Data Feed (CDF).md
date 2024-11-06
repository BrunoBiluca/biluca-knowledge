
# Change Data Feed (CDF)

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Automaticamente gera atualizações [[Change Data Capture]] para todas as tabelas [[Delta lake]].

--- end-column ---

> [!info] Principais referências
> - [Documentação]()
>- [Github]()
>- [Artigo de apresentação do CDF](https://www.databricks.com/blog/2021/06/09/how-to-simplify-cdc-with-delta-lakes-change-data-feed.html)
>  
>  Exemplos
> - [[Exemplo - Habilitação de CDF para clientes]] 



--- end-multi-column

| ✅ Usar quando                                                    | 🛑 Não usar quando                                                      | Justificativa                                                                                                                                                                                                     |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tabelas que incluem atualizações e deleções                      | Tabelas que apenas inserem registros                                    | Não existe ganho nenhum em catalogar apenas inserções já que não existe nenhum registro de alteração                                                                                                              |
| Apenas uma pequena parcela dos registros são atualizados por vez | A maioria dos registros são atualizados por vez                         | Não existem ganhos caso todos os registros forem atualizados ou sobreescritos já que o CDF seria apenas um processo a mais no pipeline e a cada versão seriam definidos quase todos os registros como alterados.. |
| Dados são recebidos por fontes externas no formato CDC           | Dados recebidos compreendem carregamentos destrutivos (dados faltantes) |                                                                                                                                                                                                                   |
| Envia dados para aplicações consumidoras                         | Descobre e ingere dados fora do Lakehouse                               |                                                                                                                                                                                                                   |

# Habilitando CDF

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

> [!warning]- Não é possível ler versões anteriores a habilitação do CDF
> Nesses casos será lançado uma exceção:
> 
> `AnalysisException: Error getting change data for range [0 , 2] as change data was not recorded for version [0]...`

Após habilitado o CDF na Delta Table são criados 3 novas colunas que irão fazer o controle da versão dos registros:

- `_change_type`: tipo de alteração efetuada: atualização, inserção ou remoção.
- `_commit_version`: versão do registro da tabela. Cada nova fornada de atualizações na tabela essa versão é acrescida em 1
- `_commit_timestamp`: horário da verificação da tabela

### Armazenamento das alterações de dados

As alterações de dados são armazenadas em uma pasta (`_change_data`) junto aos próprios dados da tabela.

Por exemplo, se em uma Delta Table chamada `customers` for habilitado o CDF a disposição das pastas ficará como a seguinte:
  
  ```python
  🗃️ customers
  ┣ 📂 _delta_log            # alterações da tabela delta
  ┣ 📂 _change_data          # alterações dos registros da tabela
  ┗ ... dados da tabela
  ```

### Leitura na versão python

Também é possível fazer a mesma consulta com a API do PySpark

```python
 cdf_df = (spark.readStream
	.format("delta")
	.option("readChangeData", True) # Habilita a leitura das alterações capturas pelo CDF
	.option("startingVersion", 2) # Configura a versão inicial da leitura dos dados
	.table("customers"))
```

