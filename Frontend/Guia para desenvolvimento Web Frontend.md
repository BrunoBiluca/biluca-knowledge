# Guia para desenvolvimento Web Frontend

## Configurações de projeto

#### Modos da aplicação

Podemos executar a aplicação em diferentes modos como:

- `Standalone` modo que o frontend funciona de forma isolada, principalmente utilizado para garantir o fluxo e estilização da aplicação
- `Local` modo que o frontend funciona conectando a serviços externos locais
- `Desenvolvimento`
- `Produção`

## Testes

[[Estratégias de testes (Web)]]

Para [[Frontend]] testes são muito importantes para garantir que a interação direta do usuário seja especificada, evitando problemas e garantindo que o usuário está seguindo um caminho otimizado para fazer o que ele precisa.

Assim, são coisas importantes para testar no Frontend:

- Comportamento dos componentes
	- Forma de renderização
	- Caminhos condicionais

- Controle de estado
	- Como os dados estão sendo gerenciado pela aplicação.
	- Como dados externos são recuperados.

- Classes, funções ou módulos utilitários

- Fluxo do usuário
	- Testes para múltiplas ações, como por exemplo, testar uma página de gerenciamento de uma entidade, como adição, remoção e atualização de informações, todas ao mesmo tempo.

- Roteamento da aplicação

- Testes de acessibilidade
	- Verificar se campos de formulários tem labels associados
	- Bibliotecas como [jest-axe](https://github.com/nickcolley/jest-axe) ajudam a verificar se a aplicação segue alguns padrões de acessibilidade

- Testes de segurança
	- Limpeza de campos de texto, para garantir que nenhum SQL foi injetado