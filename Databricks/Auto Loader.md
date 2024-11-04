## Auto Loader

> [!info] O que é?
> O Auto Loader processa de forma progressiva e eficiente novos arquivos de dados à medida que chegam ao armazenamento em nuvem sem qualquer configuração adicional.
> 
> [Documentação](https://docs.databricks.com/pt/ingestion/auto-loader/index.html)
> [Configurando o processamento de lotes incrementais](https://docs.databricks.com/pt/structured-streaming/triggers.html#configuring-incremental-batch-processing)

Databricks suporta gatilhos para o Delta Lake e fontes providas por Auto Loader. Essa opção consome todos os dados disponíveis de forma incremental.

Opções:

- `AvailableNow`: consome todos os registros disponíveis como lotes incrementais
- (Descontinuada) `Once`