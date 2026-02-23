# Exemplo - Paginação infinita

Um problema muito comum no desenvolvimento de aplicações web é exibir a medida do necessário as informações ao usuário.

A paginação é uma forma de resolver esse problema.

Em [[React]] podemos implementar isso da seguinte maneira:

- Classe de serviço de recuperação dos dados
- Componente que mantem o estado da lista de itens

Esse exemplo utiliza o caso [[Projeto - Biluca Agenda da Breja (React)]] como base.
### Interface do serviço

```ts
export abstract class BreweriesData {
  pageSize = 10;

  abstract get(breweryId: string): Promise<Brewery>;
  abstract getPage(page: number): Promise<Brewery[]>;
  abstract getAll(): Promise<Brewery[]>;
}
```


### Componente de lista

Esse componente tem as seguintes funções:

- Enquanto se carrega as cervejarias um indicador de carregamento é exibido

- Apresenta uma mensagem caso nenhuma cervejaria foi encontrada

- Carregar mais cervejarias
	- Caso a quantidade de cervejarias seja menor do que o tamanho da página então não existem mais registros para carregar

```ts
export function Breweries() {
  const data = useContext(BreweriesDataContext);
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    const recentBreweries = await data.getPage(page);
    setBreweries([...breweries, ...recentBreweries]);
    setLoading(false);

    if (recentBreweries.length < data.pageSize) {
      setHasMore(false);
      return;
    }

    setPage(page + 1);
    setHasMore(true);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <>
      <h2 className="mb-3">Cervejarias</h2>
      {
	      !hasMore && loading 
	      ? 
		      ( <loading /> ) 
	      : 
	      breweries.length === 0 
	      ? 
		      ( <p>Nenhuma cervejaria encontrada</p> ) 
	      : 
		      ( <lista /> )
	  }
      {
	      hasMore && (
        <>
			{loading && <loading />}
            <button onClick={fetchData}>
              <span>Carregar mais</span>
            </button>
        </>
      )}
    </>
  );
}
```

> [!quote] Estrutura do componente
> Esse tipo de estrutura é muito comum, talvez posso pensar em uma forma de não precisar de reimplementar sempre essa estrutura.
> 
> No [[Angular]], por exemplo, podemos utilizar o próprio serviço para garantir o loading, hasMore e número da página, assim, os componentes clientes, já utilizam essa estrutura pronta. 

