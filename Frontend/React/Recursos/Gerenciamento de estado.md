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

Algumas boas práticas no gerenciamento de estado global são:

- **Única fonte de verdade** - todo o estado global da aplicação deve estar armazenado em uma única árvore de estado
- **Estado é sempre apenas leitura** - a única forma de mudar o estado é por meio de emitir uma ação. Isso resolve problema de condição de corrida e permitem que todos os objetos sejam notificados de alterações
- **Mudanças são feitas com funções puras** - todas as funções devem receber um estado, transformar, e então retornar o próximo estado (sempre um novo estado).

### Context

O **Context** foi criado para facilitar o consumo de dados entre componentes de uma aplicação. Ele **não é para ser utilizado** em casos que esses dados precisam de ser atualizados com frequência, já que ele causa re-renderizações desnecessárias na árvore de componentes quando esses dados são atualizados.

O [[Exemplo - Serviços com múltiplas implementações]] demonstra a utilização do context para múltiplas implementações de uma mesma interface.

Uma das **principais limitações** do Context é que ele consegue **armazenar apenas um único valor**, o que dificulta muito a modularização do código. Esse tipo de limitação é bem endereçada pelos bibliotecas externas.

> [!quote]- (Documentação) - [Passando dados com Context](https://react.dev/learn/passing-data-deeply-with-context#use-cases-for-context)
> Documentação trata dos principais casos de uso da utilização do Context e trás também a discussão sobre suas limitações.

> [!quote]- (Artigo) - [Você está utilizando React Context errado](https://blog.codeminer42.com/you-are-using-react-context-wrong/)
> Série de dicas para evitar as principais armadilhas de utilizar Context para gerenciamento de estado.
> Principais dicas:
> - Cuidado com a utilização do Context e valores default, isso causa altas confusões