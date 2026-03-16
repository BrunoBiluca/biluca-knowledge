## Reuso de testes entre componentes

> [!quote] (Implementação)
> - [[Biluca Notas Rápidas (Angular)]] implementa uma especificação para os componentes exibição em lista e em grade

Podemos utilizar o mesmo conjunto de testes para vários componentes de forma a garantir que certos conjuntos de comportamentos sejam definidos.

```ts
// specific-behavior.spec.ts

// ClassType é utilizado para tipificação
type ClassType<T> = new (...args: any[]) => T;

export function execSpecificBehaviorTests<T extends SomeClass>(
  // classType é utilizado para criar os componentes
  classType: ClassType<T>
) {
  let component: T;
  let fixture: ComponentFixture<T>;

  describe('Specific Behavior', () => {

    beforeEach(async () => {
       ...
       fixture = TestBed.createComponent(classType);
    });

    it('should behave like ...', () => {});
    }));
}
```

A classe acima define o comportamento compartilhado por todos os componentes que estendem a classe `SomeClass`.

As classes concretas então podem chamar os comportamento específico e também podem definir seus próprios comportamentos.

```ts
// concrete-a-component.spec.ts
describe('Concrete A', () => {
  execSpecificBehaviorTests<ConcreteA>(ConcreteA);
});
```

```ts
// concrete-b-component.spec.ts
describe('Concrete B', () => {
  execSpecificBehaviorTests<ConcreteB>(ConcreteB);
});
```
