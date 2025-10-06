---
tags:
  - programação/frameworks
categoria: framework
---
# Flutter

> [!info] O que é?
> Flutter é um framework multiplataforma para a criação de aplicações.
> Utiliza a linguagem [[Dart]] para desenvolvimento.
> 
> - [Documentação](https://docs.flutter.dev/)
> - [Tutorial de Flutter](https://www.youtube.com/watch?v=1ukSR1GRtMU&list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ)
>- [Filledstacks - Site voltado a tutoriais simples e diretos de flutter](https://www.filledstacks.com/)

Flutter é muito inspirado pelo React, tanto em seus componentes quanto no formato de desenvolvimento.

Vantagens

- Poder utilizar uma única base de código para várias plataformas como Windows, Linux, Web, Android, iOS e muitas outras
- Apresenta uma ótima performance
- Material Design disponível desde o começo

Funcionalidades

- [Material components](https://docs.flutter.dev/ui/widgets/material)
- [Temas](https://docs.flutter.dev/cookbook/design/themes)

Integração com Windows

- [https://dzone.com/articles/build-great-windows-desktop-apps-with-flutter](https://dzone.com/articles/build-great-windows-desktop-apps-with-flutter)
	- Esse artigo apresenta algumas limitações que o desenvolvimento de aplicações para Windows possui

### Melhores práticas e padrões

- [[Arquitetura limpa para Flutter]]
- [[Padrão BLoC]]
- [[Testes]]

Uma das práticas de desenvolvimento de software que mais ajudam a manter o projeto legível e testável é a [[Injeção de dependências]].

Em Flutter temos as seguintes bibliotecas que nos ajudam nessa tarefa:

- [[GetIt]]

# Principais componentes

Layouts

- [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html): layout padrão que já permite várias configurações como barra do app, footer, body e vários outros.

Componentes prontos

- AppBar: barra superior do app utilizado em todas as páginas

## Navigator

### Navigator e contexto

Para utilizar o Navigator é necessário que o contexto passado seja provido por builder de um `MaterialApp` ou de um `WidgetsApp`

Caso o **erro: Navigator operation requested with a context that does not include a Navigator** está ocorrendo o contexto utilizado pode ser referência ao pai dos widgets necessários. 

Exemplo de uma versão que ocorre o erro:

```dart
// causa o erro por utilizar o contexto pai do MaterialApp
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: RaisedButton(
          child: Text("Foo"),
          onPressed: () => Navigator.pushNamed(context, "/"), // context do MyApp
        ),
    );
  }
}
```

Correção do erro por meio da separação em uma classe de widget específica:

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHome()
    );
  }
}

class MyHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        child: Text("Foo"),
        onPressed: () => Navigator.pushNamed(context, "/"), // context do MaterialApp
      ),
    );
  }
}
```

# StatelessWidget vs StatefulWidget

> [!info] Links úteis
> - [StatelessWidget vs StatefulWidget](https://www.flutterclutter.dev/flutter/basics/statelesswidget-vs-statefulwidget/2020/1195/)

# Visual e estilo

- [[Flutter/Estilização/Estilização|Estilização]]

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

# Publicação

A publicação de um app em flutter deve ser feito pelo comando:

```powershell
flutter build <plataforma>
```

Nesse processo o flutter busca todos os arquivos definido no `pubspec.yaml`.

> [!info]- Especificidades do windows
> - `*.dll(s)` específicas devem ser copiadas para a pasta de `./build\windows\x64\runner\Release`.

> [!tip] Logging
> Logging é uma funcionalidade crucial principalmente após a publicação já que perdemos a possibilidade de verificar o console para as mensagens da aplicação e é necessário exibir essas informações em um formato de texto.
> 
> Para isso podemos utilizar a implementação definida em [[Logging]]


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

