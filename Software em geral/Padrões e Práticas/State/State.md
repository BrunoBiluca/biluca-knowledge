---
tags:
  - programação/padrões
---
# Resumo

> [!info] Definição
> O **State** é um padrão de projeto comportamental que permite que um **objeto altere seu comportamento** quando seu **estado interno muda**. Parece como se o objeto mudasse de classe.

Dependendo do estado atual, o programa pode ou não trocar para outros estados. Essas regras de troca, chamadas _transições_, também são finitas e pré-determinadas.




![[exemplo do padrão state como publicação de documentos.png|Exemplo do padrão statea plicado a um sistema de publicação de arquivos|center|300]]


# Exemplo - Publicação de Documentos

Imagine que nós temos uma classe `Documento`. Um documento pode estar em um de três estados: `Rascunho`, `Moderação` e `Publicado`. O método `publicar` do documento funciona um pouco diferente em cada estado:

- No `Rascunho`, ele move o documento para a moderação.
- Na `Moderação` ele torna o documento público, mas apenas se o usuário atual é um administrador.
- No `Publicado` ele não faz nada.

# Máquinas de estados (Dica)

> [!tip] Máquinas de estado baseadas em condicionais vs baseadas em estados como classes
> 
>A maior fraqueza de uma máquina de estados baseada em condicionais se revela quando começamos a adicionar mais e mais estados e comportamentos baseados em estados. A maioria dos métodos irá conter condicionais monstruosas que selecionam o comportamento apropriado de um método de acordo com o estado atual.
> 
 > Um código como esse é muito difícil de se fazer manutenção porque qualquer mudança na lógica de transição pode necessitar de mudanças de condicionais de estado em todos os métodos. 

Vamos utilizar o sistema de publicação de documentos para exemplificar a criação de máquina de estados.

Uma implementação dos estados utilizando um sistema baseado em condicionais seria mais ou menos o seguinte:

```python
class Document
    state
    // ...
    def publish():
        switch (state)
            "draft":
                state = "moderation"
                break
            "moderation":
                if (currentUser.role == "admin")
                    state = "published"
                break
            "published":
                // Não fazer nada.
                break
    // ...
```

Como podemos perceber a cada novo estado que for adicionado devemos modificar o método `publish()` e adicionar mais um estado. Esse tipo de alteração pode levar a bugs e comportamentos inesperados, além de uma maior complexidade a cada novo estado adicionado.

Agora vamos quebrar a implementação do método `publish()` em uma estrutura de classes que compartilhe a mesma interface.

```python

class Draft(DocumentState):
	document
	def init(self, document):
		self.document = document
		
	def publish(self):
		self.document.change_state(Moderation())

class Moderation(DocumentState):
	//  construtor
	def publish(self):
		if (self.currentUser.role == "admin")
			self.document.change_state(Published())

class Published(DocumentState):
	//  construtor
	def publish(self):
		pass

class Document:
	state

	def change_state(self, state):
		self.state = state

	def publish():
		self.state.publish()
```

Nessa segunda versão temos um código muito mais robusto. Agora a adição de qualquer estado a classe `Document` não altera em nada a lógica do método de publicar dos demais estados. Para isso é necessário apenas adicionar a lógica deste novo estado e fazer o documento alterar para este estado.

# Relações com outros padrões

- O padrão **State** e **Strategy** podem ser bem similares, porém eles tem uma diferença chave. No padrão State, os estados em particular podem estar cientes de cada um e iniciar transições de um estado para outro, enquanto que estratégias quase nunca sabem sobre as outras estratégias.

# Referências

- [Definição e exemplos por Refactoring Guru](https://refactoring.guru/pt-br/design-patterns/state)