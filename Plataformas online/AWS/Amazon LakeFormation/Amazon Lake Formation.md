---
tags:
  - arquitetura_software
  - engenharia_de_dados
---
O AWS Lake Formation centraliza o gerenciamento de permissões de seus dados e facilita o compartilhamento em toda a organização e externamente. É uma forma da AWS de criar uma arquitetura de [[Data Lakehouse]].

![[lake formation.png|Diagrama de exemplificação do que o lake formation abstrai quando utilizado|center|500]]

### Exemplo de criação de um data lake manualmente

Passos de configuração de um data lake
- Identificar as fontes de dados
- Armazenar os dados brutos
- Definir políticas de acessos aos dados
- Mapear os dados
- Criar um processo para formatar os dados para criar as análises
- Realizar as análises

![[passo da criação de um data lake.gif|Exemplo de todos os passos para a criação, manipulação, governança e análises de dados em um data lake|center|500]]

### Exemplo de criação utilizando Amazon Lake Formation

![[Passos de criação utilizando Lake Formation.png|Exemplo do passo a passo de construção de um data lake utilizando Lake Formation|center|500]]

# Permissões em Lake Formation

- Controle o acesso aos dados com permissões com um simples garantia e revogação
- Especifique permissões em tabelas e colunas em vez de em buckets e objetos
- Visualizar facilmente as políticas concedidas a um determinado usuário 
- Auditar todo o acesso aos dados em um só lugar
# Referências

- [Lake formation](https://aws.amazon.com/pt/lake-formation)
- [What is AWS Lake Formation? - AWS Lake Formation (Documentação)](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html)