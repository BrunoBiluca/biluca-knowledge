---
tags:
  - streaming_de_dados
  - engenharia_de_dados
---
# Apache Kafka

O Apache Kafka é uma plataforma de [[Event streaming]] distribuídos de código aberto usada por milhares de empresas para pipelines de dados de alto desempenho, análise de streaming, integração de dados e aplicativos de missão crítica.

O Kafka combina três recursos principais para que você possa implementar [seus casos de uso](https://kafka.apache.org/powered-by) para streaming de eventos de ponta a ponta com uma única solução testada em batalha:

1. Para **publicar** (gravar) e **subscrever** (ler) fluxos de eventos, incluindo importação/exportação contínua dos seus dados de outros sistemas.
2. Para **armazenar** fluxos de eventos de forma durável e confiável pelo tempo que desejar.
3. Processar fluxos de eventos à medida que ocorrem ou retrospectivamente.

E toda essa funcionalidade é fornecida de forma distribuída, altamente escalável, elástica, tolerante a falhas e segura. O Kafka pode ser implantado em diretamente no hardware, máquinas virtuais e contêineres, e no local, bem como na nuvem. Você pode escolher entre autogerenciar seus ambientes Kafka e usar serviços totalmente gerenciados oferecidos por uma variedade de fornecedores.

### Como funciona?

Kafka é um sistema distribuído composto por **servidores** e **clientes** que se comunicam através de um protocolo de rede [TCP](https://kafka.apache.org/protocol.html) de alto desempenho.

**Servidores**: O Kafka é executado como um cluster de um ou mais servidores que podem abranger vários datacenters ou regiões de nuvem. Alguns desses servidores formam a camada de armazenamento, chamados de brokers. Outros servidores executam o [Kafka Connect](https://kafka.apache.org/documentation/#connect) para importar e exportar dados continuamente como fluxos de eventos para integrar o Kafka com seus sistemas existentes, como bancos de dados relacionais, bem como outros clusters Kafka. Para permitir que você implemente casos de uso de missão crítica, um cluster Kafka é altamente escalável e tolerante a falhas: se qualquer um de seus servidores falhar, os outros servidores assumirão seu trabalho para garantir operações contínuas sem qualquer perda de dados.

**Clientes**: Eles permitem que você escreva aplicativos distribuídos e microsserviços que leem, gravam e processam fluxos de eventos em paralelo, em escala e de maneira tolerante a falhas, mesmo no caso de problemas de rede ou falhas de máquina. Kafka vem com alguns desses clientes incluídos, que são aumentados por [dezenas de clientes](https://cwiki.apache.org/confluence/display/KAFKA/Clients) fornecidos pela comunidade Kafka: os clientes estão disponíveis para Java e Scala, incluindo a biblioteca de nível superior [Kafka Streams](https://kafka.apache.org/documentation/streams/), para Go, Python, C/C++ e muitas outras linguagens de programação, bem como APIs REST.

### Abordagem arquitetônica

Um cluster do Kafka fornece processamento de eventos de fluxo de alto throughput com uma arquitetura mais complexa. Estes são alguns dos principais componentes do Kafka:

- Um _agente do Kafka_ é um servidor do Kafka que permite que os produtores transmitam dados aos consumidores. O agente do Kafka contém tópicos e suas respectivas partições. 
- Um _tópico_ é o armazenamento de dados que agrupa dados semelhantes em um agente do Kafka. 
- Uma _partição_ é um armazenamento de dados menor em um tópico que os consumidores assinam. 
- O ZooKeeper é um software especial que gerencia os clusters e partições do Kafka para fornecer streaming tolerante a falhas. O ZooKeeper foi recentemente substituído pelo protocolo Apache Kafka Raft (KRaft).

Os produtores no Kafka atribuem uma chave a cada mensagem. Em seguida, o agente do Kafka armazena a mensagem na partição principal desse tópico específico. O protocolo KRaft usa algoritmos de consenso para determinar a partição principal.

# Principais conceitos

Um **evento** registra o fato de que "algo aconteceu" no mundo ou em seu negócio. Também é chamado de registro ou mensagem na documentação. Quando você lê ou grava dados em Kafka, você faz isso na forma de eventos. Conceitualmente, um evento tem uma chave, um valor, um carimbo de data/hora e cabeçalhos de metadados opcionais.

Exemplo:
- Event key: "Alice"
- Event value: "Made a payment of $200 to Bob"
- Event timestamp: "Jun. 25, 2020 at 2:06 p.m."

**Produtores** são aqueles aplicativos cliente que publicam (gravam) eventos para Kafka, e **consumidores** são aqueles que assinam (leem e processam) esses eventos. Por exemplo, os produtores nunca precisam esperar pelos consumidores. Kafka fornece várias [garantias](https://kafka.apache.org/documentation/#semantics), como a capacidade de processar eventos exatamente uma vez.

Os eventos são organizados e armazenados de forma durável em **topics** (tópico). Muito simplificado, um tópico é semelhante a uma pasta em um sistema de arquivos, e os eventos são os arquivos nessa pasta. Os eventos em um tópico podem ser lidos com a frequência necessária — ao contrário dos sistemas de mensagens tradicionais, os eventos não são excluídos após o consumo. Em vez disso, você define por quanto tempo Kafka deve reter seus eventos por meio de uma definição de configuração por tópico, após a qual os eventos antigos serão descartados.

Os tópicos são **particionados**, o que significa que um tópico está espalhado por um número de "buckets" localizados em diferentes corretores Kafka.

![[streams-and-tables-p1_p4.png| Este tópico de exemplo tem quatro partições P1–P4. Dois clientes produtores diferentes estão publicando, independentemente um do outro, novos eventos para o tópico escrevendo eventos pela rede nas partições do tópico. Eventos com a mesma chave (denotada por sua cor na figura) são gravados na mesma partição. Observe que ambos os produtores podem gravar na mesma partição se apropriados |center]]

Para tornar seus dados tolerantes a falhas e altamente disponíveis, todos os tópicos podem ser **replicados**, mesmo em regiões geográficas ou datacenters, de modo que sempre haja vários brokers que tenham uma cópia dos dados apenas no caso de as coisas darem errado, você quiser fazer manutenção nos brokers e assim por diante. Uma configuração de produção comum é um fator de replicação de 3, ou seja, sempre haverá três cópias dos dados.

#### [APIs Kafka](https://kafka.apache.org/documentation/#intro_apis)

Além das ferramentas de linha de comando para tarefas de gerenciamento e administração, o Kafka tem cinco APIs principais para Java e Scala:

- A [API Admin](https://kafka.apache.org/documentation.html#adminapi) para gerenciar e inspecionar tópicos, corretores e outros objetos Kafka.
- A [API do Produtor](https://kafka.apache.org/documentation.html#producerapi) para publicar (escrever) um fluxo de eventos para um ou mais tópicos Kafka.
- A [API do consumidor](https://kafka.apache.org/documentation.html#consumerapi) para assinar (ler) um ou mais tópicos e processar o fluxo de eventos produzidos para eles.
- A [Kafka Streams API](https://kafka.apache.org/documentation/streams) para implementar aplicativos de processamento de fluxo e microsserviços. Ele fornece funções de nível superior para processar fluxos de eventos, incluindo transformações, operações com monitoração de estado, como agregações e junções, janelas, processamento com base em tempo de evento e muito mais. A entrada é lida de um ou mais tópicos para gerar saída para um ou mais tópicos, transformando efetivamente os fluxos de entrada em fluxos de saída.
- A [Kafka Connect API](https://kafka.apache.org/documentation.html#connect) para construir e executar conectores de importação/exportação de dados reutilizáveis que consomem (leem) ou produzem (gravam) fluxos de eventos de e para sistemas e aplicativos externos para que possam se integrar ao Kafka. Por exemplo, um conector para um banco de dados relacional como o PostgreSQL pode capturar todas as alterações em um conjunto de tabelas. No entanto, na prática, você normalmente não precisa implementar seus próprios conectores porque a comunidade Kafka já fornece centenas de conectores prontos para uso.

# Casos de uso

### Mensageria

Em nossa experiência, os usos de mensagens geralmente são comparativamente de baixa taxa de transferência, mas podem exigir baixa latência de ponta a ponta e muitas vezes dependem das fortes garantias de durabilidade fornecidas por Kafka

Comparável com: [ActiveMQ](http://activemq.apache.org/) or [RabbitMQ](https://www.rabbitmq.com/).
 
### Website Activity tracking

### Métricas

### Agregação de logs

Muitas pessoas usam o Kafka como um substituto para uma solução de agregação de logs. A agregação de logs normalmente coleta arquivos de log físicos dos servidores e os coloca em um local central (um servidor de arquivos ou HDFS talvez) para processamento. Kafka abstrai os detalhes dos arquivos e dá uma abstração mais limpa dos dados de log ou evento como um fluxo de mensagens. Isso permite um processamento de menor latência e suporte mais fácil para várias fontes de dados e consumo de dados distribuídos. Em comparação com sistemas centrados em logs, como Scribe ou Flume, o Kafka oferece desempenho igualmente bom, garantias de durabilidade mais fortes devido à replicação e latência de ponta a ponta muito menor.

### Stream processing (Processamento de fluxo)

### Event Sourcing (Fornecimento de eventos)

[Fornecimento de eventos] (http://martinfowler.com/eaaDev/EventSourcing.html) é um estilo de design de aplicativo em que as alterações de estado são registradas como uma sequência ordenada de registros no tempo. O suporte do Kafka para dados de log armazenados muito grandes o torna um excelente back-end para um aplicativo construído nesse estilo.

Por exemplo, sistemas de processamentos de pagamentos em bancos. Esses tipos de sistemas utilizam uma rede de serviços que são responsáveis por processar cada etapa do processo de pagamento. Cada etapa de processamento gera um log no sistema do que foi processado e envia o resultado na fila para o próximo serviço consumir. Dessa forma podemos recuperar todas as informações de qualquer transação dentro do sistema apenas reconstituindo o fluxo de dados e a evolução do evento.

# Configuração inicial

- Baixar Kafka
- Iniciar o ambiente do Kafka (ZooKeeper ou KRaft)
- Criação do tópico para armazenamento dos eventos
- Escrita de eventos no tópico
- Leitura dos eventos
- Importação/Exportação dos dados como streams de eventos com Kafka Connect
- Processamento dos dados com Kafka Streams
- Encerrar o ambiente Kafka
# Referências

- https://kafka.apache.org/documentation/