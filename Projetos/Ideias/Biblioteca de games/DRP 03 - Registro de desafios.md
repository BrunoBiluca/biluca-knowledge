# DRP 03 - Registro de desafios

> [!important] Resumo
> Para controle do jogador, ele terá a opção de criar seus próprios desafios para cada jogo adquirido.

Objetivos:

- Permitir ao jogador 
	- Criar seus próprios desafios
	- Ter controle sobre o estado de cada jogo

Métricas para monitorar:

- Criação de desafios periódicos
- Criação de desafios por jogo
- Tipos de desafios criados

# Contexto

Cada jogo tem vários desafios que o jogador pode fazer. Seja zerar o jogo ou até alcançar um ranking específico ele precisa de uma forma de controlar sua jogatina.

### Hipóteses

- __Hipótese 1__

### Restrições

- __Restrição 1__
### Dependências

- __Dependência 1__

### Dúvidas

- __Dúvida 1__

### Fora do escopo

- __Fora do escopo 1__

### Referências

- __Referências de concorrentes ou inspirações__

# Requisitos

### RF 03.01 - Apropriação de jogos

__Descrição__

O jogador deve poder se apropriar de jogos que estão disponíveis no catálogo.

Propriedades da apropriação:

- Jogo apropriado
- Nome da loja ou plataforma que o jogo foi apropriado. Ex: steam, gog, psn, xbox, emulação, outro
- Tipo de aquisição. Ex: compra, aluguel ou outro
- Data da aquisição

__Impacto__

Quando um jogador apropria de um jogo do catálogo, esse jogo passa a ser parte da biblioteca do próprio jogador. A partir disso ele pode criar desafios para esse jogo.

__Critérios de aceite__

- Quando um jogo foi apropriado
	- Ele deve ser exibido na biblioteca do jogador

### RF 03.02 - Biblioteca do Jogador

__Descrição__

Como jogador quero ver meus jogos.

__Impacto__

A partir da biblioteca do jogador ele irá fazer o controle de desafios

__Critérios de aceite__

- Quando o jogador entre na página de seus jogos
	- Todos os jogos devem ser exibidos

### RF 03.03 - Registro de um desafio

__Descrição__

Como  jogador quero registrar um desafio para um jogo adquirido.

Propriedades de um desafio:

- Jogo
- Nome do desafio
- Tipo do desafio. Ex: História principal, História secundária, História alternativa, Competitivo, Desafio principal
	- Esses tipos de desafios devem ser explicados para o usuário
- Estado "Aberto", todo desafio começa como "Aberto"
- Plataforma (Opcional)
	- Nome da plataforma que o jogo será jogado, é muito comum jogadores terem mais de um sistema que eles jogam

__Impacto__

O jogador poderá fazer o controle desse desafio a fim de concluí-lo

__Critérios de aceite__

- Quando um desafio é registrado ele deve ser exibido na lista de "Desafios abertos"

### RF 03.04 - Desafios abertos

__Descrição__

Como jogador quero ver os desafios abertos não iniciados a fim de poder começar um desafio.

Deve-se registrar o momento que o desafio é iniciado.

__Impacto__

Ver os desafios em aberto irá permitir ao jogador iniciar um desafio.

__Critérios de aceite__

- Quando um desafio aberto é iniciado ele:
	- Não deve ser mais exibido na lista de desafios abertos
	- Passa a ter o estado de "Jogando"
	- Deve ser exibido na lista de "Jogando no momento"

### RF 03.05 - Jogando no momento

__Descrição__

Como jogador quero ver os desafios que estão em progresso no momento

__Impacto__

Dessa forma o jogador pode controlar os jogos que estão sendo jogados no momento, o que o permite talvez finalizar um jogo antes de iniciar um próprio, ou também pausar um jogo ou desistir de um desafio.

__Critérios de aceite__

- Devem ser exibidos todos os desafios em progresso

### RF 03.06 - Concluindo um desafio

__Descrição__

Como jogador quero concluir um desafio que está sendo jogado.

Deve-se registrar:
- Data de término do desafio.
- Estado do desafio para "Concluído"

__Impacto__

Controle do jogador em saber quais desafios já foram concluídos

__Critérios de aceite__

- Quando um desafio é concluído ele:
	- Tem seu estado alterado para concluído
	- Não é mais exibido na lista de "Jogando no momento"
	- É exibido na lista de "Desafios concluídos"

### RF 03.07 - Abandonando de um desafio

__Descrição__

Como jogador quero abandonar um desafio que está sendo jogado no momento.

Deve-se registrar:
- Data de término do desafio.
- Estado do desafio para "Abandonado"

__Impacto__

As vezes um desafio é chato ou difícil demais e o jogador cansa e não quer mais rastrear esse desafio

__Critérios de aceite__

- Quando um desafio é abandonado ele:
	- Tem seu estado alterado para abandonado
	- Não é mais listado nem "Jogando no momento"
	- É exibido na lista de "Desafios abandonados"


# Especificação de arquitetura

### Descrição de estratégias e soluções técnicas


### Diagramas arquiteturais, modelagem, relacionamentos...


## Requisitos técnicos


## Requisitos não funcionais


# Qualidade

- __Definição de Pronto__
- __Planos de testes__

# Esboços ou protótipos de UX

- Tela: nome da tela
- Imagem da tela
- Explicação de cada elemento da tela
- Explicação dos comportamentos da tela