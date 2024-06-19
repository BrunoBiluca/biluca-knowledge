---
tags:
  - engenharia_de_dados
---
# Melhores práticas

### Datalake foundation e dados brutos

Os dados devem ser salvos em seu formato nativo, para que nenhuma informação seja perdida inadvertidamente por agregação ou modificação. Até mesmo limpar os dados de valores nulos, por exemplo, pode ser prejudicial para bons cientistas de dados, que aparentemente conseguem extrair valor analítico adicional não apenas dos dados, mas até mesmo da falta deles.

A única exceção são pelos dados de identificação pessoal que devem ser substituídos por IDs para evitar problemas de identificação.

### Garantir a segurança do Lakehouse com acesso baseado a funções e controles de visualizações

Tipos mais tradicionais de controles de governança como, IAM da AWS e Role-Based Access Controls da Azure, são um bom ponto de início para o gerenciamento desse controle, porém não possuem formas muito refinadas de controle, como controlar uma coluna específica ou uma visualização específica.

Assim modelos baseados em SQL Views podem ser muito mais interessantes para ter esse controle minucioso dos dados.

### Construir resiliência e transações ACID no Lakehouse

**Propriedades ACID** (atomicidade, consistência, isolamento e durabilidade) garantem a integridade e confiabilidade dos dados.

Delta Lake baseia-se na velocidade e confiabilidade do Parquet de código aberto (já um formato de arquivo de alto desempenho), adicionando garantias transacionais, manipulação escalonável de metadados e unificação em lote e streaming.

### Catalogue seus dados

O catálogo de dados é um armazenamento organizado e abrangente de metadados de tabelas, incluindo descrições de tabelas e colunas, esquema, informações de linhagem de dados e muito mais.

No momento da ingestão, os usuários devem “identificar” (tag) novas fontes de dados ou tabelas com informações sobre elas – incluindo unidade de negócios, projeto, proprietário, nível de qualidade dos dados e assim por diante – para que possam ser classificados e descobertos facilmente.