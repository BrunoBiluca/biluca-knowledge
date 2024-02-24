---
tags:
  - game_dev
---
# Game mode

Existem duas classes principais que lidam com informações sobre o jogo que está sendo jogado: **Game Mode** e **Game State**.

Mesmo o jogo mais aberto tem regras subjacentes, e essas regras constituem um **Game Mode**, como instanciação do jogador, contagem de pontos. Quando eventos relacionados às regras do jogo acontecem e precisam ser rastreados e compartilhados com todos os jogadores, essas informações são armazenadas e sincronizadas por meio do **Game State**.

Todas as classes de Game Mode herdam da classe `AGameModeBase` onde serão implementados vários dos eventos que controlam o jogo como um todo.


# Estruturas de dados

## Structures

Estruturas de dados são diferentes de Objetos, porque são utilizadas como agregação de dados simples.

As suas principais operações são:
- Make: criação do structure, deve ser inicializado com todos os dados e não podem ser alterados
- Break: quebra a estrutura para buscar valores internos

### Blueprint

![[Exemplo de criação de uma estrutura.png|Exemplo de criação de uma estrutura|center|500]]

![[Exemplo de instanciação de uma estrutura.png|Exemplo de instanciação de uma estrutura|center|500]]

![[Exemplo de acesso a valores internos de uma estrutura.png|Exemplo de acesso a valores internos de uma estrutura|center|500]]