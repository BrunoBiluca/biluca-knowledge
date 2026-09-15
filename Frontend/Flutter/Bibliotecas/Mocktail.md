---
categoria: biblioteca
---
## Mocktail

> [!info] O que é?
> - [Página do pacote](https://pub.dev/packages/mocktail)

O Mocktail vem para flexibilizar um pouco mais a utilização de mocks em comparação com o Mockito, afinal ele é **totalmente dinâmico e não ele não utiliza nenhuma geração de código para possibilitar a criação dos Mocks.**

```dart
import 'package:mocktail/mocktail.dart';

// Real Cat class
class Cat {
  // ...
}

// Mock Cat Class
class MockCat extends Mock implements Cat{}

void main() {
  // Create a Mock Cat instance
  final cat = MockCat();
}
```

### Configuração de mocks dos métodos

```dart
class Navigator {  
	void push(Screen name) {}  
}  
  
class Screen {  
	final String name;  
	Screen(this.name);  
}

registerFallbackValue(Screen('login'));
when(() => mock.someMethod(any())).thenReturns(true);

mock.someMethod(Screen('logout')); // retorna true
```

Para utilizar `any()` ou `captureAny()` é necessário registrar um valor padrão para o parâmetro já que se o parâmetro não pode ser nulo, isso deve ser feito a partir do `registerFallbackValue(0)` que deve ser colocado em `setUpAll()`.

Só é necessário registrar um valor padrão para cada tipo e tipo primitivos já são tratados pela biblioteca.