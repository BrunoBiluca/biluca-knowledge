---
categoria: projeto
ano: 
última atualização: ""
---

# Projeto - Breweries Case

--- start-multi-column: ID_e76b

```column-settings
Number of Columns: 2
Column Size: [59%, 40%]
border: off
shadow: off
```

O objetivo desses miniprojeto é exercitar as habilidades relacionadas ao trabalho de um engenheiro de dados a partir do consumo de uma API, transformação e persistência desses dados em uma [[Arquitetura medalhão]].

--- column-break ---

> [!info] Links
> 
> - [Repositório]() 
> - [API utilizada](https://www.openbrewerydb.org/)

---

> [!quote] Referências
>- 

--- end-multi-column
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

