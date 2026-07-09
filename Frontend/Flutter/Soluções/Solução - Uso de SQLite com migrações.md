# Solução - Uso de SQLite com migrações

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