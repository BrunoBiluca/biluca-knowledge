# Hooks

[Hooks](https://react.dev/reference/react/hooks) permite utilizar diferentes funcionalidades nos componentes. Eles são divididos em alguns tipos:

- **Hooks de estado** adicionam estado (memória) a um componente
- **Hooks de contexto** adicionam contexto provenientes de parentes distantes sem a necessidade de passar propriedades
- **Hooks de referência** permitem ao componente segurar informações que não são utilizadas para renderização, como um nó do DOM ou um ID de timeout.
- **Hooks de efeito** permitem a componentes se conectarem e sincronizarem com sistemas externos. Isso inclui por exemplo, lidar com a rede, pesquisar no DOM, utilizar Widgets escritos em uma biblioteca diferente.
- **Hooks de performance** são utilizados para otimizar o processo de re-renderização, por exemplo, é possível indicar ao [[React]] para reutilizar algum cálculo armazenado em cache fazendo pulando a renderização de componentes que utilizem desse cálculo.
- **Outros hooks** apresentam funcionalidades diversas.

A combinação desses Hooks permite ao React resolver problemas muito comuns no desenvolvimento para Web. Cada Hook deve ser empregado de acordo com sua característica, assim evitando problemas de efeitos colaterais ou problemas de performance.

Também é possível [criar seus próprios Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component).

### [useState](https://react.dev/reference/react/useState)

É utilizado para criar uma **variável de estado**.

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

A função `set` retornada serve para atualizar o estado da variável na próxima renderização. Quando essa função é chamada ela faz uma requisição de renderização.

[[React]] condensa várias atualizações de estados para evitar várias re-renderizações de componentes. Assim, se vários `set` forem executados na mesma renderização apenas o último valor será considerado.

> [!info]- Objetos e arrays em estado são considerados imutáveis.
> ```js
> // 🚩 Don't mutate an object in state like this:
> form.firstName = 'Taylor';
> 
> // ✅ Replace state with a new object
> setForm({  ...form,  firstName: 'Taylor'});
> ```

Resetar o estado de um componente é possível alterando o atributo `key`. Sempre que uma chave nova é adicionada a um componente seu estado é completamente resetado.

### [useEffect](https://react.dev/reference/react/useEffect)

É utilizado para sincronizar um componente com um sistema externo.

```js
useEffect(setup, dependencies?)
```

Efeitos permitem ao usuário declarar efeitos colaterais causados pela renderização do componente, em vez de um evento específico.

As dependências servem para controlar a renderização do componente, dessa forma um componente é re-renderizado quando uma de suas dependências é alterada. Por exemplo, conectar de uma sala de bate-papo só deve ser feito quando o componente aparece, ou quando a sala é alterada.

```js
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

> [!warning] Utilizar objetos ou funções como dependências pode ocasionar na execução da função de useEffect mais vezes que o necessário, esses casos remover todos os objetos e funções desnecessárias.

Algumas operações feitas no `useEffect` devem ser destruídas, como é o caso de uma conexão com uma sala de bate papo:

```js
// Criação da conexão com uma sala de bate papo
useEffect(() => {
	const connection = createConnection();
	connection.connect();
	return () => { // função de limpeza: executa antes do useEffect ser executado novamente
	  connection.disconnect();
	};
}, []);
```

> [!info] Durante o desenvolvimento o React ativa o modo Strict, esse modo executa os efeitos duas vezes para prevenir que problemas de vazamento de memória, como esse caso da conexão, sejam evitados.

Utilizar a função de limpeza pode ser importante em várias situações como:

- Utilizar um componente que não é escrito em React
- Limpar animações e efeitos
- Inscrever em eventos
- Buscar dados

#### Busca de dados

É bem comum termos componentes que renderizam dados que são obtidos de fontes externas da aplicação. Esses componentes podem ser alterados para exibir dados de acordo com o seu contexto, porém isso pode levar a um **bug de condição de corrida** entre os estados do componente.

Um exemplo disso é exibir o perfil de uma pessoa qualquer onde o usuário pode alterar entre as pessoas que ele está vendo o perfil. Nesses casos se ele alterar rapidamente entre o perfil, pode gerar uma dessincronização entre a pessoa que ele escolher e o perfil carregado.

```js
// definindo a variável ignore, garantirmos que será carregado apenas uma única vez o perfil
useEffect(() => {
	let ignore = false; 
	setBio(null);
	// ** Essa requisição por ser assíncrona pode levar a um problema de condição de corrida **
	fetchBio(person).then(result => {
	  if (!ignore) { // essa condição resolve o problema de 'condição de corrida'
		setBio(result);
	  }
	});
	return () => {
	  ignore = true;
	}
}, [person]); // quando person é alterada, ignore será novamente false
```

### [useCallback](https://react.dev/reference/react/useCallback)

É utilizado para persistir uma função entre re-renderizações. 

```js
const cachedFn = useCallback(fn, dependencies)
```

Para o Javascript, uma função sempre cria um função diferente, isso pode gerar um problema de renderização fazendo que o componente seja renderizado sem necessidade.

Assim o useCallback persiste essa função que será atualiza apenas se suas dependências mudarem.

```js
const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // muda apenas quando productId e referrer mudar
```

`useCallback` é muito comum de ser utilizado junto com `useMemo`, já que o useMemo persiste o resultado de uma função, enquanto o useCallback a própria função, isso possibilita otimizar alguns elementos que exijam mais cálculos, como um formulário por exemplo.

### [useMemo](https://react.dev/reference/react/useMemo)

É utilizado para persistir o resultado de uma função entre re-renderizações.

Pode ser utilizado para

- Pular cálculos complexos
- Pular re-renderização de um componente
- Prevenir um efeito de ser ativado muitas vezes
- Memorizar a dependência de outro Hook
- Memorizar uma função

```js
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // utiliza o memo para garantir que o objeto mude apenas quando roomId mudar
  const options = useMemo(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ Only changes when options changes
```

### [useContext](https://react.dev/reference/react/useContext)

Permite ler e inscrever um contexto para usar em seu componente. Quando um contexto é registrado pelo pode ser acessado por toda a ramificação da árvore de componentes.

```js
// LevelContext.js
import { createContext } from 'react';
export const LevelContext = createContext(0); // inicializa o contexto

// Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext); // utiliza o contexto anterior
  return (
    <section className="section">
	  {/* define um novo valor de contexto a ser utilizado */}
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}

// Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  switch (useContext(LevelContext)) { // utiliza o contexto definido
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      ...
  }
}
```

Considerações sobre o uso de contexto:

- Comece passando propriedades
- Extraia componente e passe JSX como filhos para eles
- Dados comuns a toda a aplicação são uma boa ideia de uso de contextos, como a conta do usuário, roteamento, gerenciamento de estados, temas visuais.

> [!info] Contexto não é limitado a dados estáticos.
> Quando um valor diferente é passado para o contexto ele ativa a renderização para todos os elementos que leem desse contexto.

### [useReducer](https://react.dev/reference/react/useReducer)

Adiciona um redutor (reducer) ao componente. Ele é muito parecido com o `useState`, porém permite ao declarador ter maior controle sobre o comportamento que muda o valor da variável.

```js
// declara a função que irá atualizar o estado da variável
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function Form() {
  const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });
  
  function handleButtonClick() {
    dispatch({ type: 'incremented_age' }); // evento de alteração de estado
  }

  function handleInputChange(e) {
    // evento de alteração de estado
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }
  // ...
