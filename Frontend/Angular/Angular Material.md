# Angular Material

Componentes de Material Design aplicada ao [[Angular]]

A biblioteca Angular Material já disponibiliza várias [[Diretivas]] relacionadas aos seus componentes, permitindo assim estender seus comportamentos.

A partir do Angular Material versão 3, é possível configurar algumas variáveis de estilização definidas para cada componente.

### `<mat-menu>` ([doc](https://v5.material.angular.dev/components/menu/overview))

```html
<!-- Esse menu é acionado pelo botão -->
<!-- O atributo 'appMenu' relecionada os dois componentes -->
<mat-menu #appMenu="matMenu">
  <button mat-menu-item>Settings</button>
  <button mat-menu-item>Help</button>
</mat-menu>

<button mat-icon-button [matMenuTriggerFor]="appMenu">
  <mat-icon>more_vert</mat-icon>
</button>
```

### `<mat-button-toggle>`  ([doc](https://v5.material.angular.dev/components/button-toggle/overview))

Permite definir entre seleção exclusiva e seleção múltipla

- Por padrão o `mat-button-toggle-group` age como seleção exclusiva, apenas um elemento está selecionado
- Adicionando o atributo `multipiple` permite seleção múltipla

**Estilização**
- `--mat-standard-button-toggle-height` define o tamanho do botão de toggle

