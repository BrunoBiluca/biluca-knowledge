---
tags:
  - programação/frameworks
---
> [!info] O que é?
> Flutter é um framework multiplataforma para a criação de aplicações.
> Utiliza a linguagem [Dart](https://dart.dev/overview) para desenvolvimento
> 
> - [Documentação](https://docs.flutter.dev/)
> - [Tutorial de Flutter](https://www.youtube.com/watch?v=1ukSR1GRtMU&list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ)
>- [Filledstacks - Site voltado a tutoriais simples e diretos de flutter](https://www.filledstacks.com/)


Flutter é muito inspirado pelo React, tanto em seus componentes quanto no formato de desenvolvimento.

Vantagens

- Poder utilizar uma única base de código para várias plataformas como Windows, Linux, Web, Android, iOS e muitas outras
- Apresenta uma ótima performance
- Material Design disponível desde o começo

Funcionalidades

- [Material components](https://docs.flutter.dev/ui/widgets/material)
- [Temas](https://docs.flutter.dev/cookbook/design/themes)

Integração com Windows

- [https://dzone.com/articles/build-great-windows-desktop-apps-with-flutter](https://dzone.com/articles/build-great-windows-desktop-apps-with-flutter)
	- Esse artigo apresenta algumas limitações que o desenvolvimento de aplicações para Windows possui

Deploy

- Empacotamento do sistema de identificação com o app
    - [https://dev.to/maximsaplin/integrating-flutter-all-6-platforms-and-python-a-comprehensive-guide-4ipo](https://dev.to/maximsaplin/integrating-flutter-all-6-platforms-and-python-a-comprehensive-guide-4ipo)
    - [https://github.com/maxim-saplin/flutter_python_starter](https://github.com/maxim-saplin/flutter_python_starter)

Padrões

- [[Padrão BLoC]]

# Principais componentes

Layouts

- [Scaffold](https://api.flutter.dev/flutter/material/Scaffold-class.html): layout padrão que já permite várias configurações como barra do app, footer, body e vários outros.

Componentes prontos

- AppBar: barra superior do app utilizado em todas as páginas


## Navigator

### Navigator e contexto

Para utilizar o Navigator é necessário que o contexto passado seja provido por builder de um `MaterialApp` ou de um `WidgetsApp`

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

# StatelessWidget vs StatefulWidget

> [!info] Links úteis
> - [StatelessWidget vs StatefulWidget](https://www.flutterclutter.dev/flutter/basics/statelesswidget-vs-statefulwidget/2020/1195/)

# Desenvolvimento

- [[Injeção de dependência]]
- [[SQLite para Flutter]]
- [[Testes]]

ORM
- https://pub.dev/packages/orm
	- funciona apenas com iOS/Android e banco de dados SQLite

# Gráficos (Charts)

### fl_chart

>[!info] Documentação
> - [Página do pacote](https://github.com/imanneo/fl_chart)

Biblioteca para a renderização de gráficos. Possui um grande número de tipos de gráficos disponíveis e várias opções.

Exemplo de um gráfico de barras

```dart
// ...
BarChart(
  BarChartData(
	alignment: BarChartAlignment.spaceEvenly,
	titlesData: FlTitlesData(
	  show: true,
	  bottomTitles: AxisTitles(
		sideTitles: SideTitles(
		  showTitles: true,
		  reservedSize: 28,
		  getTitlesWidget: bottomTitles,
		),
	  ),
	  leftTitles: const AxisTitles(
		sideTitles: SideTitles(
		  showTitles: true,
		  reservedSize: 40,
		),
	  ),
	  // os títulos são exibidos por padrão
	  topTitles: const AxisTitles(
		sideTitles: SideTitles(showTitles: false),
	  ),
	  rightTitles: const AxisTitles(
		sideTitles: SideTitles(showTitles: false),
	  ),
	),
	gridData: FlGridData(
	  show: true,
	  checkToShowHorizontalLine: (value) => value % 5 == 0,
	  getDrawingHorizontalLine: (value) => FlLine(
		color: Colors.grey.withOpacity(.5),
		strokeWidth: 1,
	  ),
	  drawVerticalLine: false,
	),
	borderData: FlBorderData(
	  show: false,
	),
	barGroups: barGroups(),
  ),
)
// ...

// Exemplo de instanciação de grupos para exibir as barras
// Aqui uma lista é iterada para criar cada grupo uma barra
List<BarChartGroupData> barGroups() {
	return accountabilityByIdentification
		.asMap()
		.map(
		  (i, e) => MapEntry(
			i,
			BarChartGroupData(
			  x: i,
			  barRods: [
				BarChartRodData(
				  toY: e.total.abs(),
				  color: e.field.color,
				  borderSide: e.total < 0
					  ? const BorderSide(color: Colors.redAccent, width: 3)
					  : const BorderSide(color: Colors.green, width: 3),
				  width: barWidth,
				),
			  ],
			),
		  ),
		)
		.values
		.toList();
}
```
