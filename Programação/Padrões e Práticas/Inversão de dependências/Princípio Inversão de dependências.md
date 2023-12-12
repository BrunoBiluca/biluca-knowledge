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

# Vantagens

## Menor acoplamento entre as camadas do sistema


## Maior flexibilidade na hora de escrever os testes

O princípio de inversão de dependências nos ajuda a possibilitar a escrita de testes em casos onde não era possível anteriormente a sua aplicação.

Vamos considerar um exemplo simples para demonstrar a aplicação do princípio. Considere um jogo onde o ataque crítico é calculado com uma chance de 10% de acontecer a cada vez que um personagem ataca outro. Nesse caso partimos do seguinte código:

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

## Facilidade de alterar partes do sistema
Como entre os módulos eles dependem apenas sobre abstrações a suas implementações podem ser alteradas sempre que necessário sem que o cliente da dependência seja notificado (atualizado).

Isso é especialmente  bom facilita a correção problemas ou adição de novas funcionalidades desde que não impactem nos módulos dependentes.

O exemplo contido em [[Separação de interfaces]] ilustra muito bem esse aspecto, porém isso pode ser alcançado mesmo sem a separação de interfaces.


# Exemplo de domínio
