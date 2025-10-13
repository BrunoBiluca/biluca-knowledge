# Sinais

A partir do Angular v17 foram adicionados os sinais, uma nova forma de passagem de parâmetros e controle de estado entre os componentes.

Vantagens da utilização de sinais sobre o modelo Two-way binding tradicional:

- **Reatividade automática**
	- Para um @Input é necessário utilizar o NgChanges e atualizar o valor manualmente 
- **Type-safe obrigatório/opcional**
- **Transformação integrada**
- **Melhor performance com signals**

> [!warning] Sinais vs Eventos
> Sinais são estruturas utilizadas principalmente para gerenciamento de estado. Mesmo que elas emitam eventos de mudança de estado, utilizar sinais para inscrição em eventos não é o ideal, a interface para isso com [[RxJS]] é muito mais eficiente.

#### Input e Output

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

### Model

Model é uma forma de aplicar two-way binding com sinais. 

Um caso de uso particularmente bom com sinais model são formulários. Como formulários apresentam vários campos, o model provê ligação nos dois sentidos entre todos os componentes do formulário.

```ts
@Component({
  selector: 'app-toggle-group',
  template: `
  ...
  `
})
export class ToggleGroupComponent {
  options = input<{value: string; label: string}[]>();
  selectedValues = model<string[]>([]);

  isSelected(value: string): boolean {
    return this.selectedValues().includes(value);
  }

  toggleOption(value: string) {
    this.selectedValues.update(current => {
      const newValues = current.includes(value)
        ? current.filter(v => v !== value) // Remove
        : [...current, value]; // Adiciona
      return newValues;
    });
  }
}

// Uso
@Component({
  template: `
    <app-toggle-group 
      [options]="interests"
      [(selectedValues)]="userInterests" />
  `
})
export class SettingsComponent {
  interests = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ];
  userInterests = ['angular'];
}
```

### Computed

Computed é um sinal específico que depende de um sinal e sempre que esse sinal é atualizado ele também sinaliza a atualização do computed.

```ts
// sinal principal que armazena em memória as imagens
images = signal<File[]>([]);

// computa as imagens em URL para exibição na página
imagesPreview = computed(() =>
	this.images().map((image) => URL.createObjectURL(image))
);
```

#### Comparação entre Signals e propriedades tradicionais

Signals apresentam uma nova forma de avisar componentes dependentes isso permite uma melhor performance:

- Componentes são alterados apenas pelos valores específicos
- Signals são otimizados para atualizar apenas o que é necessário

Também existe uma melhoria na simplicidade de código, já que agora existem funções próprias para alteração de estado.

```ts
count = signal(0);
doubleCount = computed(() => this.count() * 2);

// Atualiza o valor
this.count.set(5); // doubleCount() automaticamente vira 10
```

Signals também facilitam a sincronização de estado entre servidor e cliente, resolvendo alguns problemas comuns ao modelo mais tradicional de propriedades como:

- Hidratação ineficiente
- Vazamento de memória
- Dependência do Zone.js (Change Detection Ineficiente)
	- Remover essa dependência permite utilizar `async/await`
- Estados Assíncronos Complexos no SSR, a lógica utilizando RxJS pode ser um pouco mais complexa e gerar duplicação
- Computações Derivadas no Lado do Servidor

