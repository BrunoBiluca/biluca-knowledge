# TypeScript

## Tipagem

[Documentação - Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Union Type

Union types são declarações de múltiplos tipos para um parâmetro ou retorno.

**Exemplo de uso em parâmetros:**

```ts
/** 
* Takes a string and adds "padding" to the left. 
* If 'padding' is a string, then 'padding' is appended to the left side. 
* If 'padding' is a number, then that number of spaces is added to the left side. 
*/
function padLeft(value: string, padding: string | number) {  
// ...
}
```

**Exemplos de uso como retorno de função:**

```ts
interface Bird {
  fly(): void;
  layEggs(): void;
}
 
interface Fish {
  swim(): void;
  layEggs(): void;
}
 
declare function getSmallPet(): Fish | Bird;
 
let pet = getSmallPet();
pet.layEggs();
 
// Only available in one of the two possible types
pet.swim(); 
// ERROR
// Property 'swim' does not exist on type 'Bird | Fish'.
//   Property 'swim' does not exist on type 'Bird'.
```

> [!warning] Union Types podem dificultar o código
> **Na minha perspectiva** Union Types podem dificultar o código por deixar para o desenvolvedor a interpretação.
> Como vemos no primeiro exemplo de passagem de parâmetros a operação da função é diferente se for passado um número ou se for passado uma string.
> No segundo exemplo também temos um problema, já que são permitido apenas a interface comum entre as `Fish` e `Bird`
> 
> Então, é importante garantir que o comportamento seja sempre o esperado e que o código não deixe espaço para dúvidas (princípio da Coesão).
> O primeiro exemplo poderia ser substituído por duas funções, enquanto o segundo exemplo poderia retorna uma interface comum entre os Pets.

### Intersection Types

Intersection types são uma maneira de criar um tipo a partir da composição de outros tipos. 

> [!tip] Intersection Types e princípio da segregação de interfaces
> Diferente do Union Types que pode trazer alguns problemas de legibilidade de código, esse me parece bom, já que em OO é o que costumamos fazer (princípio de Segregação de Interface).

```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
 
interface ArtworksData {
  artworks: { title: string }[];
}
 
interface ArtistsData {
  artists: { name: string }[];
}
 
// These interfaces are composed to have
// consistent error handling, and their own data.
 
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;
 
const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }
 
  console.log(response.artists);
};
```


## Tipos utilitários

[Documentação - Handbook](https://www.typescriptlang.org/docs/handbook/utility-types.html)

TypeScript provê vários tipos de tipos utilitários para facilitar transformações comuns.

### `Partial<Type>`

Constrói um tipo com todas as propriedades de Type definidas como opcionais.

```ts
interface Todo { title: string; description: string;}
// Apenas os campos passados são atualizados
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) => { ...todo, ...fieldsToUpdate };

const todo1 = { title: "organize desk", description: "clear clutter" }; 
const todo2 = updateTodo(todo1, { description: "throw out trash"});
// { title: "organize desk", description: "throw out trash" }
```

Esse tipo pode ser utilizado como no exemplo acima, para atualizar registros, assim não é preciso passar ou validar todos os campos para verificar quais foram alterados, isso é feito automaticamente.