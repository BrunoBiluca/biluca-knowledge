# Exemplo - Ajustar à cor de fundo

Um recurso muito comum a aplicações que permitem ao usuário alterar cores dentro da aplicação (cards por exemplo) é ajustar elementos fixos, como botões, a terem uma cor que seja visível para o usuário independente do que o usuário aplicar de cor.

Uma forma de resolver esse problema é criar uma diretiva específica para ajudar a cor do elemento de acordo com a luminância da cor de fundo.

> [!quote] Utilizado em
> - [[Biluca Notas Rápidas (Angular)]] para controlar a cor dos botões nas notas rápidas.
> 	- Caminho para o cálculo de luminosidade `app/common/colors-function.ts`
> 	- Caminho para a diretiva `app/shared/adapt-custom-color`

```ts
@Directive({
  selector: '[adaptCustomColor]',
})
export class AdaptCustomColor implements OnInit, OnChanges {
  @Input('adaptCustomColor') adaptCustomColor: string | undefined;
  el = inject(ElementRef);
  document = inject(DOCUMENT);

  ngOnInit(): void {
    this.applyColorClass();
    this.applyBgColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['adaptCustomColor']) {
      this.applyColorClass();
      this.applyBgColor();
    }
  }

  applyColorClass() {
    if (!this.adaptCustomColor) {
      return;
    }
    
    // atualiza a classe CSS do elemento dependendo do fundo
    this.el.nativeElement.classList.remove('bg-light', 'bg-dark');
    this.el.nativeElement.classList.add(
      calculateLuminanceHex(this.adaptCustomColor) > 0.5
        ? 'bg-light'
        : 'bg-dark'
    );
  }

  applyBgColor() {
    // Busca o plano de fundo da tela inteira
    const computedStyle = window.getComputedStyle(this.document.body);
    const surfaceColor = computedStyle.backgroundColor;

    const bgColor =
      this.adaptCustomColor === null || this.adaptCustomColor === undefined
        ? surfaceColor
        : this.adaptCustomColor;

    const { r, g, b } = parseRGB(surfaceColor);
    const surfaceColorLum = calculateLuminanceRGB(r, g, b);
    const bgColorLum = calculateLuminanceHex(bgColor);
    
    // Essa borda é um charmezinho
    // Se a diferença entre a cor customizada e a cor de funda da págian for muito baixa
    // É adicionada uma bor com a cor inversa
    const borderColor =
      Math.abs(surfaceColorLum - bgColorLum) < 0.05
        ? invertHex(bgColor)
        : surfaceColor;

	// atualiza a cor de fundo e a borda
    this.el.nativeElement.style =
      'background-color: ' + bgColor + '; border: 1px solid ' + borderColor;
  }
}
```