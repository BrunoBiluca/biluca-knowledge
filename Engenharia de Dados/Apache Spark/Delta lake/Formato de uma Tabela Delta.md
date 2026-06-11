# Formato de uma Tabela Delta

Sempre que se escreve no modo **delta** estamos criando uma tabela `DeltaTable`. 

Uma tabela Delta Lake é persistida no seguinte formato:

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

O transaction log (`_delta_log`) é o sistema de versionamento de uma Delta Table, ele utilizada arquivos em uma combinação do formato `.json` e `.parquet` para persistir as alterações a cada versão ([[Versionamento (Data Travel)]]). A cada 10 alterações os arquivos `.json` são aglutinados no formato `.checkpoint.parquet` melhorando o desempenho de consultas.