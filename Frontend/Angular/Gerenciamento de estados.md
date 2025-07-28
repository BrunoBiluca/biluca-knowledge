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