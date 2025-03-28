---
tags:
  - arquitetura_software
  - engenharia_de_dados
---
# Data Lake

> [!info] Definição
> Um datalake é um reservatório dinâmico capaz de armazenar diversos tipos de dados, desde conjuntos de dados estruturados até conversas não estruturadas em mídias sociais e arquivos semiestruturados. Essa versatilidade é sustentada por sua arquitetura e estrutura de dados exclusivas.

A arquitetura de um datalake é multifacetada. A camada de armazenamento é fundamental, muitas vezes aproveitando soluções de armazenamento de objetos como AWS para escalabilidade e economia. Em seguida, entra em ação a camada de processamento, usando ferramentas de integração de dados para transformar dados brutos em um formato mais utilizável. A camada analítica integra-se com diversas plataformas, permitindo uma análise aprofundada dos dados, enquanto a camada de consumo garante que os insights sejam facilmente acessíveis aos usuários de negócio por meio de dashboards e soluções de visualização.

Outra características dos datalakes é a capacidade de combinar formatos em um sistema de arquivos dinâmico sem nenhum tipo de esquema previamente configurados, como em um DataWarehouse ou Database convencional.

# Principais vantagens

- **Centralização do armazenamento de dados**
- **Datalakes são formatos abertos** e não estão restringidos a nenhum sistema proprietário como é o caso dos DataWareHouses
- **Flexibilidade**: databases são schema-less.
- **Escalabilidade**
- **Análises avançadas e inteligência para o negócio**
- **Processamento em tempo real**
- **Eficiente em custo para gerenciamento de dados**
- **Qualidade dos dados e governança aprimorada**

Garantir uma [segurança](https://www.integrate.io/glossary/what-is-big-data-security/) robusta para um datalake envolve uma abordagem em várias camadas:

- **Segurança de rede:** proteger a infraestrutura e a rede contra acesso não autorizado usando vigilância, controles biométricos, firewalls e sistemas de detecção de invasões.
- **Criptografia de dados:** uso de protocolos avançados para criptografar dados em repouso e durante o trânsito, garantindo que os dados permaneçam inacessíveis mesmo se forem violados.
- **Controle de acesso:** implementação do controle de acesso baseado em função (Role-based Access Control ou RBAC) para garantir que os usuários acessem apenas dados relevantes para suas funções, protegendo informações confidenciais.
- **Mascaramento de dados e tokenização:** Substituição de dados confidenciais por dados fictícios ou tokenizados, preservando a utilidade e melhorando a segurança.
- **Auditorias e monitoramento:** verificar regularmente a aderência à segurança e usar ferramentas para detectar anomalias ou tentativas de acesso não autorizado.
- **Backup e Recuperação:** Ter estratégias para recuperar dados em caso de violações, garantindo o mínimo de perda de dados e tempo de inatividade.
- **Atualizações contínuas:** Mantenha-se à frente das ameaças cibernéticas em evolução, atualizando protocolos de segurança e adotando métodos mais recentes.
- **Treinamento:** educar os usuários sobre as melhores práticas de segurança, reduzindo erros humanos e garantindo respostas rápidas a violações.

|  | Data lake | Data lakehouse | Data warehouse |
| ---- | ---- | ---- | ---- |
| **Types of data** | All types: Structured data, semi-structured data, unstructured (raw) data | All types: Structured data, semi-structured data, unstructured (raw) data | Structured data only |
| **Cost** | $ | $ | $$$ |
| **Format** | Open format | Open format | Closed, proprietary format |
| **Scalability** | Scales to hold any amount of data at low cost, regardless of type | Scales to hold any amount of data at low cost, regardless of type | Scaling up becomes exponentially more expensive due to vendor costs |
| **Intended users** | Limited: Data scientists | Unified: Data analysts, data scientists, machine learning engineers | Limited: Data analysts |
| **Reliability** | Low quality, data swamp | High quality, reliable data | High quality, reliable data |
| **Ease of use** | Difficult: Exploring large amounts of raw data can be difficult without tools to organize and catalog the data | Simple: Provides simplicity and structure of a data warehouse with the broader use cases of a data lake | Simple: Structure of a data warehouse enables users to quickly and easily access data for reporting and analytics |
| **Performance** | Poor | High | High |
# Melhores práticas ao construir um Datalake

1. Defina seus objetivos
São esses objetivos que irão guiar o desenvolvimento do projeto

- Why are you building a data lake? 
- What business problems will it address?
 
2. Priorizar a qualidade dos dados

- **Data Cleansing:** Regularly remove duplicates, correct inaccuracies, and fill in missing values.
- **Data Validation:** Implement validation rules to ensure incoming data meets predefined quality standards.
- **Metadata Management:** Using metadata to provide context makes data retrieval efficient and user-friendly.

3. Medidas de segurança robusta

Segurança é um item fundamental na construção de qualquer armazenamento de dados.

- **Data Encryption:** Both at rest and in transit.
- **Access Controls:** Define user roles and permissions, ensuring that users can only access data relevant to their roles.
- **Audit Trails:** Maintain logs of all data access and modifications, providing transparency and accountability.

4. Otimização para escalabilidade
5. Fomentar interoperabilidade com demais serviços como banco de dados tradicionais, ferramentas de BI.
6. Abraçar a estratégia de camadas de múltiplas camadas (multi-tier)
7. Mascarar os dados privados antes da informação entrar no datalake

# Datalakes e DataWarehouses combinados

Por muitas vezes as empresas tomam a atitude de combinar Datalakes e DataWarehouses para consolidar seus dados. Esse tipo de arquitetura apresenta alguns tipos de restrições:

- Os usuários de negócio que utilizam os DWs ficam limitados as análises possíveis de serem feitas com o DW, geralmente não conseguindo explorar os dados para um entendimento mais profundo deles;
- Os usuários do data lake ficam próximos dos dados brutos, mas têm que investir muito tempo na preparação dos dados do que realmente nas regras de negócio. Além disso, a exploração dos dados exige uma expertise em ferramentas de codificação para extrair valor das informações.
- Manter os dados consistentes entre o DL e o DW é uma tarefa difícil e cara.

Para solucionar esse problema de vez temos as soluções de [[Data Lakehouse]], que trazem o melhor dos dois conceitos de uma forma realmente integrada.


# Referências

- https://www.integrate.io/blog/data-lake-architecture-guide/
	- Guia inicial de desenvolvimento de uma arquitetura para datalake
- https://www.databricks.com/discover/data-lakes/history
	- Apanhado histórico sobre datalakes