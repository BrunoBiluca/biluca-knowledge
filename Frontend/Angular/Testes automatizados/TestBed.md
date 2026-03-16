## TestBed

Utilizando `TestBed` podemos configurar vários elementos para o nosso ambiente de testes, como componentes, serviços, httpclient, rotas e muito mais.

```js
...
beforeEach(() => {
	// exemplo de mock
	fooMock = jasmine.createSpyObj("FooService", ["fooFunc"])
	TestBed.configureTestingModule({
		providers: [
			BarService, // exemplo de classe real
			{provide: FooService, useValue: fooMock}
		]
	});
})
...
const bar = TestBed.inject(BarService);
const foo = TestBed.inject(FooService);
```
