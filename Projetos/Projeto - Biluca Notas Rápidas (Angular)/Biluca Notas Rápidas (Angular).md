# Biluca Notas Rápidas (Angular)

> [!info] Links
> - [Repositório](https://github.com/BrunoBiluca/biluca-notas-angular)

Projeto desenvolvido para estudo do Framework [[Angular]] utilizando o [[Projeto Base - Notas rápidas]].

#### Práticas e melhorias de processos aprendidas

- **Implementar o layout inicial** sem nenhum tipo de comportamento ajuda muito na hora de consolidar os componentes, dessa forma cada elemento já está no lugar de acordo com o design desejado

- **Isolar serviços de dados em interfaces** de forma que sempre tenha uma implementação em memória, que pode ser utilizada tanto em testes quanto para testar independentes da aplicação.

#### Soluções

- Abertura de modal em nova rota mantendo a página principal
	- 

- Armazenamento de Imagens no Local Storage do navegador (IndexedDB)
	- `/src/common/indexedDB.ts`

- Reuso de testes entre componentes
	- `/src/app/notes/notes-presenter.spec.ts`

- Temas de estilos
	- `src/app/shared/theme-selector`
	- Permite alternar entre os temas escuro/claro/sistema

#### Minhas considerações

Esse foi um ótimo projeto para avaliar e praticar [[Angular]].

É um projeto que permite implementar vários conceitos do desenvolvimento WEB.

Outra vantagem desse tipo de projeto foi utilizar o Keep do google como referência, já que a maioria das funcionalidades foram extraídas dessa aplicação e não foi necessário pensar muito em o que fazer.

Mesmo assim um ponto que não ficou muito bom foi a distribuição das tarefas. O projeto acabou demorando muito mais que o necessário e tiveram várias indas e vindas de tarefas, já que o projeto inicial não foi tão bem pensado, porém acredito que isso faz parte do projeto. 