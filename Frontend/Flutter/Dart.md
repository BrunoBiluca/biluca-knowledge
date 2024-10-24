---
tags:
  - Linguagens
---
>[!info] O que é?
>Dart é uma linguagem de programação desenvolvida pelo Google.
>
>- [Documentação](https://dart.dev/overview)

# Interfaces e Abstrações

> [!info] Documentação
> - 

Em Dart todos os objetos são definidos na declaração de classes possibilitando a uma classe filha implementar qualquer método da classe pai ([Interfaces implícitas](https://dart.dev/language/classes#implicit-interfaces)).

Para outros tipos de comportamento desejado podemos utilizar os diversos [Modificadores de classes](https://dart.dev/language/class-modifiers)  providos na linguagem. [Tabela referência de modificadores de classes](https://dart.dev/language/modifier-reference) .

Por exemplo para definir uma interface clássica (no sentido de linguagens como C# ou Java) podemos criar a seguinte definição:

```dart
abstract interface class A {
    void sayHello();
	void sayBye();
}

// B class implements A interface, so it has to implements all methods of A.
class B implements A {
    void sayHello() {
       print("B say Hello");
    }
    void sayBye() {
       print("B say Bye");
    }
}

var a = A(); // ERROR: acusa erro de inicialização já que não possui construtor
```

# Classes executáveis (callable classes)

É uma função simples que poder ser utilizada sempre que uma classe implementa o método `call`, esse método pode ter parâmetros também.

```dart
class Greeter {
  String name;

  Greeter(this.name);

  dynamic call() {
    print('Hello, $name!');
  }
}

var greeter = Greeter('Jane');
greeter(); // Output: Hello, Jane!
```
