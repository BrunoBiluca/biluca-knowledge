# Jasmine

[Documentação](https://jasmine.github.io/)

Jasmine é um framework de testes para Javascript.


## Funcionalidades

### Spy ([doc](https://jasmine.github.io/tutorials/spying_on_properties))

Spy é um tipo de teste que utilizamos quando queremos acompanhar o comportamento de um objetivo.

Com ele podemos espiar propriedades, métodos e funções para verificar seus parâmetros de entrada, saída, quantas vezes foram executadas e muito mais.

```js
// spy em método de objeto
let o = new Bar();
spyOn(o, "someFunction").and.callThrough();
let result = o.someFunction()
expect(result).toBe(...);

// spy em objeto mock
let mock = jasmine.createSpyObj("Bar", ["someFunction"]);
let result = mock.someFunction()
expect(result).toBe(...);
```

### Testes de código assíncrono ([doc](https://jasmine.github.io/tutorials/async))

Jasmine suporta 3 maneiras de gerenciar código assíncrono:

- `async/await`
- promises
- callbacks

Um elemento importante em testes que envolvam `setTimeout` ou `setInterval` é a definição de um [mock clock](https://jasmine.github.io/api/edge/Clock.html).

```ts
function doSomethingLater(callback) {
  setTimeout(function() {
    callback(12345);
  }, 10000);
}

describe('doSomethingLater', function() {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('does something after 10 seconds', function() {
    const callback = jasmine.createSpy('callback');
    doSomethingLater(callback);
    jasmine.clock().tick(10000); // esse comando simula o avanço de 10 segudos de execução
    expect(callback).toHaveBeenCalledWith(12345);
  });
});
```
