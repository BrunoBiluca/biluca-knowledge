# Uso de teclado (windows)

Para utilizar teclados e outros periféricos utilizamos a biblioteca `service`.

```dart
import 'package:flutter/services.dart';
  
// ... demais código
@override
void initState() {
	ServicesBinding.instance.keyboard.addHandler(_onKey);
}

@override
void dispose() {
	ServicesBinding.instance.keyboard.removeHandler(_onKey);
}

bool _onKey(KeyEvent event) {
	String key = event.logicalKey.keyLabel;	
	if (event is KeyDownEvent && key == "Arrow Down") {
		// ...
	} else if (event is KeyDownEvent && key == "Arrow Up") {
		// ...
	} else if (event is KeyDownEvent && key == "Enter") {
		// ...
	}
	return false;
}
// ... demais código
```

