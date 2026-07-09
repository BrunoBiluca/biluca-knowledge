# Padrão BLoC (Business Logic Component)

> [!info] O que é?
> Esse é um padrão recomendado no desenvolvimento de aplicações com Flutter e sua ideia é separar o gerenciamento de estado da apresentação por meio de uma camada chamada bloc.

Essa arquitetura visa resolver alguns problemas do desenvolvimento de aplicativos:
- Gerenciamento de estado
	- Gerenciar estado pode ser um problema quando passamos dados entre widgets, como por exemplo um carrinho de compras que pode estar definido em várias páginas e deve manter seu estado.
- Separação e reusabilidade de componentes
	- Esse padrão separa a apresentação da lógica, sendo possível assim reutilizar um componente enquanto a lógica é centralizada.
- Facilidade de criar testes



![[flutter-bloc-communication-diagram.webp|Diagrama de comunicação entre as camadas em uma arquitetura BLoC]]


## Soluções

Soluções onde o padrão de comunicação BLoC foi utilizado:

- [[Solução - CRUD utilizando BLoC]]

## Plugins
### Flutter bloc

O plugin [flutter_bloc](https://pub.dev/packages/flutter_bloc) já define todas as classes principais para a utilização do padrão guiando assim a implementação.
