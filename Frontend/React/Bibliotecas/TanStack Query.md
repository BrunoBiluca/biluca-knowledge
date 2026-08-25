---
categoria: biblioteca
---
# TanStack Query

TanStack Query (conhecido também como React Query) é uma biblioteca de gerenciamento de estado para busca, cache, sincronização e atualização de estado do servidor em aplicações Web.

> [!info] Links
> - [Documentação](https://tanstack.com/query/latest/docs/framework/react/overview)

Ela é uma biblioteca muito recomendada para gerenciamento de dados assíncronos e pode servir como um grande complemento nesse aspecto a [[Zustand]] (ver [[Frontend/React/🏅 Melhores práticas/Gerenciamento de estado|Gerenciamento de estado]] para as melhores práticas).

## Uso básico

```tsx
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  const queryClient = useQueryClient()

  // Queries
  const { isPending, error, data } = useQuery({ 
	  queryKey: ['todos'],
	  queryFn: () => axios.post('/todos', newTodo) 
  })

  // Mutations
  const mutation = useMutation({
    mutationFn: (newTodo) => axios.get('/todos'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })
  
  if (isPending) return 'Loading...'
  
  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <div>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({ id: Date.now(), title: 'Do Laundry' })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}
```

Explicação:

- `QueryClient` executa as chamadas externas

- `QueryClientProvider` provider com a referência do cliente de query utilizado para fazer as chamadas externas

- `useQueryClient` hook para recuperar a referência do QueryClient

- `{ isPending, error, data } = useQuery(...)` já gerencia o estado da requisição como o tempo de carregamento, os erros e os dados quando disponíveis.

- `mutation = useMutation(...)` mutações são utilizadas para criar/atualizar/remover ou executar algum tipo de efeito no servidor.

- `useMutation({onSuccess: ...})` executa  o callback em caso de sucesso da requisição da mutação

- `queryClient.invalidateQueries({ queryKey: ['todos'] })` invalida a query com a chave `'todos'`, marcando a query como velha e caso ela esteja sendo renderizada na tela, ela é atualizada em plano de fundo.

### Placeholder data

[Placeholder Query Data - Documentação](https://tanstack.com/query/v4/docs/framework/vue/guides/placeholder-query-data)

É principalmente relevante quando temos dados parciais e estamos esperando os dados completos serem baixados no plano de fundo.

> [!example]
> Em uma lista de postagens de blog podemos utilizar as informações da lista como título e breve trecho do corpo do texto, para quando o usuário decidir visualizar uma postagem no detalhe. Dessa forma, já mostramos a postagem com os dados que temos no frontend enquanto o restante é baixado no plano de fundo.

```jsx
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Busca o post completo (com o corpo do texto longo)
const fetchPostCompleto = async (id) => {
  const res = await fetch(`https://exemplo.com/{id}`);
  return res.json();
};

function DetalhePost({ postId }) {
  const queryClient = useQueryClient();

  const { data: post, isPlaceholderData } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostCompleto(postId),
    
    // 👇 Busca os dados parciais existentes no cache da lista
    placeholderData: () => {
      const postsNoCache = queryClient.getQueryData(['posts']);
      const postEncontrado = postsNoCache?.find((p) => p.id === postId);

      if (!postEncontrado) return undefined;

      return {
        id: postEncontrado.id,
        titulo: postEncontrado.titulo,
        resumo: postEncontrado.resumo,
        conteudoCompleto: 'Carregando o texto completo...', // Texto temporário
      };
    },
  });

  return (
    <article>
      {/* Título e resumo aparecem INSTANTANEAMENTE */}
      <h1>{post?.titulo}</h1>
      <p><i>{post?.resumo}</i></p>
      <hr />
      
      {/* Mostra o conteúdo parcial e depois o conteúdo completo real */}
      <div className={isPlaceholderData ? 'texto-opaco' : ''}>
        <p>{post?.conteudoCompleto}</p>
      </div>

      {isPlaceholderData && <span>Buscando restante do artigo...</span>}
    </article>
  );
}
```

Nesse exemplo:

- Busca o conteúdo do `post`
- Enquanto isso, utiliza o que já foi cacheado na exibição da lista `posts`