# Entrevista - Minhas experiências


## 07/2025 - Atual (1 ano e 1 meses) | Full-stack developer sênior

## 03/2024 - 07/2025 (1 ano e 4 meses) | Engenheiro de Dados sênior

## 01/23 - 03/24 (1 ano e 2 meses) | Full-stack/Games developer sênior

Durante esse ano trabalhei no desenvolvimento de jogos e em alguns projetos freelances.

Atuação:

- Criação de um framework de desenvolvimento de protótipos em Unity (chamado Unity Foundation). Esse framework vinha para acelerar o processo de criação de protótipos de jogos, diminuindo o tempo de uma ideia virar algum jogável. Foi utilizado em vários projetos e está disponível no Gtihub caso qualquer pessoa queria utilizar.

- Criação de um jogo, estilo Second Life, para uma grande empresa de música do Brasil. Nesse jogo, as pessoas iriam frequentar o escritório dessa empresa e jogar vários tipos de minigames, era uma forma de aproximar a equipe.

**Principal desafio:** a criação do jogo estilo Second Life foi um grande desafio, já que trabalhei sozinho. O projeto já estava sendo desenvolvido a mais de um ano, com o prazo totalmente ultrapassado e não tinha nenhuma versão publicada, além disso, todo o time de desenvolvimento saiu do projeto antes de eu entrar, sem deixar documentação e infraestrutura configurada. Foi necessário fazer grande parte do código, já que apresentava vários bugs e débitos técnicos que inviabilizavam a adição de novas funcionalidades. Utilizando como base a metodologia ágil, eu conseguir fazer um trabalho de re-priorização junto ao PO do projeto e conseguimos em um mês corrigir os principais problemas do jogo e lançar uma versão para o cliente começar a nos dar feedback. Depois desse momento, fizemos rodadas de adição de funcionalidades e correções de bugs e débitos técnicos.

### Tecnologias utilizadas

- **Unity** foi utilizado em vários protótipos e no desenvolvimento do projeto de jogo estilo Second Life

- **Godot** após a Unity anunciar a taxa de cobrança por instalação, migrei todo o meu desenvolvimento para a Godot

- **C#** utilizava C# tanto para a Unity quanto para Godot

- **Git** versionamento de códiog

## 01/22 - 12/22 (1 ano) | Desenvolvedor Full-stack sênior

Fui contratado como Full-stack e para atuar como um líder técnico no desenvolvimento de uma plataforma de educação de uma grande rede de escolas particulares aqui no Brasil.

Atuação:

- Revisão técnica do projeto a fim de resolver bugs e débitos técnicos que impactavam a experiência do usuário

- Criação de uma camada de interação (adaptador) entre o nosso portal e os iframes dos livros que eram carregados. Essa plataforma disponibilizava livros interativos para os alunos, porém esses livros era fornecidos em um formato específicos e de forma isolada em um iframe, já que continuam direitos autorais. A nossa camada de interação permitia transmitir informações dos livros (iframes) para o portal e vice-versa, permitindo uma melhor integração entre os dois. Essa camada foi feita utilizando engenharia reversa nesses livros, já que a documentação do formato desses livros era muito frágil.

- Mentorias e treinamentos. A partir da minha atuação no projeto principal fui responsável por treinar os desenvolvedores menos experientes do time para elevar o nível de qualidade da entrega. Ao longo do ano que trabalhei foram mais de 10 desenvolvedores mentorados em pelo menos 3 ciclos de treinamentos.

**Principal desafio:** era um projeto novo que foi construído com desenvolvedores pouco experientes. Isso levou a um projeto cheio de débitos técnicos e bugs mesmo antes da primeira versão. Quando eu cheguei algumas páginas da aplicação demoravam mais de 5 minutos para carregar, já que a forma de busca desses dados era sequencial e muito mal otimizada. Foi necessário um trabalho de revisão de todo o código do Frontend (Vue) para otimizar a apresentação das informações, fizemos caches para chamadas recorrentes, paralelizamos chamadas ao backend e também retardamos a obtenção de dados para quando o usuário necessitar, em vez de carregar tudo no início da página. Junto a isso trabalhamos com a equipe responsável por parte do backend para otimizar essas consultas, adicionando resultados agrupados, paginação, ordenação e filtros. Quando entregamos a primeira versão do portal, ao final do ano, nenhuma página demorava mais de 10 segundos para ser inicialmente carregada resultando em uma experiência muito mais agradável ao aluno e professor que iam utilizar o portal.

### Tecnologias utilizadas

