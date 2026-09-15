---
categoria: biblioteca
---
# package_info_plus

> [!info] Informações gerais
> - [pub.dev](https://pub.dev/packages/package_info_plus)

This Flutter plugin provides an API for querying information about an application package.

Utilizado no projeto [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]] para exibir a versão da aplicação na Sidebar.

### Exemplo de uso básico

```dart
import 'package:package_info_plus/package_info_plus.dart';

...

// Be sure to add this line if `PackageInfo.fromPlatform()` is called before runApp()
WidgetsFlutterBinding.ensureInitialized();

...

PackageInfo packageInfo = await PackageInfo.fromPlatform();

String appName = packageInfo.appName;
String packageName = packageInfo.packageName;
String version = packageInfo.version;
String buildNumber = packageInfo.buildNumber;
```

> [!tip] Versão da aplicação
> Exibir o número de versão da aplicação, pode ser uma boa forma de coletar informações quando precisamos de depurar alguma coisa.