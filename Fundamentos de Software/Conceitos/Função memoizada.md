# Função memoizada

Função memoizada é uma função de alta ordem que armazena os resultados de chamadas anteriores a função.

Dado uma entrada de uma [[Função pura]] a sua saída deve ser sempre a mesma, podemos utilizar esse conceito para armazenar execuções dessa função, e retornar resultados já previstos para entradas já executadas.

```js
// a simple function to add something
const add = (n) => (n + 10);
add(9);
// a simple memoized function to add something
const memoizedAdd = () => {
  let cache = {};
  return (n) => {
    if (n in cache) {
      console.log('Fetching from cache');
      return cache[n];
    }
    else {
      console.log('Calculating result');
      let result = n + 10;
      cache[n] = result;
      return result;
    }
  }
}
// returned function from memoizedAdd
const newAdd = memoizedAdd();
console.log(newAdd(9)); // calculated
console.log(newAdd(9)); // cached
```