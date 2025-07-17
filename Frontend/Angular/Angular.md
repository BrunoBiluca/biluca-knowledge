# Angular

[Página do Framework](https://angular.dev/)

Angular é um **framework front-end** desenvolvido pelo Google para construção de **aplicações web SPA (Single Page Applications)** e **aplicativos híbridos/progressivos (PWA)**. 

Ele utiliza [[TypeScript]] como linguagem padrão e segue uma arquitetura baseada em **componentes**, [[Injeção de dependências]] e **two-way data binding**.

Ele já inclui soluções integradas para:

- **Diretivas** – Estendem HTML com comportamentos dinâmicos (ex.: `*ngIf`, `*ngFor`).
	- Várias diretivas foram atualizadas a partir da versão 17 para deixarem o código mais fluído
	- **Deferrable Views** – Carregamento lazy de seções da view (`@defer`).
- **Pipes** – Transformação de dados diretamente nos templates (ex.: `date`, `currency`).
- **Roteamento** (`@angular/router`)
- **Gerenciamento de estado** (RxJS, Signals, NGXS, etc.) 
- **Formulários reativos e template-driven**
- **Requisições HTTP** (`HttpClient`)
- **Testes (Karma, Jasmine, Protractor)**
- **CLI para scaffolding** (`ng generate`)

## Incremental DOM (Angular Ivy)

O **Incremental DOM** **não mantém uma cópia completa do DOM em memória**. Em vez disso, ele **percorre o template** e **aplica mudanças diretamente no DOM**, usando **instruções incrementais**.

Cada componente é compilado em um conjunto de **instruções de atualização** (ex.: `elementStart()`, `text()`, `elementEnd()`).

✅ **Menor consumo de memória** – Não duplica a árvore DOM, apenas atualiza o necessário.  
✅ **Bundle size reduzido** – Gera menos código após a compilação (Ivy é mais eficiente que View Engine).  
✅ **Melhor SSR (Server-Side Rendering)** – Hidratação mais eficiente, pois não precisa recriar o Virtual DOM.  
✅ **Tree-shaking mais eficaz** – Remove código não utilizado automaticamente.
❌ **Pode ser menos eficiente em atualizações massivas** – Sem um Virtual DOM, algumas otimizações dependem do desenvolvedor.  
❌ **Curva de aprendizado** – Entender como o Ivy compila templates pode ser complexo.

Casos de uso

- O projeto **tamanho do bundle**. 
- Quer **menos abstração** e mais controle sobre o DOM real.

## Componentes

Componentes são a principal estrutura de UI do Angular.

Cada componente consiste em:

- `@Component` decorator
- HTML template
- CSS selector
- Classe Typescript com o componento definido

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

## Plugins recomendados

- **[Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)** (oficial)
	- Fornece várias funcionalidades para desenvolvimento como: auto complete de código entre template e classe TypeScript, Go to Definition, Verificação de erros e outras.
