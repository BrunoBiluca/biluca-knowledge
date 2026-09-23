# Solução - Padronização dos gráficos

> [!example] Projetos relacionados
> - [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]]


Quando utilizamos [[fl_chart]] algumas informações dos gráficos pode ser padronizadas sem muito esforço. Isso nos permite ter uma maior consistência entre todos os gráficos que serão exibidos.

```dart
// charts_standarts.dart

FlGridData defaultGrid() => FlGridData();

FlBorderData defaultBorder() => FlBorderData();

// Gráficos de linha com valores monetários
LineTouchData defaultLineTouchForCurrency() => LineTouchData(
  touchTooltipData: LineTouchTooltipData(
	getTooltipItems: (touchedSpots) => touchedSpots
		.map(
		  (spot) => LineTooltipItem(
			spot.y == 0 ? 'EMPTY' : formatReal(spot.y),
			TextStyle(
			  color: spot.bar.color?.withAlpha(255),
			  fontWeight: FontWeight.bold,
			),
		  ),
		)
		.toList(),
  ),
);

// Gráfico de barras
BarTouchData defaultBarTouchData() => BarTouchData(
      touchTooltipData: BarTouchTooltipData(
        getTooltipColor: (spot) => Colors.blueGrey,
        getTooltipItem: (group, groupIndex, rod, rodIndex) => BarTooltipItem(
          formatReal(rod.toY),
          TextStyle(
            color: rod.color?.withAlpha(255),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
```
