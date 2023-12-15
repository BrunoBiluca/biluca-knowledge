---
tags:
  - programação/padrões
---
Injeção de dependência (DI) é um padrão de projeto usado para implementar IoC. Ele permite a criação de objetos dependentes fora de uma classe e fornece esses objetos para uma classe através de diferentes maneiras. Usando DI, movemos a criação e a vinculação dos objetos dependentes para fora da classe que depende deles.

O padrão de injeção de dependência envolve 3 tipos de classes.

1. **Client Class:** A classe client (classe dependente) é uma classe que depende da classe de serviço
2. **Classe de serviço:** A classe de serviço (dependência) é uma classe que fornece serviço para a classe cliente.
3. **Classe do injetor:** A classe do injetor injeta o objeto da classe de serviço na classe do cliente.

A figura a seguir ilustra a relação entre essas classes:

![[DI.webp|center]]


# Tipos de injeção de dependência

Como você viu acima, a classe `Injector` injeta o serviço (dependência) no cliente (dependente). A classe `Injector` injeta dependências basicamente de três maneiras: 

- **Injeção do construtor:** Na injeção do construtor, o injetor fornece o serviço (dependência) através do construtor de classe cliente.
	- Esse tipo de injeção é o mais utilizado já que as dependências definidas no construtor são totalmente necessárias para a execução correta de qualquer função dentro da classe.

- **Injeção de propriedade:** Na injeção de propriedade (também conhecida como injeção de Setter), o injetor fornece a dependência por meio de uma propriedade pública da classe cliente.

- **Método de injeção:** Neste tipo de injeção, a classe cliente implementa uma interface que declara o(s) método(s) para fornecer a dependência e o injetor usa essa interface para fornecer a dependência para a classe cliente.
	- Pode ser utilizado quando temos a execução de um método de forma contextual, onde a dependência só é utilizada para esse método específico.

# Referências

- https://www.tutorialsteacher.com/ioc/dependency-injection
	- Definição e utilização de injeção de dependências