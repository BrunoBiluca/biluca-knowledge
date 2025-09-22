# JWT - JSON Web Token

> [!quote]- (Artigo de introdução) - [auth0 Developers](https://developer.auth0.com/resources/labs/tools/jwt-basics#introduction)
> Introdução a autenticação utilizando o JWT

O JWT é uma forma de autenticação em resposta ao Cookies mais tradicionais que apresentam várias limitações, como cookies criados pelo backend são considerados de terceiros pelo Browser e podem ser facilmente desabilitados.

JSON Web Token (JWT) é um padrão aberto que define de forma compactada e auto-contida uma forma de transmitir informações de forma segura entre as partes como Objetos JSON. Podemos manter o contexto do usuário, como permissões e credenciais todos no próprio token sem a necessidade de manter nenhum tipo de informação no Backend.

JWT são particularmente úteis em:

- Autorização
- Troca de informações

Outra vantagem do JWT é a possibilidade de utilizar serviços de terceiros para autenticar o usuário sem a restrição de utilizar a mesma origem (domínio) do backend, como é o caso dos cookies.

![[Diferenças entre autenticação por cookies e por JWT.png|Diferenças entre autenticação por cookies e por JWT|%cheio]]
