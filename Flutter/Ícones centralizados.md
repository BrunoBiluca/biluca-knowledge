# Ícones centralizados

O flutter tem por padrão ícones quadrados que garante a renderização centralizada, porém quando estamos utilizando ícones de outros pacotes não temos essa garantia, o que pode levar a ícones desalinhas quando estes são retangulares.

Para isso não existe um solução nativa e é necessário renderizar os ícones como texto, o seguinte widget pode ser utilizado no lugar do widget `Icon` para garantir a renderização desejada.

```dart
import 'package:flutter/material.dart';

class CenteredIcon extends StatelessWidget {
  const CenteredIcon({
    super.key,
    required this.icon,
    this.color,
    this.size,
  });

  final IconData icon;
  final Color? color;
  final double? size;

  @override
  Widget build(BuildContext context) {
    return Text(
      String.fromCharCode(icon.codePoint),
      style: TextStyle(
        inherit: false,
        fontSize: size,
        fontFamily: icon.fontFamily,
        package: icon.fontPackage,
        color: color,
      ),
    );
  }
}
```
