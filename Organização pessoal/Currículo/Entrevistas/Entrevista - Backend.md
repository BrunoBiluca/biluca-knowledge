# Entrevista - Backend

Conteúdo relacionado a perguntas para entrevistas técnicas de [[Backend]].

## Geral

### Possíveis perguntas

> [!example] Descreva como você projetaria uma API que consome dados de múltiplas fontes (SQL + NoSQL) e os consolida para o front-end. Como lidaria com falhas em uma das fontes?

**Conhecimentos abordados:**

- Base: [[Backend]]
- [[Banco de dados]]
	- Relacionais
	- NoSQL
	- [[ORM - Object Relational Mappers]]
	- Fonte de verdade (em caso de conflito de dados)
- Interface voltadas ao Frontend
	- [[REST]], [[HTTP]]
	- DTOs com JSON
	- Documentação em Swagger
- Integrações
	- [[Re-tentativas]]
		- Exponential Backoff com jitter
	- [[Backend/Integrações/Cache|Cache]]
	- [[Rate Limiting]]
- [[Paginação]]

**Resposta:**

Criaria um serviço utilizando método RESTful, cada fonte de dados seria a representação de um entidade nesse serviço. Faria uso dos verbos do HTTP e do sistema de código padrão utilizado pela indústria para todos os endpoints. Faria um sistema de retentativas para lidar com recuperação de dados das fontes. Em caso de falha em um fonte específica, retornaria para o cliente apenas os dados dipsoníveis no momento, indicando quais os dados estão faltando. Também focaria em ter um sistema robusto de telemetria para conseguir verificar a saúde de todos os sistemas envolvidos ao serviço, verificando periodicamente se os serviços estão online ou não. Consolidaria todos os endpoints em objetos json bem formatos que já estão em conformidade com os componentes do frontend de forma a evitar conflitos entre os dados.