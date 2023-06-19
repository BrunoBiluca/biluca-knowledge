#user_stories 
#incidental_work 
#planejamento_de_projetos 


# Don't push everything into stories

Nesse capítulo o autor discute um dos conceitos mais erroneamente utilizados quando um projeto é baseado em Histórias de Usuário, que é de toda tarefa ser definida como uma.

Algumas tarefas necessárias para o desenvolvimento do projeto devem ser destacadas da criação de Histórias, já que elas não entregam valor nem para o usuário final nem para os stakeholders.

Esse tipo de trabalho é definido como trabalho incidental (auxiliar) do desenvolvimento do projeto, e deve ser separado um tempo específico para a execução desse trabalho.

Umas das dicas que são dadas para esse tipo de trabalho é não criar um backlog separado para esse tipo de tarefas, como é um trabalho incidental ele sempre irá perder em priorização para o trabalho que entrega valor direto.

# Budget instead of estimate

Determinar um orçamento em vez de estimar uma história é uma técnica que reduz a incerteza da entrega de valor em um projeto.

Determinando um orçamento o time de desenvolvimento pode levantar soluções que se encaixem nesse orçamento, reduzindo a incerteza com o desenvolvimento.

Também é uma forma de determinar a capacidade de valor entregue do projeto em um prazo. Com um orçamento em mente o planejador do projeto pode reavaliar dados algumas marcos como é o comportamento de entrega do time e com isso alterar priorização de Histórias.

Estimativas são importantes para definir se esse orçamento está muito fora e então refinar mais as Histórias para conseguir encaixar no modelo vigente.


# Avoid using numeric story sizes

Definir tamanhos de Histórias com números é uma forma de adicionar complexidade desnecessariamente.

Estimativas devem ser simples e servem para levantar discussão sobre o tamanho da História. Assim modelos como tamanho de Camisa Pequeno, Médio e Grande, ou modelos baseados em valor como História Muito pequena, Muito grande ou Ideal abrem mais espaço para discussão que definir pequenas variações numéricas entre Histórias.

Junto a isso é possível utilizar o modelo de orçamento que é uma forma muito mais eficiente de definir planejamento a longo prazo.

# Estimate capacity based on rolling number of stories

Uma prática muito utilizada porém que leva a alvos equivocados é de medir a capacidade de uma equipe por pontos de histórias passados, ou até por pontos de outras equipes que fazem um trabalho parecido. Esse tipo de práticas pode gerar o comportamento errado na equipe de fazer com que as pessoas comecem a mentir os pontos só para parecer estarem entregando mais.

Uma forma de tirar algum tipo de informação desses pontos de história é fazer uma média ponderada a cada iteração a fim de ter uma ideia da capacidade atual de trabalho, sem um compromisso a longo prazo.

# Estimate capactity based on analysis time

Uma outra técnica para estimativa é considerar a capacidade do time de analisar e refinar o backlog como a quantidade de Histórias estimadas.

Um time passa 5-10% de tempo a cada iteração para refinamento de backlog. Limitando esse tempo de análise de histórias permite o time focar mais no trabalho imediato e evita discussões muito abrangentes sobre o assunto. 

Durante o período de discussão é determinado uma quantidade que cada história poderá ser refinada. Quando uma História não consegue ser refinada durante esse tempo de discussão ela é entram colocada em espera até o próximo processo, e apenas histórias suficientemente refinadas são alocadas para a iteração corrente.

Dessa forma o time ao mesmo tempo que refina as Histórias também já está fazendo o planejamento da próxima iteração.

Esse tipo de abordagem é bem sucedida quando qualquer história pode ser postergada ou dividida.

# Pick impacts instead of prioritising stories

Uma história deve ser priorizada pelo impacto que sua alteração causará no projeto. É mais fácil discutir a priorização de Histórias nesses termos. Quando um impacto é priorizado, as histórias relacionadas a esse impacto são priorizadas e então deverão ser escaladas para as próximas iterações.

