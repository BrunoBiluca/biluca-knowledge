
### GetIt

> [!info] Documentação
> - [Página do pacote](https://pub.dev/packages/get_it)

GetIt é uma alternativa para a utilização de injeção de dependências. Essa biblioteca utiliza o padrão Service Locator e é muito simples de configurar.

Exemplo de configuração

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

