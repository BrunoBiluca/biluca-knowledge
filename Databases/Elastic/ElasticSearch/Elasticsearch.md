---
tags:
  - banco_de_dados
  - engenharia_de_dados
---
#banco_de_dados 

# Elasticsearch

Elasticsearch é uma das ferramentas mais em alta nos últimos tempos. É um **mecanismo de busca e análise distribuída em Json**. 

Projetos que necessitam de pesquisas rápidas ou grande abrangência de consultas, agregações e métricas em tempo real tem no Elasticsearch uma ótima das melhores ferramentas disponíveis.

Junto ao Elasticsearch também é possível utilizar o ótimo **Kibana**, um sistema de visualização e gerenciamento de dados, altamente versátil que possibilita criar dashboards incríveis e completos, exibição de dados por geolocalização, análise de logs e métricas de serviços.

Porém como nem tudo são flores o Elasticsearch é um sistema pesado para manter, utilizar o Elasticsearch para uma grande quantidade de dados e um uso grande de queries pesadas pode requisitar uma infraestrutura poderosa e consequentemente uma muito cara 💰. Isso principalmente pelos requisitos de storage rápido SSD e em grande quantidade e uma quantidade muito grande de RAM para armazenar sua tabela de indexação, somado a um uso muito grande de CPU para grandes agregações paralelas.

Para contornar esses problemas algumas medidas de otimizações devem ser tomadas, vou apresentar abaixo algumas dicas que ao longo dos projetos que participei melhoraram muito a performance do sistema e nos fez economizar um trocado bem bom.

Outros conteúdos

[[Dicas de performance]]
[[Infraestrutura]]

Funcionalidades

[[Mapeamento]]
[[Ingestão dos dados]]
[[Queries]]
[[Monitoramento]]

# Principais conceitos

- Documentos: quaisquer coisas que você irá pesquisar
- Índices: coleção de documentos indexados. Cada índice contém um índice invertido que permite pesquisa relacionada a tudo dentro do índice ao mesmo tempo.

> [!info] Índice invertido
> O propósito de um índice invertido, é armazenar textos em uma estrutura a permitir buscas completas de forma muito eficiente e rápida.
> 
> Cada campo do documento que seja do tipo `full-text` terá um índice invertido relacionado. Cada índice consiste em termos únicos que aparecem em qualquer documento, assim, quando uma busca é feita cada um desses termos é analisado e sabemos exatamente o documento que esse termo pertence.
> 
> [Entendendo o índice invertido no Elasticsearch](https://codingexplained.com/coding/elasticsearch/understanding-the-inverted-index-in-elasticsearch)


# Referências

