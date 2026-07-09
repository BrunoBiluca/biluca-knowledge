# Solução - Barra lateral

> [!example] Projetos relacionados
> - [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]]

Um elemento muito utilizado em aplicações com múltiplas páginas é adicionar um elemento de navegação em um barra lateral possibilitando ao usuário navegar para qualquer lugar da aplicação.

No [[Flutter]] temos uma solução nativa para isso chamado Drawer que pode ser adicionado na construção do MaterialApp, porém esse Widget apenas apresenta a barra lateral flutuante.

Para manter a barra lateral sempre na tela precisamos fazer uma solução personalizada.

**Funcionalidades da barra lateral:**

- Expansão e colapso
	- Quando expandido: apresenta ícone e texto
	- Quando colapsado: apresenta apenas o ícone

- Destacar o item selecionado em ambas as formas
	- Mantido entre as trocas de formas

#### Implementação

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class Sidebar extends StatefulWidget {
  const Sidebar({
    super.key,
  });

  @override
  State<Sidebar> createState() => _SidebarState();
}

class _SidebarState extends State<Sidebar> {
  final List<dynamic> _pages = [
    {
      'title': 'Home',
      'icon': Icons.home,
      'color': Colors.purpleAccent,
      'route': '/',
    },
    {
      'title': 'Relatório do mês',
      'icon': Icons.dashboard,
      'color': Colors.purpleAccent,
      'route': "/monthly-report",
    },
    {
      'title': 'Prestação de contas',
      'icon': Icons.table_view,
      'color': Colors.lightGreen,
      'route': "/accountability",
    },
  ];

  int selectedPage = 0;
  bool isOpen = true;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: isOpen ? 300 : 56,
      shape: const ContinuousRectangleBorder(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: ListView.separated(
              shrinkWrap: true,
              itemCount: _pages.length,
              separatorBuilder: (context, index) => SizedBox(height: 8),
              itemBuilder: (context, index) {
                return isOpen ? itemFull(_pages[index], index) : itemShort(_pages[index], index);
              },
            ),
          ),
          IconButton(
            key: const Key('toggle-sidebar'),
            icon: Icon(isOpen ? Icons.arrow_left : Icons.arrow_right),
            onPressed: () {
              setState(() => isOpen = !isOpen);
            },
          ),
        ],
      ),
    );
  }

  Widget itemFull(
    dynamic page,
    int pageIndex,
  ) {
    return ListTile(
      selected: pageIndex == selectedPage,
      selectedColor: Colors.black,
      selectedTileColor: Colors.white,
      minTileHeight: 56,
      leading: pageIcon(page),
      title: Text(page['title']),
      onTap: () => goToPage(pageIndex, page['route']),
    );
  }

  Widget itemShort(
    dynamic page,
    int pageIndex,
  ) {
    return ListTile(
      selected: pageIndex == selectedPage,
      selectedColor: Colors.black,
      selectedTileColor: Colors.white,
      contentPadding: EdgeInsets.all(0),   // IMPORTANTE remover o padding para itens pequenos
      horizontalTitleGap: 0,
      minLeadingWidth: 0,
      minTileHeight: 56,
      title: pageIcon(page),
      onTap: () => goToPage(pageIndex, page['route']),
    );
  }

  Widget pageIcon(dynamic page) {
    return DecoratedBox(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Theme.of(context).colorScheme.outline,
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Icon(
          page['icon'],
          color: page['color'],
        ),
      ),
    );
  }

  void goToPage(int pageIndex, String route) {
    if (pageIndex == selectedPage) return;
    setState(() => selectedPage = pageIndex);
    context.go(route);
  }
```

Considerações da implementação:

- Uma **ListView** é utilizada para garantir a funcionalidade de item selecionado para destacar o elemento
- O **ListTile** deve sempre definir um elemento **title**, que é o que define o seu tamanho
- Na visualização colapsada o **ListTile** deve ter a propriedade **contentPadding** para `0`, já que por padrão ele define um valor para isso e quando a barra é diminuída o conteúdo tem muito pouco espaço.