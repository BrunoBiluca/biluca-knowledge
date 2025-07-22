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

# Componentes de Ordem Superior (HOCs)

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

# Componentes puros

**Componentes puros** são componentes que **só renderizam novamente se suas props ou estado mudarem**, evitando re-renders desnecessários e melhorando a performance. Eles são otimizados para evitar atualizações quando os dados de entrada são os mesmos.

- **Class Component:** Estende `React.PureComponent` (faz comparação superficial de `props` e `state`).
- **Functional Component:** Usa `React.memo()` (memoriza o componente com base nas props).
	- Permite também faz a verificação das props de forma customizada

Eles não são re-renderizados automaticamente se o componente pai for re-renderizado. São uma alternativa muito boa para utilizar em renderização de listas, formulários e outros tipos de componentes que não tem suas propriedades e estado alterados frequentemente.

✅ **Casos ideais:**

1. **Componentes que recebem props imutáveis:**
    - Se as props não mudam frequentemente, evita re-renders.
        
2. **Listas grandes (`map`) ou tabelas:**
    - Evita re-renderização de todos os itens quando apenas um muda.
        
3. **Componentes de UI estáticos ou quase estáticos:**
    - Ex: Cabeçalhos, botões, cards que não atualizam frequentemente.
        
4. **Quando o custo da renderização é alto:**
    - Ex: Componentes com cálculos pesados ou chamadas de API condicionais.
        

❌ **Quando NÃO usar:**

1. **Se as props/estado mudam constantemente:**
    - A comparação superficial pode ter custo maior que o re-render.
        
2. **Se o componente depende de dados mutáveis profundos (objetos/arrays aninhados):**
    - `PureComponent` e `memo` não detectam mudanças internas em objetos/arrays.
        
3. **Se o componente usa `context` ou efeitos externos:**
    - Mudanças no contexto não são comparadas automaticamente.

### Cenários de re-renderização

| Situação                                  | Re-renderiza?           |
| ----------------------------------------- | ----------------------- |
| Pai re-renderiza com props iguais         | ❌ Não                   |
| Pai re-renderiza com props diferentes     | ✅ Sim                   |
| Props são objetos/funções não memorizados | ✅ Sim (nova referência) |
| Uso de Contexto ou estado interno         | ✅ Sim                   |

```jsx
// Apenas o Pai altera o estado
const Pai = () => {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <button onClick={() => setContador(contador + 1)}>Re-renderizar Pai ({contador})</button>
      <FilhoPuro texto="Texto fixo" /> {/* Não re-renderiza! */}
    </div>
  );
};

const FilhoPuro = React.memo(({ texto }) => <p>{texto}</p>)
```


### Problema: Lista Re-renderizando Sem Necessidade

```jsx
// "Re-renderizando Lista"
const Lista = ({ itens }) => {
  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>{item.nome}</li>
      ))}
    </ul>
  );
};
```

Se o componente pai atualizar, `Lista` re-renderiza mesmo se `itens` não mudar.

**Solução: Usar `React.memo`**

```jsx
// "Renderizado apenas se 'itens' mudar"
const Lista = memo(({ itens }) => {
  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>{item.nome}</li>
      ))}
    </ul>
  );
});
```

Agora, `Lista` só re-renderiza se `itens` for diferente.