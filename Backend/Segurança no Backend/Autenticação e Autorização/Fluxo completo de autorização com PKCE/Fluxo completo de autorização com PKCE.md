# Fluxo completo de autorização com PKCE

**PKCE** = _Proof Key for Code Exchange_ (pronuncia-se "pixie").

Em um SPA, o `client_secret` não pode ser guardado (o código JS é visível). Sem ele, um atacante que intercepte o `code` poderia trocá-lo por tokens.

![[Fluxo de Autorização com PKCE|Fluxo de autorização com PKCE]]


# Exemplo - Painel administrativo com SSO

Vamos usar um cenário real: um **Painel Administrativo** onde apenas usuários com role `Admin` podem listar, criar e bloquear usuários do sistema.

**Stack:**

- [[Angular]] (SPA) — tela do painel
    
- **BFF (Node/Express)** — gerencia sessão e tokens
    
- **IdP Externo** — autenticação (ex: Keycloak, Auth0, Azure AD)
    
- **.NET API** — regras de negócio e dados

**Cenário:**

A Maria é gerente de TI. Ela acessa `admin.empresa.com`, faz login uma vez, e consegue:

- Ver a lista de usuários   
- Criar um novo usuário
- Bloquear um usuário

O sistema legado continua funcionando em `legado.empresa.com` e **compartilha o mesmo login** (SSO).

## Passo 1: Maria acessa o painel (sem estar logada)

> [!info] Fluxo
> SPA -> BFF

O Angular **não** fala com o IdP diretamente. Ele só pergunta ao BFF "estou logado?". Se não, manda o browser para o BFF iniciar o fluxo.

> [!example]- [[Angular]] - Controle de navegação do usuário
> ```ts
> // auth.guard.ts
> export const authGuard: CanActivateFn = () => {
>   const authService = inject(AuthService);
>   const router = inject(Router);
> 
>   if (authService.isAuthenticated()) {
>     return true;
>   }
> 
>   // Não logado → manda pro BFF iniciar o fluxo
>   window.location.href = '/bff/auth/login';
>   return false;
> };
> ```
> 


### Configuração do CORS

Configuro o CORS **no BFF**, permitindo apenas a origem do Angular, com `credentials: true` (para o cookie de sessão viajar), método e headers explícitos, e **nunca** uso `*` quando há credenciais.

> [!example]- Node/Express - Configuração do CORS
> 
> ```ts
> import cors from 'cors';
> 
> app.use(cors({
>   origin: 'https://admin.empresa.com',  // origem exata do Angular
>   credentials: true,                     // permite cookie de sessão
>   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
>   allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
>   exposedHeaders: ['X-Request-Id'],
>   maxAge: 86400,                         // cache do preflight por 24h
> }));
> ```

> [!example]- Angular - Configuração do CORS
> 
> ```ts
> // http.interceptor.ts
> export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
>   const cloned = req.clone({ withCredentials: true });
>   return next(cloned);
> };
> ```
> 

#### Passo 2: BFF inicia o Authorization Code Flow com PKCE

> [!info] Fluxo
> Browser <--- BFF
> Browser ---> IdP

Mecanismos de segurança nessa etapa:

- `anti-CSRF` (Cross-Site Request Forgery) - garante que o callback veio do mesmo browser que iniciou.
- `codeVerifier` - PKCE (garante que quem troca o code é quem iniciou), ele fica **no servidor** (sessão), nunca vai para o browser. 
- `code_challenge` (hash) vai na URL — não dá para reverter. Ele existe para **provar que quem troca o `code` por tokens é a mesma pessoa que iniciou o login**. 

> [!example]- Node/Express: login
> 
> ```ts
> // routes/auth.ts
> import crypto from 'crypto';
> 
> app.get('/bff/auth/login', (req, res) => {
>   // 1. Anti-CSRF state
>   const state = crypto.randomBytes(16).toString('hex');
> 
>   // 2. PKCE
>   const codeVerifier = crypto.randomBytes(32).toString('base64url');
>   const codeChallenge = crypto
>     .createHash('sha256')
>     .update(codeVerifier)
>     .digest('base64url');
> 
>   // 3. Guarda na sessão (server-side)
>   req.session.oauthState = state;
>   req.session.codeVerifier = codeVerifier;
> 
>   // 4. Monta URL de autorização
>   const params = new URLSearchParams({
>     response_type: 'code',
>     client_id: process.env.CLIENT_ID!,
>     redirect_uri: 'https://admin.empresa.com/bff/auth/callback',
>     scope: 'openid profile email roles',
>     state,
>     code_challenge: codeChallenge,
>     code_challenge_method: 'S256',
>   });
> 
>   res.redirect(`${process.env.IDP_URL}/authorize?${params}`);
> });
> ```

