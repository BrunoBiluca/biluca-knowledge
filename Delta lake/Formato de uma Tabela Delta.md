# Formato de uma Tabela Delta

Sempre que se escreve no modo **delta** estamos criando uma tabela `DeltaTable` que será gerenciada no formato. Uma tabela Delta Lake é persistida no seguinte formato:

```python
delta-table
  ┣ _delta_log
  ┃   ┣ v0.json
  ┃   ┃ ... outros arquivos de controle de versão
  ┃   ┣ v10.checkpoint.parquet (otimização que consolida versões anteriores)
  ┃   ┗ vXX.json
  ┣ data0.parquet
  ┗ ... outras arquivos de dados
```

O transaction log (`_delta_log`) é o sistema de versionamento de uma Delta Table, ele utilizada arquivos no formato `.json` para persistir as alterações a cada versão e `.checkpoint.parquet` para aglutinar a cada 10 alterações de forma a remontar o esquema de forma mais performática.