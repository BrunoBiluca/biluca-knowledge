---
tags:
  - banco_de_dados
  - engenharia_de_dados
---
# Elasticsearch

> [!info] O que é?
> É um **mecanismo de busca e análise distribuída em Json**. 

Projetos que necessitam de pesquisas rápidas ou grande abrangência de consultas, agregações e métricas em tempo real tem no Elasticsearch uma ótima das melhores ferramentas disponíveis.

Junto ao Elasticsearch também é possível utilizar o ótimo **Kibana**, um sistema de visualização e gerenciamento de dados, altamente versátil que possibilita criar dashboards incríveis e completos, exibição de dados por geolocalização, análise de logs e métricas de serviços.

Porém como nem tudo são flores o Elasticsearch é um sistema pesado para manter, o utilizar para uma grande quantidade de dados e um uso grande de queries pesadas pode requisitar uma infraestrutura poderosa e consequentemente uma muito cara 💰. Isso principalmente pelos requisitos de storage rápido SSD em grande quantidade e uma quantidade muito grande de RAM para armazenar sua tabela de indexação, somado a um uso muito grande de CPU para grandes agregações paralelas.

Principais elementos do Elasticsearch

- Documentos: quaisquer coisas que você irá pesquisar
- [[Índices]]: coleção de documentos indexados. Cada índice contém um índice invertido que permite pesquisa relacionada a tudo dentro do índice ao mesmo tempo.

Outros conteúdos

- [[Solução de problemas]]
- [[Infraestrutura]]

Funcionalidades

- [[Mapeamento]]
- [[Ingestão dos dados]]
- [[Queries]]
- [[Gerenciamento do ElasticSearch]]
- [[X-Pack]]
- [[Bancos de dados/Elastic/ElasticSearch/Transformações]]

# Referências

- [Curso prático de Elasticsearch e várias ferramentas da stack da Elastic](https://www.udemy.com/course/elasticsearch-7-and-elastic-stack/?couponCode=KEEPLEARNING)
- [Melhores práticas na utilização do Elasticsearch](https://lazypro.medium.com/best-practices-of-using-elasticsearch-2a2485a289c7)
- [Guias com dicas do Elasticsearch](https://opster.com/elasticsearch-guides/)