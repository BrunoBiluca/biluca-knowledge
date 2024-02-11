---
tags:
  - game_dev/melhores_práticas
---

> [!info] Página de melhores práticas da Godot
> [Melhores práticas Godot 4](https://docs.godotengine.org/en/stable/tutorials/best_practices/introduction_best_practices.htm)

# Organização de Cenas
Dicas para criar relações entre cenas de forma consistente

- Instanciar subcenas sem necessidade de conhecer detalhes do contexto inserido
- Confiar na subcena criada (loose coupling ou acoplamento solto)

Dessa forma uma cena filha deve ser criada com o mínimo de dependências e essas dependências deve ser resolvidas por meio de Injeção de Dependências.

## Relação entre nós pai e filho

- Eventos
- Chamada de métodos
- Callbacks
- Inicialização no pai do filho
- Inicialização do NodePath (caminho da Godot entre os objetos)

> [!tip] Godot e avisos
> A Godot possui um sistema robusto de avisos para as estruturas criadas no projeto, é possível defiir scripts do tipo ferramenta (tools) com métodos como `_get_configuration_warnings()` que garantem a exibição de problemas. [Documentação](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html)
> 
> Esse tipo de recurso é utilizado nativamente pela Godot


## Estrutura dos nós em uma cena

Uma forma de organizar a estruturas das cenas é entender se um nó depende do pai. Caso contrário esse nó pode se organizar em outro lugar na hierarquia da cena.

Exemplo de estrutura inicial de um jogo

- Node "Main" (main.gd)
	- Node2D/Node 3D "World" (game_world.gd)
	- Control (GUI) (gui.gd)