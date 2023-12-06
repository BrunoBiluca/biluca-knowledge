#planejamento_de_projetos/histórias  
#planejamento_de_projetos 

# Use low-tech for story conversations

Discussões são melhores aproveitadas quanto menos complexidade é necessária para gerá-las.

# Imagine the demonstration

Times de desenvolvimento mostram os seus resultados por meio de software funcionando na tela. <mark style="background: #BBFABBA6;">Assim quando as histórias estão sendo refinadas é imprescindível que sejam explorados exemplos de como podemos demonstrar o comportamento alterado.</mark>

# Diverge and merge for story discussions

Essa dica é mais para times grandes de pessoas. Separar o time em grupos menores, e capturar o entendimento de cada grupo por meio de exemplos e perguntas sobre a história. O resultado desse processo levantará questões e problemas muito mais interessantes que se o grupo inteiro estiver reunido.

Além disso, separar os grupos de pessoas diminui o efeito de pessoas se omitirem, já que os grupos são pequenos e cada grupos irá gerar uma discussão própria.

# Involve all roles in the discussion

Quando estamos discutindo histórias o mais importante é conseguir seguir com uma conversa que realmente produza algum tipo de entendimento do projeto corrente.

<mark style="background: #BBFABBA6;">Uma forma de criar discussões ricas é trazer todos os papéis no desenvolvimento do projeto para conversar e cada um se focar em sua área de atuação.</mark>

Uma forma de fomentar essas discussões é na forma de

- Papel de Negócio (Game Designer) apresentam a história com alguns cenários iniciais e propõem suas expectativas.
- Papel técnico levam em consideração o estado atual da infraestrutura e sistema para levantar algumas inconsistências.
- Papel de qualidade consideram a história do ponto de vista de como essa história pode ser testada e avaliada, além de aplicar algumas heurísticas para identificar outros cenários que não foram considerados
- Então todos continuam a discussão até ficarem felizes com as informações

> [!warning] Quando cada integrante fica feliz as informações refinadas da História?
> Muitas vezes quando discutimos as histórias cada papel não consegue identificar que tipo de informação é necessário para a execução da história. Esse é um ponto que poderia ser mais trabalhado aqui.

# Measure alignment using feedback exercises

Exercícios de perguntas e respostas podem ser uma forma de verificar o entendimento do time em relação a uma história.

Geralmente uma pessoa responsável pela qualidade apresenta um cenário (pode se aplicar alguma heurística [exemplos](https://blog.testproject.io/2021/07/05/software-testing-heuristics/) ) e então os integrantes da discussão escrevem sobre o resultado esperado. Se todos concordam com o resultado esperado então o entendimento da questão está vencido, senão o alinhamento continua até todos os envolvidos estarem de acordo.

# Play the devi’s advocate

Durantes discussões de histórias muitas vezes nos atentamos ao lado positivo de cada história, uma forma de solucionar esse tipo de problema é atribuir a uma pessoa o papel de Advogado do Diabo. 

<mark style="background: #BBFABBA6;">O Advogado do Diabo é responsável por levantar ideias que não estejam alinhadas com o escopo da história, eliminando assim ideias que apenas aumentam a complexidade da história.</mark>

O principal foco do Advogado do Diabo nesses casos é determinar se a história é sólida, algumas ideias para desafiar histórias são:

- Argumentar que o usuário alvo não precisa dessa história
- Argumentar que o usuário alvo está segmentado de forma equivocada
- Argumentar que a solução proposta está errada

Esse papel deve ser feito sempre, porém é importante que esse papel seja revesado pela equipe a fim de reduzir atrito entre colegas.

# Divide responsibility for defining stories

A construção de uma história é um processo colaborativo e não deve ser ditado por uma camada de negócio sem levar em consideração todos os outros papéis dentro do time.

Uma forma de aumentar o colaboração entre os demais papéis do projeto é dividir a histórias entre as responsabilidades, por exemplo deixar o papel de business focar no impacto que ele quer no usuário e o papel de desenvolvimento na solução específica.

# Split business and technical discussions

<mark style="background: #BBFABBA6;">Papéis diferentes tem foco diferentes durantes as discussões de uma história</mark>. Mesmo que essas discussões em algum momento se relacionem é importante separar o grosso da discussão para cada um de seus papéis.

O grosso de discussões técnicas e de negócios devem ser feitas isoladamente, talvez sincronizadas em algum ponto pela própria descrição da história.

# Investigate value on multiple levels

Muitas vezes histórias apresentam múltiplos níveis de valores. Quando uma história é dada dessa forma ela pode muitas vezes ser difícil de ser quebrada em histórias menores.

Uma alternativa a isso é não se preocupar muito com a história em si e <mark style="background: #BBFABBA6;">focar nos benefícios que essa história trás para a organização</mark>. Assim, depois de elencados os objetivos escolhe-se um desses e segue a história.

# Discuss sliding-scale measurements with QUPER

Da mesma forma que histórias podem apresentar valores em camadas, elas também podem apresentar valores entre uma faixa válida de resultados.

Principalmente requisitos como performance, capacidade, tempos de inicialização, tempo de transação, são características principais na experiência do usuário, porém não aprensetam um único resultado esperado. Esse resultado pode ser determinado em uma faixa de valores que são considerados válidos para a história.

Esses valores válidos geralmente são definidos pelo mercado e os concorrentes. Por exemplos, a busca pelos jogos a 60 FPS na nona geração de consoles, como todos os concorrentes são jogos a 60 FPS um jogo a menos que isso pode ser percebido como um jogo não muito otimizado e espantar jogadores.

O modelo QUPER ajuda nesse tipo de análise trazendo dois conceitos, Breakpoints e Barriers.

https://www.notion.so/Discussing-stories-54cd82585e124abbbb37c42a694ebda0?pvs=4#3afc9388e8234218a0da97e1b953b6dd