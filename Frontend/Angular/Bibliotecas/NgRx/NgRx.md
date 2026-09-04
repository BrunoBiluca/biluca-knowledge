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


## DevTools

[Instalação](https://ngrx.io/guide/store-devtools/install)

O NgRx apresenta um conjunto de ferramentas para ajudar no desenvolvimento que permitem verificar o estado da store durante a execução da aplicação.

Algumas funcionalidades:

- Registro de ações
- Estado da store após a execução de cada reducer
- Diferença de estado entre ações

![[Exemplo das ferramentas de desenvolvimento do NgRx.png|Exemplo das ferramentas de desenvolvimento do NgRx]]