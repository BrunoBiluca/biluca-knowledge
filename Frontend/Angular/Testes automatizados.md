# Testes automatizados

[Documentação](https://angular.dev/guide/testing)

Testes automatizados em [[Angular]] já são habilitados por padrão. (mais sobre [[Fundamentos de Ciências da Computação/Testes automatizados/Testes automatizados|Testes automatizados]])

As ferramentas padrão utilizadas são:

- [[Jasmine]] como framework de testes
- [[Karma]] como executor dos testes

Principais elementos que queremos testar:

- Serviços
- Simulação de interações com o DOM
- Dependências de componentes
- Testes assíncronos

## Testes de componentes

[[Frontend/Angular/Componentes|Componentes]] podem ser testados facilmente em Angular.

Elementos auxiliares ([ComponentFixture](https://angular.dev/api/core/testing/ComponentFixture)):

- `fixture.componentInstance` instância da classe raiz do componente
- `fixture.nativeElement` o elemento nativo na raiz do componente

```ts
@Component({
  selector: 'app-banner',
  template: '<p>{{title()}}</p>',
})
export class BannerComponent {
  title = signal('Test Tour of Heroes');
}

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  // cria o compomente que será testado
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [BannerComponent]});
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  // testa se o componente foi definido
  // Não é feito nenhum tipo de vínculo de dados
  it('should create', () => {
    expect(component).toBeDefined();
  });

  // testa o elemento nativo (html) após a vinculação de dados ao template
  it('should display original title after detectChanges()', () => {    
      const bannerElement: HTMLElement = fixture.nativeElement; 
	  const p = bannerElement.querySelector('p')!;   
	  fixture.detectChanges();    
	  expect(p.textContent).toContain(component.title);  
  });
...
});
```

> [!tip]- NativeElement vs DebugElement
> 
> **Angular depende da abstração DebugElement para funcionar com segurança em todas as plataformas suportadas.** Em vez de criar uma árvore de elementos HTML, o Angular cria uma árvore de DebugElement que envolve os elementos nativos da plataforma de execução. A propriedade nativeElement desencapsula o DebugElement e retorna o objeto de elemento específico da plataforma.
> 
> Dessa forma podemos testar o código **independente de plataforma**.
> 
> Exemplo de comparação entre as duas propriedades:
> 
> ```ts
> // ... importações
> @Component({ template: `<button id="myBtn">Click me</button>` })
> class MyComponent {}
> 
> describe('MyComponent', () => {
>   // ... criação do componente e fixture
>   it('should demonstrate DebugElement vs nativeElement', () => {
> 	// DebugElement (abstração do Angular) sempre mantem a mesma interface
> 	const debugEl = fixture.debugElement.query(By.css('#myBtn'));
> 
> 	// HTMLButtonElement (elemento DOM real)
> 	// Em uma plataforma móvel (como Ionic): pode retornar um elemento específico da plataforma móvel
>     const nativeEl = debugEl.nativeElement;
> 
>     // Ambos permitem interação, mas de formas diferentes
>     debugEl.triggerEventHandler('click', null);  // Via DebugElement
>     nativeEl.click();                            // Via elemento nativo
>   });
> });
> ```

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

### HTTPClient

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

## Testes assíncronos

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

## Categorias de testes

Essa sessão demonstra com exemplos como fazer testes para diferentes elementos dentro do projeto.

### Roteamento

> [!info] Documentação
> [Documentação oficial de testes para roteamento](https://angular.dev/guide/routing/testing)

#### Navegação para rota

Podemos testar a navegação por um espião no método `navigate` do router.

```ts
describe("...", () => {
	beforeEach(() => {
	    ...
		router = TestBed.inject(Router);
		spyOn(router, 'navigate');
	})
	
	it("should redirect to /login", () => {
	    ...
	    expect(router.navigate).toHaveBeenCalledWith(['/login']);
	})
})
```

#### Navegação pelo Location

Testar o roteamento de uma aplicação é possível verificando o caminho no navegador.

```ts
describe('NotesPresenter', () => {
	beforeEach(async () => {
	  await TestBed.configureTestingModule({
		imports: [RouterModule.forRoot(routes)],
		providers: [...],
	  }).compileComponents();
	
	  location = TestBed.inject(Location);
	});
})

it("should show note's details when note is clicked", fakeAsync(() => {
  const notes = mockNotes();
  createComponent(notes);

  fixture.nativeElement
	.querySelector('.note-item')
	.dispatchEvent(new Event('click'));

  flush();
  fixture.detectChanges();

  expect(location.path()).toBe('/notes/' + notes[0].id);
}));
```

> [!tip] Roteamento é assíncrono
> Todo o roteamento no Angular é feito de forma assíncrona, então para os testes é necessário invocar uma zona de fakeAsync para fazer os testes. Caso contrário o click do botão é registrado, porém o roteamento não é feito.
