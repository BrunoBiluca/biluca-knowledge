---
categoria: biblioteca
---
# React Router

> [!info] Principais referências
> - [Documentação](https://reactrouter.com/home)
>- 

React Router é um roteador múlti-estratégia para [[React]].

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

## Tratamento de erros

### Página não encontrada

Para tratar uma rota de uma página não encontrada precisamos configurar as seguintes partes da aplicação:

- `routes.ts`

```ts
// routes.ts

export const router = createBrowserRouter([
    ...
	{
		path: ":breweryId",
		errorElement: <BreweryNotFound />,           // Captura um error
		Component: BreweryDetail,
	},
	...
```

- `BreweryDetail`

```ts
export const BreweryDetail = () => {
  const [error, setError] = useState<Error | undefined>(undefined);
  if (error) throw error;

  const params = useParams();
  const data = useBreweriesData();
  const [brewery, setBrewery] = useState<Brewery | null>(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      if (!params.breweryId) return;
      try {
        const breweryData = await data.get(params.breweryId);
        setBrewery(breweryData);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchBrewery();
  }, [params.breweryId, data]);
  
  return <div>
      ...
  </div>
```

É necessário capturar o erro em uma estrutura de estado e relançar o erro para que o roteamento (definido em `routes.ts`) receba e trate esse erro o que fará redirecionar para o `errorElement` configurado.

O [[Projeto - Biluca Agenda da Breja (React)]] implementa uma solução completa para isso.