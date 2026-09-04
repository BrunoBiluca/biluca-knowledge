# Arquitetura do NgRx

O instrutor define um `@NgModule` e dentro dele define a funcionalidade `StoreModule.forFeature()`. Dessa forma, o store está atrelado apenas ao módulo declarado.

## Action

**Action** é qualquer operação que informa a uma store que alguma coisa aconteceu.

Exemplos de ações:

- Usuário clica no botão de login da página de login para tentar se autenticar
- Uma requisição é enviada para um serviço de terceiros

Uma **boa prática** em relação a ações é que quanto **mais ações se cria mais descritivo** o seu sistema fica expressando melhor o fluxo da aplicação. **Prover contexto** a um evento único também ajuda na hora de depurar a aplicação utilizando as **ferramentas de desenvolvimento**.

```js
// action definition
// [Login Page] é considerado a fonte da ação utilizado para definir contexto
export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

// dispatch uma ação
this.store.dispatch({
	type: 'Login Action',
	payload: {
		userProfile: user
	}
})
```

> [!info]- Uso da interface `dispatch` no lugar de uma interface direta (CRUD)
> A utilização desse tipo de interface adiciona flexibilidade ao armazenamento por desvincular sua execução de componentes específicos Assim, quando um componente envia uma ação a store, ele não sabe o que vai acontecer exatamente.
> É um sistema de eventos que desacopla implementação e interface.

> [!tip] Exportar todas as ações
> 
> Uma dica para exportar as ações de um módulo é criar um arquivo `action-types.ts` com o código abaixo.
> 
> ```ts
> import * as AuthActions from './actions.ts'
> export {AuthActions}
> 
> // ... em outro arquivo
> // posso acessr a ação diretamente
> // permitindo que o desenvolvedor tenha conhecimento de todas as ações disponíveis
> AuthActions.login()
> ```

Utilizando **Action Groups** podemos construir um conjunto de ações para uma mesma fonte:

```ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    // defining an event without payload using the `emptyProps` function
    Opened: emptyProps(),

    // defining an event with payload using the `props` function
    'Pagination Changed': props<{ page: number; offset: number }>(),

    // defining an event with payload using the props factory
    'Query Changed': (query: string) => ({ query }),
  },
});
```

## Reducer

Reducer é um a função passada para a store que define o comportamento que deve ser feito quando uma ação acontece  transformando um estado anterior ao próximo estado.

Reducer são [[Função pura|funções puras]] resolvidas de forma síncrona.

```ts
// Exemplo de reducer para controle de estado de um usuário autenticado
const authReducer = createReducer(
	initialState,
	on(AuthActions.login), (state, action) => {
		return {
			user: action.user
		}
	})
)
```

Os reducers devem ser registrado na aplicação:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore, provideState } from '@ngrx/store';

import { AppComponent } from './app.component';
import { scoreboardReducer } from './reducers/scoreboard.reducer';

bootstrapApplication(AppComponent, {
  providers: [
	// RECOMENDAÇÂO: deixar vazio
    provideStore(),
    // RECOMENDAÇÃO: os reducers vem aqui
    provideState({ name: 'game', reducer: scoreboardReducer }),
  ],
});
```

## Selectors

Selectors é uma maneira de fazer consultas ao estado da store obtendo partes do estado que foi armazenado.

O NgRx automaticamente já implementação o conceito de [[Função memoizada]] nos selectors.

```ts
import {createSelector} from '@ngrx/store'

export const isLoggedIn = createSelector(
	state => state["auth"],
	(auth) => !!auth.user
)

// OU
// definindo o tipo do estado a fim de configurar tipagem
export const selectAuthState = createFeatureSelector<AuthState>("auth")

export const isLoggedIn = createSelector(
	selectAuthState, // utiliza o featureSelector
	(auth) => !!auth.user
)

export const isLoggedOut = createSelector(
	isLoggedIn, // utiliza outro selector como base
	(auth) => !isLoggedIn
)
```

Também é possível utilizar um selector para retornar um signal em vez de um observable (de acordo com a prática de utilizar[[Sinais]]).

```ts
// type: Signal<User[]>
readonly users = this.store.selectSignal(selectUsers);
```

## Effects

[Documentação](https://ngrx.io/guide/effects)
[Documentação - Ciclo de vida de um Effect](https://ngrx.io/guide/effects/lifecycle)

Effects são utilizados para fazer operações auxiliares a store, como por exemplo, salvar o usuário autenticado no servidor.

Eles servem principalmente para separar a lógica dos componentes de interações onde o componente não precisa ter conhecimento explícito.

```ts
@Injectable()
export class AuthEffects {
	login$ = createEffect(() => {
		this.actions$
			.pipe(
				ofType(AuthActions.login), 
				tap(action => ...)   // side effect
			)
	}, {dispatch: false}); // esse efeito não expede nenhum outro evento

	constructor(private actions$: Actions) {}
}
```

> [!tip] Eventos de outras fontes
> Também é possível utilizar os efeitos do [[NgRx]] para verificar efeitos de outras fontes da aplicação. Por exemplo, podemos declarar um efeito para registrar cada click do mouse uma atividade do usuário.