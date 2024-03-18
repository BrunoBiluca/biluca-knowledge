---
tags:
  - engenharia_de_dados
  - banco_de_dados
---
# Infraestrutura

Uma coisa importante de entender a respeito do Elasticsearch é a forma de utilização. Existem duas formas de utilizar o Elasticsearch:

- Single-node
- Cluster

O **single-node** é uma instância de Elasticsearch contida em uma única máquina ou VM, utilizada principalmente para desenvolvimento.

O modo **cluster** é o mais recomendado para grandes massas de dados, assim podemos distribuir nossos dados por uma rede de máquinas ou VMs e então aproveitar de toda essa paralelização para escalar horizontalmente a aplicação.

## Criação do Elasticsearch local para desenvolvimento

Para a criação do Elasticsearch local focado em desenvolvimento pode ser facilmente feito utilizando a versão **single-node**. 

Nessa versão todas as funcionalidades do Elasticsearch estão disponíveis, porém elas estão limitadas a apenas uma máquina sendo utilizada,
também não há comunicação entre os nós.

### Docker para execução single-node do ElasticSearch

![[elasticsearch-docker.local.yml]]

Utilizando o `docker-compose.yml` serão inicializados 2 serviços docker:

- es01: Aplicação do Elasticsearch no modo single-node
  - [http://localhost:9200]()
- kibana: Aplicação do Kibana com várias funcionalidades para mostrar informações persistidas no Elasticsearch
  - [http://localhost:5601]()

### Docker para execução cluster do ElasticSearch

![[elasticsearch-docker.cluster.yml]]
## Shards e Replicas

- Shards: são os containers dos dados. Quando um documento é indexado, o Elasticsearch verifica em qual shard esse documento será armazenado e então ele é persistido lá.

- Réplicas: são replicações dos shards criados, réplicas **podem ser utilizadas para melhorar a performance de consultas e agregações**, já que aumentam a parelelização a execução dessas queries pelo cluster. Uma replica pode espelhar um shard é sempre persistida em um datanode diferente. Outra vantagem do uso de réplicas é a garantia da disponibilidade dos dados no seu sistema. A principal disvantagem de utilizar réplicas é a quantidade de armazenamento necessário, dependendo da quantidade de dados armazenados no Elasticsearch, será necessário gastar o dobro ou mais.