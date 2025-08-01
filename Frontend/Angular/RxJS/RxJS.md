# RxJS

[Documentação](https://rxjs.dev/guide/overview)

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. É uma biblioteca comumente utilizada em combinação com [[Angular]], de forma a implementar aplicações web de forma reativa.

> [!tip] RxJS vs Signals
> Angular inseriu a API de signals para adicionar computação reativa ao framework, existem algumas [vantagens](https://www.youtube.com/watch?v=iA6iyoantuo) na utilização de Signals em relação a RxJS.
> Exemplos:
> - Signals não necessitam de implementar disposable
> - Signals são glitch free
> - RxJS tem uma interface mais complexa que Signals
> 
> Mesmo assim RxJS tem mais funcionalidades do que apenas o Signals e pode ser indicado em outros cenários.

Principais elementos:

- [Observables](https://rxjs.dev/guide/observable)
	- São fluxos de dados que são utilizados pela aplicação para reagir as transformações a esses dados
- **Observer**
	- São um conjunto de callbacks executados quando um observable é alterado
- **Subscription**
	- Recurso descartável que armazena a referência da inscrição a um observable
- **Subjects**
	- Tipo especial de Observable
	- Utilizado para criar singletons na aplicação
	- BehaviourSubject é uma especialização do Subject muito utilizada para compartilhar dados entre componentes já que ele armazena os valores emitidos para seus inscritos
- **Scheduler**

Uma das principais vantagens de utilizar RxJS é a capacidade de utilizar [[Função pura]] diminuindo a possibilidade de erros.

Exemplo de vantagem ao utilizar o RxJS:

```js
// Padrão, temos um variável de fora do escopo da função sendo alterada
let count = 0;
document.addEventListener('click', () => console.log(`Clicked ${++count} times`));

// Versão utilizando rxjs
import { fromEvent, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(scan((count) => count + 1, 0)) // atualiza o estado da variável
  .subscribe((count) => console.log(`Clicked ${count} times`)); // quando count é atualizada é executada
```

RxJS disponibiliza uma grande quantidade de **operadores de fluxo** que ajudam a controlar como os eventos fluem pelos observables.

### Observable

São fluxos de dados que são utilizados pela aplicação para reagir as transformações a esses dados.

```ts
const observable = new Observable((subscriber) => {
	subscriber.next(...); // avisa os callbacks inscritos
	subscriber.complete();
})
```

Requisições HTTP e outras operações retornam observables e a aplicação deve reagir a esses valores a medida que eles são modificados.

### Observer

São um conjunto de callbacks executados quando um observable é alterado:

```ts
const observer = {
	next: (x: any) => ...,
	error: (err: any) => ...,
	complete: () => ...
}
```

Dessa forma podemos passar diretamente para o observable um observer.

## Operadores

### Criação

- `from(...)` criar um Observable a partir de um array de elementos, Promises e outras estruturas de dados a partir de cada valor retornado

- `of(...)` criar um Observable para cada valor passado
	- Muito utilizado para retorno de APIs

- `fromEvent(target, 'event')` cria um Observable a partir de um **elemento** algo (target) e o **evento** associado a esse elemento

- `interval(miliseconds)` cria um Observable que chamará o `next` de acordo com o tempo determinado

- `timer(miliseconds)` cria um Observable que será inicializado a partir do tempo definido

### Junção

- `forkJoin([Observables])` aguarda múltiplos observables e responde um objeto com cada chave referente a um resultado
	- Aguarda sempre o último valor emitido ou a conclusão do observable
	- Pode ser utilizado também para sincronizar requisições
	- Caso um erro ocorra em algum Observable, o forkJoin emite um erro

- `zip([Observables])` aguarda múltiplos observables e responde um array com cada posição referente a um resultado

- `merge([Observables])` aguarda múltiplos observables e responde cada resultado a medida que são disponibilizados

- `concat([Observables])` aguarda múltiplos observables e responde cada resultado em ordem de definição
	- Espera cada observable ser concluído para partir para o próximo

### Manipulação

#### Pipe

- `pipe([UnaryFunction<any, any>[]])` operador utilizado para encadear operações para um observable
	- Os demais operadores de manipulação são do tipo `UnaryFunction`

#### Map

- `map` mapeia cada elemento retornado pelo observable

#### SwitchMap

- `switchMap` altera o Observable de contexto para a inscrição
	- Pode ser utilizado para elencar várias requisições em ordem
	- Automaticamente cancela a inscrição da operação anterior e inscreve na próxima

```ts
...
// registra o click no elemento alvo
fromEvent(target, 'click') 
.pipe(
	// faz a primeira requisição
	switchMap(() => this.service.getA()) 
)
.pipe(
	// mapeia a resposta do getA
	map((a) => a.blah) 
	// troca o contexto para a resposta do getBlah
	switchMap((blah) => this.service.getBlah(blah)) 
)
.subscribe(console.log)
...
```

#### Take

- `take` determina a quantidade de objetos que serão recebidos do Observable (fonte)
	- Pode ser utilizado para definir estruturas como "Primeiros 5 valores" mesmo que a API retorne mais valores

#### Skip

- `skip` pula uma quantidade definida de objetos que serão recebidos do Observable (fonte)

#### DebounceTime

- `debounceTime` pula uma quantidade de tempo até liberar o Observable
	- Pode ser utilizado para buscas onde a requisição será feita apenas a partir de tantos caracteres, ou para ignorar uma sequência de eventos

```ts
fromEvent(this.textInput, 'keyup')
.pipe(
	// aguarda 1 segundo até não ter mais eventos 'keyup' para prosseguir no pipe
	debounceTime(1000), 
	map((event) => event.target.value),
	switchMap((name) => this.apiService.getByName(name))
)
.subscribe(...)
```

#### TakeUntil

- `takeUntil(Observable)` cancela a inscrição de um Observable dada a conclusão de outro Observable

```ts
interval(1000)
.pipe(
	// cancela geração de número quando o usuário clica na tela
	takeUntil(fromEvent(document, 'click'))
) 
.subscribe(console.log) // imprime no console os número gerados a cada segundo
```

#### TakeWhile

- `takeWhile((val) => ...)` cancela a inscrição quando o resultado de um Observable atende um predicado definido

#### combineLatest

Combina vários Observables (fontes) executando sempre a emissão mais recente da combinação dos resultados.

Pode ser utilizado para combinar requisições HTTP que precisam de compor dados para montar um modelo único.

#### share/sharedReplay

Faz um tipo de cache de um Observable. Operadores aplicados após o sharedReplay compartilham o resultado revisado.

Pode ser utilizado para aplicação de filtros provenientes de uma única requisição.

```ts
http.get(...)
.pipe(
	sharedReplay(1) // compartilha uma instância desse resultado
	share() // mesmo comportamento do sharedReplay(1)
)
.pipe(
	filter((value) => ...)
)
```

#### catchError

Operador captura um erro emitido pelo Observable.

Pode ser utilizado para tratar requisições a servidores ou serviços externos.

#### retry

Operador captura um erro e então reexecuta até uma quantidade limite definida.

### Operadores auxiliares

#### tap

`tap((val) => ...)` executa efeitos colaterais a uma notificação sem transformar a notificação

- Usar o `tap` permite deixar funções `map` sem efeitos colaterais o que as deixariam impuras
- Muito utilizado por exemplo
	- Para aplicar `console.log()` antes e depois de operações de transformação
	- Analisar elementos e lançar erros

### Operadores condicionais

#### every

Passa o Observable no pipe se todos os valores satisfazem uma condição.

#### filter

- `filter` seleciona a partir de um predicado quais elementos irão prosseguir ou não no fluxo
