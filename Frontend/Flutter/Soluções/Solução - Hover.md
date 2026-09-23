# Solução - Hover

> [!example] Projetos relacionados
> - [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]]

O [[Flutter]] não disponibiliza uma funcionalidade de hover para seus Widgets por padrão.

## Hover para mouse

O Widget `HoverWrapper` envolve o widget filho para verificar a posição do mouse.

```dart
import 'package:flutter/material.dart';

class HoverWrapper extends StatelessWidget {
  final Function(bool) onHover;
  final Widget child;
  const HoverWrapper({
    super.key,
    required this.onHover,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      onEnter: (event) => onHover(true),
      onExit: (event) => onHover(false),
      child: child,
    );
  }
}
```