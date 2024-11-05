---
tags:
  - arquitetura_software
---
Esse capítulo foca em uma das principais ferramentas para entender os contextos limitados e suas relações, no caso o mapeamento de contextos.

Além do levantamento das relações, nesse capítulo são apresentar as principais formas de relações entre contextos diferentes, e como cada uma dessas formas impacta no domínio a ser desenvolvido.

Na continuação do exemplo do SaaSOvation, nesse capítulo o time do SaaSOvation utiliza o Mapa de contextos para entender a questão das permissões e da colaboração. É escolhido um sistema OHS/PL - ACL para a relação entre o Collaboration Context e o contexto de Identity and Access.

# Resumo

O Mapa de contexto é um diagrama que visa representar o Contextos limitados e suas relações. Ele representa o terreno existente do projeto. É uma forma de ter o controle do projeto por meio de um entendimento mais detalhado.

Todos os desenhos devem ser disponibilizado de forma simples e sem cerimônia para o time. Colocar muito detalhes nos diagramas pode realmente não ajudar. Todas as conversas com ideias estratégicas para o domínio devem ser adicionadas ao Mapa de contexto.

O Mapa de contexto não é a arquitetura ou a topologia do sistema. A informação é relativa para interagir com os modelos e padrões de organização DDD.

Existem muitos tipos de padrão de organização e integração entre dois contextos limitados diferentes. Entre eles temos:

- Partnership
- Shared Kernel
- Customer-Supplier Development
- Conformist
- Anticorruption Layer
- Open Host Service
- Published Language
- Separate Ways
- Big Ball of Mud

A linguagem em cada Contexto limitado precisa ser honrada de forma que todos os modelos permaneçam puros. A segregação linguística e o comprometimento a isso é o que ajuda o time a focar em seu próprio Contexto limitado e continuar com a sua visão corretamente focada no seu trabalho.

Modelos hierarquicamente acima podem ter influência em modelos abaixo, seja positivamente ou negativamente. Isso não quer dizer que serviços autônomos podem operar completamente independentemente dos modelos acima. É necessário projetar de forma que as dependências sejam limitadas.

Separando de forma clara os Contextos limitados, podemos ter os contextos puros, enquanto aplicamos dados de outro contexto para expressar conceitos do nosso próprio contexto.

![[exemplo de diagrama de Mapa de Contexto.png]]
# Referências
