# Componentes

[[React]] é uma biblioteca que permite a construção de uma grande variedade de tipos de componentes.

Componentes no [[React]] podem ter vários tipos de lógica definidos:

- **Código de renderização:** topo do componente, onde as propriedades e estados são transformados e então um JSX é retornado de acordo com o que quer ser exibido na tela
- **Manipulação de eventos**: são funções dentro do componente que fazem algo de acordo com um evento emitido.
- **Efeitos:** permite declarar efeitos colaterais causados pela renderização do componente, em vez de um evento específico.

Outros tipos de componentes:

- [[Componentes de Ordem Superior (HOCs)]]
- [[Componentes puros]]

## Fases da renderização

O [[React]] avaliar as re-renderizações a partir de um conjunto de passos:

- Gatilho para ativar a renderização (ex: `setState`)
- Renderização no DOM Virtual
- Análise do novo DOM Virtual com o antigo para verificar quais componentes precisam ser alterados
- Commit das alterações no DOM Real

## Fases do ciclo de vida

1. **Montagem (Mounting)** → Quando o componente é criado e inserido no DOM.
2. **Atualização (Updating)** → Quando o componente é re-renderizado devido a mudanças em `props` ou `state`.
3. **Desmontagem (Unmounting)** → Quando o componente é removido do DOM.

Além disso, existe uma fase de [[Tratamento de Erros]] para capturar erros durante a renderização.

| Ciclo de Vida (Class)      | Hook Equivalente (Functional)                                           |
| -------------------------- | ----------------------------------------------------------------------- |
| `constructor`              | `useState` (inicialização do estado)                                    |
| `componentDidMount`        | `useEffect(() => {}, [])` (array de dependências vazio)                 |
| `componentDidUpdate`       | `useEffect(() => {}, [deps])` (array com dependências)                  |
| `componentWillUnmount`     | `useEffect(() => { return () => { ... } }, [])` (função de cleanup)     |
| `shouldComponentUpdate`    | `React.memo()` (para memoização) ou `useMemo`/`useCallback` ([[Hooks]]) |
| `getDerivedStateFromProps` | Lógica dentro do componente ou `useMemo`                                |
| `componentDidCatch`        | Ainda não tem Hook equivalente (usa-se Error Boundaries em classes)     |

```js
// Class Component
class Example extends React.Component {
  componentDidMount() {
    console.log("Componente montado!");
  }
  componentWillUnmount() {
    console.log("Componente desmontado!");
  }
  render() {
    return <h1>Exemplo</h1>;
  }
}

// Functional Component com Hooks
function Example() {
  useEffect(() => {
    console.log("Componente montado!");
    return () => {
      console.log("Componente desmontado!");
    };
  }, []); // [] = executa apenas no mount/unmount

  return <h1>Exemplo</h1>;
}
```

## Árvore de componentes

Componentes na mesma posição preservam o estado, ou seja, se é desejado manter o estado entre as re-renderizações, a estrutura da árvore de componentes deve bater com a previamente renderizada.