O servidor guarda num **store de sessão** (memória, Redis, banco).

##### Prevenção da troca code por tokens

O `code_challenge` é a defesa do PKCE contra interceptação do `code`.  

O `code_challenge` é enviado para o IdP dessa forma, quando a requisição para buscar o token foi emitida (passo 4), o `code_verifier` é comparado com o code_challenge, como o atacante não tem acesso ao `code_verifier` os dois não batem e o IdP recusa a troca.

![[Fluxo de troca de code por token por um atacante.png|%]]

![[Fluxo de troca de code por token com sucesso.png|%]]


#### Passo 3: IdP autentica Maria

> [!info] Fluxo
> Browser ---> IdP
> BFF (callback) <--- IdP (por meio do Browser)

O IdP cria um **cookie de sessão próprio**. Isso é o que faz o SSO funcionar depois — se Maria acessar o sistema legado, o IdP reconhece que ela já está logada. Após isso, o IdP retorna para o callback configurado no passo anterior, para seguir com o fluxo de autorização.

O IdP pode ser configurado de duas formas:

- **Cookie auto-contido** - o cookie de autenticação é criptografado com todos os dados da Maria
- **Server-side sessions** - quando precisamos de controle sobre a sessão ou auditoria, precisamos guardar a sessão do usuário em um banco de dados.

Exemplos de ferramentas para manter o cookie de identidade:

|Ferramenta|Onde guarda|
|---|---|
|**Redis**|Chave `session:xyz` → JSON com dados|
|**SQL Server**|Tabela `Sessions` (userId, expiresAt, data)|
|**IdentityServer (Duende)**|Tabela `PersistedGrants` ou `Sessions`|
|**Keycloak**|Tabelas `USER_SESSION` + `CLIENT_SESSION`|
|**Auth0 / Azure AD**|Gerenciado pelo provedor (você não vê)|

#### Passo 4: BFF troca o `code` por tokens

> [!info] Fluxo
> Browser ---> BFF (callback)
> BFF ---> IdP (/token)
> BFF <--- IdP
> Browser <--- BFF

O Browser redireciona para o callback configurado no passo 2 para dar prosseguimento ao fluxo de autorização.

O `client_secret` e o `code_verifier` **nunca** saem do servidor. O browser só recebe um cookie de sessão opaco (`sid`).

> [!example]- Node/Express: endpoint de callback que é chamado após a autenticação do usuário (passo 2)
> 
> ```ts
> app.get('/bff/auth/callback', async (req, res) => {
>   const { code, state } = req.query;
> 
>   // 1. Valida state (proteção CSRF)
>   if (state !== req.session.oauthState) {
>     return res.status(403).send('Invalid state');
>   }
> 
>   // 2. Troca code por tokens
>   const tokenResponse = await fetch(`${process.env.IDP_URL}/token`, {
>     method: 'POST',
>     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
>     body: new URLSearchParams({
>       grant_type: 'authorization_code',
>       code: code as string,
>       redirect_uri: 'https://admin.empresa.com/bff/auth/callback',
>       client_id: process.env.CLIENT_ID!,
>       client_secret: process.env.CLIENT_SECRET!, // ← segredo só no servidor
>       code_verifier: req.session.codeVerifier!,  // ← PKCE
>     }),
>   });
> 
>   const tokens = await tokenResponse.json();
> 
>   // 3. Guarda tokens na sessão server-side (NUNCA no browser)
>   req.session.accessToken = tokens.access_token;
>   req.session.refreshToken = tokens.refresh_token;
>   req.session.idToken = tokens.id_token;
>   req.session.expiresAt = Date.now() + tokens.expires_in * 1000;
> 
>   // 4. Limpa dados temporários
>   delete req.session.oauthState;
>   delete req.session.codeVerifier;
> 
>   // 5. Redireciona para o painel
>   res.redirect('/dashboard');
> });
> ```

Como no passo 2 o usuário já foi autenticado, esse passo é responsável por:

- Validação CSRF
- Trocar o código de verificação por um token de acesso
- Persistir as informações de token
- Resetar o token caso tenha sido expirado
- Limpara dados temporários, como o `oauthState` e o `codeVerifier`, já que agora vamos utilizar os tokens já autenticados

#### Passo 5: Angular carrega o painel

> [!info] Fluxo
> SPA (dashboard) <--- BFF
> SPA ---> BFF (carrega o usuário)
> SPA <--- BFF

Aqui a Maria já está autenticada e autorizada a utilizar o Dashboard.

