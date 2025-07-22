# Componentes

### Fases da renderização

O [[React]] avaliar as re-renderizações a partir de um conjunto de passos:

- Gatilho para ativar a renderização (ex: `setState`)
- Renderização no DOM Virtual
- Análise do novo DOM Virtual com o antigo para verificar quais componentes precisam ser alterados
- Commit das alterações no DOM Real

### Fases do ciclo de vida

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

## Componentes de Ordem Superior (HOCs)

Os **Higher-Order Components (HOCs)** são funções que recebem um componente e retornam um **novo componente** com funcionalidades adicionais. Eles seguem o princípio de **composição** (em vez de herança) e são usados para **reutilizar lógica** entre componentes.

Um HOC é um **padrão avançado** do React que permite:

- **Compartilhar lógica** entre componentes (ex: autenticação, logging, manipulação de dados).
- **Adicionar props** ou modificar comportamentos sem alterar o componente original.
- **Encapsular comportamentos comuns** (ex: carregamento de dados, tratamento de erros).

> [!important] HOCs são uma prática de desenvolvimento mais antiga, atualmente é **mais comum utilizar hooks** para as mesmas funcionalidades.

Geralmente um HOC tem a seguinte estrutura: 

```js
const withEnhancement = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    // Lógica adicional aqui
    return <WrappedComponent {...props} extraProp="valor" />;
  };
};

// Uso:
const MeuComponenteMelhorado = withEnhancement(MeuComponente);
```

Um exemplo comum de utilização de um HOC é em autenticação:

```js
const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      checkAuth().then(setIsAuthenticated);
    }, []);

    if (!isAuthenticated) return <div>Faça login primeiro!</div>;
    return <WrappedComponent {...props} />;
  };
};

// Uso:
const Dashboard = () => <div>Painel Admin</div>;
const ProtectedDashboard = withAuth(Dashboard);
```

#### Convenções e Boas Práticas

1. **Prefira composição a herança:**
    - HOCs são uma alternativa ao uso de `extends` em React.
        
2. **Não modifique o componente original:**
    - Sempre retorne um novo componente em vez de alterar o `WrappedComponent`.
        
3. **Passe props não utilizadas adiante:**
    - Use o spread operator (`{...props}`) para garantir que todas as props sejam repassadas.
        
4. **Nomeie HOCs com `with`:**
    - Por convenção, HOCs começam com `with` (ex: `withRouter`, `withStyles`).

#### HOCs vs. Hooks

Com a introdução dos **Hooks**, muitas funcionalidades de HOCs podem ser **substituídas** por:

- `useState`, `useEffect` (para lógica de estado e side effects).
- `useContext` (para compartilhar dados globais).
- Custom Hooks (ex: `useAuth`, `useFetch`).
