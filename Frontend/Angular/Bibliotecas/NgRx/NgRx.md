# NgRx

> [!info] Relacionado
> - [Documentação](https://ngrx.io/docs)
> - [[Arquitetura do NgRx]]

É um framework para criação de aplicações reativas com [[Angular]].

NgRx vem com duas soluções para contextos diferentes de aplicações:

- Gerenciamento global e recorrente de dados, recomenda-se [@ngrx/store](https://ngrx.io/guide/store)

- Gerenciamento em nível de componente e poucas propriedades, recomenda-se [@ngrx/signals](https://ngrx.io/guide/signals)


## NgRx/store

Principalmente utilizado para gerenciamento de estado global da aplicação.


## NgRx/signals

Recomendado a utilização em nível de componentes com poucas propriedades

### rxMethods

> [!warning] Conceito de rxMethods
> Métodos adicionados a store não devem podem ser utilizados para retornar um valor específicos, eles são utilizados para alterar o estado do store apenas.


## NgRx/router

O NgRx/router integra o ecossistema do [[NgRx]] ao roteamento nativo do [[Angular]]. 

Essa integração nos permite:

- **Concentrar a lógica na Store** - permite remover a lógica dos componente para movê-la ao Store
- **Reagir a mudança de Rotas com Effects** - mudanças de rotas geralmente ativam consultas a dados, essa lógica fica no Store
- **Facilitar o Debug com Time-Travel** - como todos os estados de um Store são imutáveis podemos verificar a sequência de estados de uma aplicação mais facilmente.

### Exemplo - Concentrar a lógica no Store

**Exemplo:** Imagine que você tem uma lista de produtos na Store (`productsFeature.selectEntities`) e quer exibir os detalhes do produto cujo ID está na URL (`/products/:id`).

```ts
// No componente
constructor(private route: ActivatedRoute, private store: Store) {}

ngOnInit() {
  this.route.params.pipe(
    switchMap(params => this.store.select(selectProductById(params['id'])))
  ).subscribe(product => this.product = product);
}
```

Esse é um tipo de implementação muito comum em [[Angular]] e que fica espalhada ao longo do código. Isso gera duplicação de código, já que podemos ter por exemplo, um formulário de edição do produto que também terá essa mesma função.

O NgRx/router nos ajuda a manter a consistência, isso porque a função de buscar o produto atual será implementada em um único local, que atualizará o estado com o produto específico, permitindo assim que todos os componentes tenham acesso ao mesmo estado.

```ts
// Em um arquivo de selectors
import { getRouterSelectors } from '@ngrx/router-store';

export const { selectRouteParams } = getRouterSelectors();

export const selectProductFromRoute = createSelector(
  productsFeature.selectEntities,
  selectRouteParams,
  (entities, params) => entities[params['id']] ?? null
);
```

O reducer acima reage a mudança de página, então sempre que um produto específico for requisitado o Store se encarrega de carregar o produto. Os componentes apenas precisarão consultar o produto atual.

## DevTools

[Instalação](https://ngrx.io/guide/store-devtools/install)

O NgRx apresenta um conjunto de ferramentas para ajudar no desenvolvimento que permitem verificar o estado da store durante a execução da aplicação.

Algumas funcionalidades:

- Registro de ações
- Estado da store após a execução de cada reducer
- Diferença de estado entre ações

![[Exemplo das ferramentas de desenvolvimento do NgRx.png|Exemplo das ferramentas de desenvolvimento do NgRx]]

## Configurações

Durante a configuração da Store temos disponíveis vários parâmetros para alterar seu comportamento:

- `metaReducers` - são reducers executados antes de qualquer outro reducer. Funciona como um invólucro para um reducer e pode ajudar durante o desenvolvimento, como por exemplo, criar um meta reducer para logar a entrada e saída dos reducers.

- `runtimeChecks` - (modo de desenvolvimento) permite verificar em tempo de execução a consistência da Store. Por exemplo, garante que todos os reducer sempre retornem novos estados
	- Tipos de verificações:
		- `strictStateImmutability`
		- `strictActionImmutability`
		- `strictActionSerializability`
		- `strictStateSerializability`
	- É recomendado deixar todos os tipos de verificações habilitadas.