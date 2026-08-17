# Standalone mode

Implementação do [[React]] para o [[Modo Standalone]].
#### Exemplo - Chamadas externas

O modo standalone é uma boa solução para verificar o fluxo de uma aplicação que dependa de chamadas externas.

Nesse caso definimos 3 estruturas:

- Componente (usado em todos os modos)
- Interface ou classe abstrata para definir o contrato da classe responsável pelas chamadas externas
- Implementação externa
- Implementação local

```ts
abstract class BreweriesData {
	...
}

class OpenBreweriesDBApiData extends BreweriesData {
	...
}

class InMemoryBreweriesData extends BreweriesData {
	...
}

function BreweriesList(){
	const data = useContext(BreweriesData);
}
```

