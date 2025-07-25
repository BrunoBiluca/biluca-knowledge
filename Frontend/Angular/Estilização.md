# Estilização

#### Estilização dinâmica

Um caso muito comum de estilização é permitir a configuração dos elementos da tela pelo próprio usuário. Para isso é necessário vincular dados de origem do usuário com CSS.

Uma das formas de conseguir resolver esse problema é fazer alterar o elemento host de acordo com a exibição desejada.

```ts
@Component({
  ...,
  host: {
    // altera o grid area na estilização de um span para o número de row e columns
	'[style.grid-area]': '"span " + rows + "/ span " + columns',
	// adiciona a classe active quando isActive é verdade e remove quando é falso
    '[class.active]': 'isActive()'
  },
})
export class CustomSlider {
  isActive = signal(false);
  rows = signal(2)
  columns = signal(2)
}
```