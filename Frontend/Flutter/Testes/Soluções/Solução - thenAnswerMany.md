# Solução - thenAnswerMany

Solução para [[Mocktail]] de forma a verificar o resultado de várias invocações de uma mesmo método mockado.

```dart
// implementação
import 'package:mocktail/mocktail.dart';

extension WhenExtension<T> on When<T> {
  thenAnswerMany(List<Answer<T>> cbs) {
    return thenAnswer((invocation) {
      if (cbs.isEmpty) throw "No more answers available";
      return cbs.removeAt(0)(invocation);
    });
  }
}

// uso
when(() => mock.someMethod().thenAnswerMany([
  (_) => 1, // retorno da primeira chamada
  (_) => 2, // retorno da segunda chamada
]);
```

## Testes

[[Fundamentos de Software/Testes automatizados/Testes automatizados|Testes automatizados]]
[[Estratégias de testes (Web)]]

Para [[Frontend/Frontend]] testes são muito importantes para garantir que a interação direta do usuário seja especificada, evitando problemas e garantindo que o usuário está seguindo um caminho otimizado para fazer o que ele precisa.

Assim, são coisas importantes para testar no Frontend:

- Comportamento dos componentes
	- Forma de renderização
	- Caminhos condicionais
		- Tratamento de erros
		- Carregamento de dados
	- Comunicação do componentes como a emissão de eventos a partir de ações dentro do componente.

- Controle de estado
	- Como os dados estão sendo gerenciado pela aplicação.
	- Como dados externos são recuperados.
		- Para dados externos podemos utilizar de mock para emular os dados

- Classes, funções ou módulos utilitários

- Fluxo do usuário
	- Testes para múltiplas ações, como por exemplo, testar uma página de gerenciamento de uma entidade, como adição, remoção e atualização de informações, todas ao mesmo tempo.

- Roteamento da aplicação

- Testes de acessibilidade
	- Verificar se campos de formulários tem labels associados
	- Bibliotecas como [jest-axe](https://github.com/nickcolley/jest-axe) ajudam a verificar se a aplicação segue alguns padrões de acessibilidade

- Testes de segurança
	- Limpeza de campos de texto, para garantir que nenhum SQL foi injetado