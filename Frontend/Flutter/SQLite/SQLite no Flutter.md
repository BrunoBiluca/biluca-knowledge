# SQLite no Flutter

Utilização do [[Bancos de dados/SQLite/SQLite|SQLite]] no [[Flutter]]

### Windows
- [Pacote - sqflite_common_ffi](https://pub.dev/packages/sqflite_common_ffi)
- [Tutorial de como utilizar SQLite no Windows](https://dev.to/ayoubzulfiqar/how-to-use-sqflite-on-windows-flutter-ggm)

### Testes automatizados
- [Documentação para implementação de testes do sqflite utilizando o sqflite_common_ffi](https://github.com/tekartik/sqflite/blob/master/sqflite_common_ffi/doc/testing.md)

### sqflite_migration

Biblioteca para utilização de migrações utilizando o plugin sqflite.

- [Artigo com a utilização da biblioteca](https://medium.com/flutter-community/migrating-a-mobile-database-in-flutter-sqlite-44ac618e4897)
- [Repositório da biblioteca](https://github.com/flutterings/sqflite_migration)
- [[Solução - Uso de SQLite com migrações]]

> [!info] Para windows
> Verificar se essa biblioteca funciona para windows já que o plugin do SQLite é diferente.

# Testes

Testes para o SQLite pode ser feito utilizando uma versão em memória.

```dart
void main() {
  setUpAll(() {
    MemoryDBProvider.i.init();
  });

  tearDown(() async {
    var db = await MemoryDBProvider.i.database;
    await db.close();
    await MemoryDBProvider.i.clear(db);
  });

  // testes ...
}
```

O `MemoryDBProvider` é uma extensão do `DBProvider` que sobrescreve a forma de abrir a conexão para garantir que seja utilizada a versão para memória.

```dart
class MemoryDBProvider extends DBProvider {
  MemoryDBProvider();
  static final MemoryDBProvider instance = MemoryDBProvider();
  static MemoryDBProvider get i => instance;

  @override
  Future<Database> open() async {
    return await databaseFactory.openDatabase(
      inMemoryDatabasePath,
      options: OpenDatabaseOptions(
        version: 1,
        onCreate: (db, version) async => await migrate(db, initialSQL),
        onUpgrade: (db, oldVersion, newVersion) async {},
        singleInstance: false,
      ),
    );
  }
}
```