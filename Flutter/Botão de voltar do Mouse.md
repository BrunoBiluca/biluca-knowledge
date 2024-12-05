# Botão de voltar do Mouse

Em [[Flutter]] o botão de voltar do Mouse é capturado como qualquer outro evento de pressionamento de botão ([PointerEvent-class](https://api.flutter.dev/flutter/gestures/PointerEvent-class.html)), porém por padrão não apresenta nenhum comportamento.

Para utilizar o botão de voltar é necessário definir uma classe [Listerner](https://api.flutter.dev/flutter/widgets/Listener-class.html) que consegue capturar os eventos do mouse e então verificar se o botão foi pressionado.

Abaixo tem um exemplo de implementação de um Widget que retorna o contexto quando o botão de voltar do mouse é pressionado.

```dart
import 'package:flutter/material.dart';

class MouseBackButtonListener extends StatelessWidget {
  final Widget child;

  const MouseBackButtonListener({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: (event) => onBackButtonPressed(event, context),
      child: child,
    );
  }

  void onBackButtonPressed(PointerDownEvent event, BuildContext context) {
    var mouseBackButtonValue = 8;
    if (event.buttons != mouseBackButtonValue) return;

    Navigator.pop(context);
  }
}
```

Podemos utilizar essa classe da seguinte forma:

```dart
import 'package:biluca_financas/components/mouse_back_button_listener.dart';
import 'package:flutter/material.dart';

class BaseDialog extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MouseBackButtonListener(
      child: AlertDialog(
	      // propriedades
      ),
    );
  }
}
```

Assim sempre que um evento do mouse for disparado dentro dos limites do filho do `MouseBackButtonListener` ele irá retornar o contexto.