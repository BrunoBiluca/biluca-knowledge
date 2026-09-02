# Entrevista - Minhas experiências


## 07/2025 - Atual (1 ano e 1 meses) | Full-stack developer sênior

## 03/2024 - 07/2025 (1 ano e 4 meses) | Engenheiro de Dados sênior

## 01/23 - 03/24 (1 ano e 2 meses) | Full-stack/Games developer sênior

## 01/22 - 12/22 (1 ano) | Desenvolvedor Full-stack sênior

## 01/21 - 10/21 (10 meses) | Desenvolvedor backend sênior

Trabalhei principalmente no desenvolvimento de sistemas backend.

Projetos:

- Meu primeiro projeto foi a criação de relatórios que são impressos nas maquininhas de cartão de crédito.

- Processamento de transações do cartão de crédito. Fui responsável por criar de dar manutenção a um microsserviço que agregava informações a partir de serviços externos a nota fiscal no momento da compra.

- Também fiz um trabalho de consultoria interna para um time que trabalhava com ElasticSearch. Meu envolvimento nisso foi por meio de treinamentos e otimização no modelo de armazenamento nos dados, a fim de melhorar a performance e reduzir o custo de operação do Elasticsearch gerenciado pela Azure.

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

- Criação de uma página web de dashboard para dados coletados de fornos na indústria

- Otimização de queries para um projeto de Help Desk. Nesse projeto, os relatórios demoravam muito para países com muito população como a Índia, o meu trabalho foi reduzir um processo que demorava mais de hora para poucos minutos. Também foi necessário criar vários Índices no banco de dados para recuperar informações mais rapidamente.

- Portabilidade de uma aplicação Angular para o mobile utilizando Cordova. Nesse projeto, reaproveitamos o código escrito em Angular para portar o projeto para uma versão mobile. Também fui responsável pela adaptação da UI para mobile.

- Criação de uma seção de dashboard para uma aplicação JavaFX utilizando Webpages e Highcharts para exibir relatório com dados consolidados para os operadores da aplicação.

- Manutenção a uma aplicação de cálculo de cadeia de suprimentos. Essa aplicação pegava uma malha de pontos e utilizando heurísticas de pesquisa operacional desenvolvi um plano de cadeia de suprimentos.

Cada projeto apresentou um desafio diferente que exigiu muito estudo. O mais complexo foi o de otimizações de queries, já que a nossa meta era muito agressiva e era uma parceria com o time da Índia, onde não tínhamos acessos a todo o projeto, apenas ao código de uma das aplicações.

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

**Principal dificuldade:** modernizar o formato de trabalho. Todos esses projetos eram legados, em tecnologias já defasadas para a época. Foi necessário melhorar o nosso sistema de versionamento para GIT (anterior SVN), desenvolver publicações automáticas (essa era um grande dor da empresa, já que muitos erros eram cometidos em publicações manuais), além de trabalhar com tecnologias mais recentes em novos projetos, como foi o caso da implementação de alguns projetos em Node e .NET Core.

### Tecnologias utilizadas

- **C#/.NET** foi utilizado na maioria dos projetos, principalmente os projetos legados, que eram todos implementados com WebForms.

- **AngularJS** era recente no mercado na época e foi utilizado para novos projetos na ideia de substituir o JQuery e permitir a criação de aplicações web com uma melhor experiência de usuário.

- **Ruby on Rails** foi utilizado em alguns projetos para a criação de sistema administrativo e website, já na ideia de modernizar a tech stack da empresa, mas foi descontinuado depois desses projetos

- **SQL Server** era o principal banco de dados da empresa

- **Oracle Database** era o banco de um projeto legado. Esse projeto dependia de uma integração de dados externos vindos do cliente implementada por um conjunto de Procedures, triggers, subroutines executadas em agendamentos fixos

- **Google Firebase** foi utilizado em projetos mais simples como Websites para clientes menores, já que na época o custo de 1GB de armazenamento era gratuito.

- **Elasticsearch** foi utilizado para alguns projetos principalmente como motor de busca de produtos e também suas capacidades de geolocalização.

- **Git** foi criado um repositório privado de código em Git para substituir o SVN anteriormente utilizado. 