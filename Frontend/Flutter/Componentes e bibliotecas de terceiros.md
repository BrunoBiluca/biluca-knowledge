# StaggeredGrid

> [!info] Pacote
> - [pub.dev](https://pub.dev/packages/flutter_staggered_grid_view)
> - [github](https://github.com/letsar/flutter_staggered_grid_view)

Para a criação de grids em vários formatos com uma interface simples e objetiva. Essa biblioteca é mais direcionada para grid com colunas e linhas fixas, já que o algoritmo de construção não é otimizado.

#### Criação de um grid com 3 colunas de tamanhos fixos e linhas com alturas diferentes

```dart
Widget build(BuildContext context) {
	return StaggeredGrid.count(
      crossAxisCount: 2,
      crossAxisSpacing: 20,
      mainAxisSpacing: 40,
      children: [
        StaggeredGridTile.extent(
		  crossAxisCellCount: 1,
          mainAxisExtent: 100,
          child: ...
        ),
		StaggeredGridTile.extent(
		  crossAxisCellCount: 1,
          mainAxisExtent: 100,
          child: ...
        ),
        StaggeredGridTile.extent(
		  crossAxisCellCount: 1,
          mainAxisExtent: 200,
          child: ...
        ),
        StaggeredGridTile.extent(
		  crossAxisCellCount: 1,
          mainAxisExtent: 200,
          child: ...
        )
	]);
}
```

# fl_chart (gráficos)

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

