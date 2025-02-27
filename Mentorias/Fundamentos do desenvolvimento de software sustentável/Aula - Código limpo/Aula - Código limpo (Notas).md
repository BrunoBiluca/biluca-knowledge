# Aula - Código limpo (Notas)

Notas referente a apresentação [[Aula - Código limpo (Apresentaç)]].


# Origem da ideia de código limpo

O termo código limpo é um termo utilizado para descrever código de programação que seja conciso, fácil de entender que claramente expresse a intenção do programador.

Esse termo ganhou bastante popularidade desde 2008 quando Robert Cecil Martin (famoso Uncle Bob) publicou o livro "Clean Code: A Handbook of Agile Software Craftsmanship".

Uncle Bob é um agitador em relação a metodologias ágeis (foi um dos que participou do Agile Manifesto) e práticas de extreme programming.

Atualmente acredito podemos discutir que as algumas práticas apresentadas em seu livro são um pouco datadas e existem outras convenções que podem as substituir, mas a ideia de criar um guia de código ajuda muito na comunicação do time por propor um entendimento claro sobre como o código deve ser norteado é necessário a qualquer projeto que espera ter sucesso com tranquilidade. 

# Semântica de código

Utilizando como base a seção de semântica do [[Código limpo]].

Pontos importantes

- Definir o que é semântica
- Demonstrar porque a semântica é importante
	- Ainda escrevemos código para outros programadores
	- Evita erros
	- Permite que alterações sejam mais fácies de serem feitas

- Por fim falar um pouco de algumas arquitetura que focam no significado das coisas

Exemplo de código difícil de entender

```python
def func_a(x):
    if x <= 0:
        return "Isso não deveria acontecer"
    elif x <= 2:
        return 0 if x == 1 else 1
    else:
        return func_a(x - 1) + func_a(x - 2)
```

Exemplo de código bom:

```python
def fibonacci(n):
    if n <= 0:
        raise ValueError("'n' deve ser um número natural")
    elif n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
```

# Refatoração de código


- Refatoração é a limpeza na nossa casa, tem que fazer continuamente
	- A realidade dos projetos não permite isso
	- Regra do escoteiro

- Fluxo de refatoração
	- Testes
	- Reduzir a desordem
		  - Remover código desnecessário
		  - Remover comentários que não são pertinentes
		  - Extrair métodos simples
		  - Reduzir expressões lógicas
	- Reduzir a complexidade ciclomática
		  - Extrair métodos para código dentro de loops
		  - Extrair métodos para código dentro de ifs
	- Melhorar a semântica

# Impactos na semântica do código

## Nomenclatura

- Entender o que estamos nomeando é o primeiro passo para nomear as coisas
	- Avaliar principalmente escopo e contexto
	- Escopo determina os limites de responsabilidade
	- Contexto onde essa estrutura está inserida
	- Menos as vezes é melhor para a legibilidade

#### Variáveis

```python
# não aproveita do contexto o que torna muito verborrágico
for list_index in range(len(items_list)):
	print(items_list[list_index])

# reduz o nome facilitando a leitura
for i in range(len(items)):
	print(items[i])
```

- Exemplos
  - data -> user
    - nesse caso o uso do data é sempre redundante, já que tudo pode ser considerado como data
  - info -> book_info
    - referente a informações do livro
  - handler -> url_handler
    - comando para tratar a url
  - wrapper -> buttons_wrapper
    - componente que envolve os demais componentes de botões
  - holder -> image_holder
    - componente que uma imagem será inserida ou encontrada

#### Métodos e funções

Métodos devem ser nomeados de acordo com a ação que será executada. 

```js
// bad
function filter(list){}

// good
function filterByAuthor(books){}
```

Métodos que retorna um boolean devem ser escritos como uma **pergunta**.

```js
// bad
function userStatus(user){}

// good
function isActive(user){}
```

Um método não deve apresentar múltiplos parâmetros.

```js
// bad
function addUser(active, name, type, role, createdAt){} 
addUser(true, null, null, "admin", null)

// good
function add(user){}
user = {isActive: true, role: "admin"}
add(user)
```

Um método não deve receber apenas um parâmetros booleano. Nesse caso o ideal é criar dois métodos.

