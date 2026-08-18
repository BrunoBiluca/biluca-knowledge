# Gerenciamento de estado

> [!quote]- (Artigo) - [Escolhendo uma estrutura de estado](https://react.dev/learn/choosing-the-state-structure)
> Documentação oficial explicando a filosofia de desenvolvimento do [[React]].

Quando um componente mantém algum estado, é necessário decidir a **quantidade e o formato dos dados** que será mantido.

Para como funciona [[Gerenciamento de estado entre componentes]].

Bibliotecas recomendadas:

- [[Zustand]] para qualquer projeto
- [[Redux]]
	- Não acho que o Redux é uma biblioteca tão mais robusta que compense em relação ao Zustand

Para gerenciamento de estado assíncrono:

- [[TanStack Query]]

## Princípios do React

Essa seção explica alguns princípios de gerenciamento de estado para uma aplicação em [[React]].

Aqui estamos interessados no estado da aplicação, por exemplo:

- Controlar qual post está selecionado (`selectedPostId`).
- Controlar se a sidebar está aberta.
- Guardar o filtro de busca digitado pelo usuário.
- Controlar a paginação (página atual).
- Estado de formulários complexos.
- Tema escuro/claro

### Agrupe estados relacionados

#### Exemplo

Se você utiliza algum assim:

```js
const [x, setX] = useState(0);  
const [y, setY] = useState(0);
```

utilize isso:

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

### Evite contradições no estado

#### Exemplo

Componentes com controle de estado dividido em múltiplas variáveis pode apresentar uma complexidade muito grande.

```jsx
export default function FeedbackForm() {
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	
	...
	
	async function handleSubmit(e) {
		e.preventDefault();
		setIsSending(true);
		await sendMessage(text);
		setIsSending(false);         // BUG caso essa linha seja removida
		setIsSent(true);
	}
	
	// BUG caso a ordem dessas condicionais sejam alteradas
	if (isSent) {
		return ...
	}
	
	if (isSending) {
		return ...
	}
	
	return ...
}
```

Nesse caso precisamos condensar toda a funcionalidade em um único ponto, para isso podemos criar uma variável chamada `status` que é responsável por organizar o estado do componente como um todo.

```jsx
export default function FeedbackForm() {
	const [status, setStatus] = useState('typing');
  
	...
	
	async function handleSubmit(e) {
		e.preventDefault();
		setStatus('sending');
		...
		// BUG corrigido: só preciso de atualizar uma variável
		setStatus('sent');
	}
	
	// BUG corrigido: a ordem não importa mais
	if (status == 'sent') {
		return ...
	}
	
	if (status == 'sending') {
		return ...
	}

	return ...
}
```

### Evite redundância

Se uma informação pode ser calculada ela não deveria estar no estado do componente.

#### Exemplo - Propriedades calculadas

```jsx
export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
}
```

O nome completo é facilmente calculado utilizando a interpolação do primeiro e do último nome. Por isso, esse componente fica melhor quando fazemos o seguinte:

```jsx
export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const fullName = firstName + " " + lastName;
}
```

#### Exemplo - Espelhar propriedades como estado

Se você tem isso e a cor não será alterada durante a renderização desse componente:

```jsx
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
  ...
}
```

Deveria alterar para isso:

```jsx
function Message({ messageColor }) {
  const color = messageColor;
}
```

Caso o parâmetro de entrada seja apenas uma referência inicial, faz sentido mantermos o estado do componente.

### Evite duplicação

#### Exemplo

Se você tem:

```jsx
export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]  // BUG caso esse item seja editável
  );
  ...
}
```

Você deveria alterar para utilizar não utilizar diretamente o objeto e sim uma referência que independente de qualquer alteração na lista inicial continue valendo.

```jsx
export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );
  ...
}
```

Essa alteração permite que mesmo que o conteúdo do item do menu seja alterado a ordem de escolha continue funcionando.

### Evite estado profundamente aninhado

#### Exemplo

Digamos que queremos uma lista de lugares que eu já morei. 

Se tivermos isso:

```jsx
function PlaceTree({ place }) {
  const [places, setPlaces] = useState(
	  [
		  {
			  title: 'Lagoa Dourada', 
			  neighbors: ['Bom Jesus', 'Centro']
		  },
		  {
			  title: 'São João del Rei', 
			  neighbors: ['Vila São Paulo']
		  }
	  ]
  );
  ...
}
```

Toda a vez que um novo bairro seja adicionado ou removido dessa lista eu preciso acessar vários níveis para encontrar a informação que eu preciso.

Nesse casos, o ideal é nivelar o objeto de estado de uma forma que conseguimos acessar cada elemento editável diretamente.

```js
function PlaceTree({ place }) {
  const [places, setPlaces] = useState(
	  [
		  {
			  title: 'Lagoa Dourada',
			  neighbors: 'Bom Jesus'
		  },
		  {
			  title: 'Lagoa Dourada',
			  neighbors: 'Centro'
		  },
		  {
			  title: 'São João del Rei',
			  neighbors: 'Vila São Paulo'
		  }
	  ]
  );
  ...
}
```

Agora, é possível com apenas um nível de acesso editar a lista.

## Gerenciamento de estado assíncrono

Além do estado dos componentes, também é necessário sincronizar, cachear, atualizar estado assíncrono (providos por uma API) (backend).

São necessidades comuns a dados assíncronos:

- **Cache de dados**
	- Uma mesma query pode ser acessada de dois ou mais componentes
- **Gerenciamento de loading e erros**
	- Toda requisição assíncrona deve indicar seu tempo de carregamento e possíveis erros de conexão
- **Revalidação de dados em segundo plano**
	- Enquanto o usuário interage, os dados devem ser revalidados para mostrar informações atualizadas sem travamentos de tela.
- **Retentativas de conexão**
	- Casos de falha de conexão são comuns em ambientes com sinal fraco de internet.
- **Dedup de requisições**
	- De tempos em tempos os dados devem ser atualizados para mostrar as informações mais recentes.

> [!warning] Bibliotecas de Gerenciamento de estado da aplicação
> Geralmente as bibliotecas gerais (Zustand, Redux...) não são ideias para controle de estado assíncrono, já que não implementam nenhuma solução para as necessidades específicas desse tipo de dado.

Exemplo utilizando [[TanStack Query]]

```tsx
function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
    // Já tem cache, retry, refetch na janela focada, staleTime, etc.
  });
  // ... render
}
```

## Combinação dos estados síncronos e assíncronos

A arquitetura moderna mais performática é:

- **TanStack Query** cuida de todo o estado assíncrono vindo do backend (busca, cache, sincronia).
- **Zustand** (ou Context API) cuida do estado síncrono da UI.
    
Se você precisa de um dado da Query dentro do Zustand, faça:

```tsx
const useStore = create((set) => ({
  filters: { category: 'tech' },
  setFilters: (newFilters) => set({ filters: newFilters }),
}));

// No componente:
const filters = useStore((state) => state.filters);
const { data } = useQuery({
  queryKey: ['posts', filters], // A Query reage às mudanças do Zustand!
  queryFn: () => fetchPosts(filters),
});
```