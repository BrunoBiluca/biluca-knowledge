# Comando OPTIMIZE

[OPTIMIZE](https://docs.databricks.com/pt/sql/language-manual/delta-optimize.html) é um comando que pode ser utilizado para otimizar o layout do Delta Lake (arquivos contidos no `_delta_log`).  

Com a execução desse comando podemos reduzir consideravelmente a quantidade de arquivos armazenado no `_delta_log` e melhor a performance em consultas que varrem uma grande quantidade de dados.

Por padrão o comando OPTIMIZE coloca um **tamanho padrão** de até 1 GB por arquivo.

```sql
-- otimiza geral
> OPTIMIZE events;

-- otimiza a tabela de eventos também para dados previamente clusterizados
-- pode ser especificada apenas para tabelas que usam clusterização líquida
> OPTIMZIE events FULL;

-- otimização com filtros
> OPTIMIZE events WHERE date >= '2017-01-01';

-- otimização utilizada junto a algoritmos de salto (skipping) de dados
> OPTIMIZE events
    WHERE date >= current_timestamp() - INTERVAL 1 day
    ZORDER BY (eventType);
```