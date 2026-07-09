# Formulários

### Máscara monetária em reais

```dart
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

class RealInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    if (newValue.selection.baseOffset == 0) {
      return newValue;
    }

    String currText = newValue.text;
    if (newValue.text == "-") {
      currText = "-0";
    }

    final formatter = NumberFormat.simpleCurrency(locale: "pt_Br");
    String newText = formatter.format(parse(currText)).replaceAll('\u00A0', " ");
    return newValue.copyWith(text: newText, selection: TextSelection.collapsed(offset: newText.length));
  }

  double parse(String value) =>
      double.parse(
        value.replaceAll('.', '').replaceAll(",", "").replaceAll("R\$", "").replaceAll(" ", "").trim(),
      ) /
      100;
}

// uso em um componente de campo
TextField(
  inputFormatters: [RealInputFormatter()],
);
```

