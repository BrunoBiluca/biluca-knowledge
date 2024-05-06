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

> [!important] Heap size
> O tamanho da Heap padrão é 1GB, assim caso o cluster tenha 64GB de RAM, o tamanho da Heap (utilizada pelo Elasticsearch) irá continuar sendo o mesmo.
> Assim, alterar o tamanho da Heap deve ser metade ou menos da quantidade física de memória disponível.
> 
> OBS: não passar de 32 GB, por causar problemas de performance.

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

- Shards: são os containers dos dados (índice do Lucene). Quando um documento é indexado, o Elasticsearch verifica em qual shard esse documento será armazenado e então ele é persistido lá.

Todo pedido de escrita é roteado para um shard primário e então replicado. Os pedidos de leitura são roteados para shards primários ou qualquer réplica disponível.

> [!tip] Leitura e escrita
> - Se um sistema demanda muitas operações de escrita ter mais shards primários pode ajudar na performance
> - Se um sistema demanda muitas operações de leitura (query e searches) ter mais shards réplica pode ajudar na performance
> 

- Réplicas: são replicações dos shards criados, réplicas **podem ser utilizadas para melhorar a performance de consultas e agregações**, já que aumentam a paralelização a execução dessas queries pelo cluster. Uma replica pode espelhar um shard é sempre persistida em um datanode diferente. Outra vantagem do uso de réplicas é a garantia da disponibilidade dos dados no seu sistema. A principal disvantagem de utilizar réplicas é a quantidade de armazenamento necessário, dependendo da quantidade de dados armazenados no Elasticsearch, será necessário gastar o dobro ou mais.

> [!warning] Não é possível adicionar mais shards ao cluster posterior a criação
> - É possível adicionar mais réplicas 
> - Caso necessário será necessário reindexar todos os dados do cluster

> [!info] Monitoramento de shards
> Para verificar mais informações sobre a alocação dos shards e das réplicas no cluster podemos utilizar o seguinte endpoint
> ```
> /_cat/shards
> ```

# Rotação de Alias

> [!info] Rotação de Alias
> Alias é uma forma de adicionar identificadores para além do nome aos índices. 
> 
> [Documentação do Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-aliases.html)

Utilizando esse recurso podemos definir nomes mais significativos, agrupar índices utilizando o mesmo alias permitindo pesquisa em múltiplos índices e fazer rotação de índices em relação a alguma característica dos dados.

### Exemplo de rotação de alias para logs por data

Vamos considerar por exemplo uma índice de logs que serve para criação de pesquisa em múltiplos períodos como: "mês atual" e "últimos 3 meses".

Os índices são definidos por mês, ou seja, todos os logs de um mês estão contidos no mesmo índice.

Assim, considerando que estamos no mês `2024-04` podemos garantir a rotação desses índices sem alterar seus nomes por meio dos alias.

```json
POST /_aliases
{
	"add": { "alias": "logs_mes_atual", "index": "logs_2024_04" },
	"remove": { "alias": "logs_mes_atual", "index": "logs_2024_03" },
	"add": { "alias": "logs_ultimos_3_meses", "index": "logs_2024_04" },
	"remove": { "alias": "logs_ultimos_3_meses", "index": "logs_2024_01" },
}
```

Nesse exemplo nós adicionamos o alias `logs_mes_atual` para o mês vigente `2024-04` e removemos esse mesmo alias do mês anterior. Também fazemos a mesma rotação para o alias relacionado aos últimos 3 meses.