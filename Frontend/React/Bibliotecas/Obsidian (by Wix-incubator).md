---
categoria: biblioteca
---
# Obsidian (by Wix-incubator)

> [!info] Links
> - [Repositório](https://github.com/wix-incubator/obsidian)
> - [Exemplo de utilização - Tic tac toe](https://github.com/guyca/obsidian-tic-tac-toe)
> - [Documentação](https://wix-incubator.github.io/obsidian/docs/documentation/#the-2-steps-tutorial-for-injecting-dependencies-with-obsidian)

Obsidian é um container de injeção de dependências seguindo o [[Princípio Inversão de dependências]].

Ela permite injetar dependências em componentes, hooks e classes, resolvendo a limitação inicial dos hooks no [[React]] que não permite sua utilização em classes puras.

Principais funcionalidades do [[Obsidian (by Wix-incubator)]] :

- Grafos são estruturas para definir a construção das instâncias
	- Também permite
		- Subgrafos
		- Grafos abstratos
		- Referências por tipos
- Injeção de dependências em componentes, hooks e classes puras
- Reactividade, disponibiliza uma implementação simples do padrão Observable.
- Service Locator

### Configuração básica

Um grafo é definido para declarar todos os providers que serão utilizados.

Nesse caso ele deve ser marcado como `@graph()`

```ts
import {singleton, graph, ObjectGraph, provides} from 'react-obsidian';

@singleton() @graph()
export class ApplicationGraph extends ObjectGraph {
  @provides()
  httpClient(): HttpClient {
    return new HttpClient();
  }

  @provides()
  databaseService(): DatabaseService {
    return new DatabaseService();
  }
}
```

