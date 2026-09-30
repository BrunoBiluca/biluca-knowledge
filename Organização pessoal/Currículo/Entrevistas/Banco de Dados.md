# Entrevista - Banco de Dados

Conteúdo relacionado a perguntas para entrevistas técnicas de [[Bancos de dados/Banco de dados]].

## Geral

### Possíveis perguntas

> [!example] Suponha que uma tabela de projetos tenha crescido para 50 milhões de registros. Quais estratégias você usaria para manter consultas rápidas em uma aplicação .NET ou Node?

**Conhecimentos abordados:**

- [[Bancos de dados/Banco de dados]]
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

A primeira coisa seria otimizar as queries, de forma a remover joins e unions desnecessários permitindo assim, conseguir filtrar o máximo de dados em cada requisição. 

Caso seja necessário, fazer as queries na linguagem SQL em vez de utilizar a api do ORM, já que o ORM pode gerar algumas queries ineficientes (como é o caso do problema N + 1). 

Adicionaria alguns outros tipo de funcionalidades como paginação dos dados. 

Utilizaria cache como descrito em outras respostas, para garantir que requisições já feitas sejam retornadas a partir da cache, reduzindo a carga no banco de dados.


> [!example] Quando NÃO usar índice?

**Conhecimentos abordados:**
- 

Em colunas com baixa seletividade, tabelas pequenas, ou em colunas muito atualizadas — o custo de manutenção pode superar o ganho.


> [!example] Como investigar uma query lenta?

**Conhecimentos abordados:**
- 

Vejo o execution plan, procuro table scans, faltas de índice, key lookups, e uso SET STATISTICS IO/TIME. Com essas informações eu consigo atual para resolver os principais gargalhos.

Além disso, também precisamos verificar a performance no servidor, já que queries muito grandes pode gerar uma sobrecarga de serialização e desserialização que podem consumir muitos recursos como memória e disco dos servidores.


> [!example] O que é deadlock e como evitar?

**Conhecimentos abordados:**
- 

Duas transações esperando recursos uma da outra. Evito acessando recursos na mesma ordem, mantendo transações curtas e usando isolation level adequado.

Também podemos aglutinar as duas transações em uma mesma procedure que garanta uma execução atômica.
