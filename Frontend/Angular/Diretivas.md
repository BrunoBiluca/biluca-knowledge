# Diretivas

Diretivas são instruções que estendem o comportamento ou a aparência de elementos HTML, componentes ou outras diretivas. Elas permitem manipular o DOM, adicionar lógica personalizada ou modificar estilos dinamicamente. Existem três tipos de diretivas no Angular:

1. [[Frontend/Angular/Componentes|Componentes]]: Diretivas com template (um tipo especializado de diretiva).
    
2. **Diretivas Estruturais**: Alteram a estrutura do DOM (ex: `*ngIf`, `*ngFor`).
    
3. **Diretivas de Atributo**: Modificam o comportamento ou aparência de um elemento (ex: `ngStyle`, `ngClass`).

#### Exemplo: Destaque de elementos

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