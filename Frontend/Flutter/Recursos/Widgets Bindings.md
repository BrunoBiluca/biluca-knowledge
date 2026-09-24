# Widgets Bindings

[[Flutter]] permite criar vários tipos de ligações entre os [[Frontend/Flutter/Recursos/Widgets|Widgets]].

Se algum desses tipos de ligação for utilizado é necessário explicitamente iniciar o sistema. Isso porque o `runApp` no `main.dart`, cria essas ligações, porém precisamos ter essas ligações criadas, antes mesmo de rodar o `runApp`

```dart
WidgetsFlutterBinding.ensureInitialized();
```

Isso nos permite por exemplo, verificar quando o usuário clica no botão de fechar a aplicação:

```dart
class App extends StatelessWidget with WidgetsBindingObserver {
  @override
  Future<AppExitResponse> didRequestAppExit() async {
     ...
  }
  ...
}
```

