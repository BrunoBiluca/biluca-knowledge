#programação/padrões

# Design Patterns

> [!info] Definição
> Design Patterns são soluções já consolidadas para problemas comuns em software design, especificamente design de código. 
> 
> Referências:
> - [Refactoring Guru](https://refactoring.guru/)
 
Design Patterns são esqueletos de ideias que já foram utilizadas diversas vezes em outros projetos e que especificam uma solução para problemas comuns quando estamos desenvolvendo nosso código. Dessa forma podemos utilizar esses padrões para melhorar a qualidade do nosso código e focar especificamente nos detalhes do problemas que estamos querendo resolver.

Design Patterns são muitas vezes confundidos com algoritmos prontos que adicionamos a nosso código. Na real eles são principalmente conceitos arquiteturais que podem definir toda a comunicação do seu código.

Justamente por não serem algoritmos prontos, os Design Patterns tem diferentes implementações dependendo da linguagem escolhida.

Design Patterns são ferramentas incríveis que todo desenvolvedor deve revisitar de tempos em tempos na sua carreiras. A combinação de Design Pattern é uma habilidade poderossa na hora de criar código com mais qualidade e eficiência, ao mesmo tempo que flexibiliza futuras decisões no projeto.

## Quando não aplicar Design Patterns

Temos que ter muito cuidado ao implementar uma solução utilizando algum Design Pattern. Atualmente várias linguagens já apresentam esses padrões implementados, então adicionar uma implementação conforme exemplo de outra linguagem, pode na real, aumentar a complexidade do código sem benefício algum ao projeto.

Pegue por exemplo o `Observer Pattern` no **c#**. O próprio c# já implementa um estrutura chamada **event** que define um tipo de Observer. Implementar o padrão nesse caso não trás benefício nenhum no projeto e aumenta a complexidade do mesmo, além de gerar confusão a programadores que estão acostumados com a especificação da linguagem.

Outro exemplo é o `Strategy Pattern` que apresenta como intensão definir uma [[Família de algoritmos]], em muitos casos pode ser simplesmente substituído como uma expressão lambda.

# Classificação dos Design Patterns

Como Design Patterns são soluções para problemas comuns, eles podem ser classificados nos mais diversos tipos e formatos de especificações. As principais categorias que vemos são:

- Creational Patterns
- Structural Patterns
- Behavioral Patterns

Dependendo do domínio de problemas que estamos querendo resolver também temos vários outras categorias. Como Design Patterns focados em Performance, Design Patterns para computação gráfica e acesso a GPU, Design Patterns para computação distribuída e muitos outros.

## Creational Patterns

Provê mecanismos de criação de objetos que aumentam a flexibilidade e o reuso de código existem.

- Factory Method
- Abstract Factory
- [[Builder]]
- Prototype
- Singleton

## Structural Patterns

Provê mecanismos para montar classes e objetos em grandes estruturas, enquanto ainda mantem flexibilidade e eficiência.

- Adapter
- Bridge
- Composite
- Decorator
- [[Facade Pattern]]
- Flyweight
- Proxy

## Behavioral Patterns

Define uma comunicação efetiva e atribui responsabilidades entre os objetos e classes.

- [[Chain of Responsibility]]
- Monad
- Command
- Iterator
- Mediator
- Memento
- Observer
- [[State]]
- [[Strategy]]
- Template
- Visitor
