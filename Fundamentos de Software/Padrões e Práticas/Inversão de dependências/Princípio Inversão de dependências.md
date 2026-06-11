---
tags:
  - programação/padrões
---
# Princípio Inversão de dependências

Durante o desenvolvimento de um sistema de software é muito comum cairmos em uma base de código totalmente conectada onde classes, métodos, módulos estão intimamente dependentes uns dos outros e qualquer alteração pode impactar em vários pontos.  Enquanto desenvolvedores nessas situações ficamos inseguros em alterar qualquer tipo de funcionalidade, já que erros inesperados podem acontecer, o que leva a uma redução brutal da produtividade dos projetos.

O princípio de inversão de dependências é uma forma de melhorar vários aspectos de um sistema de software garantindo que o fluxo de dependências se inverta e cada classe, método e módulos possam ser realmente independentes.

> [!info]- História
> A dependência inversão de princípio foi postulada por [Robert C. Martin](https://pt.wikipedia.org/wiki/Robert_Cecil_Martin "Robert Cecil Martin") e descrito em várias publicações, incluindo o papel _Orientado a Objeto-Design de Métricas de Qualidade: uma análise de dependências_, um artigo publicado em C++ Relatório em Maio de 1996, o direito _de Dependência, de Inversão de Princípio_, e os livros _Ágeis de Desenvolvimento de Software, Princípios, Padrões e Práticas_, e _Princípios Ágeis, Padrões e Práticas em C#_.

> [!quote] Definição por Robert C. Martin
> Módulos alto nível devem depender apenas de módulos baixo nível. Ambos devem depender de abstrações (como por exemplo interfaces).
> 
> - Abstrações não devem depender de detalhes.
> - Detalhes devem depender sobre abstrações

A essência dessa definição é comunicar que um componente que provê um serviço de baixo nível (Infraestrutura, por exemplo) deve depender de interfaces definidas pelos componentes de alto nível (Interface de usuário, aplicação ou domínio).

Para entender esse conceito se voltando mais para computação vamos considerar a perspectiva de compilação de software. Só precisaremos recompilar o sistema vigente quando uma dependência é alterada em relação a sua interface. Ou seja, utilizando de um sistema de compilação e gerenciamento de dependências eficiente podemos atualizar a dependência sem recompilar o projeto principal, já que os contratos entre ambos não mudaram.

Esse é o caso de troca de DLLs em jogos no windows, como por exemplo o caso do DLSS 2.0 que pode ser substituído em alguns jogos para a versão DLSS 2.3 para melhorar a qualidade da imagem.

O artigo de [[Separação de interfaces]] demonstra em um exemplo mais complexo como funciona a relação entre dependência, cliente e seus contratos firmados, além da sua característica de interoperabilidade e independência.

# Exemplo básico

Para fins didáticos, digamos que temos _ClassA_ e _ClassB_. Suponha que a _ClassA_ dependa de _ClassB_. Em tempo de execução, uma instância de _ClassB_ será criada ou injetada em _ClassA_. Ou seja, o fluxo de controle (ou a ordem em que um programa é executado) vai da classe A para a classe B:

![[class_diagram.webp|center]]

Vamos escrever isso como um código:

```java
class ClassB {
    // fields, constructor and methods
}

class ClassA {
    ClassB objectB;

    ClassA(ClassB objectB) {
        this.objectB = objectB;
    }
    // invoke classB methods
}
```

Agora, o DIP (Dependency Inversion Principle) está nos diz para inverter o fluxo de dependências e adicionar uma camada de abstração entre os detalhes de implementação. Podemos ver como isso se aplica ao nosso diagrama:

![[class_diagram_.webp]]

O fluxo de controle seguirá o mesmo caminho. No entanto, agora ambos os nossos objetos dependerão do nível de abstração da interface. Assim, _ClassB_ inverte sua dependência em relação a _ClassA_. Também podemos criar um diagrama de classes para mostrar como ambas as classes agora dependem da abstração:

![[class_diagram_2.webp|center]]

Da mesma forma, podemos ver isso como código:

```java
interface InterfaceB {
    method()
}

class ClassB implements InterfaceB {
    // fields, constructor and methods
}

class ObjectA {
    InterfaceB objectB;

    ObjectA(InterfaceB objectB) {
        this.objectB = objectB;
    }
    ...
}
```

Passando essa lógica para módulos, podemos utilizar o princípio para gerenciar cada módulo de forma independente e garantir que módulos de alto nível apenas dependam de módulos de baixo nível, como mostra a próxima imagem:

![[class_diagram_3.webp]]

Uma pergunta comum nesse tipo de alteração é "Por que a interface está no módulo _ClassA_?" Isso precisa ser feito para alcançar a independência do módulo. Dessa forma podemos alterar os módulos que implementam a interface sem que __Class A Module__ saiba sobre isso.
# Vantagens

## Menor acoplamento entre as camadas do sistema

Organizar um projeto em várias camadas (sejam módulos, pacotes ou namespaces) é uma boa forma de conseguir separar as responsabilidades e garantir um fluxo de trabalho mais paralelizado e com menores conflitos.

Para garantir que a divisão de responsabilidades seja feita com qualidade e robustez é necessário garantir que esses módulos sejam independentes entre si e possam ser trocados de acordo com a necessidade do sistema. Isso é o que o Princípio de Inversão de dependências trás para o sistema.

> [!warning] Distribuição de monolito
> Mesmo separando o código, se forem utilizadas referências concretas caímos em um problema clássico de distribuição da aplicação em múltiplos módulos, classes, métodos sem realmente fazermos a inversão das dependências. 
> 
> Isso no limite pode aumentar a complexidade, que não é o resultado esperado, que seria justamente o inverso.

## Maior flexibilidade na hora de escrever os testes

O princípio de inversão de dependências nos ajuda a possibilitar a escrita de testes em casos onde não é possível já que o código de testes não tem controle do cenário que será testado. 

Fazendo a inversão de dependências passamos o cenário como dependência, trazendo o controle para o teste.

## Facilidade de alterar partes do sistema
Como entre os módulos eles dependem apenas sobre abstrações a suas implementações podem ser alteradas sempre que necessário sem que o cliente da dependência seja notificado (atualizado).

Isso é especialmente  bom facilita a correção problemas ou adição de novas funcionalidades desde que não impactem nos módulos dependentes.

O exemplo contido em [[Separação de interfaces]] ilustra muito bem esse aspecto, porém isso pode ser alcançado mesmo sem a separação de interfaces.

# Equívocos comuns na aplicação do princípio

É comum tentar aplicar o princípio de inversão de dependências pensando apenas que devemos passar os objetos para as classes que os usam. Esse pensamento não está errado, porém ele cai em algumas simplificações que nos evitam de obter todas as vantagens decorrentes da aplicação do princípio em sua totalidade e em alguns casos até em aumentar a complexidade do projeto, que é o total oposto do pretendido.

## De quem é a responsabilidade de criar as instâncias?

> [!tip] Spoiler
> Do container de injeção de dependências

Construir um objeto da classe utilizada resolvendo suas dependências é uma forma de aplicação do princípio. Porém apenas fazendo essa resolução localmente caímos em um outro problema que fere uma outra letra do SOLID, o de Responsabilidade Única (Single responsibility), que nos diz que uma classe só deve ter um motivo para ser alterada.

Consideremos o seguinte exemplo: Uma sala de aula define os alunos que irão estudar, dentro da sala podemos ter diferentes tipos de locais de estudos como: Escrivaninha e Mesa Comum. Cada aluno para conseguir estudar é necessário saber o local que será realizado o estudo.

Como vemos podemos passar o local de estudo no construtor do aluno, resolvendo assim suas dependências. O código abaixo nos mostra exatamente isso:

```python
class Aluno:
	def __init__(local_de_estudo):
		...

	def estudar():
		# executa médodo ILocalEstudo

# Sala de aula
aluno_1 = Aluno(Escrivaninha())
```

Porém resolvendo as dependências dessas forma temos um problema de responsabilidade única na estrutura que cria o aluno. Essa classe além de controlar os alunos da Sala também tem a responsabilidade de resolver as dependências de cada aluno. Ou seja, pelo princípio de responsabilidade única, caso a forma de construir Aluno mude, também será necessário alterar a classe SalaDeAula, o que fere o princípio.

Para resolver esse problema podemos combinar o princípio de inversão de dependências com a injeção de dependência, uma técnica que delega a resolução das dependências de todos os objetos criados no sistema para uma estrutura própria, **containers**. Os containers são estruturas que registram todos os tipos necessários para as construções dos objetos e sempre que um novo objeto é requisitado para inicialização eles garantem que o objeto é construído com todas as dependências necessárias.

Pensando no nosso exemplo da sala de aula, precisamos de delegar a criação de todos esses objetos para um container de injeção de dependências.

```python
class Aluno:
	def __init__(local_de_estudo):
		...

	def estudar():
		# executa médodo ILocalEstudo

class AlunoContainer:
	registrados = {
		"Aluno": Aluno,
		"Escrivaninha": Escrivaninha,
		"MesaComum": MesaComum
	}

	def criar_aluno(self, local_de_estudo):
		return self.resolve("Aluno")(local_de_estudo)

	def resolve(self, key):
		return self.registrados["Aluno"](local_de_estudo)

container = LocalDeEstudoContainer()

# Sala de Aula
aluno_1 = container.criar_aluno(container.resolve("Escrivaninha"))
aluno_2 = container.criar_aluno(container.resolve("MesaComum"))
```

A responsabilidade de construir o local de estudo agora é do AlunoContainer e não mais de uma classe de Sala de Aula por exemplo, nem o aulo nem a sala de aula sabem como essa resolução das dependências é feita, é apenas requisitado o tipo desejado. 

Agora caso a forma de construção do Aluno mude, não é necessário fazer nenhuma alteração na classe que chama a sua instanciação, resolvendo assim tanto o princípio de inversão de dependências como o princípio de responsabilidade única.

## DIP então é apenas Injeção de dependências?

>[!tip] Spoiler
>Não, injeção de dependências é utilizada para alcançar DIP

Apenas a injeção de dependências não garante o princípio, ela é utilizada pra alcançar a inversão de dependências.

Se entre os módulos, classes e funções não são utilizadas abstrações e sim classes concretas, mesmo que essas classes sejam injetadas por um container de IoC estamos ferindo o princípio que nos diz que:

> - Abstrações não devem depender de detalhes.
> - Detalhes devem depender sobre abstrações

Ou seja, para alcançar o que o princípio nos diz em toda a sua totalidade é necessário garantir que todas as estruturas do código dependam de abstrações em vez de classes concretas, e que o meio de resolução das dependências ai sim sejam feitas por um container de IoC.

## DIP então é apenas Polimorfismo?

>[!tip] Spoiler
>Não, Polimorfismo é utilizado para alcançar DIP

Depois de aprender sobre o princípio DIP, aplicaremos interfaces ou abstrações para gerenciar as dependências de nossos módulos. Por exemplo, injetaremos interfaces como uma dependência em nossos módulos. Além disso, podemos injetar várias implementações da mesma interface em nossa _ClassA_. Por exemplo, digamos que agora temos _ClassB1_ e _ClassB2_ estendendo a _InterfaceB_:

![[class_diagram_4.webp| Exemplo de polimorfismo de uma InterfaceB implementada por várias classes concretas |center]]

No entanto, isso não é apenas polimorfismo?

O polimorfismo de fato desempenha um papel no princípio. No entanto, não é todo o princípio em si. É aí que entra o conceito de inversão de dependência. **O polimorfismo está em uso para alcançar a inversão**.

Observe que estamos seguindo o **Princípio da Substituição de Liskov**. Desta forma, podemos substituir o _ClassB_ por outras implementações da mesma interface sem qualquer quebra.

Apenas o polimorfismo não garante que estamos utilizando o princípio já que pela definição, além de utilizar abstrações entre os módulos, que o polimorfismo nos ajuda a alcançar, também temos um outro ponto a considerar: "Módulos alto nível devem depender apenas de módulos baixo nível", só o polimorfismo não nos garante esse ponto.

# Guia de implementação de DIP

O princípio de inversão de dependências nos trás algumas linhas guias para melhorar a nossa solução como descrito na seção de vantagens e nos próprios exemplos. Porém como se trata de um princípio não define nenhum tipo de implementação. Por isso vamos tentar elencar aqui uma forma de implementação guia para aplicações legadas.

> [!tip] Para aplicação novas
> Se você estiver no início de uma nova base de código, recomendo já comer do passo 4 e começar a implementar utilizando um Container de inversão de controle. Será de grande ajuda, já que o fluxo do código será definido com um facilitador para o baixo acoplamento.

Na abordagem de design orientado a objetos, as classes precisam interagir umas com as outras para completar uma ou mais funcionalidades, como por exemplo uma classe A cria e gerencia o tempo de vida de um objeto da classe B para interagir com B e completar uma funcionalidade. Essencialmente, a classe A controla a criação e o tempo de vida dos objetos da classe de dependência.

O princípio da IoC (Inversion of Control) sugere inverter o controle. Isso significa delegar o controle a outra classe. Em outras palavras, inverta o controle de criação de dependência da classe A para outra classe

![[ioc-step1.webp|Passos para a transformação de uma base de código altamente acoplada para uma fracamente acoplada|center]]

## Exemplo utilizado

Para ilustrar a aplicação do guia na implementação do DIP vamos considerar o seguinte exemplo: Na arquitetura típica de n camadas, a interface do usuário (UI) usa a camada de serviço para recuperar ou salvar dados. A camada Service usa a classe `BusinessLogic` para aplicar regras de negócios nos dados. A classe `BusinessLogic` depende da classe `DataAccess` que recupera ou salva os dados no banco de dados subjacente. Este é um design simples de arquitetura de n camadas. Vamos nos concentrar nas classes `BusinessLogic` e `DataAccess` para entender a IoC.

```csharp
public class CustomerBusinessLogic
{
    DataAccess _dataAccess;

    public CustomerBusinessLogic()
    {
        _dataAccess = new DataAccess();
    }

    public string GetCustomerName(int id)
    {
        return _dataAccess.GetCustomerName(id);
    }
}

public class DataAccess
{
    public DataAccess()
    {
    }

    public string GetCustomerName(int id) {
        return "Dummy Customer Name"; // get it from DB in real app
    }
}
```

Problemas nas classes de exemplo acima:

1. As classes `CustomerBusinessLogic` e `DataAccess` são classes fortemente acopladas. Portanto, as alterações na classe `DataAccess` levarão a alterações na classe `CustomerBusinessLogic`. Por exemplo, se adicionarmos, removermos ou renomearmos qualquer método na classe `DataAccess`, então precisaremos alterar a classe `CustomerBusinessLogic` de acordo.
2. Suponha que os dados do cliente venham de diferentes bancos de dados ou serviços da Web e, no futuro, talvez precisemos criar classes diferentes, então isso levará a mudanças na classe `CustomerBusinessLogic`.
3. A classe `CustomerBusinessLogic` cria um objeto da classe `DataAccess` usando a palavra-chave **new**. Pode haver várias classes que usam a classe `DataAccess` e criam seus objetos. Então, se você alterar o nome da classe, então você precisa encontrar todos os lugares em seu código-fonte onde você criou objetos de `DataAccess` e fazer as alterações em todo o código. Este é um código repetitivo para criar objetos da mesma classe e manter suas dependências.
4. Como a classe `CustomerBusinessLogic` cria um objeto da classe `DataAccess` concreta, ela não pode ser testada independentemente. A classe `DataAccess` não pode ser substituída por uma classe simulada.

Para resolver todos os problemas acima e obter um design fracamente acoplado, podemos usar os princípios IoC e DIP juntos.

## Passo 1: IoC com Factories

Como um primeiro passo, uma das formas mais simples de inverter o controle de uma dependência é delegar a criação e o ciclo de vida de uma instância de uma classe para uma Factory.

Isso pode ser facilmente feito de forma estática.

```csharp
public class DataAccessFactory
{
	public static DataAccess GetDataAccessObj() 
	{
		return new DataAccess();
	}
}

public class CustomerBusinessLogic
{
    public string GetCustomerName(int id)
    {
        DataAccess dataAccess =  DataAccessFactory.GetDataAccessObj();

        return dataAccess.GetCustomerName(id);
    }
}
```

Apenas com essa simples alteração no código já temos uma redução no acoplamento. O `CustomerBusinessLogic` não tem nenhuma responsabilidade sobre o acesso de dados, agora ele apenas requisita o que ele precisa e a forma que isso lhe é concedida ele não tem mais controle.

## Passo 2: Implementando abstrações (DIP)

No passo anterior nos reduzimos o acoplamento entre as classes `CustomerBusinessLogic` e `DataAccess` por delegar algumas responsabilidades para uma fábrica. Mesmo assim caso a classe `DataAccess` altere sua interface isso terá um impacto na classe `CustomerBusinessLogic`, provando que ainda existe algum tipo de acoplamento entre elas.

O princípio de inversão de dependências nos diz que:

> - Abstrações não devem depender de detalhes.
> - Detalhes devem depender sobre abstrações

As classes `CustomerBusinessLogic` e `DataAccess` são detalhes de implementação, já que explicitam diretamente o comportamento de cada uma das suas responsabilidades. Assim pelo princípio, entre elas devemos interagir apenas por abstrações.

Para o nosso acesso de dados podemos criar uma abstração que defina uma interface comum que será utilizada no projeto.

```csharp
public interface ICustomerDataAccess
{
    string GetCustomerName(int id);
}

public class CustomerDataAccess: ICustomerDataAccess
{
    public CustomerDataAccess() {
    }

    public string GetCustomerName(int id) {
        return "Dummy Customer Name";        
    }
}

public class DataAccessFactory
{
    public static ICustomerDataAccess GetCustomerDataAccessObj() 
    {
        return new CustomerDataAccess();
    }
}

public class CustomerBusinessLogic
{
    ICustomerDataAccess _custDataAccess;

    public CustomerBusinessLogic()
    {
        _custDataAccess = DataAccessFactory.GetCustomerDataAccessObj();
    }

    public string GetCustomerName(int id)
    {
        return _custDataAccess.GetCustomerName(id);
    }
}
```

Pronto, agora o `CustomerBusinessLogic` não depende mais de nenhum tipo de detalhe de implementação apenas da abstração nesse caso definida pela interface `ICustomerDataAcess`.

Nesse ponto já podemos usufruir de algumas das vantagens como a flexibilidade em alterar as implementações relacionadas a abstração `ICustomerDataAccess`, podemos mudar de banco de dados sem que a classe que implemente a lógica de negócios sofra com isso.

Ainda assim, não alcançamos classes totalmente fracamente acopladas porque a classe `CustomerBusinessLogic` inclui uma classe de fábrica (`DataAccessFactory`) para obter a referência de `ICustomerDataAccess`. É aqui que o padrão de injeção de dependência nos ajuda.

## Passo 3: Injetando dependências

No passo anterior, relacionado ao DIP, criamos e usamos a abstração para tornar as classes fracamente acopladas. Aqui, vamos implementar a injeção de dependência e o padrão de estratégia juntos para mover a criação do objeto de dependência completamente para fora da classe. Este é o nosso terceiro passo para deixar as classes completamente independentes.

Mais sobre [[Injeção de dependências]].

```csharp
public class CustomerBusinessLogic
{
    ICustomerDataAccess _dataAccess;

    public CustomerBusinessLogic(ICustomerDataAccess custDataAccess)
    {
        _dataAccess = custDataAccess;
    }
    
    public string GetCustomerName(int id)
    {
        return _dataAccess.GetCustomerName(id);
    }
}

public interface ICustomerDataAccess
{
    string GetCustomerName(int id);
}

public class CustomerDataAccess: ICustomerDataAccess
{
    public CustomerDataAccess()
    {
    }

    public string GetCustomerName(int id) 
    {
        //get the customer name from the db in real application        
        return "Dummy Customer Name"; 
    }
}
```

Nesse exemplo acima, adicionamos um construtor com um parâmetro do tipo `ICustomerDataAccess`. Esse parâmetro deve ser então injetado na classe por um elemento externo. Como por exemplo o código abaixo:

```csharp
public class CustomerService
{
    CustomerBusinessLogic _customerBL;

    public CustomerService()
    {
        _customerBL = new CustomerBusinessLogic(new CustomerDataAccess());
    }

    public string GetCustomerName(int id) {
        return _customerBL.GetCustomerName(id);
    }
}
```

Agora temos um total desacoplamento da classe `CustomerBusinessLogic` da classe `CustomerDataAccess`, ambas as classes interagem apenas pelas suas abstrações. Mas como você, pode perceber só colocamos esse acoplamento em outro lugar. É a hora de utilizar um Container de IoC para eliminar de vez esse acoplamento entre toda a estrutura do código.

## Passo 4: Contêiner de IoC

No passo anterior conseguimos resolver o acoplamento entre as estruturas iniciais do código. Porém isso nos levou a criar uma outra classe `CustomerService` que está totalmente acoplada. Precisamos de eliminar de uma vez por toda esse gerenciamento de dependência entre as classes. Cada classe deve ser apenas responsável pela sua execução e não ficar gerenciando criação e tempo de vida de outras estruturas. Para isso temos os container de IoC.

O contêiner IoC cria um objeto da classe especificada e também injeta todos os objetos de dependência por meio de um construtor, uma propriedade ou um método em tempo de execução e o descarta no momento apropriado. Isso é feito para que não tenhamos que criar e gerenciar objetos manualmente.

Todos os contêineres devem fornecer suporte fácil para o ciclo de vida de DI seguinte.

- **Registro (Register):** O contêiner deve saber qual dependência instanciar quando encontrar um tipo específico. Esse processo é chamado de registro. Basicamente, ele deve incluir alguma maneira de registrar o mapeamento de tipos.
- **Resolução (Resolve):** Ao usar o contêiner IoC, não precisamos criar objetos manualmente. O contêiner faz isso por nós. Isso se chama resolução. O contêiner deve incluir alguns métodos para resolver o tipo especificado; O contêiner cria um objeto do tipo especificado, injeta as dependências necessárias, se houver, e retorna o objeto.
- **Descarte (Dispose):** O contêiner deve gerenciar o tempo de vida dos objetos dependentes. A maioria dos contêineres IoC inclui diferentes gerenciadores de tempo de vida para gerenciar o ciclo de vida de um objeto e descartá-lo.


O contêiner de injeção de dependências é definido na inicialização (bootstrap) do projeto. Voltando para o nosso exemplo vamos configurar um contêiner de injeção de dependências para ele. Vou utilizar aqui uma interface padrão para fazer essa configuração já que existem vários contêineres no mercado e cada um tempo sua própria interface.

```csharp
// startup.cs
var container = DependencyContainer();
// sempre que o construtor pedir por um ICustomerDataAccess será passada uma instância de CustomerDataAccess
container.Register<ICustomerDataAccess, CustomerDataAccess>()
container.Register<CustomerBusinessLogic>()

var customerBL =  container.Resolve<CustomerBusinessLogic>()

customerBL.GetCustomerName(0)
// retorna: "Dummy Customer Name"
```

## Conclusão

Por meio desse guia conseguimos diminuir o acoplamento entre as classes do sistema até chegar num ponto onde todas as totalmente independentes sendo orquestradas no meio pelo contêiner de injeção de dependências.

Cada projeto pode estar em um nível de abstração diferente e pode partir de qualquer ponto desse guia.

Com isso desenvolvido podemos usufruir de todas as vantagens que o princípio nos trás.

# Outros exemplos

## Exemplo: Personagem e ações

Para ilustrar o relacionamento entre múltiplas camadas vamos considerar um jogo 2D de plataforma que existe um personagem que o jogador controla, esse personagem se movimenta no plano XY e ataca objetos que estão espalhados pelo cenário.

Foi modelado a arquitetura do sistema desse jogo a fim de diminuir a responsabilidade do código em relação ao personagem e também para permitir que as ações do personagem sejam criadas de forma independente, podendo criar testes de forma mais simples.

As camadas criadas foram, 
- Personagem (Character) que envolve todos os controladores do personagem como inputs, atributos;
- Ações do Personagem (CharacterActions) que fazem transformações em cima do personagem ou implementam interações entre o Personagem e outros recursos do jogo.

```mermaid
flowchart LR
Character -.-> CharacterActions
```

Durante o desenvolvimento eles chegaram no seguinte código:

```csharp
// módulo: Character.dll
class Character : ICharacter {
	// todas essas propriedades são iniciadas
	string Name {get; private set;}
	int Power {get; private set;}
	float Speed {get; private set;}
	ITransform Transform {get; private set;} // estrutura do espaço do jogo

	public async Task Attack(Object object){
		await new AttackAction(object).Execute(this)
	}

	public async Task Move(Vector2 targetPosition) {
		new MoveAction(targetPosition).execute(this)
	}
}

// módulo: CharacterActions.dll
interface ICharacterAction {
	async Task Execute(ICharacter character);
}

class AttackAction : ICharacterAction {
	public AttackAction(Object object){
	...
	}

	public async Task Execute(ICharacter character) {
		// Implementa o comportamento do ataque
		...
	}
}

class MoveAction : ICharacterAction{
	public MoveAction(Vector2 targetPosition){
		...
	}

	public async Task Execute(ICharacter character) {
		// Implementa o comportamento da movimentação
		...
	}
}
```

Como podemos perceber nesse exemplo, na real o que fizemos foi separar as responsabilidades em múltiplas classes. Mesmo assim isso não resolve o nosso problema de acoplamento, sempre que as ações de AttackAction ou de MoveAction mudarem também será necessário atualizar o Character. 

Esse tipo é justamente o tipo de problema que queremos resolver com o princípio de inversão de dependências, utilizando esse princípio já passamos as implementações concretas já prontas para serem utilizadas.

Com isso em mente podemos fazer a seguinte alteração no nosso código:

```csharp
// módulo: Character.dll
class Character : ICharacter {
	// todas essas propriedades são iniciadas
	string Name {get; private set;}
	int Power {get; private set;}
	float Speed {get; private set;}
	ITransform Transform {get; private set;} // estrutura do espaço do jogo

	// Removemos os métodos anteriores e criamos um método que apenas executa a ação
	public async Task Do(ICharacterAction action){
		await action.execute(this)
	}
}

// módulo: CharacterActions.dll
interface ICharacterAction {
	async Task Execute(ICharacter character);
}

class AttackAction : ICharacterAction {
	...
}

class MoveAction : ICharacterAction{
	...
}
```

Conseguimos um código menos acoplado já que agora os detalhes não dependem de outros detalhes e sim de abstrações, porém temos ou outro problema dependência cíclica. O princípio nos diz que "Módulos alto nível devem depender apenas de módulos baixo nível."

Para resolver isso é muito simples, definimos as abstrações no módulo de baixo nível e os módulos de alto nível são as implementações.

```csharp
// módulo: Character.dll
interface ICharacter
interface ICharacterAction

class Character : ICharacter {
	// todas essas propriedades são iniciadas
	string Name {get; private set;}
	int Power {get; private set;}
	float Speed {get; private set;}
	ITransform Transform {get; private set;} // estrutura do espaço do jogo

	// Removemos os métodos anteriores e criamos um método que apenas executa a ação
	public async Task Do(ICharacterAction action){
		await action.execute(this)
	}
}

// módulo: CharacterActions.dll
// esse módulo apenas implementa as abstrações do módulo Character.dll
class AttackAction : ICharacterAction {
	...
}

class MoveAction : ICharacterAction{
	...
}
```

```mermaid
flowchart LR
Character -.-> ICharacterAction
Character -->|execute|ICharacterAction
ICharacterAction -->|execute| CharacterActions
CharacterActions -.-o ICharacterAction
```

Agora sim, resolvemos a dependência circular no nosso sistema e temos agora o módulo CharacterActions depende do Character, porém o contrário não é necessário. Dessa forma podemos trocar o módulo `CharacterActions.dll` por ou outro conjunto de ações se que o módulo `Character.dll` fique sabendo disso.

## Exemplo: Teste de aleatoriedade

Vamos considerar um exemplo simples para demonstrar a aplicação do princípio de inversão de dependências no caso de uso para testes. 

Considere um jogo onde o ataque crítico é calculado com uma chance de 10% de acontecer a cada vez que um personagem ataca outro. Nesse caso partimos do seguinte código:

```python
import random

# Função para simular um ataque entre dois personagens
def realizar_ataque():
    chance_critica = random.random()  # Gera um número aleatório entre 0 e 1

	return calcular_dano_normal() 
		if chance_critica > 0.1 
		else damage calcular_dano_critico()

def calcular_dano_normal():
    return random.randint(10, 20)

def calcular_dano_critico():
    return random.randint(20, 30)
    

# Exemplo de uso
print(realizar_ataque())
print(realizar_ataque())
```

Com esse código como base, como podemos escrever testes automatizado?

```python
import unittest
from seu_modulo import realizar_ataque, calcular_dano_normal, calcular_dano_critico

class TestAtaque(unittest.TestCase):

    def test_ataque_normal(self):
	    dano = realizar_ataque()
	    assertGreater(dano, 10)
		assertLess(dano, 20)
		
    def test_ataque_critico(self):
	    dano = realizar_ataque()
        assertGreater(dano, 20)
        assertLess(dano, 30)

```

Ótimo conseguimos escrever os testes, porém quando rodamos temos valores diferentes a cada execução. Por que isso acontece?

Não conseguimos ter uma valor consistente para a execução do ataque normal nem para a execução do ataque crítico, já que o valor é aleatório e o teste não tem controle sobre essa aleatoriedade, podendo no código de ataque normal gerar um crítico e no do crítico uma ataque normal.

Um recurso que pode ser utilizado nesses casos em algumas linguagens é criar um patch no módulo de importação do random e definir o valor para cada execução. Por baixo dos panos o patch está criando um embrulho sobre o pacote de forma a voltar o valor declarado. Com isso voltamos a ter o controle do teste e podemos garantir quais os valores gerados pelo módulo:

```python
import unittest
from unittest.mock import patch
from seu_modulo import realizar_ataque, calcular_dano_normal, calcular_dano_critico

class TestAtaque(unittest.TestCase):

    @patch('seu_modulo.random.random', return_value=0.2)  # Força um ataque normal
    def test_ataque_normal(self):
	    dano = realizar_ataque()
	    assertGreater(dano, 10)
		assertLess(dano, 20)
	
	@patch('seu_modulo.random.random', return_value=0.05)  # Força um ataque crítico
    def test_ataque_critico(self):
	    dano = realizar_ataque()
        assertGreater(dano, 20)
        assertLess(dano, 30)

```

Porém agora temos um código totalmente acoplado ao comportamento de um implementação específica definida no módulo random. Ou seja, qualquer alteração no módulo random irá impactar no código de testes tanto quando no código de fonte, além de que se alterarmos a função `realizar_ataque()` para utilizar outro módulo sem ser o random no nosso código fonte os testes pararão de funcionar, e isso também é um problema já que os testes não deveriam depender de detalhes de implementação.

> [!tip] Randomização e jogos digitais
> É bem comum em jogos digitais não é comum serem utilizados sistemas totalmente randômicos. Geralmente são utilizados sistemas pseudorrandômicos para garantir que a experiência do jogador seja minimamente guiada durante o jogo. Como é o caso dos jogos de Pokemon, que o números randômicos são gerados em sequência.

Nesse caso o princípio de inversão de dependências vem nos ajudar. Como definido "Abstrações não devem depender de detalhes e Detalhes devem depender sobre abstrações". Olhando para nossa função `realizar_ataque()`que é um detalhe de implementação devemos alterar sua implementação de forma a depender apenas de abstrações e não mais de outros detalhes. 

Nesse caso precisamos de definir qual a abstração que a função utiliza, vamos chamar ela de `irandom`, que é uma interface (ou seja uma abstração) para as funções randômicas do sistema.

```python
# Função para simular um ataque entre dois personagens
def realizar_ataque(irandom):
    chance_critica = irandom.random()  # Gera um número aleatório entre 0 e 1

	return calcular_dano_normal() 
		if chance_critica > 0.1 
		else damage calcular_dano_critico()

def calcular_dano_normal(irandom):
    return irandom.randint(10, 20)

def calcular_dano_critico(irandom):
    return irandom.randint(20, 30)
    

# Exemplo de uso
import random
irandom = random
print(realizar_ataque(irandom))
print(realizar_ataque(irandom))
```

Todas as referências ao módulo `random` foram substituídas ficando agora apenas com as abstrações em seu lugar.

Assim podemos alterar os nossos testes utilizando o mesmo princípio.

```python
import unittest
from seu_modulo import realizar_ataque, calcular_dano_normal, calcular_dano_critico

class FakeRandom:
	def __init__(self, random_value)
		self.random_value = random_value
	def random(self):
		return self.random_value

	def randint(min, max):
		return random.random.randint(min, max)

class TestAtaque(unittest.TestCase):

    def test_ataque_normal(self):
	    random_fake = FakeRandom(0.2)
	    dano = realizar_ataque(random_fake)
	    assertGreater(dano, 10)
		assertLess(dano, 20)
		
    def test_ataque_critico(self):
	    random_fake = FakeRandom(0.05)
		dano = realizar_ataque(random_fake)
        assertGreater(dano, 20)
        assertLess(dano, 30)

```

Criamos uma classe, `FakeRandom`, que declara a interface do random que será utilizada durante o testes.

Ótimo agora temos o controle total da instância que passamos para a função `realizar_ataque(irandom)`. Podemos até definir quais comportamento queremos falsear e quais utilizamos um implementação de terceiros. 

Além disso o código de testes não depende das mesmas dependências do código fonte, como acontece no exemplo com patch, isso nos possibilita utilizar nos testes, módulos completamente diferente do que são utilizados no código fonte, enquanto respeitarmos as interfaces utilizadas entre as abstrações.

# Referências

- [Baeldung](https://www.baeldung.com/cs/dip)
	- Tem um ótimo resumo sobre o princípio de trás discussões sobre equívocos ao utilizar
- [balta.io/blog/dependency-injectio](https://balta.io/blog/dependency-injection)
	- Foco na utilização de injeção de dependências e sua relação com DIP
- https://www.tutorialsteacher.com/ioc
	- Ótimo artigo que demonstra passo a passo a implementação do princípio