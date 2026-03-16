## Mock de HTTPClient

É muito comum testarmos elementos que recuperam informações de serviços externos. Angular já disponibiliza um módulo pronto de testes para HTTP, `HttpClientTestingModule`.

> [!tip] Testar o **contrato** (url, verbo, headers, body) do serviço externo é um dos principais elementos a serem **especificados em um teste** no Frontend.

```js
...
beforeEach(() => {
	// exemplo de mock
	TestBed.configureTestingModule({
		// habilita o módulo de testes de Http
		// todos os HttpClient passa a ser uma implementação Mockada
		imports: [HttpClientTestingModule]
	});
	let service = TestBed.inject(DataService);
	let testingController = TestBed.inject(HttpTestingController);
})
...
// define que uma requisição mock para a {url}
const mockReq = testingController.expectOne("{url}");
// define o retorno da requisição
mockReq.flush(...)

// Uso do serviço definido no mockReq
service.getUrl().subscribe((result) => {
	expect(result).toBeTruthy();
	// ... outras espectativas
})
```

### Melhores práticas

- [[Reuso de testes entre componentes]]