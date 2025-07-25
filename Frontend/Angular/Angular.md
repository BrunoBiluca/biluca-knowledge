# Angular

[Página do Framework](https://angular.dev/)

Angular é um **framework front-end** desenvolvido pelo Google para construção de **aplicações web SPA (Single Page Applications)** e **aplicativos híbridos/progressivos (PWA)**. 

Ele utiliza [[TypeScript]] como linguagem padrão e segue uma arquitetura baseada em **componentes**, [[Injeção de dependências]] e **two-way data binding**.

Ele já inclui soluções integradas para:

- **Diretivas** – Estendem HTML com comportamentos dinâmicos (ex.: `*ngIf`, `*ngFor`).
	- Várias diretivas foram atualizadas a partir da versão 17 para deixarem o código mais fluído
	- **Deferrable Views** – Carregamento lazy de seções da view (`@defer`).
- **Pipes** – Transformação de dados diretamente nos templates (ex.: `date`, `currency`).
- **Roteamento** (`@angular/router`)
- **Gerenciamento de estado** (RxJS, Signals, NGXS, etc.) 
- **Formulários reativos e template-driven**
- **Requisições HTTP** (`HttpClient`)
- **Testes (Karma, Jasmine, Protractor)**
- **CLI para scaffolding** (`ng generate`)

#### Principais conceitos

- [[Frontend/Angular/Componentes|Componentes]]
- [[Angular CLI]]
- [[Incremental DOM (Angular Ivy)]]
- [[Data bindings]]
- [[Roteamento]]
- [[Serviços]]
- [[Diretivas]]
- [[Pipes]]

## Plugins/Ferramentas recomendados

- Angular DevTools para o navegador
	- Permite verificar os componentes como desenvolvidos
	- Profiler

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) (oficial)
	- Fornece várias funcionalidades para desenvolvimento como: auto complete de código entre template e classe TypeScript, Go to Definition, Verificação de erros e outras.