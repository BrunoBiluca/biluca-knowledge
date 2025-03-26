---
categoria: framework
---
# React

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

React é uma biblioteca para desenvolvimento de interfaces web e nativas.

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://react.dev/learn)

--- end-multi-column

Principais elementos do React:

- [[Hooks]]

# Árvore de componentes

> [!info]- Componentes na mesma posição preservam o estado
> Se é desejado manter o estado entre os re-renderizações, a estrutura da árvore de componentes deve bater com a previamente renderizada.

Componentes no React podem ter vários tipos de lógica definidos:

- **Código de renderização:** topo do componente, onde as propriedades e estados são transformados e então um JSX é retornado de acordo com o que quer ser exibido na tela
- **Manipulação de eventos**: são funções dentro do componente que fazem algo de acordo com um evento emitido.
- **Efeitos:** permite declarar efeitos colaterais causados pela renderização do componente, em vez de um evento específico.


# Gerenciamento de estado

Gerenciamento de estado no [[React]] é quando precisamos manter estado da aplicação e não apenas de cada componente.

Esses tipos de dados incluem:

- Dados do tema (como modo escuro ou claro)
- Dados do usuário
- Dados específicos do local (idioma, localização)

Existem várias formas de manter esse estado entre os componentes, entre elas as mais usuais são:

- **Context** - nativo do próprio React
- [[Recoil]]
- [[Zustand]]

### Context

O **Context** foi criado para facilitar o consumo de dados entre componentes de uma aplicação. Ele **não é para ser utilizado** em casos que esses dados precisam de ser atualizados com frequência, já que ele causa re-renderizações desnecessárias na árvore de componentes quando esses dados são atualizados.

> [!quote]- (Documentação) - [Passando dados com Context](https://react.dev/learn/passing-data-deeply-with-context#use-cases-for-context)
> Documentação trata dos principais casos de uso da utilização do Context e trás também a discussão sobre suas limitações.

> [!quote]- (Artigo) - [Você está utilizando React Context errado](https://blog.codeminer42.com/you-are-using-react-context-wrong/)
> Série de dicas para evitar as principais armadilhas de utilizar Context para gerenciamento de estado.
> Principais dicas:
> - Cuidado com a utilização do Context e valores default, isso causa altas confusões
> - 

# CLI Options

O [[React]] possui algumas formas de fazer o controle a partir de linha de comando:

- [[Vite]]
- Create React App

### Criando um aplicação com [[Vite]]

Estrutura de pasta de uma aplicação React com Vite.

```
minha-aplicacao-react/
|-- node_modules/
|-- public/
|   |-- vite.svg
|-- src/
|   |-- assets/
|   |-- App.css
|   |-- App.tsx
|   |-- index.css
|   |-- main.tsx
|   |-- vite-env.d.ts
|-- .eslinrc.cjs
|-- .gitignore
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
```

Vamos entender o que significa cada uma dessas pastas e arquivos:

1. **node_modules/:** essa pasta contém todas as dependências do projeto que são instaladas pelo “npm” ou “Yarn”. Você geralmente não precisa se preocupar com o conteúdo aqui, pois o gerenciador de pacotes cuida disso;
2. **public/:** a pasta `public` é usada para armazenar arquivos estáticos que serão acessíveis publicamente, como imagens, fontes e outros recursos. Por exemplo, o arquivo `vite.svg` aqui pode ser acessado diretamente através do navegador;
3. **src/:** essa é a pasta principal do código-fonte da sua aplicação. Aqui estão os arquivos que você irá criar e editar enquanto desenvolve a aplicação:
    - **assets/:** essa pasta é usada para armazenar arquivos de recursos estáticos, como imagens, fontes, listas, etc., que serão importados no código;
    - **App.css:** esse é um arquivo de estilo CSS que contém estilos específicos para o componente `App`;
    - **App.tsx:** o arquivo `App.tsx` é o componente principal da sua aplicação React. É onde você define a estrutura e o comportamento geral da sua aplicação;
    - **index.css**: esse é o arquivo de estilos globais da sua aplicação;
    - **main.tsx:** esse é o ponto de entrada da sua aplicação React. Ele renderiza o componente **`App`** na página HTML;
    - **vite-env.d.ts:** esse arquivo é usado para declarações de tipos globais que podem ser necessárias no seu projeto.
4. **.eslintrc.cjs:** esse é o arquivo de configuração do **ESLint**, que é uma ferramenta para ajudar a manter um código JavaScript/TypeScript limpo e consistente. Ele define as regras e configurações para a análise estática do código;
5. **.gitignore**: esse arquivo lista os arquivos e pastas que você deseja que o Git ignore ao controlar as mudanças do projeto. Isso geralmente inclui arquivos gerados automaticamente, como `node_modules`, bem como arquivos de compilação e cache;
6. **index.html**: é o arquivo HTML principal da sua aplicação. É aqui que o ponto de entrada do React é incorporado e onde você pode incluir metadados, links para estilos e outros recursos;
7. **package-lock.json**: esse arquivo é gerado automaticamente pelo “npm” e registra as versões exatas de todas as dependências do seu projeto. Ele é usado para garantir que as mesmas versões das dependências sejam instaladas em diferentes máquinas;
8. **package.json**: esse arquivo contém informações sobre o projeto, como nome, versão, dependências e scripts personalizados. Você pode usá-lo para gerenciar dependências e definir scripts para tarefas comuns de desenvolvimento;
9. **README.md:** é um arquivo de documentação para o seu projeto. É onde você pode fornecer informações sobre como instalar, configurar e usar a aplicação;
10. **tsconfig.json e tsconfig.node.json:** são os arquivos de configuração do TypeScript que definem as opções de compilação para o seu código. O `tsconfig.json` é usado para o código da aplicação, enquanto o `tsconfig.node.json` pode ser usado para configurar o TypeScript em ambientes Node.js;
11. **vite.config.ts:** esse arquivo é usado para configurar o Vite. Ele pode conter configurações relacionadas a plugins, roteamento, aliases de importação, entre outras coisas.

# Testes em React

Para criar testes em React é possível utilizando duas extensões:

- [[Jest]]
- [[React Testing Library]]

Para integrar esses testes ao VSCode é necessário instalar a extensão [Jest](https://github.com/jest-community/vscode-jest). Esta é uma extensão completa para execução de testes em Javascript com [[Jest]] e permite exibir os testes no Testing (antigo TestExplorer), executar os testes e fazer Depuração sobre os testes.

Qualquer configuração específica de um projeto é necessário adicionar configurações por meio do `jest.config.js` ou pelo próprio VScode `.vscode/settings.json`.

