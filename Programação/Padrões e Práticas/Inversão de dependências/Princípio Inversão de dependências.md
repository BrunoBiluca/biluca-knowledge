---
tags:
  - programação/padrões
---
## Princípio

Uma forma de melhorar a arquitetura em camadas é aplicar o princípio de inversão de dependências:

> [!quote] Definição por Robert C. Martin
> Módulos alto nível devem depender apenas de módulos baixo nível. Ambos devem depender de abstrações (como por exemplo interfaces).
> 
> - Abstrações não devem depender de detalhes.
> - Detalhes devem depender sobre abstrações

A essência dessa definição é comunicar que um componente que provê um serviço de baixo nível (Infraestrutura, por exemplo) deve depender de interfaces definidas pelos componentes de alto nível (Interface de usuário, aplicação ou domínio).

Para entender bem o conceito de um dependência definida acima podemos voltar para uma perspectiva de compilação de software, onde só precisaremos recompilar o sistema vigente quando uma dependência é alterada em relação a sua interface. Ou seja, utilizando de um sistema de compilação e gerenciamento de dependências eficiente podemos atualizar a dependência sem recompilar o projeto principal, já que os contratos entre ambos não mudaram.

Esse é o caso de troca de DLLs em jogos no windows, como por exemplo o caso do DLSS 2.0 que pode ser substituído em alguns jogos para a versão DLSS 2.3 para melhorar a qualidade da imagem.

O artigo de [[Separação de interfaces]] demonstra em um exemplo mais complexo como funciona a relação entre dependência, cliente e seus contratos firmados, além da sua característica de interoperabilidade e independência.

# Exemplo básico

Vamos encerrar a seção anterior com um exemplo. Digamos que temos _ClassA_ e _ClassB_. Suponha que _ClassA_ dependa de _ClassB_. Em tempo de execução, uma instância de _ClassB_ será criada ou injetada em _ClassA_. O fluxo de controle (ou a ordem em que um programa é executado) vai da classe A para a classe B:

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

Agora, o que o DIP está nos dizendo é inverter a dependência. Podemos ver como isso se aplica ao nosso diagrama:

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

É comum tentar aplicar o princípio de inversão de dependências pensando apenas que devemos passar os objetos para as classes que os usam. Esse pensamento não está errado, porém ele cai em algumas simplificações que podem evitar obter todas as vantagens por não utilizar o princípio em sua totalidade e em alguns casos até em aumentar a complexidade, que é o total oposto do pretendido.

## De quem é a responsabilidade de criar as instâncias?

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

## Injeção de dependências é DIP?



## Polimorfismo é DIP?

After learning about the DIP principle, we’ll apply interfaces or abstractions to manage our modules’ dependencies. For instance, we’ll inject interfaces as a dependency in our modules. Furthermore, we can inject multiple implementations of the same interface in our _ClassA_. For example, let’s say now we have _ClassB1_ and _ClassB2_ extending the _InterfaceB_:

![[class_diagram_4.webp| Exemplo de polimorfismo de uma InterfaceB implementada por várias classes concretas |center]]

However, isn’t that just polymorphism?

Polymorphism indeed plays a part in the principle. However, it is not just the principle itself. This is where the concept of dependency inversion comes in. **Polymorphism is in use to achieve the inversion**.  
Notice that we are following the Liskov Substitution Principle. This way, we can replace the _ClassB_ with other implementations of the same interface without any break.

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


