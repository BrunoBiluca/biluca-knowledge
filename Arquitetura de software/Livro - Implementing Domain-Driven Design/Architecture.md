---
tags:
  - arquitetura_software
---
Nesse capítulo o autor foca em apresentar várias arquiteturas de software de forma a mostrar que o DDD funciona bem com qualquer uma delas.

Ele apresenta como um resumo cada arquitetura, porém com o foco na interação com as práticas do DDD e em quais problemas cada arquitetura é melhor empregada

Arquiteturas avaliadas

- Layers
- Portas e adapatadores
- SOA
- REST
- CQRS

Uma coisa interessante desse capítulo é a entrevista com o CIO do SaaSOvation, ela apresenta de forma divertida vários dos aspectos que causam dúvidas na hora da modelagem de uma arquitetura.
# Resumo

Uma das maiores vantagens do DDD é que não é necessário o uso de uma arquitetura específica. Desde que cuidadosamente criamos o domínio principal que reside dentro do contexto limitado, isso possibilita que uma ou mais influências de arquiteturas desempenhem um papel em toda a aplicação ou sistema.

> [!tip] Evitar estilo arquitetural ou uso excessivo de padrões é tão importante quanto utilizar os certos.

Por utilizar o DDD cedo no projeto, podemos tirar o tempo necessário para entender as situações do negócio que não podemos escapar e lidar com elas a passos largos.

## Layers (Arquitetura em camadas)

Isolar a expressão do modelo de domínio e a lógica do negócio, e eliminar qualquer dependência de infraestrutura, interface de usuário, ou mesmo lógica de aplicação do que não é lógica de negócio. Particionar um programa complexo em camadas. Desenvolver um design dentro de cada camada que seja coeso e que dependa apenas das camadas abaixo.

![[arquitetura em camadas.png|Exemplo de arquitetura em camadas|center|300]]


Existem dois tipos de arquiteturas em camadas:

- Arquitetura em camadas restrita
	- As camadas só podem depender de camadas diretamente abaixo.
- Arquitetura em camadas relaxada
	- As camadas podem ter dependências em qualquer nível

Camadas inferiores podem se relacionar (vagamente acoplado) com camadas superiores por mecanismos tipo Observer ou Mediator.

Um exemplo da utilização de camadas em projetos C# é a criação de uma solução e de vários projetos, onde cada um desses projetos dependem entre si.

Camadas superiores implementam diretamente interfaces das camadas inferiores. Por exemplo, a camada de domínio define a interface do Repository de alguma interface, então a camada de infraestrutura implementa essa interface que será utilizada pelas camadas de aplicação e de interface com o usuário.

## Princípio de inversão de dependências

Uma forma de melhorar a arquitetura em camadas é aplicar o princípio de inversão de dependências:

> [!quote] Definição por Robert C. Martin
> Módulos alto nível devem depender apenas de módulos baixo nível. Ambos devem depender de abstrações (como por exemplo interfaces).
> 
> Abstrações não devem depender de detalhes. .Detalhes devem depender sobre abstrações

A essência dessa definição é comunicar que um componente que provê um serviço de baixo nível (Infraestrutura, por exemplo) deve depender de interfaces definidas pelos componentes de alto nível (Interface de usuário, aplicação ou domínio).

## Portas e Adaptadores (Arquitetura hexagonal)

Com a arquitetura hexagonal é possível permitir que vários clientes interajam com o sistema em igualdade. Apenas conectando uma adaptador para cada cliente que transforma qualquer input do cliente para ser entendido pela API interna da aplicação. Ao mesmo tempo, o mecanismos de output empregado pelo sistema são diversos e trocáveis.

![[arquitetura hexagonal.png|Exemplo de representação gráfica para um sistema que implementa a arquitetura hexagonal (Portas e adaptadores)|center|300]]

Enquanto os adaptadores são estruturas que o nosso sistema deve permitir para ligações com os clientes as portas geralmente não são implementadas por nós mesmos, por exemplo o HTTP que é uma porta para um adaptador Java Servlet ou JAX-RS (servidores).

> [!tip] Principal vantagem
> A arquitetura hexagonal apresenta várias vantagens, mas umas das maiores é poder facilmente desenvolver para propósitos de testes. Já que a aplicação e o domínio são projetados e testes dos antes dos clientes, possibilitando que os adaptadores sejam testados independentemente.

Quando projetado corretamente, a lógica do domínio e da aplicação não "vaza" para as partes externas. Isso promove uma aplicação limpa e com seus limites bem definidos, onde os casos de uso serão implementados.

