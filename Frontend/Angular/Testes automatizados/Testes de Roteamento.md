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