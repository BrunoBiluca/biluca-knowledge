# Vite

É uma ferramenta que visa criar uma experiência de desenvolvimento mais rápida e simples para projetos web.

Consiste em duas principais partes:

- Um servidor de desenvolvimento que providencia várias funcionalidades, como HOT Module Replacement
- Um comando de construção da aplicação que otimiza os artefatos estáticos para produção.

Vite pode ser utilizado com vários frameworks de Frontend como [[React]], Vue, Svelte...

> [!info] Principais referências
> - [Documentação](https://vite.dev/guide/)
>- 

> [!quote]- Outras referências
> - [Utilizando o Vite para criar uma aplicação React com TypeScript](https://www.alura.com.br/artigos/vite-criar-aplicacao-react-typescript) apresenta um tutorial de utilização do Vite com React e explica cada um dos principais componentes e vantagens desse formato de desenvolvimento

Desenvolver utilizando o Vite permite utilizar uma gama de funcionalidades típicas de [[bundler-based setups]] sem ser muito diferente do desenvolvimento utilizando arquivos estáticos.

Vite é uma ferramenta que busca incentivar a criação de código moderno por meio da sua filosofia que é centrada no seu núcleo que é agnóstico de framework e bem enxuto. O Vite foi criado para resolver os **principais casos de uso do desenvolvimento Web** (não todos os problemas), com isso em mente seu **sistema de plugins** que permite aos desenvolvedores customizarem sua experiência com Vite de acordo com suas necessidades.

### Funcionalidades

- **Resolução de dependências do [[npm]] e pre-bundling**
- **Troca de módulos quentes:** providencia troca de componentes pelas versões mais atualizadas sem recarregar a página ou jogar fora o estado da aplicação
- [[Typescript]]
	- Usa [[esbuild]] para fazer a transpilação em JavaScript.
- **Multi-page application** por meio de páginas HTML
- Suporte ao **JSX e TSX**
- Suporte ao **CSS**
	- Configurado utilizando [[PostCSS]]
	- Permite a importação de módulos `@import`
	- [CSS Modules](https://github.com/css-modules/css-modules)
	- Recomendado utilizar variáveis nativas do CSS  com plugins PostCSS que implementem o [[CSSWG]]
- [Carregamento de artefatos estáticos](https://vite.dev/guide/assets) de forma inteligente
- **Importação dinâmica**
- **WebAssembly**
- [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
- [[Content Security Policy (CSP)]]
	- [Referência para CSP](https://content-security-policy.com/)
- Otimizações de Build

### Limitações

- Vite depende fortemente dos [[Módulos ESM]] (ECMAScript modules), assim pode haver um problema de compatibilidade com navegadores mais antigos. Nesses casos pode ser necessário configurar o Babel para forçar a compatibilidade.

- A utilização de bibliotecas externas dependem de oferecer suporte total ao ESM, já que o Vite utiliza o carregamento dinâmico propiciado pelas capacidades dos ESM. Nesse caso pode ser necessário um controle mais fino para gerenciar bibliotecas externas apenas instaladas pelo [[npm]].