# Salto de dados (Data skipping)

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Delta Lake automaticamente armazena como parte dos metadados os valores mínimos e máximos das primeiras 32 colunas de uma tabela. Utilizando essas informações o Delta Lake é capaz de saltar informações foram desses intervalos a fim de melhorar a performance de consultas, esse processo é chamado de **Data Skipping**.

--- end-column ---

> [!info] Principais referências
> - [Documentação - Data skipping](https://docs.databricks.com/en/delta/data-skipping.html)

--- end-multi-column

As informações de salto de dados são coletados no processo de escrita da [[Delta lake]].

Leva em consideração [[Estatísticas de arquivos]]
- Valores máximos e mínimos
- Quantidade de nulos
- Total de registros por arquivos


## Z-Order

A fim de manter a eficiência, os dados podem ser **agrupados por colunas Z-Order** de forma que os intervalos de valores mínimos e máximos de cada grupo sejam menores e não se sobrepõem.

Esse tipo de processo é particularmente eficiente em consultas de faixas de valores, por exemplo, atualizar campos de uma faixa de idade.

```sql
OPTIMIZE ENGAGEMENT_DATA ZORDER BY (<coluna>)})
```

> [!quote]- Artigo - **[Boost Delta Lake Performance with Data Skipping and Z-Order](https://engineering.salesforce.com/boost-delta-lake-performance-with-data-skipping-and-z-order-75c7e6c59133/)**
> 
> No artigo é demonstrado um exemplo de **melhoria de performance pelo uso do Z-Order** para um caso de uma tabela de registros de engajamento que é constantemente modificada.
> 
> Nesse artigo os autores tem um grave problema de [[Inclinação de dados (Data Skew)]] **provocado pela natureza dos dados** de engajamento das empresas, empresas grandes com partições enormes e empresas pequenas com partições de um arquivo apenas. Isso ocorria pela estratégia de particionamento adotada inicialmente (`orgId,engagement_date` como chaves).
> 
> Para solucionar esse problema é definida uma segunda estratégia de particionamento, utilizar apenas do `orgId` e a coluna `engagement_date` como Z-Order. Essa modificação no formato de particionamento e a utilização de uma coluna Z-Order altera consideravelmente a performance do processamento.

### Exemplo de ordenação-Z

```sql
OPTIMIZE events
WHERE date >= current_timestamp() - INTERVAL 1 day
ZORDER BY (eventType)
```

Esse código faz uma otimização na tabela `events` para as últimas 24 horas em relação ao tipo de evento. 

Após a execução do comando, a tabela `events` será otimizada para melhorar a performance de leitura de consultas que envolvam a coluna `eventType`, especialmente para os dados das últimas 24 horas. Isso significa que, por exemplo, uma consulta para buscar todos os eventos do tipo `login` nas últimas 24 horas será mais rápida devido à otimização.