```js
// bad
function addUser(isTeacher){
  if(isTeacher){
    user.type = "teacher"
  }
  else {
    user.type = "admin"
  }
} 
addUser(true)

// good
function addAdmin(user){ user.type = "admin" }
function addTeacher(user){ user.type = "teacher" }
```

Acúmulo de responsabilidades

```js
// bad
function validateAndSave(user){
	if (isValid(user)) {
		save(user)
	}
} 
validateAndSave(user)

// good
function validate(create_user_request){ // lança exceção caso contrário }
function save(validUser){ // lança exceção caso contrário }
validUser = validate(create_user_request)
save(validUser)
```

## Complexidade ciclomática

- Descrever o que é
- Explicar o problema de uma grande complexidade ciclomática no código


## Efeitos colaterais

Alguns fatores que podem ocasionar side effects
- Alta complexidade ciclomática no código
- Variáveis que são alteradas durante a execução de várias linhas de código

```js
let obj = {a: 0};

doSomething(obj)

obj.a += 1
console.log(obj)

// Não sabemos o que será retornado, já que o obj pode ter sido alterado durante doSomething
```

Solução

```js
let obj = {a: 0};

otherObj = doSomething(obj)

obj.a += 1
console.log(obj) // {a: 1}
console.log(otherObj) // o que o doSomething retornar
```

Esse tipo de side effect pode ser ainda pior quando utilizamos funções assíncronas sem aguardar os devidos resultados.

```js
let books = []
let bookOwnedCount = 0

getBooks()
  .then((res) => books.append(res.data))

getBooksOwned()
  .then((res) => bookOwnedCount = books.filter(b in res.data).length())

console.log(bookOwnedCount)
// O que será printado no console?
```

Solução

```js
let books = []

res1 = await getBooks()
books.append(res1.data)

res2 = await getBooksOwned()
let bookOwnedCount = books.filter(b in res2.data).length())

console.log(isBooksEmpty)
```


## Comentários

- Devem ser evitados
- O próprio código alto nível tem que expressar sua intenção


```js

// bad
function someMethod(value){
  return value / 1000; // convert ratio
}

// good
function someMethod(value){
  const convertRatio = 1000;
  return value / convertRatio;
}

```

Porém comentários são uma ferramenta extremamente útil para descrever funções e classes para terceiros. 

Exemplo de comentários para contratos

```csharp
public interface IDamageable
{
	event Action OnTakeDamage;
	event Action<float> OnTakeDamageAmount;

	/// <summary>
	/// Atualiza o objeto dado uma quantidade de dano
	/// </summary>
	/// <param name="amount">Positive float</param>
	/// <emits>OnTakeDamage</emits>
	/// <emits>OnTakeDamageAmount</emits>
	void Damage(float amount);
}
```

```csharp
public class Furniture : IDamageable
{
	event Action OnTakeDamage;
	event Action<float> OnTakeDamageAmount;

	float health = 10f;

	/// <summary>
	/// Atualiza a vida do objeto diminuindo a quantidade de dano.
	/// Depois emite os eventos OnTakeDamage e OnTakeDamageAmount.
	/// </summary>
	/// <param name="amount">Positive float</param>
	/// <emits>OnTakeDamage</emits>
	/// <emits>OnTakeDamageAmount</emits>
	void Damage(float amount) {
		health -= amount;
		OnTakeDamage?.Invoke();
		OnTakeDamageAmount?.Invoke(amount);
	}
}
```


## Tratamento de exceções

- Exceções são uma forma muito mais semântica de orientar comportamentos de exceção dentro do código

```js

// bad code
function validate(obj){
  if(!obj.hasOwnProperty("name"))
    return { code: 1 , error: "Object has no property name"}

  return obj
}

// good code
function validate(obj){
  if(!obj.hasOwnProperty("name"))
    throw "Object has no property name"

  return obj
}
```


## Hierarquia de pastas

- Hierarquia de pastas é arbitrário, mas podemos ter uma melhor noção de onde colocar nossos arquivos

- Estrutura muito comum vista em vários projetos

