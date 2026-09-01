# App config

## HTTPClient

Configura o HttpClient para ser utilizado para injeção de dependência (ex. de uso [[Serviços]]).

Outras configurações:

- `withInterceptors(...)` permite adicionar http interceptores 
- `withFetch()` habilita a utilização de `fetch` melhorando performance e compatibilidade

### Interceptor de autenticação

Um tipo de interceptor que pode ser utilizado é o de autenticação. 
Ele adiciona o token de autenticação do usuário para toda a requisição reduzindo código escrito e centralizando a funcionalidade.

```ts
// interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Adiciona token de autenticação
  const authToken = 'seu-token-aqui';
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` }
  });
  return next(authReq);
};
```

Para **endpoints protegidos** podemos programar o interceptor para verificar a sua rota e aplicar o token apenas em rotas protegias

#### HTTPContextToken

O `HttpContextToken` é um mecanismo do Angular HttpClient que permite **associar metadados** específicos a uma requisição HTTP individual, criando um contexto personalizado para aquela requisição.

```ts
// Primeiro, crie um token de contexto
import { HttpContextToken } from '@angular/common/http';

export const AUTH_REQUIRED = new HttpContextToken<boolean>(() => false);

// src/app/core/http-context-tokens.ts
// No seu serviço ou componente ao fazer a requisição:
import { AUTH_REQUIRED } from './auth.context';

this.http.get('/api/secure/data', {
  context: new HttpContext().set(AUTH_REQUIRED, true)
});

// No interceptor:
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(AUTH_REQUIRED)) {
    const authToken = 'seu-token-aqui';
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });
    return next(authReq);
  }
  return next(req);
};
```

> [!tip] O HttpContextToken pode ser declarado em arquivo próprio ou no mesmo arquivo do interceptor.

### Interceptor de logs

Também pode ser utilizado para log da aplicação a cada requisição configurando uma única vez.

```ts
// interceptors/logging.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Request to: ${req.url}`);
  return next(req).pipe(
    tap(response => console.log(`Response from: ${req.url}`, response))
  );
};
```
