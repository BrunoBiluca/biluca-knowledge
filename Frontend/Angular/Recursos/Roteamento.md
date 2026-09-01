# Roteamento

- **RouterOutlet** é uma tag que renderiza qualquer componente a partir da rota
- **RouterLink** utilizado para redirecionar a aplicação para uma rota
- **RouterLinkActive** que ativa ou desativa o link

Utilizando o RouterLink é mais simples de controlar o roteamento da aplicação, em vez de utilizar o `Router.navegate`.

## Guardas

Guardas são classes especiais que guardam rotas de acordo com a necessidade. 

Um caso de uso muito comum para guardas é definir se o usuário tem acesso a determinada página de acordo com sua autorização.

```ts
export const routes: Routes = [
  // rota acessada por qualquer usuário
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  // rota guardada de acordo com a autenticação do usuário
  {
    path: '',
    component: AuthLayout,
    canActivate: [authGuard], // Ativa a rota se o usuário está logado
    children: [
      {
        path: 'login',
        component: Login,
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: Signup,
        pathMatch: 'full',
      },
    ],
  },
];
```

Toda guarda tem que retornar uma função do tipo `CanActivateFn`, quando o resultado da função é verdade então a rota é guardada.

```ts
export const userIsAuthenticated: CanActivateFn = (route, state) : boolean | UrlTree => {
  const isLoggedIn = inject(UserService).isLoggedIn();
  const isAuthPage = ['/login', '/signup'].includes(state.url);
  const router = inject(Router);

  if (isLoggedIn && isAuthPage) {
    return router.createUrlTree(['/notes']);
  }

  if (!isLoggedIn && !isAuthPage) {
    return router.createUrlTree(['/login']);
  }

  return true;
};

```

Outro exemplo de implementação de guardas está em [[Exemplo - Login e registro de usuários]].