# Entrevista - Backend

Conteúdo relacionado a perguntas para entrevistas técnicas de [[Backend]].

## Geral


Temas gerais:

- [[Autorização]] e [[Autenticação|Autenticação]]
- [[BFF]]

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

Criaria um serviço utilizando método RESTful, cada fonte de dados seria a representação de um entidade nesse serviço. Faria uso dos verbos do HTTP e do sistema de código padrão utilizado pela indústria para todos os endpoints. Faria um sistema de retentativas para lidar com recuperação de dados das fontes. Em caso de falha em um fonte específica, retornaria para o cliente apenas os dados disponíveis no momento, indicando quais os dados estão faltando. Também focaria em ter um sistema robusto de telemetria para conseguir verificar a saúde de todos os sistemas envolvidos ao serviço, verificando periodicamente se os serviços estão online ou não. Consolidaria todos os endpoints em objetos json bem formatos que já estão em conformidade com os componentes do frontend de forma a evitar conflitos entre os dados.

> [!example] Qual a diferença entre Autenticação e Autorização? Descreva o fluxo de utilizanod OAuth e OIDC em uma aplicação Angular.

**Conhecimentos abordados:**

- [[Autenticação|Autenticação]]
- [[Autorização]]
- [[BFF]]
- [[Role-based access control (RBAC)]]
- [[Fluxo completo de autorização com PKCE]]

**Resposta:**

Autenticação define quem você é, ou seja, a identidade. Autorização define o que você pode fazer, por exemplo, acessar uma área específica de um website.

O OAuth que é um framework autorização e o OpenID Connect é a camada de identidade construída sobre o OAuth que adiciona autenticação.

O fluxo de uma aplicação nesses moldes seria: 

1. o usuário é redirecionado ao IdP (identity provider)
	- Durante esse passo o BFF mantém o code_verifier e o anti-CSFR state
2. faz login (email/senha + MFA)
3. volta com authorization code para o callback do BFF que troca por tokens
4. .NET (APIs externas) valida o JWT e aplica policies de RBAC
5. o Angular usa guards para esconder rotas e pode usar diretivas para esconder elementos mais pontuais, como botões e menus, por exemplo.

É importante ressaltar que a autorização no frontend não é segura, já que o usuário pode ter acesso ao código. Por esse motivo, o backend deve ser utilizado como fonte de verdade.

