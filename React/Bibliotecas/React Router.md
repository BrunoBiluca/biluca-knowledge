---
categoria: biblioteca
---
# React Router

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

React Router é um roteador múlti-estratégia para [[React]].

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://reactrouter.com/home)
>- 

--- end-multi-column

Ele apresenta 3 modos:

- Framework - funcionalidades completas de roteamento, como estratégias de SPA, SSR e renderização estática
- Data - adiciona funcionalidades como carregamento de dados, ações e estados pendentes
- Declarative - provê funcionalidades simples de roteamento como combinar URLs a componentes

Os modos se diferenciam pela quantidade de funcionalidades e o controle arquitetural de cada um.

As principais formas de configuração de rotas são:

- Route modules
	- Referencia um componente com ações, cabeçalhos e tratamento de erro
- Nested Routes
	- Permite renderizar componentes filhos pela rota
- Layout Routes
	- Permite aninhar o componentes filhos sem adicionar nenhum segmento a URL
- Index Routes
	- Renderiza o componente no seu pai onde a tag `Outlet` é definida
- Route Prefixes
	- Define um caminho comum a um conjunto de rotas
- Dynamic Segments
	- Todo segmento que começa com `:` é dinâmico.

### Route modules

São a base para o React Router e definem principalmente:

- carregamento de dados
- ações
- reavaliações
- tratamento de erros

#### Loader

Loader é executado do lado do servidor.

```js
// exemplo de carregamento de dados
export async function loader() {
  return { message: "Hello, world!" };
}

export default function MyRoute({ loaderData }) {
  return <h1>{loaderData.message}</h1>;
}
```

#### ClientLoader

`clientLoader` é utilizado para recuperar dados no cliente. Isso é bastante útil para páginas ou projetos que preferem buscar dados diretamente do Browser.

```js
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  const product = await res.json();
  return product;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```