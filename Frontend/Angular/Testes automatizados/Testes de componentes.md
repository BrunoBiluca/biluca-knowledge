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