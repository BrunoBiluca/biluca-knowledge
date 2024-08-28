# Testes

- [Testes](https://docs.flutter.dev/testing/overview)

# Mocks

## Mockito

> [!info] O que é?
> - [Mockito](https://pub.dev/packages/mockito)

O Mockito é uma biblioteca muito robusta para auxiliar no desenvolvimento de testes. Por ter um modelo que utiliza a geração de código a partir de anotações o Mockito pode não ser muito prático e flexível, já que para qualquer alteração no código devemos regerar o código Mock.

```dart
import 'package:mockito/annotations.dart'
import 'package:mockito/mockito.dart'

import 'cat.mocks.dart';

// REAL class
class Cat {
 // ...
}

// Annotation which generates the cat.mocks.dart library
@GenerateMocks([Cat])
void main() {
  // Create a mock object
  final cat = MockCat();
}
```

Para criar os mock é necessário construí-lo no com o comando:

```ps1
flutter pub run build_runner build
```


## Mocktail

> [!info] O que é?
> - [Página do pacote](https://pub.dev/packages/mocktail)

O Mocktail vem para flexibilizar um pouco mais a utilização de mocks em comparação com o Mockito, afinal ele é totalmente dinâmico e não ele não utiliza nenhuma geração de código para possibilitar a criação dos Mocks.

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
