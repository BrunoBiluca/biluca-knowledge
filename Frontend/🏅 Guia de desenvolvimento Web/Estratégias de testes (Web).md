# Estratégias de testes (Web)

## Testes de componentes

Testar componentes tem como principal objetivo garantir que esses componentes funcionem de maneira independentes, facilitando sua execução e depuração.

Esse tipo de testes estão entre os testes unitários e os testes fim-a-fim, oferecendo as principais vantagens:

- Resposta rápida a mudanças
- Isolamento dos testes
- Facilitação na depuração por se tratar de elementos mais isolados
- Facilidade de definir os escopos do componente, como tratamento de erros e gerenciamento de estado.

> [!info] Bons testes de componentes
> Bons testes de componentes focam em testar o comportamento e a experiência do usuário a partir da implementação. Assim, é importante testar:
> - **Contato (interface)** - testes de entrada e saída
> - **Integrações do usuário** - clicks, submissão de formulários, navegação pelo teclado
> - **Casos de exceção** - tratamento de erros, carregamento de informações
> - **Evitar testes a partir de controles internos** - um bom teste não deve saber como o componente foi implementado

## Utilizar `data-testid`?

`data-testid` são uma forma de testar elementos web a partir das interações dos usuários sem depender de categorizações que podem ser dinâmicas, como textos ou classes CSS.

1) Um dos principais argumentos para **não utilizar** `data-testid` é que ele é um recurso utilizado para testes que está implementado no código de produção, isso fere princípios de separação de responsabilidades. 

2) Junto ao acoplamento do código de testes ao de produção, qualquer alteração do código em produção **pode não refletir** corretamente nos testes, já que a estrutura real não está sendo testada e sim o que foi declarada com o `data-testid` (falsos positivos). Assim, por exemplo pode ser um problema garantir que exista um título e um conteúdo na página se estou utilizando os atributos declarados apenas para testes.

3) Outro problema da utilização de `data-testid` é a incapacidade de injetar esse atributos em componentes de terceiros, o que será necessário utilizar referências diretas a esses elementos.

**Em vez de utilizar** `data-testid` para alvejar elementos da interface, é ideial utilizar uma lista de redundâncias para recuperar esses elementos, como por exemplo, o texto, ou placeholder, ou título, ou aria-label, ou role, e assim por diante. Dessa forma, estamos testando a real interface de usuário, fazendo com que os testes reflitam cenários reais de uso.