# Solução - Mocks de serviços

> [!example] [[Projeto - Biblioteca de Jogos]]

Exemplo de uma classe de Mock que permite ser reutilizada durante todos os testes.

Essa implementação permite:

- Replicar a interface do GameService
- Configurar condições específicas para o serviço, como retornos personalizados, lançamentos de erros
- Configurar uma instância específica para casos que precisem de mais flexibilidade ainda

```ts
import { Game } from '@/core/game/game.model';
import { GameService } from '@/core/game/game.service';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

export class MockGameService implements GameService {
  mockGames: Game[] = [
    ...
  ];


  getGames = vi.fn(() =>
    of({
      games: this.mockGames,
      total: this.mockGames.length,
    }),
  );
  createGame = vi.fn();
  updateGame = vi.fn();
  deleteGame = vi.fn();
  getGameById = vi.fn(() =>
    of({
	...
	} as Game),
  );

  toCustom = (pagedGames: Game[]) => {
    this.getGames.mockReturnValue(
      of({
        games: pagedGames,
        total: this.mockGames.length,
        availableGenres: this.mockGenres,
      }),
    );
    return this;
  };

  withError = () => {
    const error = new Error('Failed to load games');
    this.getGames.mockImplementation(() => throwError(() => error));
    return this;
  };
}
```

Configuração do ambiente:

```ts
export function provideGameServiceMock(
  gameService?: MockGameService,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: GameService,
      useValue: gameService ?? new MockGameService(),
    },
    {
      provide: MockGameService,
      useValue: gameService ?? new MockGameService(),
    },
  ]);
}
```