- **Vue 3** era o framework frontend do portal

- **Node.js** com express era utilizado em parte do backend, para o controle do usuário, como gerenciamento de sessão, preferências de uso, registro de atividades nos livros

- **Typescript** era utilizada tanto no frontend quanto no backend

- **Git** versionamento do códido

## 01/21 - 10/21 (10 meses) | Desenvolvedor backend sênior

Trabalhei principalmente no desenvolvimento de sistemas backend.

Projetos:

- Meu primeiro projeto foi a criação de relatórios que são impressos nas maquininhas de cartão de crédito.

- Processamento de transações do cartão de crédito. Fui responsável por criar e dar manutenção a um microsserviço que agregava informações a uma nota  fiscal a partir de serviços externos no momento da compra.

- Também fiz um trabalho de consultoria interna para um time que trabalhava com ElasticSearch. Meu envolvimento nisso foi por meio de treinamentos e otimização na modelagem de armazenamento dos dados, a fim de melhorar a performance e reduzir o custo de operação do Elasticsearch gerenciado pela Azure.

**Principal desafio:** foi trabalhar na criação de relatórios impressos. Como era uma tecnologia (Jasper reports) que nunca tive contato precisei aprender do zero, porém como a minha base enquanto programador é robusta, a mudança de paradigma (_Jasper é uma aplicação proprietária e o relatório é criado nessa aplicação com uma linguagem e formato de trabalho específico_) não foi um problema e consegui entregar o projeto dentro do prazo.

### Tecnologias utilizadas

- **Java/Spring Boot** era utilizado em todos os microsserviços da empresa

- **Docker** era utilizado para desenvolvimento. Todos os microsserviços eram executados a partir de um container previamente configurado.

- **RabbitMQ** era o sistema de mensageria entre os microsserviços. Cada um dos serviços enviava o resultado do seu processamento para uma fila no RabbitMQ, onde o próximo serviço ficava lendo dessa fila para continuar o processamento.

- **JavaFX/Jasper Reports** eram as tecnologias utilizadas para criar os relatórios que são impressos pelas maquininhas de cartão.

- **MongoDB** cada microsserviço era responsável por registrar no mongoDB as transformações resultantes em cada transação por motivos de auditoria.

- **Git** era o modelo de versionamento de código de todos os microsserviços.

## 03/19 - 09/20 (1 ano e 6 meses) | Analista de sistemas pleno

Trabalhei principalmente como engenheiro de dados.

Projetos:

- Processador de regras em tempo real. Nesse projeto nós criamos uma esteira de processamento de eventos em tempo real para clientes poderem processar regras de fraude em relação as transações dos seus usuários.

- Framework de processamento de dados. A fim de manter a padronização e aumentar a velocidade na criação de pipeline de dados, foi criado um framework que englobava várias regras de negócio da empresa. Dessa forma, para pipelines mais comuns o engenheiro de dados só precisava configurar o processamento, enquanto para transformações mais complexas o framework já disponibilizava ferramentas de desenvolvimento, como logging, rastreamento de eventos, notificações entre outros. O framework permitia integrações com as duas clouds utilizadas pela empresa.

**Principal desafio:** foi a criação do framework de processamento de dados. Eu tinha que pensar em um camada de abstração mais abstrata, já que esse framework precisa resolver os problemas atuais e futuros do nosso trabalho. Como utilizamos uma abordagem ágil, estávamos sempre focados em mudanças rápidas e incrementais no framework, por isso no primeiro mês já conseguimos ter uma versão em produção.

### Tecnologias utilizadas

- **Python** era a principal linguagem que utilizávamos em todos os projetos

- **Pandas** para o processamento de dados

- **Apache Spark/Delta Lake** era o principal motor de processamento, o framework foi desenvolvido sobre o Spark e era amplamente utilizado

- **Apache Airflow** era utilizado para orquestrar o fluxo de processamento de dados de todos os clientes. Inicialmente poucos recursos eram utilizado, por fim o próprio framework já gerava as esteiras de processamento e cuidava das variáveis de ambientes e secrets de cada Job.

- **Postgres** era utilizado para gerenciar a base de usuários

- **Elasticsearch** era o destino final de todos os dados que o cliente iria consultar. A partir do Elasticsearch disponibilizámos páginas de Dashboard com vários tipos de visualizações para o cliente e múltiplos filtros.

- **Git** era utilizado para o versionamento do código

