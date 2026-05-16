---
categoria: biblioteca
---
# StaggeredGrid

> [!info] Pacote
> - [pub.dev](https://pub.dev/packages/flutter_staggered_grid_view)
> - [github](https://github.com/letsar/flutter_staggered_grid_view)


![Staggered Grid Layout](https://external-images.pub.dev/khF8bYIYvckDh7xR%2FnYj2elY%2FICaMoqWwdZceOMBI7M%3D/1778889600000/https%3A%2F%2Fraw.githubusercontent.com%2Fletsar%2Fflutter_staggered_grid_view%2Fmaster%2Fdocs%2Fimages%2Fstaggered.png)

This layout is intended for a small number of items. I didn't find, for the moment, a performant algorithm which would work in a `Sliver` context, that's why this is not a GridView and therefore there are no `SliverStaggeredGrid`.

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