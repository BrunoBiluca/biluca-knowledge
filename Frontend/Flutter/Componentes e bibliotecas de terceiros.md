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

