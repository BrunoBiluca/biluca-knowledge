---
tags:
  - banco_de_dados
---
# Logs

Um log talvez seja a abstração de armazenamento mais simples possível. É uma sequência apenas de apêndice de registros totalmente ordenada pelo tempo. Fica assim:

![[log.png|Representação de um log|center]]

Os registros são anexados ao final do log e as leituras prosseguem da esquerda para a direita. A cada entrada é atribuído um número de entrada de log sequencial exclusivo.

> [!info] Propósito principal
> Eles registram o que aconteceu e quando.

A ordenação dos registros define uma noção de "tempo", uma vez que as entradas à esquerda são definidas como mais antigas do que as entradas à direita. O número de entrada de log pode ser considerado como o "carimbo de data/hora" da entrada. Descrever essa ordenação como uma noção de tempo parece um pouco estranho no início, mas tem a propriedade conveniente de que ela é dissociada de qualquer relógio físico em particular. Esta propriedade acabará por ser essencial à medida que chegarmos aos sistemas distribuídos.

# Log para sistemas distribuídos

A abordagem centrada em log para sistemas distribuídos surge de uma observação simples que chamarei de Princípio de Replicação de Máquina de Estado (State Machine Replication Principle):

> Se dois processos determinísticos idênticos começarem no mesmo estado e receberem as mesmas entradas na mesma ordem, eles produzirão a mesma saída e terminarão no mesmo estado.

A literatura sobre sistemas distribuídos comumente distingue duas abordagens amplas para processamento e replicação. O "modelo de máquina de estado" geralmente se refere a um modelo ativo-ativo onde mantemos um log das solicitações recebidas e cada réplica processa cada solicitação. Uma pequena modificação disso, chamada de "modelo de backup primário", é eleger uma réplica como líder e permitir que esse líder processe as solicitações na ordem em que chegam e faça logout das alterações em seu estado a partir do processamento das solicitações. As outras réplicas se aplicam para que o estado mude o líder para que ele esteja em sincronia e pronto para assumir como líder caso o líder falhe.

![[active_and_passive_arch.png|Diagrama mostrando as diferenças entre uma abordagem de processamento de requisições ativa e passiva|center]]



# Referências

- https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying
	- Artigo sobre criação de sistemas distribuídos