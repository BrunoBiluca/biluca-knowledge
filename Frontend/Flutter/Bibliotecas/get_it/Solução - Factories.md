# Solução - Factories

> [!example] Projetos relacionados
> - [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]]

O [[get_it]] disponibiliza uma interface bem simples para a criação de instâncias de classes parametrizadas, porém ela apresenta algumas limitações, entre elas não existe uma forma de configurar parâmetros explícitos para a construção dos objetos.

Por causa disso, quando precisamos de uma instância com dois parâmetros o código costuma parecer com:

```dart
final service = getIt<MyService>(
  param1: 'hello',
  param2: 42,
);
```

O problema dessa abordagem é que não sabemos o que representa os parâmetros.

Uma forma de solucionar essa limitação é criar métodos personalizados para a construção dos objetos:

```dart
extension AccountabilityYearlyReportServiceFactory on GetIt {
  AccountabilityYearlyReportService getAccountabilityYearlyReportService({
    required DateTime start,
    required DateTime end,
  }) {
    return this.get<AccountabilityYearlyReportService>(param1: start, param2: end);
  }
}

// uso
GetIt.I.getAccountabilityYearlyReportService(
	start: DateTime(int.parse(currentYear!), 1, 1),
	end: DateTime(int.parse(currentYear!) + 1, 1, 1),
);
```

Essa segunda abordagem é muito mais explícita que a primeira (mais genérica).