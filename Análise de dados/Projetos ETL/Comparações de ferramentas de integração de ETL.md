---
tags:
  - arquitetura_software
  - engenharia_de_dados
---

# [[Amazon GLUE]]

- Solução todo em um para transformação de qualquer integração de dados
- Serverless
- Pago, serviço gerenciado por cloud
- Apenas spark para suas transformações
- Integra nativamente com CloudWatch
	- Não tem uma boa interface visual para monitoramente, ficamos dependentes do CloudWatch

Utilizado principalmente para a criação de pipelines de transformações de dados na AWS de forma mais rápida.

# [[Apache Airflow]]

- Plataforma de gerenciamento de fluxos de trabalho
- Precisa de instalação, existem serviços gerenciados em cloud também
- Open source ou gerenciado (caso da AWS ou Astronomer)
- Suporta vários tipos de execuções, já que o Airflow apenas chama esses serviços
- Requer uma configuração separada e suporta monitoramento e logging
	- Ótima interface visual para monitoramento, por apresentar vários jobs

Utilizado principalmente quando temos que lidar com uma fluxo mais complexo de transformação que envolva sistemas além do Apache Spark e precisamos de agendar esses jobs. Tem a vantagem de ser agnóstico em relação aos serviços utilizados.
# Referências

- [AWS Glue vs. Apache Airflow: A Comparative Outlook | LinkedIn](https://www.linkedin.com/pulse/aws-glue-vs-apache-airflow-comparative-outlook-nexla/)