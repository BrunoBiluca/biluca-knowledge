---
tags:
  - streaming_de_dados
---
O RabbitMQ é um agente de mensagens distribuído, compatível com Advanced Message Queuing Protocol (AMQP), que coleta dados de streaming de várias fontes para roteá-los para diferentes destinos para processamento.

# **Abordagem arquitetônica do RabbitMQ**

Um agente do RabbitMQ permite baixa latência e distribuições complexas de mensagens com os seguintes componentes:

- Uma _troca_ recebe mensagens do produtor e determina para onde elas devem ser encaminhadas
- Uma _fila_ é um armazenamento que recebe mensagens de uma central de troca e as envia aos consumidores
- Uma _vinculação_ é um caminho que conecta uma central de troca e um agente

No RabbitMQ, uma _chave de roteamento_ é um atributo de mensagem usado para rotear mensagens de uma central de troca para uma fila específica. Quando um produtor envia uma mensagem para uma central de troca, ela inclui uma chave de roteamento como parte da mensagem. A central de troca então usa essa chave de roteamento para determinar para qual fila a mensagem deve ser entregue.

## Consumo de mensagens

No RabbitMQ, o agente garante que os consumidores recebam a mensagem. O aplicativo para consumidores assume um papel passivo e espera que o agente do RabbitMQ coloque a mensagem na fila. Por exemplo, um aplicativo bancário pode esperar por alertas de SMS do software central de processamento de transações.

> [!ip] Garantia de entrega de mensagens
> O RabbitMQ aplica o modelo push, ou seja, o produtor sabe se o aplicativo cliente consumiu a mensagem. Ele é adequado para aplicativos que devem seguir sequências específicas e garantias de entrega ao trocar e analisar dados.

## Prioridade de mensagem

Os agentes do RabbitMQ permitem que o software do produtor privilegiem determinadas mensagens usando a fila prioritária. Em vez de enviar mensagens na ordem _primeiro a entrar, primeiro a sair_, o agente processa mensagens de maior prioridade antes das mensagens normais. Por exemplo, um aplicativo de varejo pode enfileirar transações de vendas a cada hora. No entanto, se o administrador do sistema emitir uma mensagem de backup prioritário do banco de dados, o agente a enviará imediatamente.

## Exclusão de mensagens

Um agente do RabbitMQ encaminha a mensagem para a fila de destino. Depois de lido, o consumidor envia uma resposta de confirmação (ACK) ao agente, que então exclui a mensagem da fila.


# Principais características

### Escalabilidade

O RabbitMQ pode expandir sua capacidade de processamento de mensagens tanto horizontal quanto verticalmente. Você pode alocar mais recursos computacionais para o servidor do RabbitMQ a fim de aumentar a eficiência da troca de mensagens.

> [!tip] Distribuição de mensagens
>  Em alguns casos, desenvolvedores usam uma técnica de distribuição de mensagens chamada de _troca de hash consistente do RabbitMQ_ para equilibrar o processamento de carga em vários agentes.

# Comparações com o Kafka

- O Apache Kafka é uma **plataforma** de streaming para desenvolvimento de pipelines de dados e aplicações de streaming em tempo real. O Kafka fornece um sistema de mensagens altamente escalável, tolerante a falhas e durável, com mais recursos do que o RabbitMQ.

No RabbitMQ, o produtor envia e monitora se a mensagem chega ao consumidor pretendido. Por outro lado, os produtores de Kafka publicam mensagens na fila, independentemente de os consumidores as terem recuperado.

Pense no RabbitMQ como uma agência postal que recebe correspondência e a entrega aos destinatários pretendidos. Enquanto isso, o Kafka é semelhante a uma biblioteca, que organiza mensagens em prateleiras com diferentes gêneros que os produtores publicam. Em seguida, os consumidores leem as mensagens das respectivas prateleiras e lembram o que leram.


# Referências

- [Qual é a diferença entre o Kafka e o RabbitMQ?](https://aws.amazon.com/pt/compare/the-difference-between-rabbitmq-and-kafka/)