# Slice Pattern

Slice Pattern é um padrão comumente utilizado para quebrar o estado global de aplicações [[Frontend]] em partes melhores, facilitando assim seu controle e manutenção.

Cada armazenamento (store) é responsável pelo seu estado e pelos métodos de mutação.

Para estruturas de dados mais complexas fazemos a composição desses armazenamentos, criando um armazenamento composto.

A grande vantagem desse padrão é garantir que **cada componente utilize apenas o que é necessário** para o seu funcionamento, além disso escondemos o que não é relevante facilitando a manutenção de cada elemento separado.

Algumas bibliotecas que implementam esse padrão são:

- [[Zustand]]
- [[Redux]]

### Exemplo - Slice Pattern no Zustand

The first individual store:

```js
export const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})
```

Another individual store:

```js
export const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})
```

You can now combine both the stores into **one bounded store**:

```js
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))
```

Isso nos permite utilizar no componente em [[React]]:

```jsx
import { useBoundStore } from './stores/useBoundStore'

function App() {
  const bears = useBoundStore((state) => state.bears)
  const fishes = useBoundStore((state) => state.fishes)
  const addBear = useBoundStore((state) => state.addBear)
  return (
    <div>
      <h2>Number of bears: {bears
```

