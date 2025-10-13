# Autenticação

> [!info] Conteúdos relacionados
> - [[Exemplo - Login e registro de usuários]]

No caso do [[Angular]] e do [[Frontend]] estamos mais preocupados com os aspectos de manter o acesso do nosso usuário ao sistema, já que a autenticação em si será feita no [[Backend]] ([[Backend/Autenticação/Autenticação|Autenticação]]).

Tipo de manutenção de sessões da aplicação:

- **baseadas em cookies**
	- É baseado no contexto da sessão do usuário mantido do lado do servidor
	- Muito utilizado quando frontend e backend são mantidos na mesma origem (domínio e porta)

- **baseados em tokens autocontidos** (ex: [[JWT - JSON Web Token]])
	- Mais utilizado quando o frontend e o backend são publicados em origens diferentes
	- Nesses casos precisamos providenciar o contexto no cabeçalho de cada requisição HTTP

> [!quote]- (Artigo) - [Angular User Login and Registration Guide (Cookies and JWT)](https://dev-academy.com/angular-user-login-and-registration-guide-cookies-and-jwt/)
> Guia para implementação de autenticação e registro em Angular 2+
> Apresentação um modelo muito robusto de autenticação.

