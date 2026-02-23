# Padrão BLoC (Business Logic Component)

> [!info] O que é?
> Esse é um padrão recomendado no desenvolvimento de aplicações com Flutter e sua ideia é separar o gerenciamento de estado da apresentação por meio de uma camada chamada bloc.

Essa arquitetura visa resolver alguns problemas do desenvolvimento de aplicativos:
- Gerenciamento de estado
	- Gerenciar estado pode ser um problema quando passamos dados entre widgets, como por exemplo um carrinho de compras que pode estar definido em várias páginas e deve manter seu estado.
- Separação e reusabilidade de componentes
	- Esse padrão separa a apresentação da lógica, sendo possível assim reutilizar um componente enquanto a lógica é centralizada.
- Facilidade de criar testes



![[flutter-bloc-communication-diagram.webp|Diagrama de comunicação entre as camadas em uma arquitetura BLoC|500]]

### Flutter bloc

O plugin [flutter_bloc](https://pub.dev/packages/flutter_bloc) já define todas as classes principais para a utilização do padrão guiando assim a implementação.
### Exemplo de criação de uma tabela

Nesse exemplo iremos criar uma tabela para exibição de dados de contabilidade. Nesse exemplo irei utilizar todo o gerenciamento de estados com armazenamento em memória, mas pode facilmente ser estendido para outros tipos de armazenamento.

A contabilidade é definida por 
- Descrição do registro, 
- Valor
- Data de criação

Podemos gerenciar esses dados da seguinte maneira:

- Criar um novo registro
- Deletar um registro existente
- Buscar todos os registros

> [!info] Dependências
> Nesse exemplo estamos utilizando o básico dos componentes providos pela biblioteca [[#Flutter bloc]].

Para implementar essa tabela e essa lógica seguindo o padrão bloc vamos definir primeiro a classe responsável pelo gerenciamento dos registros de contabilidade (lógica de negócios).

```dart
class AccountabilityRepo {
	final Map<String, AccountabilityEntry> registry = {};

	Future<List<AccountabilityEntry>> getEntries();
	Future<AccountabilityEntry> add(String description, double value, DateTime createdAt);
	Future<void> delete(AccountabilityEntry entry);
}
```

Pelo padrão bloc precisamos de uma classe intermediária entre a nossa lógica de negócios e a apresentação. Essa classe é comumente chamada de Bloc e ela é responsável por receber os eventos providos pela camada de apresentação, chamar a lógica de negócios e notificar a apresentação em caso de mudança de estados.

A classe Bloc então é composta por 3 principais entidades: eventos, estados e a própria classe bloc.

- `bloc.dart`

```dart
// bloc.dart
// Eventos do tipo: AccountabilityEvent
// Estados do tipo: AccountabilityState
class AccountabilityBloc extends Bloc<AccountabilityEvent, AccountabilityState> {
  final AccountabilityRepo repo;

  AccountabilityBloc({required this.repo}) : super(const AccountabilityInitial()) {
    on<FetchAccountabilityEntries>((event, emit) async {
		// implementação da lógica do evento
    });

    on<AddAccountabilityEntry>((event, emit) async {
      await repo.add(event.request);
      emit(AccountabilityChanged(entries: await repo.getEntries()));    
	});

    on<DeleteAccountabilityEntry>((event, emit) async {
		// implementação da lógica do evento
    });
  }
}
```

- `states.dart`

```dart
// states.dart
abstract class AccountabilityState extends Equatable {
  final List<AccountabilityEntry> entries;
  const AccountabilityState({required this.entries});

  @override
  List<Object> get props => [entries, identifications];
}

class AccountabilityInitial extends AccountabilityState {
  const AccountabilityInitial() : super(entries: const []);
}

class AccountabilityChanged extends AccountabilityState {
  const AccountabilityChanged({required super.entries});
}
```

- `events.dart`

```dart
// events.dart
abstract class AccountabilityEvent extends Equatable {
  const AccountabilityEvent();
}

class FetchAccountabilityEntries extends AccountabilityEvent {
  @override
  List<Object> get props => [];
}  

class AddAccountabilityEntry extends AccountabilityEvent {
  final AccountabilityEntryRequest request = AccountabilityEntryRequest(
    description: "Descricão fictício",
    value: 10.00,
    createdAt: DateTime.now(),
  );

  @override
  List<Object?> get props => [request];
}

class DeleteAccountabilityEntry extends AccountabilityEvent {
  final AccountabilityEntry entry;
  const DeleteAccountabilityEntry(this.entry);

  @override
  List<Object?> get props => [entry];
}
```

Nesse ponto já temos a implementação das camadas de negócio e a camada BLoC que faz a implementação do comportamento de cada evento e emite os novos estados para a camada de apresentação.

Na camada de apresentação precisamos definir dois elementos para configurar nossa camada bloc: `BlocProvider` e o `BlocBuilder`.

O `BlocProvider` é o elemento responsável por providenciar a instância de bloc que estamos utilizando. O `BlocBuilder` irá escutar as alterações da instância bloc provida naquele contexto e construir a exibição correta para cada estado atualizado.

```dart
class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BlocProvider(
        create: (_) => AccountabilityBloc(repo: AccountabilityRepo()),
        child: Column (
          children: [
            ElevatedButton(
              // Emite para o BLoC um evento de adição de um registro de contabilidade
              onPressed: () => context.read<AccountabilityBloc>().add(AddAccountabilityEntry()),
              child: const Text('Adicionar Item'),
            ),
            BlocBuilder<AccountabilityBloc, AccountabilityState>(
              builder: (context, state) {
                // Exibição de acordo com o estado inicial
                if (state is AccountabilityInitial)
                  return const Text("Sem registros");

				// Exibição quando o estado for alterado
                if (state is AccountabilityChanged)
                  return DataTable(
                    columns: const [
                      DataColumn(label: Text('Descrição')),
                      DataColumn(label: Text('Valor')),
                      DataColumn(label: Text('Criação')),
                      DataColumn(label: Text('Deletar')),
                    ],
                    rows: [
                      state.entries.map(entry => DataRow(
                        cells: [
                          DataCell(entry.description),
                          DataCell(entry.value),
                          DataCell(entry.createdAt),
                          DataCell(        
                            IconButton(
                              // Emite um evento para o BLoC de um evento de remoção de registro
                              onPressed: () => context.read<AccountabilityBloc>()
                                ..add(DeleteAccountabilityEntry(entry)),
                              icon: const Icon(Icons.delete),
                            ),),
                        ],
                      ))
                    ]
                  );
                }
              )
            ],
          )
        )
    );
  }
}

```
