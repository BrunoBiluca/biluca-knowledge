# Componentes

Componentes são a principal estrutura de UI do Angular.

Cada componente consiste em:

- `@Component` decorator
- HTML template
- CSS selector
- Classe [[TypeScript]] com o componento definido

Também é possível separar o HTML, CSS da classe Typescript definida.

Importação de componentes é feita a partir do campo `imports`.

#### Demonstração de funcionalidades de componentes

- Definição de variáveis definidas na classe e utilizadas no template (`{{ nome }}`)
- Eventos, clique do botão chama o método definido em UserProfile
- Vinculação de propriedades do HTML com variáveis da classe,  `[contentEditable]="isEditable"`

```typescript
// user-profile.ts
@Component({
  selector: 'user-profile', // define a tag <user-profile /> utilizada em outros templates
  template: `
    <h1>{{ nome }} profile</h1>
    <p>This is the user profile page</p>
    <div [contentEditable]="isEditable">
      <button (click)="onChangeName()"
    </div>
  `,  
  styles: `h1 { font-size: 3em; } `,
  imports: [],
})
export class UserProfile { 
  nome = "Brunin maneiro demais";
  isEditable = true; // propriedade associada [contentEditable]
  onChangeName(){} 
}
```

## Componentes Standalone

Componentes Standalone são componentes em Angular que podem ser utilizados independentemente sem a necessidade de declarar um `NgModule`.

> [!tip] Time do Angular recomenda utilizar componentes standalone em vez de ngModule

Por padrão os componentes são standalone, o que significa que é possível importar em outros componentes.

## Elementos host

[Elementos host](https://angular.dev/guide/components/host-elements)

## Ciclo de vida de componentes

> [!quote] [Documentação](https://angular.dev/guide/components/lifecycle)

Fases do ciclo de vida:

- criação
- detecção de mudanças
- renderização
- destruição

### Construtor

- Chamado quando a classe é instanciada
- Executado antes do Angular assumir o controle

```ts
export class MyComponent {
  private http: HttpClient;
  
  constructor(http: HttpClient) {
    // ✅ Correto - Injeção de dependências
    this.http = http;
	
	// ❌ Chamadas HTTP
    // this.http.get('/api/data').subscribe();
  
    // ❌ Evitar - Lógica complexa
    // this.loadData(); // Não fazer aqui!
    
    // ❌ Evitar - Acesso a DOM
    // document.getElementById(); // Não funciona!
  }
}
```

### Inicialização

- Chamado após o Angular inicializar propriedades vinculadas a dados
- Executado quando o componente está pronto

```ts
@Component({
...
})
export class BarComponent implements OnInit {
	ngOnInit(): void {
	    // ✅ Correto - Lógica de inicialização
	    this.loadData();
	    
	    // ✅ Correto - Acesso a Input properties
	    console.log(this.inputValue);
	    
	    // ✅ Correto - Chamadas HTTP
	    this.fetchData();
	}
}
```

#### Ordem de Execução do `ngOnInit`:

1. `ngOnInit` de [[Diretivas]] é executado antes do
2. `ngOnInit` do Componente.

### OnChanges

O `ngOnChanges` é um gancho de ciclo de vida no [[Angular]] projetado para detectar mudanças as propriedades do tipo "Entrada" (Input) do componente. Ele apenas ativa quando a referência é da propriedade é alterada.

```ts
ngOnChanges(changes: SimpleChanges): void {
  changes['property'] // propriedade assinada com @Input
}
```

Para o caso de listas é importante ressaltar que qualquer mudança na lista não é gatilho para chamar o método `ngOnChanges` apenas uma mudança na referência.

```ts
class Component implements OnChanges {
	@Input array = []
	
	ngOnChanges(changes: SimpleChanges): void {
	  array = changes['array']
	}
}

component.instance.array.push({element}) // não ativa o ngOnChanges
component.instance.array = [{element}]   // ativa o ngOnChanges
```

## Comparação entre os momentos do ciclo de vida

| Aspecto          | Constructor                            | OnInit                              | OnChanges                                                   |
| ---------------- | -------------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| **Ordem**        | 1º a executar                          | 2º a executar                       | Executado sempre que alguma referência de @Input é alterada |
| **Propriedades** | `@Input()` ainda não estão disponíveis | `@Input()` já estão disponíveis     | Atualiza propriedades                                       |
| **DOM**          | Elementos não renderizados             | Elementos prontos (View inicial)    | Elementos prontos                                           |
| **Injeção**      | Ideal para DI                          | Já pode usar dependências injetadas | Já pode usar dependências injetadas                         |
| **Lógica**       | Apenas configuração inicial            | Lógica de negócio, chamadas API     | Atualização das propriedades                                |
