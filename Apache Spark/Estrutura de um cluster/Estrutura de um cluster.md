# Estrutura de um cluster

> [!quote]- (Curso) - [[Curso - Apache Spark 3 - Databricks Certified Associate Developer]]

O [[Apache Spark]] é utilizado para processamento de grandes massas de dados, isso é feito a partir da organização de várias máquinas, o que chamamos de **Cluster**.

Em um cluster temos dois tipos de papéis desempenhados pelas máquinas:

- **Cluster manager**
	- Aloca recursos em todas as aplicações em execução no cluster
	- Verificar a saúde dos nós individuais, ou seja, mantém os processos executores no cluster para quando requisitados pela aplicação do Spark ter recursos
	- Recebe sinais do processo do driver a partir do `SparkContext`
	- Não existem no modo local

- **Node Manager**
	- Monitora a disponibilidade de recursos em cada nó
	- Monitora a saúde física do nó em reporta ao Cluster manager

![[Funcionamento do Spark submit|Fluxo de execução de um spark submit no cluster Apache Spark|%cheio]]

Todas as ações são enviadas aos processos executores como Tasks, assim se é desejado ler arquivos, o processo Driver envia várias tarefas de leitura para os executores de acordo com o [[Plano de execução]].

Cada **Aplicação do spark** é composta por dois tipos distintos de processos:

- Driver process
- Executor process

### Driver Process

- Computa os recursos necessários para a aplicação 
- Gerencia o ciclo de vida do Job, incluindo o redimensionamento do consumo de recursos
- Distribui e agenda o trabalho entre todos os executores
- Reage ao executor em caso de falha e requisita alternativas para o Cluster Manager se necessário
- Rastreia o estado da execução dos executores e monitora o progresso
- Responde ao usuário ou programa inputado

O modo de deploy (`deploy-mode`) determina como o processo do Driver será persistido no cluster:

- **cluster** executa o processo Driver dentro de um nó do cluster
- **client** executa o processo Driver fora do cluster, na máquina que fez o spark-submit
	- Caso o client falhe então o processo falha junto
- **local** executa em apenas uma única máquina, utilizado para testes.

### Executor process

- Executa as TASKs enviadas pelo processo do Driver em um Slot disponível
- Reporta o estado das TASKs de volta ao processo do Driver

Podemos considerar que cada executor é uma JVM que funciona como um pool de espaços para tarefas definido pela equação `spark.executor.cores / sprk.task.cpus`. Os recursos do executor são assim divididos em espaços para execução de tarefas de forma que elas possam ser resolvidas em paralelo.

# Modo de publicação de um cluster Apache Spark

O [[Apache Spark]] pode funcionar em um cluster que coabita vários outros frameworks de processamento distribuído como o YARN, Mesos ou Kubernetes. Ele também provê um modo mais simples chamado de Standalone que possui algumas limitações.

**Spark Standalone mode**

- Modo de publicação simples
- Limitações
	- Um executor por nó trabalhador por aplicação
	- Não permite uso de gerenciadores externos de cluster
