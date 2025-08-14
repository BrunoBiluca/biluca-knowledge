# Gerenciamento de estados

Vínculos de dados suportados pelo [[Angular]]

- [Signals](https://angular.dev/guide/signals) (+v16)
	- API recomendada para projetos com a versão +16
	- Melhoria de reatividade, performance e simplicidade de código.
- Propriedades tradicionais (Two-way data binding)

## Signals

#### Comparação entre Signals e propriedades tradicionais

Signals apresentam uma nova forma de avisar componentes dependentes isso permite uma melhor performance:

- Componentes são alterados apenas pelos valores específicos
- Signals são otimizados para atualizar apenas o que é necessário

Também existe uma melhoria na simplicidade de código, já que agora existem funções próprias para alteração de estado.

```ts
count = signal(0);
doubleCount = computed(() => this.count() * 2);

// Atualiza o valor
this.count.set(5); // doubleCount() automaticamente vira 10
```

Signals também facilitam a sincronização de estado entre servidor e cliente, resolvendo alguns problemas comuns ao modelo mais tradicional de propriedades como:

- Hidratação ineficiente
- Vazamento de memória
- Dependência do Zone.js (Change Detection Ineficiente)
	- Remover essa dependência permite utilizar `async/await`
- Estados Assíncronos Complexos no SSR, a lógica utilizando RxJS pode ser um pouco mais complexa e gerar duplicação
- Computações Derivadas no Lado do Servidor

## Estado global

### Serviços com RxJS

Esse é uma implementação bem básica para a criação de estados globais na aplicação (Padrão Observable).

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  private state = new BehaviorSubject<any>({});
  currentState = this.state.asObservable();

  updateState(newState: any) {
    this.state.next({ ...this.state.value, ...newState });
  }
}

// Para atualizar
this.globalStateService.updateState({ user: userData });

// Para acessar
this.globalStateService.currentState.subscribe(state => {
  this.user = state.user;
});
```

O serviços `GlobalStateService` mantem a referência do estado e em qualquer ponto da aplicação que injete esse serviço pode aguardar por alterações nesse estado ou alterar o estado.

### NgRx

[Documentação](https://ngrx.io/docs)

É um framework para criação de aplicações reativas com [[Angular]].

NgRx vem com duas soluções para contextos diferentes de aplicações:

- Gerenciamento global e recorrente de dados, recomenda-se @ngrx/store
	- Essa solução é recomendada apenas para casos mais robustos como descrito em [Por que usar NgRx Store para gerenciamento de estado](https://ngrx.io/guide/store/why)

- Gerenciamento em nível de componente e poucas propriedades, recomenda-se @ngrx/signals