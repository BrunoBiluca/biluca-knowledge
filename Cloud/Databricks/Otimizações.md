
Características que impactam na performance de consultas:

- Número de bytes lidos
- Complexidade das consultas
- Número de arquivos acessados: quanto mais arquivos são acessados mais lenta a consulta
- Paralelismo

Principais gargalhos de performance para big data e sistemas MPP:

- Problema de arquivos pequenos: pode resultar em limites do ES (IO)
	- Databricks automaticamente otimiza o tamanho dos Delta Lake tables para evitar esse problema
	- Databricks automaticamente compacta arquivos pequenos com o auto-optimize
- [[Inclinação de dados (Data Skew)]]
- Processar mais que o necessário
	- Data Skipping
	- Delta Lake e Z-Order utilizam uma técnica de indexação para evitar esses problemas
- Contenção de recursos: processar diferentes fluxos ao mesmo tempo utilizando os mesmos recursos


# Salto de dados para Delta Lake

> [!info] Documentação
> - [Data skipping](https://docs.databricks.com/en/delta/data-skipping.html)

As informações de salto de dados são coletados no processo de escrita da Delta Table.

Leva em consideração
- Valores máximos e mínimos
- Quantidade de nulos
- Total de registros por arquivos

A técnica de ordenação-Z  é utilizada para reduzir a quantidade de dados lidos pelo Delta Lake.

> [!tip] Z-order
> Se você espera que uma coluna seja muito utilizada nos predicados de consultas e tenha uma grande cardinalidade (grande quantidade de valores distintos), utilize `ZORDER BY`

### Exemplo de ordenação-Z

```sql
OPTIMIZE events
WHERE date >= current_timestamp() - INTERVAL 1 day
ZORDER BY (eventType)
```

Esse código faz uma otimização na tabela `events` para as últimas 24 horas em relação ao tipo de evento. 

Após a execução do comando, a tabela `events` será otimizada para melhorar a performance de leitura de consultas que envolvam a coluna `eventType`, especialmente para os dados das últimas 24 horas. Isso significa que, por exemplo, uma consulta para buscar todos os eventos do tipo `login` nas últimas 24 horas será mais rápida devido à otimização.