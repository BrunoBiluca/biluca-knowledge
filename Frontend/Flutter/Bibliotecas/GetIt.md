---
categoria: biblioteca
---
### GetIt

> [!info] Documentação
> - [Página do pacote](https://pub.dev/packages/get_it)

GetIt é uma alternativa para a utilização de injeção de dependências. Essa biblioteca utiliza o **padrão Service Locator** e é muito simples de configurar.

#### Uso básico

```dart
import 'package:get_it/get_it.dart';

// Create a global instance (or use GetIt.instance)
final getIt = GetIt.instance;

// 1. Define your services
class ApiClient {
  Future<void> fetchData() async { /* ... */ }
}

class UserRepository {
  final ApiClient apiClient;
  UserRepository(this.apiClient);
}

// 2. Register them at app startup
void configureDependencies() {
  getIt.registerSingleton<ApiClient>(ApiClient());
  getIt.registerLazySingleton<UserRepository>(
    () => UserRepository(getIt<ApiClient>())
  );
}

// 3. Access from anywhere in your app
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // No BuildContext passing needed!
        getIt<UserRepository>().apiClient.fetchData();
      },
      child: Text('Fetch Data'),
    );
  }
}
```

#### Exemplo de configuração

```dart
// main.dart
GetIt getIt = GetIt.instance;

void main() async {
  getIt.registerSingleton<Database>(await DBProvider.i.database);
  getIt.registerFactoryParam<AccountabilityCurrentMonthService, String, void>(
    (month, _) => SQLiteAccontabilityCurrentMonthService(db: getIt<Database>(), month: month),
  );
  ...
}

// component.dart
void initState() {
    _currentMonthService = GetIt.I<AccountabilityCurrentMonthService>(param1: _selectedMonth);
}
```

