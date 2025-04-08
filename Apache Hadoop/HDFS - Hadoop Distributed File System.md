# HDFS - Hadoop Distributed File System

Essa é a camada de armazenamento do Hadoop que foi desenvolvido para lidar com grandes volumes de dados na grandeza dos GBs a TBs. Ele oferece um bom rendimento (Throughput, quantidade de trabalho realizado em um tempo unitário) por conseguir de forma independente e paralela executar tarefas em toda a rede de nós.

O Hadoop funciona com a arquitetura Primary-Secondary (Primario-Secundario) em que existe um nó primário e **n** nós escravos onde n pode ser mais de 1000 por exemplo. O Nó primário deve ser configurado em uma boa máquina pois é a peça central do cluster Hadoop.

No nó principal da Arquitetura Hadoop, um daemon chamado `namenode` é executado para o HDFS. Em todos os escravos, um daemon chamado `datanode` é executado para o HDFS. Portanto, os escravos também são chamados de datanodes.

O Namenode armazena meta dados e gerencia os datanodes. Por outro lado, os Datanodes armazenam os dados e executam as tarefas. Também existe o Secondary NameNode que tem a função de fazer o balanceamento para realizar checkpoints nos arquivos e datalogs, além de ser responsável por maximizar processos de otimização do cluster.

> [!info] Daemon
> Em sistemas operacionais multitarefas, um Daemon é um programa que executa como um processo em plano de fundo, em vez de estar sob o controle direto de um usuário interativo.

 No HDFS um arquivo é dividido em blocos (padrão 128 MB) e armazenado de forma distribuída em várias máquinas. É possível configurar replicações para garantir que caso falhas ocorram o processamento siga utilizando uma das réplicas. Por exemplo, caso uma das máquinas falhar em um cluster com fator de replicação três, ainda teremos duas cópias daquele bloco.