**Todos os tokens ficam armazenados no BFF**, o SPA apenas tem as informações processadas, por exemplo, nome, email e roles.

> [!example]- Angular: serviço de autenticação no Angular
> 
> ```ts
> // auth.service.ts
> @Injectable({ providedIn: 'root' })
> export class AuthService {
>   private user = signal<User | null>(null);
> 
>   async loadUser() {
>     const res = await fetch('/bff/auth/me', { credentials: 'include' });
>     if (res.ok) {
>       this.user.set(await res.json());
>     }
>   }
> 
>   isAdmin(): boolean {
>     return this.user()?.roles?.includes('Admin') ?? false;
>   }
> }
> ```

> [!example]- Node/Express: verificação do token do usuário junto as suas permissões
> 
> ```ts
> app.get('/bff/auth/me', (req, res) => {
>   if (!req.session.accessToken) {
>     return res.status(401).json({ error: 'Not authenticated' });
>   }
> 
>   const claims = decodeJwt(req.session.idToken);
>   res.json({
>     name: claims.name,
>     email: claims.email,
>     roles: claims.roles ?? [],
>   });
> });
> ```

O SPA é responsável por renderizar a página de acordo com as `roles` do usuário.

#### Passo 6: Buscar a lista de usuários

> [!info] Fluxo
> SPA ---> BFF
> *(Alternativo)* BFF ---> IdP (refresh_token)
> *(Alternativo)* BFF <--- IdP (refresh_token)
> BFF ---> APIs externas (já com o token de acesso)
> BFF <--- APIs externas
> SPA <--- BFF

> [!example]- Node/Express: listagem dos usuários
> 
> ```ts
> app.get('/bff/api/users', async (req, res) => {
>   if (!req.session.accessToken) {
>     return res.status(401).json({ error: 'Not authenticated' });
>   }
> 
>   // Renova silenciosamente se expirou
>   if (Date.now() >= req.session.expiresAt - 30000) {
>     await refreshTokens(req);
>   }
> 
>   const apiRes = await fetch(`${process.env.API_URL}/api/users`, {
>     headers: {
>       Authorization: `Bearer ${req.session.accessToken}`,
>     },
>   });
> 
>   res.status(apiRes.status).json(await apiRes.json());
> });
> 
> async function refreshTokens(req) {
>   const res = await fetch(`${process.env.IDP_URL}/token`, {
>     method: 'POST',
>     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
>     body: new URLSearchParams({
>       grant_type: 'refresh_token',
>       refresh_token: req.session.refreshToken,
>       client_id: process.env.CLIENT_ID!,
>       client_secret: process.env.CLIENT_SECRET!,
>     }),
>   });
> 
>   const tokens = await res.json();
>   req.session.accessToken = tokens.access_token;
>   req.session.refreshToken = tokens.refresh_token ?? req.session.refreshToken;
>   req.session.expiresAt = Date.now() + tokens.expires_in * 1000;
> }
> ```

> [!example]- .NET: listagem dos usuários
> 
> ```cs
> // Program.cs
> builder.Services
>     .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
>     .AddJwtBearer(options =>
>     {
>         options.Authority = "https://idp.empresa.com";
>         options.Audience = "admin-panel-api";
>         options.TokenValidationParameters = new TokenValidationParameters
>         {
>             ValidateIssuer = true,
>             ValidateAudience = true,
>             ValidateLifetime = true,
>             RoleClaimType = "roles",
>         };
>     });
> 
> builder.Services.AddAuthorization(options =>
> {
>     options.AddPolicy("AdminOnly", policy =>
>         policy.RequireRole("Admin"));
> });
> 
> // UsersController.cs
> [ApiController]
> [Route("api/users")]
> [Authorize(Policy = "AdminOnly")]
> public class UsersController : ControllerBase
> {
>     [HttpGet]
>     public async Task<IActionResult> List()
>     {
>         var users = await _userService.GetAllAsync();
>         return Ok(users);
>     }
> 
>     [HttpPost("{id}/block")]
>     public async Task<IActionResult> Block(Guid id)
>     {
>         await _userService.BlockAsync(id);
>         return NoContent();
>     }
> }
> ```

A API .NET não sabe nada sobre cookies ou sessão do BFF. Ela só confia em **JWT assinado pelo IdP** ([[JWT - JSON Web Token]]). Isso mantém o acoplamento baixo.

#### Passo 7: Maria acessa o sistema legado (SSO em ação)

> [!info] Fluxo
> Legado ---> IdP
> Legado <--- IdP (code)

O IdP mantém a **sessão de SSO** num cookie próprio. Como Maria já se autenticou no passo 3, o IdP simplesmente emite um novo `code` sem pedir credenciais novamente.