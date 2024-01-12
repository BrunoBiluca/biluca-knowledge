---
tags:
  - arquitetura_software
  - engenharia_de_dados
---
Considere o uso de [Apache Airflow](https://airflow.apache.org/) se sua organização tiver pipelines de dados complexos com muitas dependências de fluxo de trabalho. É uma ótima ferramenta para agendar e orquestrar trabalhos de dados em lote executados em várias tecnologias em pipelines de dados de ponta a ponta. O Airflow fornece operadores prontos para uso para interagir com ferramentas populares de ETL e permite que os desenvolvedores escrevam código personalizado para acionar qualquer ferramenta com a qual o Python interaja.

# Amazon Managed Workflows for Apache Airflow

É uma versão já hospedada do Airflow na AWS.

# Integrações

## EMR Serverless

[Amazon EMR Serverless Operators — apache-airflow-providers-amazon Documentation](https://airflow.apache.org/docs/apache-airflow-providers-amazon/8.7.1/operators/emr/emr_serverless.html)
[airflow/tests/system/providers/amazon/aws/example_emr.py at providers-amazon/8.16.0 · apache/airflow · GitHub](https://github.com/apache/airflow/blob/providers-amazon/8.16.0/tests/system/providers/amazon/aws/example_emr.py)

A melhor documentação para as configurações desses operadores estão na documentação da AWS ([[Apache Spark]]).

