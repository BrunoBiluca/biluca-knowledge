# Fundamentos de Software

Questões relacionadas a [[Fundamentos de Software/Fundamentos de Software|Fundamentos de Software]].

## Geral

> [!example] O que é async/await e como funciona?

É uma forma de escrever código assíncrono de forma síncrona. Quando você declara um `await` o processo cria uma Thread para resolver aquela tarefa, a thread principal é então liberada. Quando a tarefa é finalizada o código segue a partir daquele ponto com o resultado já definido.

> [!example] Ciclos de vida no DI: Transient, Scoped e Singleton?

**Conhecimentos abordados:**
- [[Injeção de dependências]]
- [[Princípio Inversão de dependências]]

- Transient: nova instância a cada resolução.
- Scoped: uma por escopo do projeto
	- Por request
	- Por um componente, como no Angular
- Singleton: uma para toda a aplicação.


> [!example] Como você estrutura testes unitários?

**Conhecimentos abordados:**
- 

Padrão AAA (Arrange, Act, Assert). Testo comportamento, não implementação.
Para pacotes externos, crio interfaces que me permitem mockar seus comportamentos, permitindo assim, que o código não fique acoplado.

