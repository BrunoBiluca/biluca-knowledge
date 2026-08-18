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