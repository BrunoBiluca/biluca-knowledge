# Conflito de cor entre texto e fundo

Um problema bem comum em componentes que são constituídos por texto e uma cor de fundo é definir a cor de ambos. Dependendo da combinação o texto pode ficar ilegível.

Uma solução simples para esse problema é definir a cor do fundo e ajustar a cor do texto de acordo com a luminância dessa cor. Para isso podemos fazer uma simples função:

```dart
Color textColor() {
	return widget.color.computeLuminance() > 0.5
		? Colors.black
		: Colors.white;
}
```
