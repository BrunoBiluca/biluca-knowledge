# Exemplo - Temas de estilos

Uma funcionalidade muito comum a aplicações é permitir ao usuário controlar o modo de exibição da aplicação, principalmente em relação a modos claros e escuros.

Solução utilizada no [[Biluca Notas Rápidas (Angular)]].

Foram utilizados os seguintes elementos para a solução de temas:

- theme.service
	- Serviço responsável por gerenciar o estado de temas da aplicação
- theme-selector.component
	- Componente para seleção do tema pelo usuário
- theme-style.scss
	- Definição dos estilos disponíveis

Dessa forma foi possível isolar o comportamento geral dos temas de estilos em um único módulo.

Mesmo assim, se um componente precisa de se adaptar dependendo do estilo (como é um caso muito comum para imagens que precisam de ter sua cor invertida) ele pode referenciar no seu próprio arquivo de estilos como deve ser exibido.

## theme.service

- Gerencia o estado do tema selecionado
- Notifica em caso de mudança de temas

```ts
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  themes = [
    {
      theme: 'dark-mode',
      label: 'Dark mode',
      icon: 'dark_mode',
    },
    { theme: 'light-mode', label: 'Light mode', icon: 'light_mode' },
    { theme: 'system', label: 'Adaptar ao sistema', icon: 'settings_suggest' },
  ];

  readonly onThemeChange = new EventEmitter();

  init() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.change(theme);
    }
  }

  change(theme: string) {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove(
      ...this.themes.filter((t) => t.theme !== 'system').map((t) => t.theme)
    );

    // esse timeout é adicionado para dar tempo do document ter a classe devidamente alterada
    setTimeout(() => {
      this.onThemeChange.emit();
    }, 10);
    if (theme === 'system') {
      return;
    }

    document.documentElement.classList.add(theme);
  }
}
```

## theme-selector.component

- Permite ao usuário alterar o tema

Vários componentes de seleção de temas podem ser criados para adaptar aos diversos casos de uso na aplicação.

```ts
@Component({
  selector: 'theme-selector',
  imports: [MatIconModule, MatMenuModule, MatIconButton, MatTooltip],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.scss',
})
export class ThemeSelector implements OnInit {
  themeService = inject(Theme);

  ngOnInit(): void {
    this.themeService.init();
  }

  choose(theme: string) {
    this.themeService.change(theme);
  }
}
```

## theme-style.scss

- Define o comportamento da estilização da aplicação

```scss
@mixin apply-light-mode {
  color-scheme: light;
  // podemos definir variáveis de estilo de acordo com o tema
  // nesse caso por ser uma aplicação que utiliza o Angular Material
  --mat-button-text-label-text-color: #000000;
}

@mixin apply-dark-mode {
  color-scheme: dark;
  --mat-button-text-label-text-color: #ffffff;
}

html {
  color-scheme: light dark;
  --mat-button-text-label-text-color: light-dark(#000000, #ffffff);

  &.dark-mode {
    @include apply-dark-mode;

    // podemos definir classes específicas para determinados comportamentos de exibição
    // como esse caso para inverter a cor de imagens
    .adapt-dark-image {
      filter: invert(1);
    }
  }

  &.light-mode {
    @include apply-light-mode;
  }
}

```
