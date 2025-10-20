# Angular

> [!info] Links
> [Página do Framework](https://angular.dev/)

Angular é um **framework front-end** desenvolvido pelo Google para construção de **aplicações web SPA (Single Page Applications)** e **aplicativos híbridos/progressivos (PWA)**. 

Ele utiliza [[TypeScript]] como linguagem padrão e segue uma arquitetura baseada em **componentes**, [[Injeção de dependências]] e **two-way data binding**.

Ele já inclui soluções integradas para:

- [[Frontend/Angular/Componentes|Componentes]]
- [[Serviços]]
	- **Requisições HTTP** (`HttpClient`)
- Gerenciamento de estados
	- [[RxJS]] é um biblioteca completa de gerenciado de estado e eventos
	- [[Sinais]] são estruturas nativas do Angular criadas para gerenciamento de estado.
	- Propriedades tradicionais (Two-way data binding)
	- [[NgRx]]
- [[Incremental DOM (Angular Ivy)]]
- [[Diretivas]] – Estendem HTML com comportamentos dinâmicos (ex.: `*ngIf`, `*ngFor`).
	- Várias diretivas foram atualizadas a partir da versão 17 para deixarem o código mais fluído
	- **Deferrable Views** – Carregamento lazy de seções da view (`@defer`).
- [[Pipes]] – Transformação de dados diretamente nos templates (ex.: `date`, `currency`).
- [[Roteamento]] (`@angular/router`)
- [[Formulários]]
- [[Frontend/Angular/Testes automatizados|Testes automatizados]]
- [[Angular CLI]]
- [[Frontend/Angular/Estilização|Estilização]]
- [[App config]]

O [[🏅 Guia de projetos em Angular]]  oferece várias dicas relacionadas ao código, implementação, estratégias e outros elementos do projeto para um melhor aproveitamento do framework.

### Minhas considerações sobre Angular

💚 Pontos positivos

- Injeção de dependências direto de fábrica
- Curva de aprendizado leve para quem tem costume com desenvolvimento WEB

❌ Pontos negativos

- Difícil de refatorar, mesmo com os plugins

## Bibliotecas relacionadas

- [Angular Material](https://material.angular.dev/)
	- Componentes de Material Design aplicada ao Angular

- [[Angular CDK]]
	- Componentes agnósticos de exibição como Drag and Drop ou Clipboard

## Plugins/Ferramentas recomendados

- Angular DevTools para o navegador
	- Permite verificar os componentes como desenvolvidos
	- Profiler

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) (oficial)
	- Fornece várias funcionalidades para desenvolvimento como: auto complete de código entre template e classe TypeScript, Go to Definition, Verificação de erros e outras.

## Exemplos de implementação

- [[Exemplo - Login e registro de usuários]]
- [[Exemplo - Destaque de elementos]]
- [[Exemplo - Ajustar à cor de fundo]]