# SQLite

Windows
- [Pacote - sqflite_common_ffi](https://pub.dev/packages/sqflite_common_ffi)
- [Tutorial de como utilizar SQLite no Windows](https://dev.to/ayoubzulfiqar/how-to-use-sqflite-on-windows-flutter-ggm)

Testes automatizados
- [Documentação para implementação de testes do sqflite utilizando o sqflite_common_ffi](https://github.com/tekartik/sqflite/blob/master/sqflite_common_ffi/doc/testing.md)

### sqflite_migration

Biblioteca para utilização de migrações utilizando o plugin sqflite.

- [Artigo com a utilização da biblioteca](https://medium.com/flutter-community/migrating-a-mobile-database-in-flutter-sqlite-44ac618e4897)
- [Repositório da biblioteca](https://github.com/flutterings/sqflite_migration)

> [!info] Para windows
> Verificar se essa biblioteca funciona para windows já que o plugin do SQLite é diferente.


# DBProvider

Uma forma de encapsular a utilização do banco de dados é criar uma estrutura que seja responsável por implementar operações relacionadas ao banco de dados, essa classe chamamos de `DBProvider`. Podemos definir essa classe como singleton ou não dentro da aplicação.

```dart
class DBProvider {
  DBProvider();
  static final DBProvider instance = DBProvider();
  static DBProvider get i => instance;

  Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;

    _database = await open();
    return _database!;
  }

  Future<String> getDBPath() async {
    final io.Directory appDocumentsDir = await getApplicationDocumentsDirectory();
    String dbPath = p.join(appDocumentsDir.path, "databases", "myDb.db");
    log("Caminho para o banco de dados: $dbPath");
    return dbPath;
  }

  void init() {
    if (io.Platform.isWindows || io.Platform.isLinux) sqfliteFfiInit();
    databaseFactory = databaseFactoryFfi;
  }

  Future<Database> open() async {
    return await databaseFactory.openDatabase(
      await getDBPath(),
      options: OpenDatabaseOptions(
        version: 1,
        onCreate: (db, version) => migrate(db, initialSQL),
        onUpgrade: (db, oldVersion, newVersion) async {
          log("Tabelas atualizadas");
          // await migrate(migrationsSQL);
        },
      ),
    );
  }

  Future migrate(Database db, List<String> migrationsSQL) async {
    log("Migrando tabelas...");
    for (final migration in migrationsSQL) {
      await db.execute(migration);
    }
    log("Migrations concluídas");
  }

  Future clear(Database db) async {
    log("Limpando banco de dados...");
    await databaseFactory.deleteDatabase(db.path);
    _database = null;
    log("Banco de dados limpo");
  }

  final initialSQL = [
    '''
    CREATE TABLE table_1 (
        ...
    )
    ''',
    '''
    CREATE TABLE table_2 (
        ...
    )
    '''
  ];

  final migrationsSQL = [];
}
```

Responsabilidade

- Inicializar as configurações da conexão com o SQLite (pode variar dependendo da plataforma)
- Abrir a conexão com o banco
- Criar o esquema
- Atualizar o esquema de acordo com as migrações
- Limpar o esquema (quando requisitado)

# Teste

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