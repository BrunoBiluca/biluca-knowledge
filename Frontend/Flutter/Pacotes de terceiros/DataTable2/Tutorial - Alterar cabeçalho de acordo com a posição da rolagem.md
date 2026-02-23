# Tutorial - Alterar cabeçalho de acordo com a posição da rolagem

Como o [[DataTable2]] nos permite fixar o cabeçalho de uma tabela uma funcionalidade nesse tipo de apresentação é **alterar as informações no cabeçalho a fim de situar o usuário** sobre a seção que ele está visualizando. Isso é muito comum para mostrar seções de acordo com a ordenação da tabela.

Um exemplo concreto disso é: numa tabela ordenada por data, exibir o mês de referência dos dados que o usuário está visualizando dinamicamente.

Esse tutorial foi inspirado na implementação do projeto Biluca Finanças que na tabela de prestação de contas implementação uma solução análoga.

Para implementar essa funcionalidade a seguinte estrutura:
- Armazenamos todos os elementos da tabela em uma lista
- Utilizamos o `ScrollController` para vincular uma função que é chamada sempre que existe movimentação da rolagem
- Verificamos a posição do elemento da tabela a partir da rolagem e do tamanho de cada linha
- Buscamos o elemento na lista armazenada
- Atualizamos o estado do cabeçalho com a informação

> [!tip]- Evitar atualizar o estado a cada movimento da rolagem
> É necessário comparar o estado atual da informação que queremos atualizar, atualizar o estado a cada movimento **de rolagem impacta muito no desempenho da aplicação** reduzindo a fluidez na própria rolagem.

Aqui um exemplo de implementação para uma tabela que queremos atualizar o cabeçalho para sempre exibir o mês e ano da linha mais acima da tabela.

```dart
// Tabela com cabeçalho fixado.dart

class AccountabilityTable extends StatefulWidget {
  final entries = [];
	
  @override
  State<AccountabilityTable> createState() => _AccountabilityTableState();
}

class _AccountabilityTableState extends State<AccountabilityTable> {
  final ScrollController _scrollController = ScrollController();
  String createAtMonth = "";

  @override
  void initState() {
    super.initState();

	// Inicialização do valor
    var dateFormat = DateFormat("MMM yyyy", "pt_BR");
    createAtMonth = dateFormat.format(widget.entries[0].createdAt).capitalize();

	// Vincula o ScrollController com a função de atualização do cabeçalho
    _scrollController.addListener(() {
	  // Cálculo do índice da entrada na tabela
	  var rowHeigth = 48;
      var rowIndex = (_scrollController.position.pixels / rowHeigth).truncate();

	  // Formatação do mês e ano
      var currentMonth = dateFormat.format(widget.entries[rowIndex.toInt()].createdAt).capitalize();
      if (currentMonth != createAtMonth) {
        setState(() => createAtMonth = currentMonth); // atualiza apenas se alterou
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return DataTable2(
      scrollController: _scrollController,
      isHorizontalScrollBarVisible: false,
      columns: [
        "Criação - $createAtMonth",
        ...
	  ],
      rows: [...widget.entries.map((entry) => _tableRow(context, entry))],
    );
  }
}
```

