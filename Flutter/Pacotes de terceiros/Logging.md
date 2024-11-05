---
categoria: biblioteca
---
Implementação de gerenciamento de Logging para múltiplos destinos. Essa implementação utiliza como base o pacote `logging`.

> [!info] Pacote logging
> - [get.pub](https://pub.dev/packages/logging)

```dart
import 'package:logging/logging.dart';

// Interface para a implementação de destino do log
abstract class LoggingListener {
  Future<void> onData(LogRecord record) async {}
}

// Gerenciador do log
class LoggerManager {

  void init(List<LoggingListener> listeners) {
    Logger.root.level = Level.ALL;

    for (var l in listeners) {
      Logger.root.onRecord.listen(l.onData);
    }
  }

  Logger instance(String name) {
    return Logger(name);
  }
}

// Implementação de log por meio de console
class ConsoleLoggingListener extends LoggingListener {
  @override
  Future<void> onData(LogRecord record) async {
    print('${record.level.name}: ${record.time}: ${record.message}');
  }
}

// Implementação de log por meio de arquivos
class FileLoggingListener extends LoggingListener {
  @override
  Future<void> onData(LogRecord record) async {
    var f = File("logs.txt");
    var logstr = "${record.time} [${record.level.name}] : ${record.message}";
    if (record.error != null) logstr += " - ${record.error}";
    if (record.stackTrace != null) logstr += " - ${record.stackTrace}";
    await f.writeAsString('$logstr\n', mode: FileMode.append);
  }
}

// uso
var logger = LoggerManager()
    ..init([
      ConsoleLoggingListener(),
      FileLoggingListener(),
    ])

var log = logger.instance("Referência");

log.info("mensagem");
log.warning("aviso");
log.error("erro", erro, stacktrace);
```
