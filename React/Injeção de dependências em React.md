# Injeção de dependências em React

[[React]] por padrão não define nenhum tipo de solução de injeção de dependências ([[Princípio Inversão de dependências]]). Isso porque ele foi criado como um design funcional como padrão, diminuindo o grau de importância de polimorfismo para uma abordagem de composição de funções puras.

Ainda assim, para projetos mais complexos a injeção de dependência resolve principalmente os seguintes problemas:

- **Prop drilling**, ou seja, passar dependências em elementos intermediários apenas para ter acesso a um elemento interno
- **Separação entre construção e uso das instâncias** facilitando assim a manutenção e flexibilidade do projeto.
- **Mock**, ou seja, substituir uma implementação por outra a fim de testes. Isso é facilmente feito em Javascript por ser uma linguagem dinâmica, por exemplo, utilizando [[Jest]].

#### Exemplo de problema a ser resolvido por DI

Na aplicação [[Projeto - Biluca Agenda da Breja (React)]] temos serviços fazendo o papel de alterar dados externos. Esses serviços podem ter dependências de outros serviços, assim, como podemos fazer para que essas dependências sejam resolvidas, sem a necessidade de passar essas dependências em todos os componentes?

## Alternativas

### Não utilizar nenhum tipo de injeção de dependências

Uma forma de implementar esse formato está descrito no [[Exemplo - Serviços com múltiplas implementações]].

Uma limitação dessa implementação é que as dependências definidas nos contextos não apresentam referencias entre si, facilitando assim sua instância, porém quando precisamos adicionar dependências a essas classes, já não conseguimos facilmente utilizá-las.

### Bibliotecas de terceiros

Existem algumas biblioteca que implementam modelos de containers de injeção de dependências em [[React]].

[[Obsidian (by Wix-incubator)]]