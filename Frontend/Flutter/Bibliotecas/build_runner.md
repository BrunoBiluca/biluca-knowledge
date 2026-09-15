---
categoria: biblioteca
---
### build_runner

> [!info] Informações gerais
> A `build_runner` code generator is called a _builder_.
> Usually, a builder adds some capability to your code that is inconvenient to add and maintain in pure Dart. Examples include serialization, data classes, data binding, dependency injection, and mocking.
> - [pub.dev](https://pub.dev/packages/build_runner)
> - [repositório](https://github.com/dart-lang/build/tree/master/build_runner)

For example, after following the `json_serializable` guide you will have these dependencies in your `pubspec.yaml`:

```yaml
dependencies:
  json_annotation: ^4.9.0

dev_dependencies:
  build_runner: ^2.6.0
  json_serializable: ^6.10.0
```

and activate it with code like

```dart
import 'package:json_annotation/json_annotation.dart';

// Include the file that the builder will generate.
part 'example.g.dart';.

// Activate the builder.
@JsonSerializable()
class Person {
  final String name;
  final DateTime? dateOfBirth;

  Person({required this.name, this.dateOfBirth});

  // Wire up the generated `toJson` in `example.g.dart`.
  Map<String, dynamic> toJson() => _$PersonToJson(this);

  // Wire up the generated `fromJson` in `example.g.dart`.
  factory Person.fromJson(Map<String, dynamic> json) => _$PersonFromJson(json);
}
```