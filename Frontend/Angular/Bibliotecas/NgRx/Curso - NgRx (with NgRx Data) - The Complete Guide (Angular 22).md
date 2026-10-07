# Curso - NgRx (with NgRx Data) - The Complete Guide (Angular 22)

> [!info] Informações gerais
> Instrutor
> [Angular University](https://www.udemy.com/user/vascocavalheiro/)
> 
> Aulas: 6,5 horas
> [Link para o curso](https://www.udemy.com/course/ngrx-course/learn/lecture/16194654)
> 
> Repositório do curso:
> Usar a branch 2-entity-finished
> https://github.com/angular-university/ngrx-course

This course is a **complete guide to the new [[NgRx]] Ecosystem**, including NgRx Data, Store, Effects, Router Store, NgRx Entity, and DevTools, and comes with a running Github repo.

Relacionados:

- [[Angular]]
- [[NgRx]]

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

### Router store

É possível salver as informações do Router no estado da aplicação. Essa é uma forma de executar ações que alterem o estado da aplicação em resposta a navegação do usuário.

```ts
export const appConfig: ApplicationConfig = {
	...
	provideRouterStore(),
	...
}
```

### NgRx runtime checks

O NgRx disponibiliza no modo de desenvolvimento várias outras ferramentas para o desenvolvedor.

As verificações durante a execução do código ajudam a verificar vazamentos da implementação.

### NgRx Entity

#### EntityState

Define o estado de uma entidade dentro do NgRx.

#### Edição de entidades

[course.reducers.ts](https://github.com/angular-university/ngrx-course/blob/2-entity-finished/src/app/courses/reducers/course.reducers.ts)
- Implementa todos os reducers relacionados a cursos

[course.actions.ts](https://github.com/angular-university/ngrx-course/blob/2-entity-finished/src/app/courses/course.actions.ts)
- Define as actions

[course.effect.ts](https://github.com/angular-university/ngrx-course/blob/2-entity-finished/src/app/courses/courses.effects.ts)
- Camada entre a store e o serviço HTTP que irá acessar a interface

Quando um curso é atualizado ele emite uma ação `CourseActions.courseUpdated`. Junto a essa ação, o effect que salva o curso no banco de dados é ativado também.

### Router resolve

[App componente](https://github.com/angular-university/ngrx-course/blob/master/src/app/app.component.ts)
- gerencia o comportamento de navegação

[Courses Resolver](https://github.com/angular-university/ngrx-course/blob/master/src/app/courses/services/courses.resolver.ts)
- busca os dados de cursos antes de finalização a navegação

É uma interface do Angular que é o melhor local para buscar informações de serviços externos.

O Resolve permite que dados sejam injetados para a rota antes mesmo de iniciar o componente, por exemplo, para uma lista de produtos podemos utilizar o Resolve para buscar as informações dos produtos e já acessar essas informações no próprio componente de lista, sem a necessidade de implementar a função de buscar esses produtos no componente.

Utilizando resolve é necessário adicionar o comportamento da navegação no componente global do App.

```ts
this.router.events.subscribe(event => {
	switch (true) {
		case event instanceof NavigationStart: {
			this.loading = true;
			break;
		}

		case event instanceof NavigationEnd:
		case event instanceof NavigationCancel:
		case event instanceof NavigationError: {
			this.loading = false;
			break;
		}
		default: {
			break;
		}
	}
});
```

Nesse exemplo, o loading é gerenciado pela aplicação, quando a navegação começa ele é exibido, quando a navegação termina (resolvers concluídos) o loading é removido.

### NgRx Data

É um pacote específico para gerenciados dados de entidades. Atualmente o pacote foi colocado em modo de manutenção e não tem novas funcionalidades sendo implementadas.

É uma forma mais otimizada para operações CRUD, já que remove muito código repetitivo do processo.

```ts
class CourseEntityService extends EntityCollectionServiceBase
```