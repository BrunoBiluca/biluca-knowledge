# Evolução de esquema

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Delta lake permite a atualização do esquema da tabela. São disponíveis 3 tipos de alterações:

- Adicionar colunas
- Reordenar colunas existentes
- Renomear colunas existentes

--- end-column ---

> [!info] Principais referências
> - [Documentação - Databricks](https://docs.databricks.com/en/delta/update-schema.html)
>- 

--- end-multi-column

Para habilitar a evolução de esquema é necessário configurar a escrita com alguma das configurações:

- `.option("mergeSchema", "true")`
- `MERGE WITH SCHEMA EVOLUTION`
- `spark.databricks.delta.schema.autoMerge.enabled` para `true` na configuração da sessão do Spark.

A junção do esquema é suportada **apenas em parquet** outros formatos não permitem essa funcionalidade.

#### Substituir esquema

Por padrão apenas sobrescrever os dados não altera o esquema da tabela.

Para substituir o esquema da tabela é preciso definir o `mode("overwrite")` junto com a configuração da escrita `.option("overwriteSchema", "true")`.

#### Remoção de colunas

Para remover colunas sem reescrever os arquivos é necessário habilitar mapeamento de coluna para a tabela ([Renomear e remover colunas](https://docs.databricks.com/en/delta/column-mapping.html)).

Remover uma coluna não deleta os dados nos arquivos. Para expurgar esse tipo os dados dessa coluna é necessário executar o comando [REORG TABLE](https://docs.databricks.com/en/sql/language-manual/delta-reorg-table.html) e posteriormente um comando VACUUM.
