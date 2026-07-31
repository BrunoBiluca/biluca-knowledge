# Exemplo - Linhas extras para exibir informações gerais

No projeto [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]] foram utilizadas linhas extras para mostrar informações gerais do gráfico, como as médias de receitas e despesas de um período.

Podem ser adicionadas várias linhas extras aos gráficos, os valores dessas linhas **não aparecem no tooltip**.

Propriedades:

- **y** define o valor constante da linha horizontal
- **dashArray** define se a linha será pontilhada e como
- **label** renderiza um texto para ser exibido na linha
	- **aligment** pode ser colocado acima, abaixo, à esquerda ou à direita da linha
	- **labelResolver** função que constrói o texto da linha, recebe como parâmetro o valor em y definido

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
	  // ... grupos
	],
	extraLinesData: ExtraLinesData(
		horizontalLines: [
		  HorizontalLine(
			y: 10,
			color: Colors.green,
			strokeWidth: 2,
			dashArray: [5, 10], // linha pontilhada
			label: HorizontalLineLabel(
			  show: true,
			  alignment: Alignment.topLeft,
			  style: TextStyle(
				color: Colors.green,
				fontSize: 16,
				fontWeight: FontWeight.bold,
			  ),
			  labelResolver: (line) => 'R\$ ${line.y.toStringAsFixed(1)}',
			),
		  ),
		],
	  ),
  ),
)
```
