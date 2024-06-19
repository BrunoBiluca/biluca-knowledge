---
tags:
  - engenharia_de_dados
  - livro
---
> [!info] Sobre o livro
> - Autor: Joe Reis & Matt Housley
> - Ano de lançamento: 2022


# Premissa

Esse livro foca em preencher uma vazio no campo da engenharia de dados em relação a conteúdos e materiais na ideia de criar padrões e práticas que sejam universais e que vençam a barreira do tempo sem se apegar a nenhuma tecnologia específica.

**Our goal here is to map out principles that reach across two axes. First, we wish to distill data engineering into principles that can encompass any relevant technology. Second, we wish to present principles that will stand the test of time. We hope that these ideas reflect lessons learned across the data technology upheaval of the last twenty years and that our mental framework will remain useful for a decade or more into the future.**

# Capítulos

1. [[#Chapter 1. Data Engineering Described]]
2. [[#Chapter 2. The Data Engineering Lifecycle]]
3. [[#Chapter 3 Designing Good Data Architecture]]
4. [[#Chapter 4. Choosing Technologies Across the Data Engineering Lifecycle]]
5. [[#Chapter 5 Data Generation in Source Systems]]
6. [[#Chapter 6. Storage]]
7. [[#Chapter 7. Ingestion]]
8. [[#Chapter 8. Queries, Modeling, and Transformation]]
9. [[#Chapter 9. Serving Data for Analytics, Machine Learning, and Reverse ETL]]
10. [[#Chapter 10. Security and Privacy]]
11. [[#Chapter 11. The Future of Data Engineering]]
12. [[#Appendex A. Serialization and Compression Technical Details]]
13. [[# Appendex B. Cloud Networking]]


# Resumo

Durante todo o livro algumas [[Considerações de arquitetura de dados]] são apresentadas para tentar levantar questões relevantes na hora da tomada de decisões.

![[Ciclo de vida de engenharia de dados.png|Todas as etapas do ciclo de vida de engnharia de dados|500]]
### Chapter 1. Data Engineering Described

São definidos os principais conceitos da área como:
- A própria engenharia de dados
- Ciclo de vida dos dados
- Cada uma das etapas desse ciclo de vida

Também é feita uma discussão histórica da evolução da área dos nos 80 e 90, anos 2000 e mais recentes anos 2010.

Também são definidos os papéis relacionados a área de engenharia de dados:
- Engenheiro de dados
- Analista de dados
- Cientistas de dados
- Gestores interessados como C-Levels

### Chapter 2. The Data Engineering Lifecycle

São abordados com mais detalhes o ciclo de vida da engenharia de dados a fim de dar uma visão geral sobre todo o processo. Nos próximos capítulos que são abordados cada parte do ciclo em detalhe.

> [!tip] Considerações
> O livro consolida as principais considerações que devem ser levantadas para cada uma das etapas dentro do ciclo de vida de engenharia dos dados.

- Geração
- Armazenamento
- Ingestão
- Transformação
- Servindo dados

Tanto quanto as subcorrentes que cortam transversalmente todas e cada uma das etapas do ciclo de vida:

- Segurança
- Gerenciamento dos dados
- DataOps
- Arquitetura dos dados
- Orquestração
- Engenharia de dados

### Chapter 3 Designing Good Data Architecture

Esse capítulo começa com uma definição do que é o próprio ato de arquitetar um sistema e como isso impacta no projeto de dados.

São definidos princípios de uma "boa" arquitetura:

- Escolher sabiamente componentes comuns
- Planejar para a falha
- Arquitetar para escalabilidade
- Arquitetura é liderança
- Sempre estar arquitetando
- Construir sistemas fracamente acoplados
- Tomar decisões reversíveis
- Priorizar segurança
- Abraçar FinOps

Para mais detalhes sobre a [[Boa arquitetura de dados]].

São apresentados outros conceitos que estão relacionadas a arquitetura de software e algumas arquiteturas de dados mais utilizadas como
- Data WareHouses
- Data Lakes
- Data Lakehouses
- Arquitetura guiada a eventos

### Chapter 4. Choosing Technologies Across the Data Engineering Lifecycle

> [!tip] Arquitetura vs Ferramentas
> Muitas pessoas confundem arquitetura com as ferramentas empregadas na implementação.
> 
> Arquitetura é o design de alto nível, plano de ação (roadmap) e templates de sistemas de dados que satisfazem estratégias direcionadas ao negócio. Arquitetura é o *que, porquê e quando*. 
> 
> Ferramentas são o que é utilizado para transformar a arquitetura em realidade; ferramentas são o *como*.

Considerações a serem levadas durante o processo de ciclo de vida de engenharia de dados:

- Tamanho e capacidades do time
- Velocidade para o mercado
- Interoperabilidade (capacidade de várias tecnologias trocarem informações e interagirem)
- Custo de otimização e valores para o negócio
	- Esse tópico é interessante por fazer uma análise dos vários custos relacionados a projetos de dados
		- Custo total de posse (Total cost of ownership)
		- Custos diretos
		- Custos indiretos
		- Despesas operacionais
		- FinOps
- Hoje vs Futuro: tecnologias imutáveis vs transitórias
- Localização (cloud, on prem, cloud híbrida, multi-cloud)
- Construir vs Comprar
- Monolito vs modular
- Serverless vs Servers
- Otimização, performance e guerra de comparações (benchmarks)
- As subcorrentes do ciclo de vida da engenharia de dados

### Chapter 5 Data Generation in Source Systems

Nesse capítulos são apresentados os principais componentes do início do ciclo de vida de engenharia de dados, as Fontes de Dados.

São definidas várias fontes de dados e suas principais características na hora de criar esses dados que serão futuramente utilizados nas outras etapas. Dependendo da forma que esses dados são criados é necessário uma estratégia diferente para lidar com sua manipulação.

- Arquivos e dados não-estruturados
- APIs
- OLTP (Online Transaction processing) systems
- OLAP (Online Analytical Processing) systems
- Change Data Capture (CDC)
- Logs
- Mensagens e Streams

### Chapter 6. Storage

Nesse capítulo são apresentados os principais conceitos relacionados ao armazenamento de dados, desde as abstrações, sistemas e componentes de hardware.

- Hard disks
- SSDs
- RAM
- Rede
- Serialização (discutido em maior detalhe no apêndice)
- Compressão (discutido em maior detalhe no apêndice)
- Cache

Também são discutidos sistemas de armazenamento como
- Object Storage
- Cache

E por fim são apresentados algumas abstrações relacionadas ao armazenamento de dados:

- Datalakes
- Datawahouses
- Data Lakehouses
- Ciclo de vida do armazenamento (Quente, Morno, e Frio)

### Chapter 7. Ingestion

A etapa de ingestão é definida por mover os dados de um local para outro. Nessa etapa é necessário responder algumas considerações em relação a arquitetura como:

- Dados limitados e não-limitados
	- Não-limitados são dados que estão armazenados como foram criados.
	- Limitados são dados que são armazenados de acordo com algum tipo de agrupamento, como o tempo por exemplo.
- Frequência
	- Batch
	- Micro-batch
	- Tempo real
- Síncrono vs Assíncrono
- Serialização e Deserialização
- Confiança e durabilidade
	- Confiança fala sobre a capacidade do sistema de ingestão se recuperar de falhas e o tempo de operação
	- Durabilidade fala sobre garantir que os dados não foram perdidos ou corrompidos
- Payload
	- É o próprio dataset que está sendo ingerido e suas características como: tipo, tamanho, formato, esquema e tipos de dados e metadas.
- Padrões Push vs Pull vs Poll

Também são discutidas algumas considerações a serem levadas a arquitetura de sistema de ingestão de batch e ingestão de mensagens e stream.

Formas de ingerir dados
- Conexão direta com a base de dados
- Change data capture
- APIs
- Filas de mensagem e plataformas de streaming

### Chapter 8. Queries, Modeling, and Transformation

Esse capítulo trata da etapa de transformação dos dados.

É feita um discussão sobre Queries relacionada a:
- Otimizações
- Estratégias de JOINs e esquemas

Um ponto importante que é trazido é de conhecer muito bem as tecnologias empregadas nessa etapa, de forma que dependendo da tecnologia alguns tipos de operações podem ser muito onerosas como por exemplo Escaneamentos completos de tabelas no PostgreSQL.

Também são discutidos conceitos de queries relacionados a dados em streaming, como padrões de queries, tipos de agrupamentos por Janelas (Windows), Triggers, estatísticas emitidas e dados atrasados (Late-arriving data).

Modelagem de dados é discutido em relação a modelagem conceitual, lógica e físicas dos dados. Junto a isso é apresentado a técnica de normalização de dados para modelagens relacionais e outras técnicas para modelagem de dados em batch como: Kimball, Inmon e data vault.

São apresentados vários conceitos relacionados a transformações dos dados como
- views
- views materializadas
- Federações de dados
- Virtualização de dados

Em relação a streaming são abordados todos esses tópicos porém sem apresentar nenhum tipo de solução muito concreta, já que é uma área relativamente recente e os padrões ainda estão emergindo.

### Chapter 9. Serving Data for Analytics, Machine Learning, and Reverse ETL

> [!tip] Dados são melhores quando levam a uma ação.
> Essa é a ideia de definir análises e métricas com um propósito ao invés de apenas ter mais informação.

Nesse capítulo são discutidos como servidor os dados trabalhados após a transformação. São definidas 3 principais formas de servir esses dados, seja para análises, aprendizado de máquina ou retro alimentar os próprios sistemas de onde esses dados são extraídos.

Também é definido os vários tipos de usuários que utilizarão os dados e como eles podem interagir com esses dados. Usuários de negócio, operações, cientistas de dados e analistas tem um uso completamente diferente dos dados coletados.

### Chapter 10. Security and Privacy

Segurança é dividida principalmente em 2 aspectos: pessoas e sistemas.

As principais considerações apresentadas para pessoas são:
- Pensamento negativo
- Sempre seja paranóico
- Segurança ativa
- Princípio do privilégio mínimo
- Teatro de segurança vs Hábito de segurança
	- Esse é interessante porque várias empresas fazem um teatro para parecer que tem segurança em vez de efetivamente aplicar conceitos de segurança em si
- Responsabilidade compartilhada
- Sempre faça backup de seus dados

Também fornece um [[Segurança#Exemplo de política de segurança]] para ser seguido.

### Chapter 11. The Future of Data Engineering

Esse último capítulo tem mais algumas especulações sobre o avanço da área e futuras ferramentas para prestar atenção.

Alguns pontos interessantes de prestar atençaõ
- Fusão de dados com a própria aplicação
- Fluxos de streaming e tempo real para análise de dados irão ser cada vez mais frequentes e podem substituir bastante o formato batch amplamente utilizado.

### Appendex A. Serialization and Compression Technical Details

São definidos aqui as principais estruturas de dados utilizadas para serialização e vários algoritmos utilizados na compressão.

Esses detalhes técnicos são bem relevantes durante o processo de desenvolvimento de um fluxo de processamento de dados e devem ser levados em consideração pelos engenheiro de dados, já que podem representar ganhos substanciais de performance.

### Appendex B. Cloud Networking

Discussão sobre topologia de redes em cloud.