```

Para algumas operações, como o gerenciamento de listas, o `useReducer` pode ser uma boa opção para simplificar o código ([Extraindo lógica de estado em um Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)). 

> [!warning] `useReducer` pode gerar muito mais código que `useState`
> Tomar cuidado com esse Hook já que ele pode inserir bugs já que o código não é ligado em tempo de compilação e sim por referências em texto.

### [useRef](https://react.dev/reference/react/useRef)

Permite referenciar um valor que não é necessário para renderização. Alterar uma referência não ativa uma re-renderização. Isso significa que as referências são uma ótima forma de armazenar informações que não afetam a parte visual do componente.

> [!warning] Não é permitido ler nem escrever valores em uma referência durante a renderização

Um caso de uso muito comum ao utilizar o `useRef` é manipular elementos do [[DOM]].

```js
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null); // inicializa a referência com null
  // ...
  function handleClick() {
    inputRef.current.focus(); // altera o estado da referência
  }
  // ...
  return <input ref={inputRef} />; // quando o componente é renderizado a referência se torna o componente
```

### [useDeferredValue](https://react.dev/reference/react/useDeferredValue)

Permite prorrogar a atualização de parte da UI.

Pode ser utilizado para:

- Exibir conteúdo enquanto o conteúdo principal está sendo carregado
- Indicar que o conteúdo não é mais válido

```js
import { useState, useDeferredValue } from 'react';
import SlowList from './SlowList.js';

export default function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      {/* A entrada de texto não trava, já que não depende de esperar a SlowList ser renderizada */}
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* Essa lista demora muito a carregar, então sua renderização é postergada */}
      <SlowList text={deferredText} />
    </>
  );
}
```