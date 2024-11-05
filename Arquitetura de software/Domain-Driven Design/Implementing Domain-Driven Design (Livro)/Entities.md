---
tags:
  - arquitetura_software
---
No capítulo de Entidades o autor (Vaughn Vernon) se volta a analisar uma das estruturas centrais do modelo. É feita uma discussão sobre o que realmente são entidades e como as modelar.

Entidades são definidas principalmente pelas seus papéis dentro do sistema e suas responsabilidades.

São definidos os padrões táticos de utilização de Entidades com exemplos.

# Resumo
Utilizamos o conceito de entidade para coisas que estamos preocupados com a individualidade. Entidades são coisas únicas que são capazes de mudar com o tempo.

> [!tip] Entidades vs Value Objects
> A suas características únicas e de mutabilidade são o que diferenciam as Entidades dos Value Objects.

> [!info] Definição de Entidades
> Quando um objeto é distinguido principalmente pela sua identidade, em vez de seus atributos, faça este primariamente a definição do modelo. 
> 
> Mantenha a definição da classe simples e focada no ciclo de vida continuado e identificado. 
> 
> Defina uma forma de distinguir cada objeto independente da forma ou do histórico. 
> 
> O modelo deve definir o que significa ser a mesma coisa (comparação entre objetos).

## Identidade única

No início do design de uma entidade devemos focar propositalmente nos atributos primários e seus comportamentos que são centrais para sua identidade única. Focando principalmente numa forma de a identificar e de conseguir encontra-la (query).

A identidade de uma entidade pode ser definida como uma Value Object, já que estes são imutáveis e definem o comportamento específico de forma a centralizar a identidade.

Podemos definir 4 tipos de criação de identidade em um sistema:

- Provido pelo usuário
- Internamente gerado pela aplicação
- Aplicação utiliza o armazenamento para gerar a unicidade
- Outro contexto gera a unicidade

## Descobrindo entidades e suas características intrínsecas

Focar em modelar a linguagem onipresente em vez de modelar modelos entidade relacional é uma boa forma de enriquecer o contexto limitado e evitar modelos de domínio anêmicos.

A linguagem do domínio não aparece de repente. É preciso desenvolver através de discussões com os especialistas do domínio e minerando os requerimentos.

> [!tip] Linguagem onipresente vs Glossário
> É um erro pensar na linguagem onipresente apenas como um glossário e cenários. A linguagem em última instância é modelada pela código, e pode ser difícil ou impossível de mandar a documentação sincronizada com o código.

### SaaSOvation modelagem

Quando o time SaaSOvation estava modelando o usuário chegaram ao entendimento que ele deveria ser unicamente identificado e também suportar alterações ao longo do tempo, claramente uma Entidade.

Outra questão que apareceu durante o processo de modelagem foi sobre a necessidade de ativar e desativar Tenants. Esse tipo de modelagem poderia ser resolvido com a implementação de um método `setActive(bool)`, o time de desenvolvimento seguinte com dois métodos `activate()` e `deactivate()` dessa forma o código está em conformidade com a Linguagem Onipresente.

## Responsabilidades e papéis

Em orientação a objetos, geralmente interfaces significam responsabilidades ou papéis implementados por uma classe. Classes podem ter vários papéis desde que não sejam muito complexos.

Exemplo:

```
class Customer implements IAddOrdersToCustomer, IMakeCustomerPreferred {
	AddOrder(anOrder: Order)
	MakePreferred()
}
```

Nesse caso o customer encapsula muito bem os papéis necessários para a execução dessas responsabilidades sem aumentar a complexidade definida.

> [!tip] Notação `I` de interfaces
> O `I` como o prefixo de interfaces é comumente utilizado no desenvolvimento .NET. Além disso algumas pessoas acreditam que essa notação melhora a legibilidade: "O add orders to customers" e "I make customer preferred". 
> 
> Sem o prefixo `I` o resultado seriam nomes baseados em verbos que semanticamente não são tão interessantes.

### Esquizofrenia de objeto (object schizophrenia)

Esquizofrenia de objeto descreve a situação onde os objetos delegados tem um comportamento original, podendo se comportar de forma confusa para o cliente da classe.

```java
public class UserPrincipal implements User, Principal {
	private Principal personPrincipal;
	private Principal systemPrincipal;
	...
	public Name principalName() {
		if (personPrincipal != null) {
			return personPrincipal.principalName();
		} else if (systemPrincipal != null) {
			return systemPrincipal.principalName();
		} else {
			throw new IllegalStateException("The principal is unknown.");
		}
	}
	...
}
```

