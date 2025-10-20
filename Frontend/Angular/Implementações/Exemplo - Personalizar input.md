# Exemplo - Personalizar input

Os elementos de input do HTML são pouco personalizáveis, para isso precisamos de esconder os elementos de input originais e utilizar apenas a sua funcionalidade.

Em [[Angular]] podemos referenciar o elemento de input a partir de uma referência direta.

```html

<input
	#colorInput                        -- Referência direta
	style="display: none"              -- Escondemos o elemento
	type="color"
	name="color"
	[(ngModel)]="color"                -- Two-way binding com o modelo
	(ngModelChange)="update()"         -- Continuamos utilizando os mesmos eventos do input 
/>
<button                                -- Estilizamos o botão da forma que queremos
	type="button"
	(click)="colorInput.click()"       -- Invoca o input de cor
>
	Cor
</button>
```