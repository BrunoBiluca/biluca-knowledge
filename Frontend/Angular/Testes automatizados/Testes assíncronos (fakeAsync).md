## Testes assíncronos (fakeAsync)

Para testar elementos que apresentam funções relacionadas ao tempo, como `setTimeout` ou `setInterval`, ou também requisições HTTP que podem demorar algum tempo podemos utilizar o [fakeAsync](https://angular.dev/api/core/testing/fakeAsync).

Importante entender os conceitos de [[Fila de tarefas do Javascript]] para saber controlar esse fluxo.

Principais funções:

- `tick(time)` move o relógio fake em tanto tempo
- `flush()` libera a próxima tarefa na fila de passagem do tempo para microtasks
	- Flush funciona para tarefas não periódicas, assim tarefas periódicas como `setInterval` não funcionam
	- Usando o flush não precisamos de fixar os valores de passagem de tempo no nosso código, deixando mais flexível.
	- `flushMicrotask()` variação para liberar micro tasks (ex: Promises)

```ts
describe('this test', () => {
  it(
    'looks async but is synchronous',
    <any>fakeAsync((): void => {
      let flag = false;
      setTimeout(() => { flag = true; }, 100);
	  // setTimeout não foi executado
      expect(flag).toBe(false);
      // move no relógio falso 50 milisegundos
      tick(50);
      expect(flag).toBe(false);
      // como setTimeout ainda não foi executado, o executa
      flush();
      expect(flag).toBe(true);
    }),
  );
});
```