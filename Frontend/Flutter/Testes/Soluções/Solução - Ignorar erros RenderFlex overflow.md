# Solução - Ignorar erros RenderFlex overflow

O [[Flutter]] nativamente já verifica se a aplicação está de acordo com as dimensões da tela. Isso é uma prática boa já que permite automatizar como o conteúdo é renderizado em vários tipos de dispositivos, línguas e contextos.

Porém, muitas vezes queremos apenas verificar o comportamento do widget de forma isolada e nesses casos os erros de overflow de pixels não são muito relevantes.

```dart
// ignore_overflow_erros.dart
import 'package:flutter/material.dart';

void ignoreOverflowErrors(
  FlutterErrorDetails details, {
  bool forceReport = false,
}) {
  bool ifIsOverflowError = false;
  bool isUnableToLoadAsset = false;

  var exception = details.exception;
  if (exception is FlutterError) {
    ifIsOverflowError = !exception.diagnostics.any(
      (e) => e.value.toString().startsWith("A RenderFlex overflowed by"),
    );
    isUnableToLoadAsset = !exception.diagnostics.any(
      (e) => e.value.toString().startsWith("Unable to load asset"),
    );
  }

  if (ifIsOverflowError || isUnableToLoadAsset) {
    debugPrint('Ignored Error');
  } else {
    FlutterError.dumpErrorToConsole(details, forceReport: forceReport);
  }
}
```

E utilizamos essa função em cada testes que faça sentido ignorar tais erros.

```dart
// test.dart
void main() {
  testWidgets("should show summary values", (tester) async {
    FlutterError.onError = ignoreOverflowErrors;
    ...
  }
}
```