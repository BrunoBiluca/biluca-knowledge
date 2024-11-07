---
categoria: prática
---
# Otimizações no Delta Lake

O [[Delta lake]] provê uma série de otimizações a partir de suas configurações. Para **cada tipo de problema a configuração correta pode proporcionar ganhos muito grandes de performance**. 

A [seção de otimizações da documentação do Delta lake](https://docs.delta.io/latest/optimizations-oss.html) provê uma lista de considerações na hora de otimizar o Delta Lake para o seu caso.

# Comando OPTIMIZE

[OPTIMIZE](https://docs.databricks.com/pt/sql/language-manual/delta-optimize.html) é um comando que pode ser utilizado para otimizar o layout do Delta Lake (arquivos contidos no `_delta_log`).  Com a execução desse comando podemos reduzir consideravelmente a quantidade de arquivos armazenado no `_delta_log` e melhor a performance em consultas que varrem uma grande quantidade de dados.

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

# Salto de dados para Delta Lake

> [!info] Documentação
> - [Data skipping](https://docs.databricks.com/en/delta/data-skipping.html)

As informações de salto de dados são coletados no processo de escrita da [[Delta lake]].

Leva em consideração [[Estatísticas de arquivos]]
- Valores máximos e mínimos
- Quantidade de nulos
- Total de registros por arquivos


### Exemplo de ordenação-Z

```sql
OPTIMIZE events
WHERE date >= current_timestamp() - INTERVAL 1 day
ZORDER BY (eventType)
```

Esse código faz uma otimização na tabela `events` para as últimas 24 horas em relação ao tipo de evento. 

Após a execução do comando, a tabela `events` será otimizada para melhorar a performance de leitura de consultas que envolvam a coluna `eventType`, especialmente para os dados das últimas 24 horas. Isso significa que, por exemplo, uma consulta para buscar todos os eventos do tipo `login` nas últimas 24 horas será mais rápida devido à otimização.

# Z-Order

Delta Lake automaticamente armazena como parte dos metadados os valores mínimos e máximos das primeiras 32 colunas de uma tabela. Utilizando essas informações o Delta Lake é capaz de saltar informações foram desses intervalos a fim de melhorar a performance de consultas, esse processo é chamado de **Data Skipping**.

A fim de manter a eficiência, os dados podem ser agrupados por colunas Z-Order de forma que os intervalos de valores mínimos e máximos de cada grupo sejam menores e não se sobrepõem.

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

# Auto Optimize

**Auto Optimize** é uma funcionalidade que permite ao Delta Lake automaticamente compactar arquivos pequenos. 

Ele é composto de dois processos:

- **Optimized writes:** com essa funcionalidade ativa, Databricks tenta escrever arquivos de 128MB por repartição.
- **Auto compaction:** verifica se o arquivo pode ser ainda mais compactado. Em caso positivo, executa um processo OPTIMIZE (não suporta Z-Ordering) com arquivos de tamanho 128MB (em vez de 1GB do tamanho padrão do processo OPTIMIZE).
	- Processo assíncrono executado após a finalização das escritas da tabela.
	- Auto compaction não suporta Z-Ordering já que Z-Ordering é mais caro computacionalmente que apenas compactação. Para utilizar o Z-Ordering ele deve ser executado independente do processo de compactação.


# Considerações sobre versionamento

O Delta lake pode sofrer com **problemas de performance** a medida que seu estado é alterado. Isso ocorre porque são criados vários arquivos pequenos a cada transformação feita, o que faz a consulta desse histórico ser mais onerosa a cada consulta feita.

É indicado utilizar o **versionamento do Delta lake apenas para versões mais recentes** e de tempos em tempos remover os registros mais antigos.

```sql
-- exemplo de limpeza de base
VACUUM students RETAIN 0 HOURS

-- para exibir os resultados removidos antes da operação
VACUUM students RETAIN 0 HOURS DRY RUN
```
