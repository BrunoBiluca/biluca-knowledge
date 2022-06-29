# Design Patterns

Design Patterns são soluções já consolidadas para problemas comuns em software design, especificamente design de código. Ou seja, Design Patterns são esqueletos de ideias que já foram utilizadas diversas vezes em outros projetos e que especificam uma solução para problemas comuns quando estamos desenvolvendo nosso código. Dessa forma podemos utilizar esses padrões para melhorar a qualidade do nosso código e focar especificamente nos detalhes do problemas que estamos querendo resolver.

Design Patterns são muitas vezes confundidos com algoritmos prontos que adicionamos a nosso código. Na real eles são principalmente conceitos arquiteturais que podem definir toda a comunicação do seu código.

Justamente por não serem algoritmos prontos, os Design Patterns tem diferentes implementações dependendo da linguagem escolhida.

Design Patterns são ferramentas incríveis que todo desenolvedor deve revisitar de tempos em tempos na sua carreiras. A combinação de Design Pattern é uma habilidade poderossa na hora de criar código com mais qualidade e eficiência, ao mesmo tempo que flexibiliza futuras decisões no projeto.

## Quando não aplicar Design Patterns

Temos que ter muito cuidado ao implementar uma solução de Design Pattern. Atualmente várias linguagens já apresentam esses padrões implementados, então adicionar uma implementação conforme exemplo de outra linguagem, pode na real, aumentar a complexidade do código sem benefício algum ao projeto.

Pegue por exemplo o `Observer Pattern` no **c#**. O próprio c# já implementa um estrutura chamada **event** que define um tipo de Observer. Implementar o padrão nesse caso não trás benefício nenhum no projeto e aumenta a complexidade do mesmo, além de gerar confusão a programadores que estão acostumados com a especificação da linguagem.

Outro exemplo é o `Strategy Pattern` que apresenta como intensão definir uma [família de algoritmos](#família-de-algoritmos), em muitos casos pode ser simplesmente substituido como uma expressão lambda.


# Classificação dos Design Patterns

# Creational Patterns

# Structural Patterns

# Behavioral Patterns

# Exemplos

# Glossário

### **Família de algoritmos**

Conjuntos de algoritmos que tem por finalidade implementar uma solução para o mesmo problema.

Exemplo: Tracar uma rota no mapa, podemos ter rotas considerando que o usuário estará a pé, de carro, de bicicleta e assim por diante.

# Bibliografia

- [Refactoring Guru](https://refactoring.guru/)