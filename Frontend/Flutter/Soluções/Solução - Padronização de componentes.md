# Solução - Padronização de componentes

Uma coisa imprescindível em todo projeto de software é conseguir padronizar os componentes para eles comportarem tanto em nível de funcionalidade como também no aspecto visual. Além disso, o código fica centralizado ajudando na modularização do projeto.

Porém, a padronização de componentes se não for bem feito pode levar a falta de flexibilidade e perda de funcionalidades dos componentes nativos do [[Flutter]].

Para solucionar isso temos algumas abordagens:

- Novo Widget com parâmetros opcionais
- Mixin

## Novo Widget

Uma abordagem muito direta para padronizar componentes é criar um novo componente.

O exemplo abaixo foi utilizado no projeto [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]] para padronizar o visual de um tooltip utilizado na área dos relatórios.

Nesse exemplo as propriedades visuais do `Tooltip` foram padronizadas para garantir a consistência visual em todos os relatórios.

Além disso, algumas propriedades como `verticalOffset` foram adicionadas como opcionais para permitir flexibilidade para várias situações do projeto.

```dart
// report_tooltip.dart
class ReportTooltip extends StatelessWidget {
  final Widget child;
  final String message;
  final double verticalOffset;

  const ReportTooltip({
    super.key,
    required this.child,
    required this.message,
    this.verticalOffset = 0,
  });

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      preferBelow: false,
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      constraints: BoxConstraints.loose(Size(160, 100)),
      verticalOffset: verticalOffset,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.outline,
        borderRadius: BorderRadius.circular(10),
      ),
      textStyle: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: Theme.of(context).textTheme.bodySmall?.color,
            fontWeight: FontWeight.bold,
          ),
      message: message,
      child: child,
    );
  }
}
```

> [!warning] Flexibilidade
> Esse tipo de implementação é bem direta e garante a padronização de forma muito eficiente, porém ela enrijece o contrato do componente. Assim, esses componentes devem ser pontuais no projeto, se restringindo a escopos menores. 
> 
> Para componentes globais podemos pensar em outras abordagem, como a criação de uma extensão na classe que estamos abordando.


## Abordagem com Mixin

Mixin é utilizado principalmente quando o código precisa "fazer parte" diretamente da classe, tendo acesso ao ciclo de vida e ao estado dela.

```dart
mixin TooltipMixin {
  Tooltip buildTooltip({
    required Widget child,
    required String message,
    required BuildContext context,
    double verticalOffset = 0,
    bool preferBelow = false,
    EdgeInsets? padding,
    BoxConstraints? constraints,
  }) {
    return Tooltip(
      preferBelow: preferBelow,
      padding: padding ?? const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      constraints: constraints ?? const BoxConstraints.loose(Size(160, 100)),
      verticalOffset: verticalOffset,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.outline,
        borderRadius: BorderRadius.circular(10),
      ),
      textStyle: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: Theme.of(context).textTheme.bodySmall?.color,
            fontWeight: FontWeight.bold,
          ),
      message: message,
      child: child,
    );
  }
}
```