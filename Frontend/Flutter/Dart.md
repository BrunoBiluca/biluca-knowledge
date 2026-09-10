---
tags:
  - Linguagens
categoria: linguagem
---
# Dart

>[!info] O que é?
>Dart é uma linguagem de programação desenvolvida pelo Google.
>
>- [Documentação](https://dart.dev/overview)

## Interfaces e Abstrações

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

## Classes executáveis (callable classes)

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

## late, const e final

### late

`late` é utilizado para declarar uma variável não-nula que será inicializada posteriormente.

```dart
class MyClass {
  late String nonNullableString;
 
  void initializeValue() {
    nonNullableString = 'Initialized String';
  }
}
```

### const

`const` define uma constante em tempo de compilação. Esses valores não são alterados durante a execução do programa.

```dart
const double pi = 3.14159;
const myImmutableWidget = const Text('Hello, Flutter!');
```

### final

`final` define uma variável que é setada em tempo de execução, porém o seu valor não é alterado depois disso.

```dart
class UserProfile {
  final String username;
  UserProfile(this.username);
}
```

## Null safety

[[Null safety]]

### Working with Null Safety

So, how do you work with nullable variables? Say you have a nullable string and you want to work with it safely. You can use the 'if' statement to check for null:

```dart
String? name;
 
if (name != null) {
  print('Hello, $name!');
}
```

Or, you can use the handy null-aware operators that Dart provides:

- **The Question Dot Operator (?.):** Allows you to access a property or call a method on an object if it isn't null.

```dart
print(name?.length); // Only tries to get length if name is not null
```
    
- **The Null Coalescing Operator (??):** Provides a default value if the variable is null.

```dart
print(name ?? 'Guest'); // Prints 'Guest' if name is null
```

#### Tips for Smooth Sailing

- **Initialize Early:** Try to give variables non-null initial values as early as possible. It's easier to deal with.
    
- **Be Explicit:** Use nullable types only when you really expect nulls. The more you can avoid null, the safer your code will be.
    
- **Embrace the Tools:** Dart's analysis tools are great at pointing out potential null safety issues. Listen to them!