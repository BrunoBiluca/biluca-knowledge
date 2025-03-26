# Zustand

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Pequena e rápida solução para gerenciamento de estado em [[React]]

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://zustand.docs.pmnd.rs/getting-started/introduction)
>- 

--- end-multi-column

Zustand não depende de context providers para funcionar.

```js
// Exemplo mais simples de declaração de um estado e suas ações utilizanod Zustand
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}))
```