#planejamento_de_projetos 

> [!info] Definição de 🌟 Valores
> Valores são ideais, vontades ou funções que guiam o desenvolvimento do projeto. Um Valor não é necessariamente alcançável, ele foca em definir um ideal que irá guiar o desenvolvimento do projeto.

Como são os 🌟 Valores definem os ideais que guia o projeto, são eles que possuem as prioridades de um projeto. Essas prioridades são utilizadas no planejamento de execução para definir quanto tempo é destinado a cada prioridade e garantir que o que seja mais impactante está recebendo a atenção que merece.

Durante o desenvolvimento do projeto a lista de 🌟 Valores deve crescer e se modificar, já que as necessidades do projeto muda com o tempo. Valores podem ser desmembrados em valores mais específicos e outros valores podem ser encerrados.

# Reorganização de valores

A medida que o projeto avança, é normal que os ideias, vontades ou funções que iniciaram o projeto já não façam mais sentido com a ideia geral.

Nesses casos os 🌟 Valores devem ser sempre revisitados e suas prioridades ajustadas de acordo com a necessidade do projeto.

🌟 Valores que não fazem mais sentido para o projeto devem ser encerrados para que novos valores sejam criados.

# Propriedades

### Nome

Nome significativo do 🌟 Valor a ser conquistado
### Motivação

A motivação define importância e objetivo desse valor dentro do Projeto.

A motivação pode estar relacionada a um ou mais segmentos de usuários.

> [!tip] Por que é importante?
> Essa informação é muito importante principalmente durante revisões dos valores onde suas prioridades são ajustas. Ter a motivação desse valor de forma clara ajuda o time durante essa discussão.

### Ações relacionadas

Exemplos de ações para alcançar esse valor.
  - OS exemplos de ações para alcançar esse valor, também são um bom ponto para lembrar da Motivação desse valor durante discussões
### Prioridade

A Prioridade deve ser definida por uma lista fixa de valores predefinida. Como todos as outras entidades do projeto se relacionam com os valores, a prioridade dos Valores é o a base para o cálculo de prioridade das demais entidades.

Lista de Prioridades:

- 🔥 - Zero
- 🎈 - Primeira
- 👑 - Segunda
- ⛑️ - Terceira
- 🪖 - Outros
- 🥶 - Congelado
- 🛑 - Encerrado
  
> **💡 DICA:** Quanto menos valores mais consistente serão as prioridades dentro de vários Valores. 

As primeiras posições da lista de prioridade devem sempre conter no máximo um 🌟 Valor associado, isso ajuda durante o processo de coleta de 🃏 Histórias para uma sprint e facilita o entendimento das prioridades no time.

O último item da lista de prioridades é utilizado para adicionar os valores contidos no projeto, mas que não estão no foco do time no momento.

# Exemplo de criação de Valores

Para demonstrar a criação de Valores vamos pegar o jogo Mario Bros. O valores iniciais poderiam ser algo no formato:

- Jogador principal
	- Motivação: o jogador quer uma mecânica responsiva e de fácil aprendizado para concluir os desafios
- Plataformas
	- Motivação: o jogador quer avançar pelo cenário de forma que o próprio cenário tenha plataformas interessantes para interagir
- Desafios
	- Motivação: o jogador quer ser desafiado para além dos demais elementos do jogo
- Inimigos
	- Motivação: o jogador quer ser desafiado por inimigos no cenário que agem de forma mais dinâmica que as plataformas
- Fases
	- Motivação: o jogador quer sentir uma variedade de cenários para jogar, as fases são o agrupamento de todos os elementos do jogo desenvolvidos.

Essa lista de valores pode ser o bom guia para o início do desenvolvimento das histórias, já que temos os ideias definidos para o projeto.
# Exemplo de Reorganização

No início do desenvolvimento de um jogo simples em que o jogador deveria eliminar inimigos para aumentar a pontuação levantamos os seguintes valores para o começar o projeto:

🌟 Valores iniciais
- Jogador - Prioridade 1
- Inimigos - Prioridade 2

Durante o desenvolvimento foram desenvolvidas várias mecânicas para o jogador. Nesse processo entendemos que as Mecânicas mais interessantes se dividiam em 3 tipos de estruturas: novas armas, novos poderes, novas habilidades. 

Como não queríamos correr o risco de adicionar mais mecânicas do que o necessário (estourar o escopo do projeto) fizemos a seguinte alteração na nossa lista de 🌟 Valores:

🌟 Valores (alteração 1)
- Novas Armas
- Novos Poderes
- Novas Habilidades
- Inimigos
- Jogador (Encerrado)

Dessa forma poderíamos priorizar quais elementos das mecânicas queríamos focar no momento mais explicitamente, o que garantiu que não acabássemos tendo apenas Armas no jogo, mas equilibrássemos em relação as outras mecânicas (podíamos ajudar as prioridade de acordo com o sentimento do time do que seria mais interessante adicionar).

Ao mesmo tempo enquanto trabalhávamos na criação de inimigos, percebemos que o processo de criação de inimigos é um processo que demanda muita iteração. Não poderíamos dar como encerrado quando um inimigo é construído, já que durante o desenvolvimento do jogo esse mesmo inimigo deve ser balanceado, sempre que uma arma, poder ou habilidade do jogador ou até mesmo outro inimigo é adicionado.

Com esse pensamento em mente, percebemos que o Valor - Inimigos - na lista não refletia a real complexidade de desenvolvedor um inimigo para o jogo. Decidimos então encerrar o valor de Inimigos e melhorar a nossa estrutura de Valores para melhor representar os desafios do projeto. 

No caso de inimigos foram criados os seguintes valores: Balanceamento do Jogo (garante que qualquer elemento adicionado ao jogo seja balanceado), Novos Inimigos (conceitos novos de inimigos) e Refinamento dos Inimigos (como adição de novas habilidades dos inimigos, melhoria nos assets e outros recursos relacionados com inimigos).

🌟 Valores (alteração 2)
- Novas Armas
- Novos Poderes
- Novas Habilidades
- Balanceamento do Jogo
- Novos inimigos
- Refinamento dos inimigos
- Inimigos (Encerrado)
- Jogador (Encerrado)

Essa alteração não apenas melhorou a estrutura do projeto em relação a inimigos como também adicionou um valor muito importante geral para o projeto: Balanceamento do Jogo. Agora podemos decidir quando focar em Balanceamento e quando focar em novos recursos por meio das prioridades dos valores.

Durante todo o desenvolvimento do projeto vários desses Valores foram sendo alterados e outros valores foram aparecendo. Esse tipo de abordagem iterativa e incremental garante que conforme avançamos com o conhecimento sobre o projeto também nos questionemos sobre sua estrutura realmente representa a realidade do projeto e dessa forma podemos alterar essa estrutura para ajudar o desenvolvimento a fluir.

> [!note] Observação sobre o encerramento de Valores
> Não sei se vocês perceberam, mas o encerramento dos valores foi uma decisão do time quando este entendeu que esse valor não representa mais as ideias que guiam o desenvolvimento.
> 
> Não é possível determinarmos quando um valor deve ser encerrado. Esse processo de revisita a esses valores deve acontecer a medida que o time avança com seu conhecimento sobre o projeto, assim então o próprio time deve agir para alterar essa estrutura para uma nova que seja mais representativa.