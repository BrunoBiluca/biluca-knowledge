# Vitest

[[Frontend/Vite/Vitest/Vitest|Vitest]] é um framework agnóstico que pode ser utilizado para [[React]].

## Comparação entre bibliotecas de testes de renderização

### Vitest Browser + React

- Executa testes em navegadores reais
- Foco em testes mais próximos do ambiente real
- Melhor para testes de integração e E2E
- Mais lento (inicialização do browser) 
- Paralelismo limitado                  

### React Testing Library

[[React Testing Library]]

- Executa testes em Node.js com JSDOM    
- Foco em testes de comportamento do usuário
- Padrão da indústria para testes unitários/integração
- Muito rápido por não precisar de um navegador
- Alto paralelismo

## Exemplos
#### Exemplo: Renderização

```ts
// HelloWorld.ts
import { useState } from 'react'

export default function HelloWorld({ name }: { name: string }) {
  const [count, setCount] = useState(1)
  return (
    <div>
      <h1>Hello {name} x{count}!</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}
```

```ts
// HelloWorld.spec.ts
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import HelloWorld from '../src/HelloWorld'

test('should update text when incremented value', async () => {
  const { getByText, getByRole } = await render(<HelloWorld name="Vitest" />)

  await expect.element(getByText('Hello Vitest x1!')).toBeInTheDocument()
  await getByRole('button', { name: 'Increment '}).click()

  await expect.element(getByText('Hello Vitest x2!')).toBeInTheDocument()
})
```

#### Exemplo: Serviços externos

Podemos utilizar `mockResolvedValueOnce` para mockar o retorno das chamadas do fetch. Assim, podemos utilizar vários recursos do teste, como verificar se certos caminhos forma executados, se parâmetros foram adicionados a requisição.

```ts
// src/services/userService.js
export const userService = {
  async getUsers() {
    const response = await fetch('/api/users')
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json()
  },

  async createUser(userData) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error('Failed to create user')
    return response.json()
  },
}
```

```ts
// src/services/__tests__/userService.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { userService } from '../userService'

// Mock do fetch global
global.fetch = vi.fn()

describe('User Service', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('should fetch users successfully', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }]
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    })

    const users = await userService.getUsers()

    expect(fetch).toHaveBeenCalledWith('/api/users')
    expect(users).toEqual(mockUsers)
  })

  it('should throw error when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    await expect(userService.getUsers()).rejects.toThrow('Failed to fetch users')
  })

  it('should create user with correct data', async () => {
    const newUser = { name: 'Jane Doe', email: 'jane@example.com' }
    const createdUser = { id: 2, ...newUser }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdUser,
    })

    const result = await userService.createUser(newUser)

    expect(fetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    expect(result).toEqual(createdUser)
  })
})
```

#### Exemplo: Hooks

Utilizando [[React Testing Library]].

```ts
// src/hooks/useTodoList.js
import { useState } from 'react'

export const useTodoList = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos(prev => [...prev, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    removeTodo,
  }
}
```

```ts
// src/hooks/__tests__/useTodoList.test.js
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTodoList } from '../useTodoList'

describe('useTodoList', () => {
  it('should add todo', () => {
    const { result } = renderHook(() => useTodoList())

    act(() => {
      result.current.addTodo('Test todo')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Test todo')
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('should toggle todo completion', () => {
    const { result } = renderHook(() => useTodoList())

    // Adiciona um todo
    act(() => {
      result.current.addTodo('Test todo')
    })

    const todoId = result.current.todos[0].id

    // Toggle do todo
    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(true)

    // Toggle novamente
    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(false)
  })

  it('should remove todo', () => {
    const { result } = renderHook(() => useTodoList())

    // Adiciona dois todos
    act(() => {
      result.current.addTodo('Todo 1')
      result.current.addTodo('Todo 2')
    })

    expect(result.current.todos).toHaveLength(2)

    const todoId = result.current.todos[0].id

    // Remove o primeiro todo
    act(() => {
      result.current.removeTodo(todoId)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Todo 2')
  })
})
```