---
tags:
  - engenharia_de_dados
---
# Delta Lake

> [!info] Definição
> [Delta Lake](https://delta.io/) é um [projeto de código aberto](https://github.com/delta-io/delta) que permite construir um [[DataLakehouse]] em cima de [[Datalake]]. Delta Lake fornece [transações ACID](https://docs.delta.io/latest/concurrency-control.html), manipulação escalonável de metadados e unifica [streaming](https://docs.delta.io/latest/delta-streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html) processamento de dados em data lakes existentes, como S3, ADLS, GCS e HDFS.
> 
> - [Documentação](https://delta.io/learn)
>   
> Exemplos
> - [[Exemplo - Vendas de loja]]

Delta Lake usa arquivos Parquet versionados para armazenar seus dados em seu armazenamento em nuvem. Além das versões, Delta Lake também armazena um log de transações para acompanhar todos os commits feitos na tabela ou diretório de armazenamento de blob para fornecer transações ACID.

![[Exemplificação do uso da tecnologia Delta Lake.png|Exemplificação do uso da tecnologia Delta Lake com suas integrações e ferramentas disponíveis|center|500]]

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

### O que suporta?

- [Transações ACID](https://docs.delta.io/latest/concurrency-control.html) no Spark: garante que os leitores nunca vejam dados inconsistentes.
	- Problemas resolvidos pelo ACID
		- Dificuldade em anexar (append) dados
		- Dificuldade em modificar dados existentes
		- Falha de jobs no meio do caminho, já que as alterações são registradas apenas se o job terminar em sucesso
		- Dificuldade em operações em tempo real, permite micro-batch atômicas
		- Custo de manter histórico de versões
- Manipulação escalonável de metadados: aproveita o poder de processamento distribuído do Spark para lidar com todos os metadados de tabelas em escala de petabytes com bilhões de arquivos com facilidade.
- [Streaming](https://docs.delta.io/latest/delta-streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html) unificação: uma tabela em Delta Lake há uma tabela de lote, bem como uma fonte e um coletor de streaming. Ingestão de dados de streaming, preenchimento de histórico em lote e consultas interativas funcionam imediatamente.
- Aplicação de esquema: trata automaticamente variações de esquema para evitar a inserção de registros inválidos durante a ingestão.
- [Versionamento](https://docs.delta.io/latest/delta-batch.html#-deltatimetravel) de dados permite reversões, trilhas de auditoria históricas completas e experimentos de aprendizado de máquina reproduzíveis.
- [Atualizações](https://docs.delta.io/latest/delta-update.html#-delta-merge) e [exclusões](https://docs.delta.io/latest/delta-update.html #-delta-delete): oferece suporte a operações mais complexas de mesclagem de dados como **atualizações condicionais**.

### O que não suporta?

- Delta Lake não oferece suporte a transações multitabelas e chaves estrangeiras, ou seja, transações no nível da _tabela_.

# Funcionalidades

- [[Change Data Feed (CDF)]]
## Visualizações dinâmicas

Para garantir [[Dados/DataLakehouse/Melhores práticas#Garantir a segurança do Lakehouse com acesso baseado a funções e controles de visualizações|Acesso limitado a visualizações em LakeHouse]] o Delta Lake nos permite criar visualizações dinâmicas dependendo do papel do usuário. Isso é muito importante para garantir que determinados tipos de papéis dentro da organização não tenham acesso a mais informações do que eles precisam (princípio do mínimo privilégio), por exemplo PII(Person Identification Information).

```sql
CREATE OR REPLACE VIEW customers_vw AS
	SELECT 
		customer_id,
		CASE
			WHEN is_member('admins_demo') THEN email
			else 'REDACTED'
		END as email
		...
	FROM customers_silver
```

No exemplo acima restringimos a visualização do email dos clientes apenas para membros do grupo de usuários *admins_demo*.
## Delta Lake Estatísticas de arquivos

Delta Lake File Statistics.

Delta Lake analisa as primeiras 32 colunas de uma tabela para determinar:

- Mínimo valor de cada coluna
- Máximo valor de cada coluna
- Contagem de valores nulls em cada coluna

Essas estatísticas são utilizadas para pular arquivos que não são relevantes as consultas. Assim quando pedimos a contagem de registros em uma partição, o Delta Lake busca nas estatísticas dos arquivos não nos dados em si.

São considerados para a contagem de colunas:

- Campos aninhados são contabilizados para o cálculo dos 32 campos
- Estatísticas gerados por campos com alta cardinalidade são pouco úteis
	- Exemplo: campos de texto livre
	- Remover esses campos dos primeiros 32 da tabela

## Visualizações materializadas (Materialized View)

Visualizações materialização são tabelas pré-processadas que mantem o estado de uma consulta, dessa forma consultas que são executadas várias vezes podem ser materializadas em uma visualização melhorando a performance.

> [!tip] Databricks Delta Cache
> Databricks mantém o estado de uma consulta para o cluster ativo melhorando a performance caso essa consulta seja feita várias vezes.
> 
> Mesmo assim não é garantido por quanto tempo esse estado será mantido.

# Streaming vs Static

- Tabelas Streaming são sempre fontes de dados apenas de apêndice
- Tabelas Estáticas podem ser alteradas ou sobrescritas

Em junções do tipo streaming o responsável por ativar o processamento a adição de registros é a tabela Streaming. A tabela estática pode ser alterada e isso não resultará em nenhum tipo de processamento. **Stream-Static Joins dependem do estado no momento da operação.**

# Particionamento

Podemos particionar os dados em relação a campos da base. Isso melhora consideravelmente a performance em queries que utilizam filtros nesses campos utilizados no particionamento, já que menos dados deverão ser carregados para o processamento.

> [!warning] Evitar excesso de particionamento
> - Particionar pequenas tabelas pode levar a um aumento de armazenamento e o número total de arquivos para escaneamento
> - Se a maioria das partições tem < 1GB de dados a tabela está superparticionada

# Governança

### Propagando deleções

Para estar alinhado com a legislação de garantir de proteção de dados, o usuário pode requisitar a remoção de todos os seus dados do sistema.

Utilizando Delta Lake podemos fazer a seguinte forma:

- É criada uma tabela de pedidos de deleções, onde fica armazenado o pedido de cada usuário, a data da requisição e o estado.
- Fazemos a remoção dos dados relacionados a essa tabela
	- Cada tabela que existe o dado deve ser processada para o pedido de deleção
- Atualizamos o estado de cada pedido de deleção para deletado
- Como no Delta Lake temos a funcionalidade de Viagem no Tempo é necessário executar o VACUUM em cada tabela para remover os dados de versões anteriores
