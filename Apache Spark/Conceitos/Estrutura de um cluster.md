# Estrutura de um cluster

> [!quote]- (Curso) - [[Curso - Apache Spark 3 - Databricks Certified Associate Developer]]

O [[Apache Spark]] é utilizado para processamento de grandes massas de dados, isso é feito a partir da organização de várias máquinas, o que chamamos de **Cluster**.

Em um cluster temos dois tipos de papéis desempenhados pelas máquinas:

- **Cluster manager**
	- Aloca recursos em todas as aplicações em execução no cluster
	- Verificar a saúde dos nós individuais

- **Node Manager**
	- Monitora a disponibilidade de recursos em cada nó
	- Monitora a saúde física do nó em reporta ao Cluster manager

![[Funcionamento do Spark submit|Fluxo de execução de um spark submit no cluster Apache Spark|%cheio]]

Todas as ações são enviadas aos processos executores como Tasks, assim se é desejado ler arquivos, o processo Driver envia várias tarefas de leitura para os executores.

O modo de deploy (`deploy-mode`) determina como o processo do Driver será persistido no cluster:

- **cluster** executa o processo Driver dentro de um nó do cluster
- **client** executa o processo Driver fora do cluster, na máquina que fez o spark-submit
	- Caso o client falhe então o processo falha junto
- **local** executa em apenas uma única máquina, utilizado para testes.

Cada **Aplicação do spark** é composta por dois tipos distintos de processos:

- **Driver Process**
	- Computa os recursos necessários para a aplicação 
	- Gerencia o ciclo de vida do Job, incluindo o redimensionamento do consumo de recursos
	- Distribui e agenda o trabalho entre todos os executores
	- Reage ao executor em caso de falha e requisita alternativas para o Cluster Manager se necessário
	- Rastreia o estado da execução dos executores e monitora o progresso
	- Responde ao usuário ou programa inputado

- **Executor Process**
	- Executa as TASKs enviadas pelo processo do Driver
	- Reporta o estado das TASKs de volta ao processo do Driver