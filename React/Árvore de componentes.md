# Árvore de componentes

> [!info]- Componentes na mesma posição preservam o estado
> Se é desejado manter o estado entre as re-renderizações, a estrutura da árvore de componentes deve bater com a previamente renderizada.

Componentes no [[React]] podem ter vários tipos de lógica definidos:

- **Código de renderização:** topo do componente, onde as propriedades e estados são transformados e então um JSX é retornado de acordo com o que quer ser exibido na tela
- **Manipulação de eventos**: são funções dentro do componente que fazem algo de acordo com um evento emitido.
- **Efeitos:** permite declarar efeitos colaterais causados pela renderização do componente, em vez de um evento específico.