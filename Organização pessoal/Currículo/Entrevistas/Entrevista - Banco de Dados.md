# Entrevista - Banco de Dados

Conteúdo relacionado a perguntas para entrevistas técnicas de [[Banco de dados]].

## Geral

### Possíveis perguntas

> [!example] Suponha que uma tabela de projetos tenha crescido para 50 milhões de registros. Quais estratégias você usaria para manter consultas rápidas em uma aplicação .NET ou Node?

**Conhecimentos abordados:**

- [[Banco de dados]]
	- Diferença entre bancos Relacionais e NoSQL
- [[Otimização]]
	- Índices
	- Particionamento
		- Arquivamento de dados históricos que não são mais consultados
	- Replicação de nós de leitura para desonerar nó de escrita
	- Views materializadas ou tabelas de resumo para dados consolidados
	- Plano de execução da query
	- Preferência por SQL puro vs ORM (problema N + 1)
- [[Paginação]]
	- Performance dos diferentes tipos de paginação
- [[Backend/Integrações/Cache|Cache]]
	- Revalidação dos dados de Cache

**Resposta:**

A primeira coisa seria otimizar as queries, de forma a remover joins e unions desnecessários e conseguir filtrar o máximo de dados em cada requisição. Caso seja necessário, fazer as queries na linguagem SQL em vez de utilizar a api do ORM, já que o ORM pode gerar algumas queries ineficientes (como é o caso do problema N + 1). Também garantiria a paginação dos dados. Utilizaria cache como descrito em outras respostas, para garantir que requisições já feitas sejam retornadas a partir da cache, reduzindo a carga no banco de dados.