```
📦src
 ┣ 📂 assets
 ┃ ┣ 🖼️ user_profile_image_placeholder.png 
 ┃ ┣ 🖼️ logo.png
 ┃ ┗ 🖼️ book_cover_placeholder.png
 ┣ 📂 components
 ┃ ┣ 📜 AuthorDisplay
 ┃ ┣ 📜 UserDisplay
 ┃ ┣ 📜 BookDisplay
 ┃ ┗ 📜 DateDisplay
 ┣ 📂 services
 ┃ ┣ 📜 UserService
 ┃ ┣ 📜 BookService
 ┃ ┗ 📜 AuthorService
 ┣ 📂 router
 ┃ ┣ 📜 UserRouter
 ┃ ┗ 📜 BookRouter
 ┣ 📂 store
 ┃ ┗ 📜 UserStore
 ┣ 📂 views
 ┃ ┣ 📜 UserView
 ┃ ┗ 📜 BookView
 ┣ 📂 tests
 ┃ ┣ 📂 components
 ┃ ┣ 📂 services
 ┃ ┣ 📂 router
 ┃ ┣ 📂 store
 ┃ ┗ 📂 views
 ┗ 📜 main.js
```

Problemas com esse tipo de abordagem:
- Alto acoplamento entre os diversos componentes
- Baixa coesão, já que scripts que resolvem problemas diferentes estão associados
- Péssima visibilidade da intensão do projeto

Uma forma de suprir esse problemas é implementar uma arquitetura de código orientada ao significado de cada componente do sistema. 

Como **Kent Beck** falou uma vez a definição de coesão é:

> Pull the things that are unrelated further apart, and put the things that are related closer together.

Dessa forma a arquitetura do exemplo de Front-end poderia ser implementada da seguinte forma.

```
📦src
 ┣ 📂 user
 ┃ ┣ 📂 tests
 ┃ ┣ 🖼️ user_profile_image_placeholder.png 
 ┃ ┣ 📜 UserService
 ┃ ┣ 📜 UserDisplay
 ┃ ┣ 📜 UserRouter
 ┃ ┣ 📜 UserView
 ┃ ┗ 📜 UserService
 ┣ 📂 book
 ┃ ┣ 📂 tests
 ┃ ┣ 🖼️ book_cover_placeholder.png
 ┃ ┣ 📜 BookService
 ┃ ┣ 📜 BookDisplay
 ┃ ┣ 📜 BookView
 ┃ ┗ 📜 BookRouter
 ┣ 📂 author
 ┃ ┣ 📂 tests
 ┃ ┣ 📜 AuthorDisplay
 ┃ ┗ 📜 AuthorService
 ┣ 📂 common
 ┃ ┣ 📂 tests
 ┃ ┣ 🖼️ logo.png
 ┃ ┗ 📜 DateDisplay
 ┗ 📜 main.js
```

Nesse formato de abordagem precisamos sempre nos atentar a garantir que quando um componente do sistema começa a apresentar múltiplas funcionalidades, este deve ser promovido a um módulo próprio.

# Ferramentas de auxílio na construção de código

- Linters
- IAs
- Criar suas próprias regras

# Análise de código

- Deixar claro o que se espera da base de código ajuda muito na comunicação e análise do código
- Guias de estilos com solução a problemas comuns são um bom ponto de referência
	- Esses guias podem ser construídos junto com a equipe a cada novo
- Os princípios do projeto devem sempre guiar o código
- Cuidado com o pedantismos, colaborar também é entender que os outros membros do projeto estão dando seu melhor, então não fique gastando tempo com discussões infinitas se o nome da variável dentro de uma função de 2 linhas de código deve ser `a` ou `b`. Lembre-se o código sempre pode ser futuramente refatorado para representar melhor o conhecimento do domínio que está sendo resolvido.

# Atividades


Os exemplos foram divididos em 3 arquivos
- *_bad: arquivo com o código escrito da pior forma possível
- *_clean: arquivo com o código limpo
- *_notes: arquivo com o código ruim com comentários de possíveis melhorias

- No folder **ex_1** apresenta um exemplo de código com os seguintes problemas
  - Uma função faz uma única coisa
  - Nomenclatura variáveis
  - Nomenclatura de métodos
  - Side effects
- No folder **ex_2** apresenta um exemplo de código com os seguintes problemas
  - Evitar condicionais com múltiplas instruções
  - Condicionais invertidas
  - Alta complexidade ciclomática
  - Side effects