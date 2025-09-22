# Exemplo - Destaque de elementos

Estende o comportamento do elemento aplicando um tipo de destaque na sua inicialização.

```ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]' // Seletor da diretiva (usado como atributo HTML)
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: boolean = false; // Recebe um valor do template

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlight) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
      this.el.nativeElement.style.fontWeight = 'bold';
    }
  }
}
```

Uso da diretiva

```html
<div [appHighlight]="true">Texto destacado em amarelo!</div>
<div [appHighlight]="false">Texto sem destaque.</div>
```