## Service-Oriented (Orientado a serviços ou SOA)

Arquitetura orientada a serviços não tem bem uma definição formal. Thomas Erl define alguns princípios para sua ciração.

- Service Contract
- Service Loose Coupling
- Service Abstraction
- Service Reusability
- Service Autonomy
- Service Statelessness
- Service Discoverability
- Service Composability

> [!tip] DDD e arquitetura
> Quando usamos DDD nossa meta é criar um contexto limitado com uma completa e bem definida linguagem do modelo de domínio. Nós não queremos que a arquitetura influencie o tamanho do nosso domínio.
> 
> Ou seja, nem toda aplicação ou serviço disponível é uma contexto limitado, pensar dessa forma pode gerar vários micro contextos que não necessariamente realizam as metas da estratégia do DDD.

### SOA Manifesto

1. Business value over technical strategy
2. Strategic goals over project-specific benefits

Esses valores são bem alinhados com os valores do DDD.

## Representational State Transfer - REST

> [!tip] Estilos arquiteturais
> É  para arquitetura o que um padrão de projeto é para um padrão específico. É uma abstração dos aspectos mais comuns que diferenciam implementações concretas, possibilitando discussões dos seus benefícios relevantes sem perder tempo em detalhes de implementação.

REST é um estilo arquitetural que a arquitetura Web é presumível de aderir. 

Os padrões arquiteturais podem ser utilizados de forma que seus valores sejam alcançados ou não. Por exemplo, podemos utilizar um RDBMS (Relational Database Manager System) qualquer utilizando os conceitos arquiteturais mais comuns - como definir, chaves primárias, tabelas com colunas, chaves estrangeiras, visualizações, restrições e qualquer outro mecanismo presente nesse tipo de arquitetura. Porém também podemos utilizar o mesmo RDBMS com apenas duas colunas uma Chave e outra Valor, e apenas armazenar objetos serializados. continuamos utilizando o mesmo RDBMS mas sem o estilo arquitetural perdemos vários dos benefícios utilizando essa segunda abordagem (como queries, joins, sorting, grouping entre outros).

Uma arquitetura em REST implica que os recursos (resources) são o conceito chave. Como um designer do sistema é necessário decidir quais coisas tem sentido de expor e então são associados uma identidade a essas coisas.

O próximo conceito chave é o uso de uma comunicação sem estado (stateless), usando mensagens auto descritivas. Isso é atingido por exemplo utilizando os próprios verbos do HTTP para garantir a semântica de cada requisição.

Existem duas formas de aproximar RESTful HTTP do DDD:

- Criar um Contexto limitado separado para a camada de interface do sistema e usar estratégias apropriadas para acessar o domínio principal pela interface do modelo de negócio.
	- Cliente -> Modelo de negócio
- Outra forma é quando mais ênfase é colocada em padrões de tipos de mídia (media types)
	- Shared Kernal ou Published Language

O design do HTTP e a maturidade de ferramental que suporta as funcionalidades como reescrita de URI e caching fazem o RESTful HTTP uma ótima escolha quando arquiteturas precisam de ser ao mesmo tempo vagamente acopladas e altamente escaláveis.

## Command-Query Responsibility Segregation (CQRS)

Uma das dificuldades que o CQRS vem para resolver é a organização do projeto quando temos vários tipos de consultas que cortam os mais diversificados tipos de dados. Quanto mais sofisticadas essas consultas ficam mais um repositório não consegue dar conta de todas essas visualizações.

> [!quote] Definição
> Cada método deve ser um comando (command) que executa uma ação ou uma consulta (query) que retorna dados para o cliente, mas não ambos.

## Event-Driven Architecture

> [!quote] Definição
> É uma arquitetura de software que promove a produção, detecção, consumo de, e reações a eventos.

Nesse caso estamos focados em modelar eventos de domínios.

## Pipes and Filters

Características

- Pipes são canais de mensagem
- Portas conectam filtros aos Pipes
- Filtros são processadores
- Processadores separados, cada filtro é um componente separados
- Vagamente acoplados
- Intercambiáveis
- Filtros podem ligar a múltiplos Pipes
- Filtros do mesmo tipo em paralelo

## Long-Running Processes (aka Sagas)

São os processos que os filtros de cada evento são inscritos e garante que sejam aplicados.

## Data Fabric e Grid-Based Distributed Computing

Uma das vantagens de Data Fabrics é que eles suportam modelos de domínio de uma forma tão natural, que praticamente eliminam quando tipo de incompatibilidade com o DDD.


# Referências
