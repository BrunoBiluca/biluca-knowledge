# Snowflake

A plataforma [Snowflake](https://www.snowflake.com/pt_br/) é um **data cloud** baseado em nuvem que oferece um **data warehouse** como serviço (DWaaS).

Snowflake não é construído sobre nenhuma outra tecnologia de banco de dados (como [[Apache Hadoop]]) ele disponibiliza uma **Arquitetura Única (Multi-cluster Shared Data)** que separa **computação** e **armazenamento**, permitindo escalar cada um independentemente com vários workloads podem acessar os mesmos dados simultaneamente sem conflitos.

Sua arquitetura consiste em 3 camadas:

- **Database Storage**
	- Snowflake manages all aspects of how this data is stored — the organization, file size, structure, compression, metadata, statistics, and other aspects of data storage

- **Query Processing**
	- Snowflake processes queries using “virtual warehouses”

- **Cloud Services**
	- Authentication
	- Infrastructure management
	- Metadata management
	- Query parsing and optimization
	- Access control
