---
categoria: biblioteca
---
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