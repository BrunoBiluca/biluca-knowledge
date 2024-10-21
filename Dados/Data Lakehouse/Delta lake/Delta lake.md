---
tags:
  - engenharia_de_dados
---
# Delta Lake

> [!info] Definição
> [Delta Lake](https://delta.io/) é um [projeto de código aberto](https://github.com/delta-io/delta) que permite construir um [[Data Lakehouse]] em cima de um [[Data Lake]]. Delta Lake fornece [transações ACID](https://docs.delta.io/latest/concurrency-control.html), manipulação escalonável de metadados e unifica processamento de dados em [streaming](https://docs.delta.io/latest/delta-streaming.html) e [lote](https://docs.delta.io/latest/delta-batch.html)  em data lakes existentes, como S3, ADLS, GCS e HDFS.
> 
> - [Documentação](https://delta.io/learn)
>   
> Exemplos
> - [[Exemplo - Vendas de loja]]
> - [[Exemplo - Loja de livros]]

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

O transaction log (`_delta_log`) é o sistema de versionamento de uma Delta Table, ele utilizada arquivos no formato `.json` para persistir as alterações a cada versão e `.checkpoint.parquet` para aglutinar a cada 10 alterações de forma a remontar o esquema de forma mais performática.

### O que suporta?

- [Transações ACID](https://docs.delta.io/latest/concurrency-control.html) no Spark: garante que os leitores nunca vejam dados inconsistentes.
	- Problemas resolvidos pelo ACID
		- Dificuldade em anexar (append) dados
		- Dificuldade em modificar dados existentes
		- Falha de jobs no meio do caminho, já que as alterações são registradas apenas se o job terminar em sucesso
		- Dificuldade em operações em tempo real, permite micro-batch atômicas
		- Custo de manter histórico de versões
- Manipulação escalonável de metadados: aproveita o poder de processamento distribuído do Spark para lidar com todos os metadados de tabelas em escala de petabytes com bilhões de arquivos com facilidade.
- [[Spark Structured Streaming]]
- Aplicação de esquema: trata automaticamente variações de esquema para evitar a inserção de registros inválidos durante a ingestão.
- [Versionamento](https://docs.delta.io/latest/delta-batch.html#-deltatimetravel) de dados permite reversões, trilhas de auditoria históricas completas e experimentos de aprendizado de máquina reproduzíveis.
- [Atualizações](https://docs.delta.io/latest/delta-update.html#-delta-merge) e [exclusões](https://docs.delta.io/latest/delta-update.html #-delta-delete): oferece suporte a operações mais complexas de mesclagem de dados como **atualizações condicionais**.

### O que não suporta?

- Delta Lake não oferece suporte a transações multitabelas e chaves estrangeiras, ou seja, transações no nível da _tabela_.

# Funcionalidades

- [[Change Data Feed (CDF)]]

## Delta Lake Estatísticas de arquivos

Delta Lake File Statistics.

Delta Lake analisa as primeiras 32 colunas de uma tabela para determinar:

- Total número de registros
- Mínimo valor de cada coluna
- Máximo valor de cada coluna
- Contagem de valores nulls em cada coluna

Essas estatísticas são utilizadas para pular arquivos que não são relevantes as consultas. Assim quando pedimos a contagem de registros em uma partição, o Delta Lake busca nas estatísticas dos arquivos não nos dados em si.

São considerados para a contagem de colunas:

- Campos aninhados são contabilizados para o cálculo dos 32 campos
- Estatísticas gerados por campos com alta cardinalidade são pouco úteis
	- Exemplo: campos de texto livre
	- Remover esses campos dos primeiros 32 da tabela

## Visualizações
### Visualizações materializadas (Materialized View)

Visualizações materialização são tabelas pré-processadas que mantem o estado de uma consulta, dessa forma consultas que são executadas várias vezes podem ser materializadas em uma visualização melhorando a performance.

> [!tip] Databricks Delta Cache
> Databricks mantém o estado de uma consulta para o cluster ativo melhorando a performance caso essa consulta seja feita várias vezes.
> 
> Mesmo assim não é garantido por quanto tempo esse estado será mantido.

## Clonar tabelas

> [!info] Documentação
> - [Clonar uma tabela no Databricks](https://docs.databricks.com/pt/delta/clone.html)

Existem 2 formas de clonar tabelas Delta:

- **Deep clone (clonagem profunda):** copia tudo
	- *Pode ocorrer de forma incremental* utilizando a expressão `CREATE OR REPLACE TABLE`.
- **Shallow clone (clonagem rasa):** copia apenas os logs de transações do Delta Lake, assim qualquer alteração aos dados na tabela copiada serão armazenados separadamente, pode ser utilizado principalmente para testar consultas.

Ambas as abordagens quando são modificadas persistem essas alterações independentes da fonte, ou seja, qualquer alteração na tabela clonada não altera a tabela original.
## Particionamento

Podemos particionar os dados em relação a campos da base. Isso melhora consideravelmente a performance em queries que utilizam filtros nesses campos utilizados no particionamento, já que menos dados deverão ser carregados para o processamento.

> [!warning] Evitar excesso de particionamento
> - Particionar pequenas tabelas pode levar a um aumento de armazenamento e o número total de arquivos para escaneamento
> - Se a maioria das partições tem < 1GB de dados a tabela está superparticionada
> 
> Nesses casos executar um processo de Optimize não surte nenhum efeito, já que o particionamento já está altamente compactado e mal definido.

## Mesclagem de dados

> [!info] Documentação
> - [Mesclagem](https://docs.databricks.com/pt/delta/merge.html)

O Delta lake suporta operações de inserção, atualização e exclusões na mesclagem  de dados.

No [[Exemplo - Loja de livros#Livros]] vemos esse tipo de mesclagem de dados, onde o estado atual do livro é alterado cada vez que seu preço é modificado, isso nos permite manter um histórico de preços.

## Otimizações

> [!info] Documentação
> - [Otimizações](https://docs.delta.io/latest/optimizations-oss.html)

Auto Optimize é uma funcionalidade que permite ao Delta Lake automaticamente compactar arquivos pequenos. Ele é composto de dois processos:

- **Optimized writes:** com essa funcionalidade ativa, Databricks tenta escrever arquivos de 128MB por repartição.
- **Auto compaction:** verifica se o arquivo pode ser ainda mais compactado. Em caso positivo, executa um processo OPTIMIZE (não suporta Z-Ordering) com arquivos de tamanho 128MB (em vez de 1GB do tamanho padrão do processo OPTIMIZE).
	- Auto compaction não suporta Z-Ordering já que Z-Ordering é mais caro computacionalmente que apenas compactação.

# Governança

### Visualizações dinâmicas

Tipos mais tradicionais de controles de governança como, IAM da AWS e Role-Based Access Controls da Azure, são um bom ponto de início para o gerenciamento desse controle, porém não possuem formas muito refinadas de controle, como controlar uma coluna específica ou uma visualização específica.

Para garantir acesso limitado a visualizações em LakeHouse o Delta Lake nos permite criar visualizações dinâmicas dependendo do papel do usuário. Isso é muito importante para garantir que determinados tipos de papéis dentro da organização não tenham acesso a mais informações do que eles precisam (princípio do mínimo privilégio), por exemplo PII(Person Identification Information).

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

### Propagando deleções

Para estar alinhado com a legislação de garantir de proteção de dados, o usuário pode requisitar a remoção de todos os seus dados do sistema.

Utilizando Delta Lake podemos fazer a seguinte forma:

- É criada uma tabela de pedidos de deleções, onde fica armazenado o pedido de cada usuário, a data da requisição e o estado.
- Fazemos a remoção dos dados relacionados a essa tabela
	- Cada tabela que existe o dado deve ser processada para o pedido de deleção
- Atualizamos o estado de cada pedido de deleção para deletado
- Como no Delta Lake temos a funcionalidade de Viagem no Tempo é necessário executar o VACUUM em cada tabela para remover os dados de versões anteriores

Exemplo simples de propagação de deleções para apenas uma tabela. Nesse caso é propagado a deleção da tabela `user_lookup` para a tabela `users`.

```sql
CREATE OR REPLACE TEMPORARY VIEW user_lookup_deletes as (
  select * from table_changes("user_lookup", 2) where _change_type = "delete"
);

MERGE INTO users u
USING user_lookup_deletes ud
ON u.alt_id = ud.alt_id
  when matched then delete;
```

### Restrições aos dados

```sql
-- exemplo de restrição para garantir uma quantidade válida de itens em um pedido de uma loja
ALTER TABLE pedidos ADD CONSTRAINT valid_qty CHECK (quantidade > 0);
```

> [!tip] Adição de restrição
> Quando adicionado uma nova restrição a base é necessário que a base de dados se comporte de acordo com essa restrição, caso contrário o processo falha e devemos resolver esses problemas antes de adicionar a restrição.

