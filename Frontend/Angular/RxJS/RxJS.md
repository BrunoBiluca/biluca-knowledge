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
- [[Operadores]]

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

