# Exemplo - Gráfico de barras

Utilizado no projeto [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]].

São definidos grupos de barras, cada grupo tem várias barras.

```dart
BarChart(
  BarChartData(
	alignment: BarChartAlignment.spaceEvenly,
	titlesData: FlTitlesData(
	  // ... configurações dos títulos
	),
	gridData: FlGridData(
	  // ... configurações da grade
	),
	borderData: FlBorderData(
	  // ... configurações das bordas internas
	),
	barGroups: [
		BarChartGroupData(
		  x: 0,
		  barRods: [
			BarChartRodData(
			  toY: 10,
			  color: Colors.green,
			  width: 2,
			),
		  ],
		),
		// ... demais grupos, cada grupo é um conjunto de barras
	],
  ),
)
```