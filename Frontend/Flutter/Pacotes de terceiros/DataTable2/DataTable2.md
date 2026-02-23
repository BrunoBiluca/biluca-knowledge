---
categoria: biblioteca
---
# DataTable2

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

DataTable2 é um pacote que estende as funcionalidades originas dos DataTables do [[Flutter]] adicionando outras funcionalidades, como cabeçalhos fixas, paginação, rolagem entre outras.

--- end-column ---

> [!info] Principais referências
>- [pub.dev](https://pub.dev/packages/data_table_2)
> - [github](https://github.com/maxim-saplin/data_table_2)
> - [Demonstração da biblioteca](https://maxim-saplin.github.io/data_table_2/)

--- end-multi-column

Plataformas suportadas
- Android
- iOS
- Linux
- MacOS
- Windows
- Web


> [!warning]- Não colocar os Widgets do DataTable2 em nós pais ilimitados
> Don't put the widgets inside unbounded parents. You don't need scrollables anymore (e.g. `SingleChildScrollView`) - widgets handle scrolling by theirselves. If you need a widget inside a `Column()`, wrap it into `Expanded()` or `Flexible()`.

> [!warning]- Barra de rolagem invisível, só que não
>Durante o desenvolvimento a barra de rolagem aparecia mesmo configurando para ele ficar invisível, porém esse problema foi resolvido quando foi feito a publicação da aplicação.

# Tutoriais

- [[Tutorial - Alterar cabeçalho de acordo com a posição da rolagem]]