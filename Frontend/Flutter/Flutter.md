---
tags:
  - programação/frameworks
---
> [!info] O que é?
> Flutter é um framework multiplataforma para a criação de aplicações.
> Utiliza a linguagem [Dart](https://dart.dev/overview) para desenvolvimento
> 
> [Documentação](https://docs.flutter.dev/)

Flutter é muito inspirado pelo React, tanto em seus componentes quanto no formato de desenvolvimento.

Vantagens

- Poder utilizar uma única base de código para várias plataformas como Windows, Linux, Web, Android, iOS e muitas outras
- Apresenta uma ótima performance
- Material Design disponível desde o começo

Funcionalidades

- [Material components](https://docs.flutter.dev/ui/widgets/material)
- [Temas](https://docs.flutter.dev/cookbook/design/themes)
- [Testes](https://docs.flutter.dev/testing/overview)

Gráficos

- [https://github.com/imanneo/fl_chart](https://github.com/imanneo/fl_chart)
- [https://pub.dev/packages/fl_chart/install](https://pub.dev/packages/fl_chart/install)

Integração com Windows

- [https://dzone.com/articles/build-great-windows-desktop-apps-with-flutter](https://dzone.com/articles/build-great-windows-desktop-apps-with-flutter)
	- Esse artigo apresenta algumas limitações que o desenvolvimento de aplicações para Windows possui

Deploy

- Empacotamento do sistema de identificação com o app
    - [https://dev.to/maximsaplin/integrating-flutter-all-6-platforms-and-python-a-comprehensive-guide-4ipo](https://dev.to/maximsaplin/integrating-flutter-all-6-platforms-and-python-a-comprehensive-guide-4ipo)
    - [https://github.com/maxim-saplin/flutter_python_starter](https://github.com/maxim-saplin/flutter_python_starter)

# Principais componentes

Layouts

- [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html): layout padrão que já permite várias configurações como barra do app, footer, body e vários outros.

Componentes prontos

- AppBar: barra superior do app utilizado em todas as páginas

# Utilizando SQLite

Windows
- https://pub.dev/packages/sqflite_common_ffi
- [Tutorial de como utilizar SQLite no Windows](https://dev.to/ayoubzulfiqar/how-to-use-sqflite-on-windows-flutter-ggm)

Testes automatizados
- [Documentação para implementação de testes do sqflite utilizando o sqflite_common_ffi](https://github.com/tekartik/sqflite/blob/master/sqflite_common_ffi/doc/testing.md)

# Desenvolvimento

Injeção de dependências
- [https://pub.dev/packages/get_it](https://pub.dev/packages/get_it)

ORM
- https://pub.dev/packages/orm
	- funciona apenas com iOS/Android e banco de dados SQLite


### sqflite_migration

Biblioteca para utilização de migrações utlizando o plugin sqflite

- https://medium.com/flutter-community/migrating-a-mobile-database-in-flutter-sqlite-44ac618e4897
- https://github.com/flutterings/sqflite_migration

> [!info] Para windows
> Verificar se essa biblioteca funciona para windows já que o plugin do SQLite é diferente.

# Referências

- [Tutorial de Flutter](https://www.youtube.com/watch?v=1ukSR1GRtMU&list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ)