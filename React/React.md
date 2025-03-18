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

<Descrição da definição>

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://react.dev/learn)

--- end-multi-column

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

# Árvore de componentes

> [!info]- Componentes na mesma posição preservam o estado
> Se é desejado manter o estado entre os re-renderizações, a estrutura da árvore de componentes deve bater com a previamente renderizada.

Componentes no React podem ter vários tipos de lógica definidos:

- **Código de renderização:** topo do componente, onde as propriedades e estados são transformados e então um JSX é retornado de acordo com o que quer ser exibido na tela
- **Manipulação de eventos**: são funções dentro do componente que fazem algo de acordo com um evento emitido.
- **Efeitos:** permite declarar efeitos colaterais causados pela renderização do componente, em vez de um evento específico.


# Hooks

[Hooks](https://react.dev/reference/react/hooks) permite utilizar diferentes funcionalidades nos componentes. Eles são divididos em alguns tipos:

- **Hooks de estado** adicionam estado (memória) a um componente
- **Hooks de contexto** adicionam contexto provenientes de parentes distantes sem a necessidade de passar propriedades
- **Hooks de referência** permitem ao componente segurar informações que não são utilizadas para renderização, como um nó do DOM ou um ID de timeout.
- **Hooks de efeito** permitem a componentes se conectarem e sincronizarem com sistemas externos. Isso incluir por exemplo, lidar com a rede, pesquisar no DOM, utilizar Widgets escritos em uma biblioteca diferente.
- **Hooks de performance** são utilizados para otimizar o processo de re-renderização, por exermplo, é possível indicar ao React para reutilizar algum cálculo armazenado em cache fazendo pulando a renderização de componentes que utilizem desse cálculo.
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

A função `set` retornada apenas atualiza o estado da variável na próxima renderização. Quando essa função é chamada ela faz uma requisição para de renderização.

React condensa várias atualizações de estados para evitar várias re-renderizações de componentes. Assim, se vários `set` forem executados na mesma renderização apenas o último valor será considerado.

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

Efeitos permitem ao usuário declarar efeitos colaterais causados pela renderização do componente, em vez de um evento específico. **O efeito é sempre chamado apenas a renderização.**

As dependências servem para controlar a renderização do componente, dessa forma um componente é re-renderizado quando uma de suas dependências é alterada. Por exemplo, conectar de uma sala de bate-papo sé deve ser feita quando o componente aparece, ou quando a sala é alterada.

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

Algumas operações feitas no useEffect devem ser destruídas, como é o caso de uma conexão com uma sala de bate papo:

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

Para o Javascript, uma função sempre cria um função diferente, isso pode gerar um problema de renderização fazendo que o componente seja renderizado sem necessidade

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