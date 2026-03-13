### thenAnswerMany

```dart
// implementação
import 'package:mocktail/mocktail.dart';

extension WhenExtension<T> on When<T> {
  thenAnswerMany(List<Answer<T>> cbs) {
    return thenAnswer((invocation) {
      if (cbs.isEmpty) throw "No more answers available";
      return cbs.removeAt(0)(invocation);
    });
  }
}

// uso
when(() => mock.someMethod().thenAnswerMany([
  (_) => 1, // retorno da primeira chamada
  (_) => 2, // retorno da segunda chamada
]);
```