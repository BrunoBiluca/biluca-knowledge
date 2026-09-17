# Navegação


Existem dois tipos de navegação em [[Flutter]]:

- **Navigator e context** - formato mais básico, cada página é empilhada no histórico de navegação
- **Routes** - formato mais sofisticado que permite uma configuração a partir de nomes das páginas para guia a navegação

> [!tip] URL
> Para evitar que um hash `#` seja adicionado a URL da aplicação, podemos utilizar a função  `setUrlPathStrategy()` na raiz do projeto.

## Navigator e contexto

Para utilizar o Navigator é necessário que o contexto passado seja provido por builder de um `MaterialApp` ou de um `WidgetsApp`

Exemplo de uso do Navigator para mover o usuário para um outro Widget.

```dart
class MyHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        child: Text("Foo"),
        onPressed: () => Navigator.of(context).push(Widget())), // context do MaterialApp
      ),
    );
  }
}
```

### Configuração

- `navigatorKey` permite que o Navigator seja manipulado sem um BuildContext.
	- No projeto [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]] foi utilizado para apresentar Toasts aos usuários

## Routes

Para utilizar o sistema de roteamento do [[Flutter]] precisamos configurar o `MaterialApp` para aceitar a configuração.

A principal estrutura responsável pelo roteamento é o [Router]()https://api.flutter.dev/flutter/widgets/Router-class.html

### Configuração

- `retorationScopeId` - salva e restaura o estado do Router

### Erro - Navigator operation requested with a context that does not include a Navigator

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