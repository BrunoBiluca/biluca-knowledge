# On-Behaft-Of (OBO)

OBO é um **fluxo de autenticação e autorização**, muito comum em arquiteturas de microsserviços e APIs (especialmente usando protocolos como OAuth 2.0). Ele permite que um **serviço ou aplicativo** (frontend) faça requisições a um **segundo serviço** (backend) **agindo em nome do usuário logado**, mantendo a identidade e o contexto original desse usuário.

**O problema que o OBO resolve:**  
Imagine que você tem um App (Frontend) que precisa buscar dados do Banco A e do Banco B. Se o Frontend tivesse uma chave mestra para acessar os dois bancos, qualquer brecha no Frontend comprometeria tudo. Com o OBO, o Frontend recebe um "Token" limitado e o repassa aos bancos, que verificam se aquele usuário específico tem permissão.

**Como funciona o fluxo OBO (exemplo com OAuth 2.0):**

1. **Usuário loga** no Sistema A (Frontend) e recebe um _Token de Acesso_ (com escopo limitado).
    
2. O Sistema A precisa de dados que estão no Sistema B (Backend/API).
    
3. O Sistema A envia o _Token do Usuário_ para o **servidor de autenticação** e pede: _"Quero um novo token, mas específico para acessar o Sistema B, **em nome deste usuário**"_.
    
4. O servidor de autenticação verifica se o Sistema A tem permissão para pedir isso e emite um **novo token** (válido apenas para o Sistema B, com duração mais curta).
    
5. O Sistema A usa esse novo token para acessar o Sistema B.
    
6. O Sistema B vê que a requisição veio do Sistema A, mas **sabe que o dono da ação é o Usuário X**, aplicando as regras de [[Role-based access control (RBAC)]] baseadas no Usuário X, e não no Sistema A.

