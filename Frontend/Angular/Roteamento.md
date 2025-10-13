# Roteamento

- **RouterOutlet** é uma tag que renderiza qualquer componente a partir da rota
- **RouterLink** utilizado para redirecionar a aplicação para uma rota
- **RouterLinkActive** que ativa ou desativa o link

Utilizando o RouterLink é mais simples de controlar o roteamento da aplicação, em vez de utilizar o `Router.navegate`.

### Testes de roteamento

[Documentação oficial de testes para roteamento](https://angular.dev/guide/routing/testing)

Testar o roteamento de uma aplicação é possível verificando o caminho no navegador.

```ts
describe('NotesPresenter', () => {
	beforeEach(async () => {
	  await TestBed.configureTestingModule({
		imports: [RouterModule.forRoot(routes)],
		providers: [...],
	  }).compileComponents();
	
	  location = TestBed.inject(Location);
	});
})

it("should show note's details when note is clicked", fakeAsync(() => {
  const notes = mockNotes();
  createComponent(notes);

  fixture.nativeElement
	.querySelector('.note-item')
	.dispatchEvent(new Event('click'));

  flush();
  fixture.detectChanges();

  expect(location.path()).toBe('/notes/' + notes[0].id);
}));
```

> [!tip] Roteamento é assíncrono
> Todo o roteamento no Angular é feito de forma assíncrona, então para os testes é necessário invocar uma zona de fakeAsync para fazer os testes. Caso contrário o click do botão é registrado, porém o roteamento não é feito.

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