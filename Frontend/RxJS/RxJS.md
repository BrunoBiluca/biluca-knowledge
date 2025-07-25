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
- Observer
- Subscription
- Subjects
- Scheduler

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
