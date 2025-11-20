# Estratégias de testes (Web)

## Utilizar `data-testid`?

`data-testid` são uma forma de testar elementos web a partir das interações dos usuários sem depender de categorizações que podem ser dinâmicas, como textos ou classes CSS.

1) Um dos principais argumentos para **não utilizar** `data-testid` é que ele é um recurso utilizado para testes que está implementado no código de produção, isso fere princípios de separação de responsabilidades. 

2) Junto ao acoplamento do código de testes ao de produção, qualquer alteração do código em produção **pode não refletir** corretamente nos testes, já que a estrutura real não está sendo testada e sim o que foi declarada com o `data-testid` (falsos positivos). Assim, por exemplo pode ser um problema garantir que exista um título e um conteúdo na página se estou utilizando os atributos declarados apenas para testes.

3) Outro problema da utilização de `data-testid` é a incapacidade de injetar esse atributos em componentes de terceiros, o que será necessário utilizar referências diretas a esses elementos.

**Em vez de utilizar** `data-testid` para alvejar elementos da interface, é ideial utilizar uma lista de redundâncias para recuperar esses elementos, como por exemplo, o texto, ou placeholder, ou título, ou aria-label, ou role, e assim por diante. Dessa forma, estamos testando a real interface de usuário, fazendo com que os testes reflitam cenários reais de uso.