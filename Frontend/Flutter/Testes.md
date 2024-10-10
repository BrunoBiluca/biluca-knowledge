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
## Requisições HTTP

Para fazer o mock de requisições HTTP precisamos definir um cliente HTTP (`MockClient` do pacote `http`) que será mockado e definir seu comportamento:

```dart
import 'package:http/http.dart';

var client = MockClient((req) async {
  if (req.url.pathSegments.last != "predict") {
	return Response("", 404);
  }

  return Response(jsonEncode({body...}), 200);
});
    
final service = PredictService(client, repo);
```

- `req.url`: captura as informações da url como querystring, caminho, domínio e outros parâmetros
- `req.body`: captura as informações enviadas no corpo da requisição

## Códigos utilitários

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