# Thunk

É um termo de computação que significa **"um trecho de código que executa uma tarefa com atraso"**.

No [[Redux]] um Thunk é definido como uma função que aceita dois argumentos: o `dispatch` e o `getState`. As funções não são chamadas diretamente pelo código, elas são passadas e estão executadas pelo store global.

Exemplo:

```js
// fetchTodoById é o "thunk action creator"
export function fetchTodoById(todoId) {
  // fetchTodoByIdThunk é o "thunk function"
  return async function fetchTodoByIdThunk(dispatch, getState) {
    const response = await client.get(`/fakeApi/todo/${todoId}`)
    dispatch(todosLoaded(response.todos))
  }
}
```