---
tags:
  - Linguagens
---
>[!info] O que é?
>Dart é uma linguagem de programação desenvolvida pelo Google.
>
>- [Documentação](https://dart.dev/overview)

# Interface e Abstrações

Em Dart não existem interface como em outras linguagens (explicitamente declaradas), todas as declarações de classes são interfaces. Para mais informações [Interfaces implícitas](https://dart.dev/language/classes#implicit-interfaces)

O que diferencia principalmente as duas são no uso da classe filha.

```dart
abstract class A {
    void sayHello() {
       print("Hello");
    }
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

// C class extends A class, so it has to implement all abstract methods of A. (Not all). 
// C is inherited the sayHello() methods from A class.
class C extends A {
   void sayBye() {
       print("C say Bye");
   }
}
```