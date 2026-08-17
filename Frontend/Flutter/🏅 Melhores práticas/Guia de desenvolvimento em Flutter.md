# Guia de desenvolvimento em Flutter


Algumas considerações gerais sobre desenvolvimento de aplicações em [[Flutter]].

# Notificações do Linter

#### Don't use BuildContexts across async gaps

> [!info] [Documentação](https://dart.dev/tools/linter-rules/use_build_context_synchronously)

Utilizar o BuildContext após espaços assíncronos pode levar a dois problemas:

- Dificuldade em diagnosticar quebras no aplicativo já que o contexto utilizado pode estar se referindo a um widget que não está montado na árvore
- Vazamento de memória, já que estamos armazenando contextos em variável que deveriam ser descartadas

```dart
class MyCustomClass {
  const MyCustomClass();

  Future<void> myAsyncMethod(BuildContext context) async {
    Navigator.of(context).push(/* waiting dialog */);
    await Future.delayed(const Duration(seconds: 2));
    if (!context.mounted) return; // utilizar essa verificação garante que não ocorrerão problemas com o contexto
    Navigator.of(context).pop();
  }
}
```
