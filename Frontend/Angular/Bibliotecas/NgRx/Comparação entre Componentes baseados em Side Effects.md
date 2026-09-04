# Comparação entre Componentes baseados em Side Effects


> [!quote]- (Artigo) - [link](https://ngrx.io/guide/effects)
> Na documentação do [[NgRx]] tem uma seção muito boa explicando como que a utilização de um elemento de store reduz bastante da lógica de gerenciar estado de um componente, permitindo que ele implemente apenas o que é relevante para a apresentação e interação com o usuário.

Exemplo de um componente que explicitamente chama pelo serviço para apresentar uma lista de filmes:

```ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <li *ngFor="let movie of movies">
      {{ movie.name }}
    </li>
  `,
  imports: [CommonModule],
})
export class MoviesPageComponent implements OnInit {
  private moviesService = inject(MoviesService);
  protected movies: Movie[] = [];

  ngOnInit() {
    this.movieService
      .getAll()
      .subscribe((movies) => (this.movies = movies));
  }
}
```

Como podemos ver esse **componente tem várias responsabilidades:**

- Gerenciar o estado da lista de files
- Usar o serviço para buscar os filmes de um serviço externo
- Alterar o estado dos filmes no componente

Para **grandes aplicações**, onde são utilizadas várias fontes de dados em um único componente, isso pode se tornar um problema para manutenção.

Utilizando agora uma store:

```ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <div *ngFor="let movie of movies$ | async">
      {{ movie.name }}
    </div>
  `,
  imports: [CommonModule],
})
export class MoviesPageComponent implements OnInit {
  private store = inject(Store<{ movies: Movie[] }>);
  protected movies$ = this.store.select((state) => state.movies);

  ngOnInit() {
    this.store.dispatch({ type: '[Movies Page] Load Movies' });
  }
}
```

Toda a lógica de **gerenciamento do estado da lista de filmes foi movida para a store**. O componente não precisa mais saber como ela faz para buscar esses dados, ele apenas envia para a store um evento pedindo para carregar a lista, e quando os filmes estão prontos, eles retornados pelo selector declarado.