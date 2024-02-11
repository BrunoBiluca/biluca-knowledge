---
tags:
  - programação/padrões
---
Injeção de dependência (DI) é um padrão de projeto usado para implementar IoC. Ele permite a criação de objetos dependentes fora de uma classe e fornece esses objetos para uma classe através de diferentes maneiras. Usando DI, movemos a criação e a vinculação dos objetos dependentes para fora da classe que depende deles.

> [!info]- Criação do nome "Injeção de dependências"
> Durante o artigo do Martin Fowler, ele levanta o questionamento sobre "Inversão de Controle" (termo até então utilizado) ser um termo confuso e genérico para demonstrar o que cada framework fazia na época. Isso porque todos os frameworks da época falavam que implementava IoC.
> 
> Depois de várias discussões na comunidade sobre o que realmente esses frameworks estão invertendo é estabelecido o conceito de Injeção de dependências, por se tratar de frameworks que injetam as dependências por alguns meios nas estruturas necessárias.

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

- Injeção por interface: É definida uma interface para fazer a injeção da instância. Assim uma classe que implementa a interface terá sua dependência injetada no método implementado.

# Onde definir a configuração do Container de DI?

A questão importante em tudo isso é garantir que a configuração dos serviços seja separada de seu uso. Na verdade, este é um princípio de design fundamental que se assenta com a separação das interfaces da implementação. É algo que vemos dentro de um programa orientado a objeto quando a lógica condicional decide qual classe instanciar e, em seguida, avaliações futuras dessa condicional são feitas por meio de polimorfismo em vez de código condicional duplicado.

Se essa separação for útil em uma única base de código, ela será especialmente vital quando você estiver usando elementos externos, como componentes e serviços. A primeira questão é se você deseja adiar a escolha da classe de implementação para implantações específicas. Se assim for, você precisa usar alguma implementação de plugin (IoC). Uma vez que você está usando plugins, então é essencial que a montagem dos plugins seja feita separadamente do resto do aplicativo para que você possa substituir configurações diferentes facilmente para implantações diferentes. A forma como se consegue isso é secundária. Esse mecanismo de configuração pode configurar um localizador de serviço (Service Locator) ou usar injeção para configurar objetos diretamente.

# Referências

- https://www.tutorialsteacher.com/ioc/dependency-injection
	- Definição e utilização de injeção de dependências
- https://martinfowler.com/articles/injection.html