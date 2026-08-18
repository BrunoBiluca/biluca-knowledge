---
categoria: biblioteca
---
# Redux

Redux é uma biblioteca de gerenciamento de estado para [[React]] que permite definir um fluxo de dados controlado.

Alternativas:

- [[Zustand]]
- [[Recoil]]

## Utilização

- `createSlice` instancia um armazenamento do Redux
- `reducers` são os métodos responsáveis por alterar o estado


```jsx
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => { state.value += action.payload }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

// componente
function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
```

## Chamadas assíncronas

Para chamadas assíncronas o Redux precisa de um middleware externo ([Redux Thunks](https://redux.js.org/usage/writing-logic-thunks)).  Para mais informações sobre [[Thunk]].

```jsx
// store.js
const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {
    fetchStart: (state) => { state.loading = true },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
    },
    fetchError: (state) => { state.loading = false }
  }
})

// Action assíncrona (Thunk)
export const fetchUser = (id) => async (dispatch) => {
  dispatch(fetchStart())
  try {
    const response = await fetch(`/api/users/${id}`)
    const data = await response.json()
    dispatch(fetchSuccess(data))
  } catch {
    dispatch(fetchError())
  }
}

// Componente
function UserProfile({ userId }) {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [userId])
  
  return loading ? <Spinner /> : <div>{data?.name}</div>
}
```