# Solução - Utilização de contextos

Um caso muito comum para soluções de [[Frontend]] e principalmente em [[Flutter]] é utilizar um contexto para um ramo da árvore de componentes. Isso é uma boa prática já que reduz a passagem de propriedades entre os componentes, além de garantir que todos os componentes estão ligados a uma mesma instância. Essa prática deixa o código mais legível e evita problemas.

A utilização de contextos pode ser utilizada por exemplo para compartilhar a mesma instância de um serviço entre todos os componentes de um ramo da aplicação.

As vezes essa solução pode ser interessante em relação a [[Injeção de dependências]] já que queremos uma instância apenas dentro de um ramo dos componentes, não para a aplicação inteira.

Para utilizar essa solução precisamos de duas estruturas:

- O objeto que será compartilhado
- Um provider que define uma instância desse objeto.

### Exemplo de utilização

No projeto [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]] foi utiliza um provider para disponibilizar uma instância do serviço que faz os cálculos do relatório mensal.

```dart
class MonthlyReportServiceProvider extends InheritedWidget {
  final CurrentMonthReportService service;

  const MonthlyReportServiceProvider({
    super.key,
    required this.service,
    required super.child,
  });

  // Método estático para acessar o serviço
  static CurrentMonthReportService of(BuildContext context) {
    final provider = context.dependOnInheritedWidgetOfExactType<MonthlyReportServiceProvider>();
    assert(provider != null, 'ServiceAProvider não encontrado na árvore');
    return provider!.service;
  }

  @override
  bool updateShouldNotify(MonthlyReportServiceProvider oldWidget) {
    return service != oldWidget.service;
  }
}
```

Como o código acima demonstra é necessário as seguintes coisas para o **Provider**.

- Herdar de `ÌnheritedWidget`
- Implementar o método estático `of(BuildContext)`
	- Esse método que retorna a instância
- Sobrescrever o método `bool updateShouldNotify(MonthlyReportServiceProvider oldWidget)`
	- Esse método atualiza a instância do provider

Declaramos então esse provider na árvore de componentes explicitamente:

```dart
class MonthReport
	@override
	Widget build(BuildContext context) {
		return MonthlyReportServiceProvider(
			service: _service,
			child: ...
		)
	)
}
```

E em um componente filho do `MonthReport` recuperamos a instância disponibilizada pelo `MonthlyReportServiceProvider`.

```dart
class SummaryBalanceCard extends StatelessWidget {
  const SummaryBalanceCard({super.key});

  @override
  Widget build(BuildContext context) {
    var service = MonthlyReportServiceProvider.of(context);
    return ...
  }
}
```