- **AWS** inicialmente era a cloud utilizada para toda a infraestrutura da empresa. Principais serviços utilizados: EC2, ECS, EMR, S3, Lambda functions, DynamoDB, Elastic Cache...

- **Azure** foi feita a migração da infraestrutura para da AWS para a Azure, e todos os serviços utilizado na AWS foram encontrados algum serviço correspondente.


## 06/18 - 03/19 (9 meses) | Engenheiro de software pleno

Trabalhei como desenvolvedor de software em vários pequenos projetos auxiliares.

Alguns projetos foram:

- Criação de uma página web de dashboard para dados coletados de fornos insdustriais

- Otimização de queries para um projeto de Help Desk. Nesse projeto, os relatórios demoravam muito para países com muito população como a Índia, o meu trabalho foi reduzir um processo que demorava mais de hora para poucos minutos. Também foi necessário criar vários Índices no banco de dados para recuperar informações mais rapidamente.

- Portabilidade de uma aplicação Angular para o mobile utilizando Cordova. Nesse projeto, reaproveitamos o código escrito em Angular para portar o projeto para uma versão mobile. Também fui responsável pela adaptação da UI para mobile.

- Criação de uma seção de dashboard para uma aplicação JavaFX utilizando Webpages e Highcharts para exibir relatório com dados consolidados para os operadores da aplicação.

- Manutenção a uma aplicação de cálculo de cadeia de suprimentos. Essa aplicação pegava uma malha de pontos e utilizando heurísticas de pesquisa operacional desenvolvi um plano de cadeia de suprimentos.

**Principal desafio:** O mais complexo foi o de otimizações de queries, já que a nossa meta era muito agressiva e era uma parceria com o time da Índia, onde não tínhamos acessos a todo o projeto, apenas ao código de uma das aplicações.

### Tecnologias utilizadas

- **C#/.NET** era utilizado para o projeto de Otimização de Queries

- **Java** para o projeto de JavaFX

- **Angular 2+** foi utilizado no porte para uma aplicação mobile

- **Python** foi utilizado no projeto do forno industrial

- **MongoDB** era utilizado para a principal aplicação de Cadeira de suprimento que precisei de dar manutenção

- **MySQL** era o banco com os dados para gerar relatórios que eu precisei de otimizar as queries

## 08/16 - 03/18 (1 ano e 6 meses) | Analista de sistemas júnior

Trabalhei como desenvolvedor web na criação de websites e sistemas administrativos para grandes empresas de varejo e de plano de saúde. Os nossos projetos permitiram automatizar e digitalizar informações dessas empresas, por um sistema de intranet independente.

Como o caso de uma empresa de plano de saúde que todo o sistema administrativo foi automatizado e digitalizado, como controle de notas fiscais, cadastro dos cooperados, produtos disponíveis, e etc. Além disso, também fizemos o website que apresenta todos os produtos do plano de saúde, como agendamento de consultas, lista de cooperados e outras informações importantes dos clientes do plano.

**Principal dificuldade:** modernizar o formato de trabalho. Todos esses projetos eram legados, em tecnologias já defasadas para a época. Foi necessário melhorar o nosso sistema de versionamento para GIT (anterior SVN), desenvolver publicações automáticas (essa era uma grande dor da empresa, já que muitos erros eram cometidos em publicações manuais), além de trabalhar com tecnologias mais recentes em novos projetos, como foi o caso da implementação de alguns projetos em Node e .NET Core.

### Tecnologias utilizadas

- **C#/.NET** foi utilizado na maioria dos projetos, principalmente os projetos legados, que eram todos implementados com WebForms.

- **AngularJS** era recente no mercado na época e foi utilizado para novos projetos na ideia de substituir o JQuery e permitir a criação de aplicações web com uma melhor experiência de usuário.

- **Ruby on Rails** foi utilizado em alguns projetos para a criação de sistema administrativo e website, já na ideia de modernizar a tech stack da empresa, mas foi descontinuado depois desses projetos

- **SQL Server** era o principal banco de dados da empresa

- **Oracle Database** era o banco de um projeto legado. Esse projeto dependia de uma integração de dados externos vindos do cliente implementada por um conjunto de Procedures, triggers, subroutines executadas em agendamentos fixos

- **Google Firebase** foi utilizado em projetos mais simples como Websites para clientes menores, já que na época o custo de 1GB de armazenamento era gratuito.

- **Elasticsearch** foi utilizado para alguns projetos principalmente como motor de busca de produtos e também suas capacidades de geolocalização.

- **Git** foi criado um repositório privado de código em Git para substituir o SVN anteriormente utilizado. 