Nesse exemplo o método `principalName()` pode retornar múltiplos valores dependendo de sua configuração sem que o cliente dessa classe assim o determine. Esse tipo de design cria um comportamento confuso e de pouca confiabilidade.

## Construtor

Quando criamos uma entidade queremos usar o seu construtor para garantir estado suficiente para identifica-la em sua totalidade e habilitar o cliente de encontra-la.

Se uma entidade tem uma invariante que a satisfaz com um estado não nulo do objeto, ou calcula utilizando um estado de outro, este estado precisa ser providenciado como um parâmetro em um ou mais construtores.

Uma forma de fazer instanciações mais complexas é utilizar uma **Factory** para isso. Esse padrão pode ser desde um método em uma outra entidade (como ele faz no caso do Usuário e Tenant) até uma outra estrutura.

```java
// Utilização do método registerUser como uma Factory
public class Tenant extends Entity {
	...
	public User registerUser(
		String aUsername,
		String aPassword,
		Person aPerson
	) {
		aPerson.setTenantId(this.tenantId());
		User user =new User(
			this.tenantId(),
			aUsername,
			aPassword,
			aPerson
		);
		return user;
	}
	...
}
```

## Validação

A principal razão de utilizar validação no modelo é para checar a validade de um atributo/propriedade, de todo um objeto, ou de uma composição de objetos.

### Validando Atributos/Propriedades

É recomendado utilizar auto encapsulamento para esse tipo de validação.

> [!quote] Auto encapsulamento por Martin Fowler
> Auto encapsulamento é fazer o design de suas classes de forma que todo o acesso de dados, mesmo que de dentro da própria classe, seja por meio de métodos de acesso (gets, sets)

A validação do objeto no modelo é uma forma de programação defensiva. Dessa forma garantimos a validade dos objetos que estamos trabalhando sem depender ou contar com validações terceiras.

### Validando todo o objeto

Para a validação de objetos completos é interessante postergar a validação para o último momento possível, já que é necessário ter o estado completo em mãos antes de definir a validade do objeto como um todo.

Uma preocupação bem comum na hora de implementar as validações é de fazê-las na própria entidade, isso pode levar a muita responsabilidade para a Entidade, já que é mais frequente a alteração das validações do que da própria entidade ao longo do desenvolvimento do projeto

```java
public abstract class Entity extends IdentifiedDomainObject {

	public void validate(ValidationNotificationHandler aHandler) {
	}
}

public class Warble (Gorjeio) extends Entity {
	...
	@Override
	public void validate(ValidationNotificationHandler aHandler) {
		(new WarbleValidator(this, aHandler)).validate();
	}
	...
}

public abstract class Validator {
	private ValidationNotificationHandler notificationHandler;
	...
	public Validator(ValidationNotificationHandler aHandler) {
		super();
		this.setNotificationHandler(aHandler);
	}
	
	public abstract void validate();
	
	protected ValidationNotificationHandler notificationHandler() {
		return this.notificationHandler;
	}
	
	private void setNotificationHandler(ValidationNotificationHandler aHandler) {
		this.notificationHandler = aHandler;
	}
}

class WarbleValidator extends Validator {
	...
	public Validator(
		Warble aWarble,
		ValidationNotificationHandler aHandler
	) {
		super(aHandler);
		this.setWarble(aWarble);
	}
	...
	public void validate() {
		this.checkForWarpedWarbleCondition();
		this.checkForWackyWarbleState();
		...
	}
	...
	protected checkForWarpedWarbleCondition() {
		if (this.warble()...) {
			this.warbleNotificationHandler().handleWarpedWarble();
		}
	}
	...
	protected WarbleValidationNotificationHandler warbleNotificationHandler() {
		return (WarbleValidationNotificationHandler)this.notificationHandler();
	}
}
```

Esse exemplo define uma estrutura de validação de entidades. A classe que efetua a validação herda de uma classe comum chamada `Validator` delegando que a própria entidade faça a validação do modelo. 

As notificações a respeito da notificação também são tratadas por uma outra classe  que pode ser específica com o caso do `WarbleValidationNotificationHandler` ou não `ValidationNotificationHandler`, isso é principalmente interessante já que os detalhes de implementação são escondidos.

# Referências
