---
marp: true
style: |
  section {
    background: #fefefe;
  }
  img {
    max-height: 60vh;
  }
  .columns {
    column-count: 2;
  }
---

# Design Patterns

> Design Patterns são soluções já consolidadas para problemas comuns em software design, especificamente design de código.

---

# Design Patterns

- São esqueletos de ideias que já foram utilizadas diversas vezes em outros projetos.
- Confundidos com algoritmos prontos que adicionamos a nosso código.
- Ferramentas incríveis que todo desenvolvedor deve revisitar de tempos em tempos na sua carreiras.

---

# Diagrama UML

> UML é uma estrutura padrão para desenvolvimento de software, bastante utilizada na diagramação de estruturas do código, bancos de dados e fluxo de código.

![UML notações de membros de classes](./imgs/uml-class-members-notations.png)![UML notações de relações entre classes](./imgs/uml-symbols.png)

---

# Diagrama UML

![Exemplo do diagrama referente ao Strategy Pattern](./imgs/uml_diagram_example.png)

---

# Classificação dos Design Patterns

- Creational Patterns
  - Provê mecanismos de criação de objetos que aumentam a flexibilidade e o reuso de código existem.
- Structural Patterns
  - Provê mecanismos para montar classes e objetos em grandes estruturas, enquanto ainda mantem flexibilidade e eficiência.
- Behavioral Patterns
  - Define uma comunicação efetiva e atribui responsabilidades entre os objetos e classes.


---

# Builder

> Builder Pattern é destinado a resolver a construção de objetos complexos

![Diagrama de exemplo do Builder Pattern](./imgs/builder_pattern.png)

---

# Facade Pattern

Facade Pattern provê uma interface simplificada para uma biblioteca, framework ou qualquer outro tipo de conjunto de classes complexo.

![Exemplo de diagrama do Facade Pattern](./imgs/facade_pattern.png)

---

# Chain of Responsability Pattern

Chain of Responsability Pattern é uma especificaçaõ estrutural que garante a passagem de requisições em uma cadeia de validações.

![Exemplo de diagrama do Chain of Responsability Pattern](./imgs/chain_of_responsability_pattern.png)

---

# Quando não aplicar Design Patterns

- Cópia de código de outras linguagens
- Resulta em um código desnecessariamente mais complexo
- Exemplos
  - Observer Pattern em C#
  - Prototype em Javascript
  - Strategy em linguagens com recurso de Lambda Functions

---

# 🏠 Dever de casa - Design Patterns

Cada mentorado deverá implementar um Design Pattern em um projeto separado, tentando replicar um problema real.

O projeto deve ser desenvolvido em uma linguagem de programação acordada com o Mentor.

A apresentação irá consistir em:

- Explicação do Design Pattern escolhido
- Explicação da implementação
- Diagrama de classes
- Os testes para garantir a funcionalidade da solução

---

# Design Patterns recomendados

- Factory Method
- Builder
- Adapter
- Composite
- Decorator
- Facade
- Chain of Responsibility

Os mentorados devem escolher um dos Design Patterns disponíveis. Apenas um Design Pattern deve ser apresentado por um mentorado.

---
# Avaliação

| Quesito                                         | Estado |
| ----------------------------------------------- | ------ |
| **Relacionado a Apresentação**                  |        |
| Apresentação da Design Pattern                  |        |
| Apresentação do diagrama de classes             |        |
| Apresentação de pseudo código                   |        |
| **Relacionado a Implementação**                 |        |
| Design Pattern implementado                     |        |
| Uso do Design Pattern em um problema            |        |
| **Relacionado a Testes**                        |        |
| Cobertura de 50% do código                      |        |
| 3 exemplos de testes implementados              |        |
| **Relacionado a Clean Code**                    |        |
| Formatação do código                            |        |
| Hierarquia do projeto                           |        |
| Nomenclatura de variáveis                       |        |
| Nomenclatura de métodos                         |        |
| Tratamento de estruturas de múltiplas condições |        |
| Tratamento de exceções                          |        |