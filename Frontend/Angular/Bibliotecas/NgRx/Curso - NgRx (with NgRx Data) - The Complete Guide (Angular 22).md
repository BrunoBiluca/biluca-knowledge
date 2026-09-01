# Curso - NgRx (with NgRx Data) - The Complete Guide (Angular 22)

> [!info] Informações gerais
> Instrutor
> [Angular University](https://www.udemy.com/user/vascocavalheiro/)
> 
> Aulas: 6,5 horas
> [Link para o curso](https://www.udemy.com/course/ngrx-course/learn/lecture/16194654)

This course is a **complete guide to the new [[NgRx]] Ecosystem**, including NgRx Data, Store, Effects, Router Store, NgRx Entity, and DevTools, and comes with a running Github repo.

Relacionados:

- [[Angular]]
- [[NgRx]]
- 

## OBJETIVOS DE APRENDIZAGEM

At the end of this course, you will feel comfortable with the notions of state management and the centralized store solution in general

You will **feel comfortable designing new Applications using NgRx**, using a simple methodology and you will know in-depth the complete Ngrx library ecosystem: including the Ngrx Store, Effects, Entity, and NgRx Data libraries

You will know how to quickly scaffold parts of the solution using Ngrx Schematics, and how to set up the Ngrx DevTools from scratch, including the router integration.

Com esse curso feito terei um domínio melhor para a criação do sistema de gerenciamento de estado do [[Projeto - Biblioteca de Jogos]].

## Conteúdos abordados

This course covers the following topics:

- Introduction to State Management
    
- The Store Architecture In Detail
    
- NgRx Key Concepts
    
- Actions and Action Creators
    
- Reducers
    
- NgRx Effects
    
- Selectors
    
- Adding Authentication to an NgRx Application
    
- NgRx Entity and the Entity Format
    
- NgRx DevTools
    
- NgRx Time Travelling Debugger
    
- NgRx Runtime checks and Store Immutability
    
- NgRx Router Store
    
- NgRx Data and Entity State Management
    
- NgRx Best Practices

## Anotações

O gerenciamento de estado de uma aplicação tem como premissa que a visualização corresponda aos estados dos dados, não o contrário. Assim, não é de interesse do controle de estado que quando uma ação em um componente específico seja executada outro componente seja atualizado

Por exemplo, uma caixa de diálogo que altere as informações de uma entidade, assim que essa caixa de diálogo é fechada, a lista deve ser atualizada. Esse não é o comportamento que estamos buscando. Queremos que a lista se comporte de acordo com o novo estado provocado pela caixa de diálogo, sem uma saber da outra.

### Pacotes recomendados

Alguns pacotes recomendados pelo professor

- [store-devtools](https://ngrx.io/guide/store-devtools)
	- Conjunto completo de ferramentas para controlar o estado sobre o NgRx
	- Existe uma extensão para Chrome

### Arquitetura do NgRx

O instrutor define um `@NgModule` e dentro dele define a funcionalidade `StoreModule.forFeature()`. Dessa forma, o store está atrelado apenas ao módulo declarado.

#### Action

**Action** é qualquer operação informa a uma store que alguma coisa aconteceu.

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
> Uma dica para exportar as ações de um módulo é criar um arquivo `action-types.ts`.
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

