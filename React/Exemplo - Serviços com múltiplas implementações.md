# Exemplo - Serviços com múltiplas implementações

Uma solução muito comum para aplicações quando precisamos nos comunicar com serviços externos é definir uma interface comum e múltiplas implementações, o que permite que podemos ter estados da aplicação diferentes dependendo das condições.

Isso nos permite também definir vários modos de execução da aplicação, como recomendado em [[Guia para desenvolvimento Web Frontend]].

Esse tipo de solução é relacionada ao [[Princípio Inversão de dependências]].
## Exemplo: Informações de usuários

Interface definida:

- User
- UserService

Implementações:

- HttpUserService
- MemoryUserService

Factory:

- userServiceContext
	- Definição do contexto que serão compartilhado por todos os componentes da aplicação

Hooks:

- useUserService
	- Hook personalizado para utilizar o mesmo contexto definido
	- Ajuda a reduzir código e a centralizar a consulta a instância do UserService ([[DRY]])

### UserService

```ts
// src/userService/UserService.js
export class User {
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }
}

export class UserService {
  async getUsers() {
    throw new Error('Method not implemented')
  }

  async getUserById(id) {
    throw new Error('Method not implemented')
  }

  async createUser(userData) {
    throw new Error('Method not implemented')
  }

  async updateUser(id, userData) {
    throw new Error('Method not implemented')
  }

  async deleteUser(id) {
    throw new Error('Method not implemented')
  }
}
```

### HttpUserService

```ts
// src/userService/HttpUserService.js
import { User, UserServiceInterface } from './UserService'

export class HttpUserService extends UserService {
  constructor(baseURL = '/api') {
    super()
    this.baseURL = baseURL
  }
  
  ...
}
```

### MemoryUserService

```ts
// src/userService/MemoryUserService.js
import { User, UserServiceInterface } from './UserService'

export class MemoryUserService extends UserService {
  constructor() {
    super()
    this.users = new Map()
    this.nextId = 1
    this.initializeSampleData()
  }
  
  ---
}
```

### useUserService

```ts
// src/userService/useUserService.js
import { useContext } from 'react'
import { UserServiceContext } from '../context/UserServiceContext'

export const useUserService = () => {
  const context = useContext(UserServiceContext)
  if (!context) {
    throw new Error('useUserService must be used within UserServiceProvider')
  }
  return context
}
```

### UserServiceContext

```ts
// src/userService/UserServiceContext.jsx
import { createContext } from 'react'
import { UserServiceFactory, UserServiceType } from '../services/userService/userServiceFactory'

export const UserServiceContext = createContext()

export const UserServiceProvider = ({ 
  children, 
  config = {} 
}) => {
  const serviceType = import.meta.env.DEV ? 'memory' : 'http'
  const userService = UserServiceFactory.createService(serviceType, config)

  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  )
}
```