Essa técnica facilita a comunicação já que a quantidade de impactos definidos em um projetos é infinitamente menor que a quantidade de Histórias.

Outra melhoria é na entrega de valor, podemos focar na entrega de valor de forma a impactar totalmente um grupo de usuários, isso faz sentido junto com o tópico de entregar todo o valor a um grupo de usuário em vez de pouco valor para todos os usuários.

# Never say 'no' - say 'not now'

Aceitar qualquer ideia no projeto pode levar a uma infinidade de coisas para se fazer. Ter um processo de aceitamento de Histórias é importante para não cair na tentação de repriorizar todo o backlog a cada entrada de tarefa.

# Split UX improvements form consistency work

Experiência de usuário é uma das áreas mais difíceis de converter em Histórias de Usuário. Todo tipo de UX deve ser feito com bastante antecedência da implementação, para não acabar apenas melhorando visualmente uma implementação não funcional.

Uma das formas de sanar esse tipo de problema é criar um processo consistente de melhoria de UX no projeto, onde inicialmente os Designers responsáveis por UX ensinem e revisem o trabalho para outros Designers e Desenvolvedores a fim deles mesmos ajustarem problemas comuns de UX.

Com isso é possível criar um checklist dos problemas mais comuns e adicionar como critério de aceite em tarefas que envolvam qualquer input do usuário. Essas checklists ter a responsabilidade de levantar questões sobre a experiência do usuário em vez de ser uma lista rígida que deve ser seguida pelos desenvolvedores.

Para mudanças maiores pode-se criar um grupo especialista para realizar pesquisas com os usuários, criar protótipos com validação direta com usuários finais antes de qualquer implementação no produto final.

# Get end-users to opt in to large user interface changes

Uma forma de fazer grandes alterações na interface de um sistema é dar a flexibilidade do sistema viver em duas versões para que o usuário decida qual versão utilizar enquanto a nova versão está sendo desenvolvida.

Caso a equipe comunique de forma clara com o cliente, ele pode além de não se importar com a mudança, virar um agente de testes da nova versão, gerando muita informação que pode ser utilizada para o refinamento do projeto.

# Check outcomes with real users

É imprescindível que as ideias desenvolvidas sejam testadas com usuários finais do sistema.

Cada História criada deve ter um motivo para ser desenvolvida, esse motivo é determinado enquanto valor para os usuários finais ou stakeholders. Assim é necessário que depois que a História seja desenvolvida e entregue que esse valor seja aferido, já que nada garante que a ideia para melhorar alguma coisa realmente vai causar esse efeito.

Avaliar os resultados das histórias entregues evita que o time declare falsas alegações e se mobilize para novos trabalhos enquanto seria necessário refinar o trabalho atual.


# Throw stories away after they are deliverty

Histórias não devem servir como documentação do projetos. Como Histórias são símbolos para discussões, essas discussões mudam ao longo do tempo do projeto e não faz sentido voltar em histórias que já forma desenvolvidas.

O estado do planejamento deve refletir sempre ao estado atual do projeto. Nada que foi feito serve para analisar o presente estado do projeto e tomar alguma decisão. É como olhar a fatura do cartão de crédito para decidir comprar alguma coisa em vez de verificar o balanço atual da conta.

Depois que uma história foi concluída é melhor reestruturar os critérios de aceite por funcionalidade em vez de Histórias. Especificações e testes devem ser versionados juntos ao projeto a fim de refletir o estado atual do projeto. Essas especificações podem ser mapeadas de forma hierárquica onde cada funcionalidade é um nó (Feature maps).

# Referências
- Usable Usability: Simple Steps for Making Stuff Better
	- Explica a criação de ideias para criação de checklists de uma forma que as listas criadas inspirem pensar em vez de apenas jogar informação ao leitor
- The Checklist Manifesto: How to Get Things Right
	- Boa definição para criação de checklists