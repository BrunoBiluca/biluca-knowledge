# Code Principles (Princípios de código)

Pricípios de código servem para organizar e padronizar código desenvolvido. Fundamentalmente a organização e a padronização de código leva a várias melhorias no processo de desenvolvimento de software.

- Legibilidade
- Testabilitade

Porém todas essas melhorias serve apenas para um ajudar em particularmente um aspecto do desenvolvimento de softaware: **Adaptação a mudança**. Um sistema de software **precisa ser adaptado a mudança**. Requisitos do usuário, expecificações, hardware, escalabilidade, tudo isso mudam constantemente na vida de um software e é dever do programador garantir que cada mudança no sistema **não irá impactar em mudanças futuras ou diminuir o fator de entrega do time.**

# Princípio do ETC (Easier to Change)

O principal princípio que devemos levar durante o desenvolvimento de qualquer funcionalidade em software é o **ETC (Easier to Change)**. A facilidade de alterar o sistema deve ser a principal preocupação na hora que a funcionalidade está sendo desenvolvida.

Porém garantir que um sistema de software seja fácil de ser modificado não é uma tarefa simples. Várias decisões durante o desenvolvimento podem levar a um resultado que impacta em futuras implementações e por assim deixam o sistema mais complexo e menos sucetível a mudanças. Por isso existem vários outros princípios que ajudam em pontos específicos e quando aplicados em conjunto levam a um sistema ETC.

## Clean Code

Código limpo é um das principais formas de garantir que um sistema seja mais fácil de modificiar.

Garantir uma boa nomenclatura de métodos, variáveis, classes, funções ajudam na legibilidade do código. **Quanto mais legível** um código mais fácil de compreendê-lo e então **mais simples de ser modificado.**

## Modularidade

> Modularidade é definida como, "o grau cujo componentes de um sistema podem ser separados e recombinados, com o objetivo de flexibilizar e variar seu uso."

Modularidade é um fator primordial para deixar um sistema mais simples para modificar. Um sistema modular reaproveita seus componentes e adiciona vários casos de uso para cada componente. 

Além de permitir reutilizar componentes para múliplos usos componentes modulares garante a flexibilidade do sistema. É possível trocar componentes e comportamentos facilmente com componentes que apresentam a mesma interface. Em algumas linguagems podemos sendo possível fazê-lo em tempo de compilação, como caso de C# ou Java e seus tipos genéricos, ou em tempo de execução como linguagens interpretadas.

[//]: # Adicionar um exemplo de um código modular e outro não modular.

## Coesão


## Separation of Concerns (Separação de responsabilidades)

Isolar responsabilidades aumenta a flexibilidade do sistema. Dentro de um sistema temos vários outros subsistemas que conversam entre si. Separar esses subsistemas facilita o teste do sistema já que é possível testar subsistemas independentemente, o que **aumenta a robustez** do sistema como um todo. Assim quando um subsistema é alterado o impacto dessa alteração é isolado o que deixa o sistema **mais simples de ser modificado.**

## Desacoplamento

## Construção iterativa e incremental

# DRY

# KISS

# YAGNI

# SOLID

Os postulados SOLID foram apresentados por Robert C. Martin em um artigo publicado no ano 2000 cujo título, em tradução livre, é "Postulados de Projeto e Padrões de Projeto". O acrônimo SOLID propriamente dito teria sido cunhado mais tarde por Michael Feathers.

## Single Responsability

## Open Close

## Liskov Substitution Principal

## Interface Segregation

## Dependency inversion

# Exemplos

# Bibliografia

- [Pragmatic Programmer, The: Your journey to mastery, 20th Anniversary Edition (English Edition)](https://www.amazon.com.br/dp/B07VRS84D1/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)
- [Modern Software Engineering](https://www.amazon.com/Modern-Software-Engineering-Discipline-Development/dp/0137314914)
- [SOLID Principles summary](https://en.wikipedia.org/wiki/SOLID)