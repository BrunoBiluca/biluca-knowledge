---
tags:
  - engenharia_de_dados
---
> [!info] Definição
>A governança de dados é a estrutura de política interna de uma organização que determina a forma como as pessoas tomam decisões de gerenciamento de dados. Todos os aspectos da gestão de dados devem ser realizados de acordo com as políticas de governança da organização.

A governança de dados se compromete a definir vários elementos entre eles:

- Pessoas: pessoas relacionadas as decisões de gerenciamento de dados, como auditores, especialistas, representantes do negócio.
- Política: cada organização deve definir o conjunto de políticas relacionadas ao gerenciamento dos dados, como arquitetura, segurança.
- Regras: todas as organizações deve estar de acordo com a legislação vigente, como LGPD, GDPR, CCPA em relação a proteção dos dados.
	- Exemplos são [[Delta lake#Propagando deleções]]
- Tecnologia: a política de governança deve definir as tecnologias utilizadas.
- Supervisão: toda organização deve ter processos que garantem o cumprimento das políticas de governança.
- Interação e feedback: governança é algo vivo e deve ser formatado de acordo com as necessidades da organização.

Principais conceitos relacionados a governança de dados:

- Ciclos de vida dos dados
- Registro de dados
- Residência de dados
- Monitoramento de dados
- Análise de dados
- Retenção de dados

Estratégias de governança

- Políticas
	- Devem cobrir áreas como gerenciamento de dados, treinamento de modelos, validação de resultados, segurança e supervisão humana.
	- Devem abranger aspectos como propriedade intelectual, mitigação de viés e proteção da privacidade.
	- Devem ser regularmente analisadas e atualizadas de acordo com os avanços na tecnologia e nos requisitos regulatórios.
- Frequência de revisão
- Estratégias de análise
- Padrões de transparência
- Treinamento em equipe necessário
# Pseudonimização

> [!info] PII (Person Identifiable Informações)
> São informações que identificam indivíduos nos dados. Podem ser únicas como o CPF ou uma combinação de informações.

- Protege os dados em nível de registro.
- Permite a reidentificação dos registros

-  Método de Hashing
É aplicado um algoritmo de hashing como SHA para alterar as informações que identifiquem as pessoas, como o CPF por exemplo.

- Método de Tokenização
É criada uma tabela de relação entre os campos identificadores e um token é criado para cada registro. Esse método ainda permite ter acesso aos dados originais.

Também é possível criar tabelas dinâmicas de acordo com o papel do usuário para exibir apenas informações necessárias a cada papel, como é o caso de [[Delta lake#Visualizações dinâmicas]].

# Anonimização

- Protege toda a base de dados
- Alteração irreversível
- Não é possível relacionar com os dados originais

- Método de supressão de dados
Campos identificadores são removidos e apenas os dados relevantes a consultas são utilizados.

- Método de Generalização
	- Generalização de categorias: utilizamos categorias mais gerais para categorias os registros
	- Descarte: descartamos dados exatos em preferência de faixas
		- Como por exemplo: substituir o campo de data de nascimento para uma faixa de idade
	- Truncamento de endereços de IP: Em vez de armazenarmos `10.130.176.215` utilizamos `10.130.176.0/24` dessa forma temos informação sobre uma macro região
	- Arredondamento de valores
		- Por exemplo o salário das pessoas podem ser arredondados `1245.4` para `1200`

Todos esses métodos visam generalização da identificação dos indivíduos, dificultando que mesmo sem os campos identificadores consigamos fazer relações entre as demais informações.

# Referências

- https://www.integrate.io/glossary/what-is-data-governance/
	- Resumo do governança de dados