# Angular CDK

É um conjunto de ferramentas e utilidades providas pelo time do Angular para reuso de funcionalidades comuns de aplicações em [[Angular]]

Exemplos de utilidades:

- Drag and Drop
- Overlay
- Scrolling
- Clip board


## Drag and Drop

#### Solução para elementos móveis e clicáveis

Para esse tipo de elementos que são tanto móveis quanto clicáveis é necessário implementar um pequeno hack, já que quando o elemento é clicável ele aciona o click antes de permitir movê-lo.

```html
<div
  cdkDropList
  (cdkDropListDropped)="drop($event, otherNotes)"
>
  <div
    cdkDrag
    (cdkDragStarted)="isDragging.set(true)"
    (cdkDragEnded)="handleDragEnd($event)"
    routerLink="..."
	[routerLinkActive]="!isDragging() ? 'active' : ''" -- desativa o routerLink enquanto está sendo movido
  >
    ...
  </div>
</div>
```

```ts
export class AppComponent {
  isDragging = signal<boolean>(false);

  drop(event: CdkDragDrop<any, any, any>, list: Note[]) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }

  handleDragEnd($event: CdkDragEnd<any>) {
    // Adiciona um timeout para desativiar o click enquanto o elemento é largado
    setTimeout(() => this.isDragging.set(false), 10);
  }
}
```

## Clipboard

[Documentação](https://material.angular.dev/cdk/clipboard/overview)

Ajuda a trabalhar com o Clipboard do sistema.

```html
<button [cdkCopyToClipboard]="value">Copiar</button>
```

Para textos pequenos pode-se utilizar apenas o método de copy `clipboard.copy(string)`.

Para textos maiores o navegador precisa de tempo para realizar a operação. Nesses casos é necessário fazer um sistema de tentativas em caso o navegador cancele a operação de cópia.