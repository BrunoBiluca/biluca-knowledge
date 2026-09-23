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

A implementação escolhida divide a apresentação em dois Widgets: um para a barra aberta e outro para a barra fechada. Esse modelo se mostrou mais simples de controlar, já que vários elementos da barra era alterados entre as duas visualizações.

Todos os elementos são:

- `sidebar.dart`
- `opened_sidebar.dart`
- `closed_sidebar.dart`

```dart
class Sidebar extends StatefulWidget {
  const Sidebar({
    super.key,
  });

  @override
  State<Sidebar> createState() => _SidebarState();
}

class _SidebarState extends State<Sidebar> {
  final List<SidebarPage> _pages = [
    SidebarPage("Home", "/", Icons.home, Colors.purpleAccent),
    SidebarPage("Relatório do mês", "/monthly-report", Icons.dashboard, Colors.purpleAccent),
    SidebarPage("Relatório anual", "/yearly-report", Icons.space_dashboard, Colors.blueAccent),
    SidebarPage("Prestação de contas", "/accountability", Icons.table_view, Colors.lightGreen),
  ];

  int selectedPage = 0;
  bool isOpen = true;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: isOpen ? 300 : 68,
      shape: const ContinuousRectangleBorder(),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(8, 20, 8, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          spacing: 20,
          children: [
            Expanded(
              child: isOpen
                  ? OpenSidebar(
                      pages: _pages,
                      selectedPage: selectedPage,
                      onSelectPage: goToPage,
                    )
                  : ClosedSidebar(
                      pages: _pages,
                      selectedPage: selectedPage,
                      onSelectPage: goToPage,
                    ),
            ),
            Row(
              mainAxisAlignment: isOpen ? MainAxisAlignment.end : MainAxisAlignment.center,
              children: [
                IconButton(
                  key: const Key('toggle-sidebar'),
                  icon: Icon(isOpen ? Icons.arrow_left : Icons.arrow_right),
                  onPressed: () {
                    setState(() => isOpen = !isOpen);
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void goToPage(int pageIndex) {
    if (pageIndex == selectedPage) return;
    setState(() => selectedPage = pageIndex);
    context.go(_pages[pageIndex].route);
  }
}
```

> [!info] Possível melhoria
> Talvez uma melhoria futura para essa implementação seria adicionar o estado da sidebar ao um ContextProvider, dessa forma não seria necessário declarar as páginas na barra lateral, ela apenas renderizaria os dados consumidos.