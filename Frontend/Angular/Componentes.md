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

#### Demonstração Input e Output

Demonstração do Input e Output entre componentes.

```typescript
// App.ts
import {Component} from '@angular/core';
import {Child} from './child';

@Component({
  selector: 'app-root',
  template: `
    <input
      type="checkbox"
      [checked]="canAddItens"
      (change)="canAddItens = !canAddItens"
    />
    <app-child 
      [canAddItens]="canAddItens"
      (onAddItem)="addItem($event)"
    />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [Child],
})
export class App {
  items = new Array();
  canAddItens = false;
  addItem(item: string) {
    this.items.push(item);
  }
}

// Child.ts
import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-child',
  styles: `.btn { padding: 5px; }`,
  template: `
    <button class="btn" [disabled]="!canAddItens()" (click)="addItem()">Add Item</button>
  `,
})
export class Child {
  canAddItens = input<boolean>();
  onAddItem = output<string>()
  items = Array<string>()
  addItem() {
    this.onAddItem.emit("🌟");
  }
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

### Inicialização

```ts
@Component({
...
})
export class BarComponent implements OnInit {
	ngOnInit(): void {
		// inicialização do componente
		// antes da renderização
	}
}
```

#### Ordem de Execução do `ngOnInit`:

1. `ngOnInit` de [[Diretivas]] é executado antes do
2. `ngOnInit` do Componente.