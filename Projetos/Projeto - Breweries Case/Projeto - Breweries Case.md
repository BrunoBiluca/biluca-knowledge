---
categoria: projeto
ano: 2025
última atualização: ""
---
# Projeto - Breweries Case

O objetivo desses miniprojeto é exercitar as habilidades relacionadas ao trabalho de um engenheiro de dados a partir do consumo de uma API, transformação e persistência desses dados em uma [[Arquitetura medalhão]].

> [!info] Links
> 
> - [Repositório]() 
> - [API utilizada](https://www.openbrewerydb.org/)

#### Principais funcionalidades

- Orquestração do processamento de dados
	- Agendamento
	- Retentativas
	- Tratamento de erros
- Conteinerização da aplicação
- Persistência de dados seguindo a arquitetura medalhão
	- Bronze
	- Prata
	- Ouro
- Monitoramento e Disparo de alertas

#### Tecnologias

- [[Apache Spark]]
	- [[PySpark]]
- [[Docker]]
- [[Apache Airflow]]

# Descrição do projeto

![[Diagrama de arquitetura de dados - Breweries|Diagrama de arquitetura de dados|%cheio]]


Ambiente

- Orquestração: [[Apache Airflow]]
- Processamento: [[Apache Spark]] na sua versão [[PySpark]]

