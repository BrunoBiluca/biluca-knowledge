---
categoria: biblioteca
---
# Zustand


> [!info] Principais referências
> - [Documentação](https://zustand.docs.pmnd.rs/getting-started/introduction)

Pequena e rápida solução para gerenciamento de estado em [[React]]

Zustand não depende de context providers para funcionar.

```js
// Exemplo mais simples de declaração de um estado e suas ações utilizanod Zustand
// countStore.js
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

Zustand também permite separar a lógica do armazenamento global em múltiplos pedaços ([Slices Pattern](https://zustand.docs.pmnd.rs/guides/slices-pattern)). Isso permite uma maior modularização do nosso código enquanto mantemos uma única fonte de verdade (boa prática) para nossa aplicação.

### Boas práticas

#### Exportar apenas Hooks customizados

Essa é uma forma de garantir que o armazenamento será sempre inicializado da mesma forma, além de reduzir código escrito.

```js
// Client.js
// sem o padrão
const count = useCountStore((state) => state.count);
```

Com o padrão definimos um Hook customizado que inicializa o count:

```js
// countStore.js
export const useCount = () => useCountStore((state) => state.count)
```

E podemos utilizar no cliente:

```js
// Client.js
// com o padrão
const count = useCount();
```

#### Usar seletores atômicos

Quando precisamos de construir objetos com múltiplos valores podemos fazer o seguinte:

```js
const {a, b} = useABStore((state) => ({
	a: state.a,
	b: state.b
})
```

O problema dessa abordagem é que cada vez que criamos esse objeto um novo objeto é criado a cara renderização, podendo fazer o app quebrar.

Podemos corrigir esse problema utilizando Hooks para cada objeto:

```js
// Seguindo a prática anterior
const a = useA()
const b = useB()
```

Também é possível fazer isso utilizando o Hook `useShallow` ([doc](https://zustand.docs.pmnd.rs/hooks/use-shallow))) para verificar alterações individuais entre as renderizações:

```js
const {a, b} = useABStore((state) => 
	useShallow((state) => ({
		a: state.a,
		b: state.b
	}))
```

Porém, ainda assim é recomendável utilizar Hooks atômicos para cada objeto.