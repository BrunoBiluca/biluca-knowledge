# Inmon

> [!quote] Definição de Inmon para Data Warehouse
> Um data warehouse é uma coleção de dados orientada a assuntos, integrada, não-volátil, e variante ao tempo que suporta decisões da gestão. A data warehouse contem dados corporativos granulares. Dados em um Data Warehouse são capazes de serem usados para diferentes propósitos, incluindo aguardar necessidades futuras que não são conhecidas atualmente.

As principais características são:

- Orientada a assuntos (subject-oriented): o data warehouse foca em assuntos e área específicas, como marketing ou vendas.
- Integrada: diversas fontes de dados são centralizadas e normalizadas na data warehouse
- Variante ao tempo: faixas de tempo podem ser consultadas.

O Data warehouse no formato proposto por Bill Inmon deve ser armazenado de forma altamente normalizada, então são construídos por meio do processo de ETL a Data Marts que focam em responder áreas ou assuntos específicos.

![[Inmon para um ecommerce.png|Exemplo da modelagem de um Data warehouse no formato Inmon para um ecommerce|500]]

Uma opção popular para modelagem de dados em um data mart é o [[#Esquema Estrela (Star Schema)]], onde cada um dos data marts podem ter seu próprio esquemas estrela alimentados pelos dados granulares no data warehouse. Isso permite que cada departamento possa ter sua própria estrutura de forma a otimizar suas próprias necessidades.