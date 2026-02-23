# Testes

- [Testes](https://docs.flutter.dev/testing/overview)

# Mocks

[[Mockito]]
[[Mocktail]]
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