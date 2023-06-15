#organização

Uma 🃏 História é a unidade de ação que será executada.

> Resumo: Uma história do usuário é uma explicação informal e geral sobre um recurso de software. Ela é escrita a partir da perspectiva do usuário final. Seu objetivo é articular como um recurso de software pode gerar valor para o cliente.

Uma 🃏 História começa a ser definida durante o processo de refinamento descrito no [[🪵 Backlog]]. Quando ela é refinada e definida uma escala de prioridade ela então pode ser adiciona a um 🎽 Sprint ou executada diretamente.

> [!tip] Dicas para criação de Histórias
> Histórias devem claramente informar a alteração no comportamento relacionada ao projeto de forma a definir quais são os usuários impactados e que tipo de valor esses usuários irão receber.

### Prioridade de um 🃏 História

A prioridade de qualquer 🃏 História é associada ao Épico relacionado. Isso é feito para garantir a entrega de valor seja consistente, ou seja, se um 🏆 Épico define um valor a ser entregue no projeto é necessário que todas as histórias dentro do Épico tenham sido concluídas para que então o valor tenha sido entregue. Assim dentro de um Épico não há a necessidade de priorizar histórias.

> [!info] Priorização de um 🏆 Épico
> [[🏆 Épicos#Priorização de 🏆 Épicos]]

# Propriedades de uma 🃏 História

> [!tip]- Título
> O título de uma história é um lembre rápido sobre o que a História se trata.
> Bom títulos são simples e descrevem o aspecto central da História sem explicitar a solução empregada.
> 
> Exemplos bons
> - Contato inicial
>   - Brevemente descreve o primeiro contato do jogador com o jogo, não explicita se será por uma tela, um menu ou diretamente pelo jogo, essas soluções serão discutidas durante o desenvolvimento. Porém o valor está claro, é o contato inicial do jogador que deve ser muito bem tratado.
>- Dano em área
>    - Brevemente descreve uma História que apresenta uma mecânica de Dano em Área. Não é explicitado que tipo de recurso será utilizado com esse tipo de mecânica.
> 
> Exemplos ruins
> 
> - Criar a Tela inicial
>	- Nesse caso já especifica a criação de uma tela inicial, porém não descreve nenhum tipo de valor entregue por essa tela, ou seja, apenas criar uma tela inicial não demonstra nenhum valor que o usuário irá ganhar.
>	- Outra questão é no uso de uma ação para descrever a História. Criar a Tela inicial é ambíguo, isso envolve implementar a tela? criar o design? Uma História deve conter toda a discussão necessária para entrega de valor, então utilizar essa nomenclatura não deixa claro para o time que tipo de trabalho deve ser feito.
> - Ataque de fogo em área para personagem XYZ
> 	- Nesse caso a História apresenta vários conceitos, esses conceitos podem ser quebrados em Histórias próprias e então serem combinadas por meio de configurações. Assim Ataque de Fogo, Ataque em Área e Personagem XYZ são Histórias independentes.

> [!tip]- Descrição (Modelo AS... IN ORDER TO ... I WANT)
> Esse é o modelo mais comum de encontrar quando equipes descrevem Histórias. Ele pode ser um bom modelo, porém é importante lembrar que Histórias devem relatar uma alteração no comportamento do projeto de forma a entregar valor ao usuário. Assim o formato de escrita deve apresentar de forma bem resumida essas características.
> Bons exemplos
> - Como jogador casual a fim de acessar as imagens completadas eu quero uma visualização própria
> - Como jogador profissional a fim de melhorar minhas habilidades eu quero um modo de treinamento
> - Como jogador offline a fim de poder ir ao banheiro ou cozinha durante o gameplay quero poder pausar o jogo sem nenhum tipo de punição.
>
> Maus exemplos
> 
> - Como jogador a fim de começar a jogar quero ter um menu com um botão de começar a jogar
>	- Essa História tem problemas nos 3 aspectos necessários para sua explicação.
>	- O usuário impactado não está bem definido, ou seja, é um grupo muito genérico
>	- A premissa também está confusa, começar a jogar não define um modo de jogo específico ou qualquer coisa, assim não define o real valor entregue ao grupo de usuário
>	- Por fim essa História está definindo qual o resultado esperado, a criação de um menu com um botão, isso impede qualquer tipo de discussão e impede outras formas de solução da História.

> [!tip]- Critérios de aceite (CA)
> Critérios de aceite, também conhecidos como acceptance criteria, são condições que devem ser satisfeitas a fim de que uma História seja aceita. Cada CA deve ser expresso como uma conjunto de declarações que visam descrever o que será entregue como valor pela História, sem focar no resultado de implementação final esperado.
> 
> Os critérios de aceite devem ser concisos, testáveis, claros e focado no resultado.
> 
> - Modelo baseado em cenário
>
>Um modelo recorrentemente utilizado na criação de casos de testes e critérios de aceite é imaginar um cenário e de acordo a uma ação ou acontecimento se espera um resultado. Pode se utilizar o formato **Given that; when; then**.
>
>🃏 História: Como jogador profissional a fim de melhorar minhas habilidades eu quero um modo de treinamento
>
>Bons exemplos
>- Espero que seja simples acessar o modo de treinamento
>- Espero escolher um personagem para treinar
>
>Maus exemplos
>- Quando entro no modo de treinamento espero poder configurar opções para o oponente atacar de forma automática enquanto pratico meus movimentos
>	- Justificativa: esse critério expande o escopo da História, já que a História visa um modo de treinamento em seu formato inicial. Assim, esse critério poderia ser promovido a uma História própria.
>- No modo de treinamento apertar o botão R1 para resetar a cena e voltar com todos os personagens na posição inicial
>	- Justificativa: esse CA define o como será implementado o resete dos personagens (por meio do botão R1), porém esse tipo de definição pode mudar durante o desenvolvimento então em algum momento esse CA se torna obsoleto.

| Propriedade  | Descrição                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tags         | Palavras chaves a fim de definir o contexto que a História se aplica. Utilizado para facilitar a classificação.                                                                            |
| Estimativa   | Define a quantidade de trabalho necessário para a conclusão da História. O trabalho necessário deve levar em consideração todo o processo de concepção da ideia, desenvolvimento e testes. |
| Valor        |                                                                                                                                                                                            |
| Vencimento   | Data limite para a conclusão da História. Se essa Históra não for concluída até essa data é um problema para o projeto no geral.                                                           |
| Iniciado em  | Data de início da História.                                                                                                                                                                |
| Concluído em | Data de conclusão da História.                                                                                                                                                             |
| Status       | Estado atual da História.                                                                                                                                                                  |

## Estimativa

Define a quantidade de trabalho necessário para a conclusão da História. O trabalho necessário deve levar em consideração todo o processo de concepção da ideia, desenvolvimento e testes.

A estimativa nunca é um valor exato de desenvolvimento. Uma boa forma de estimar é dividir a quantidade de trabalho entre:

- Pequeno
- Médio
- Grande

Por meio desses 3 valores podemos definir a quantidade de esforço, e a medida que o esforço aumente podemos pensar em alternativas para quebrar as Histórias em outras e então refinar cada uma a fim de chegar em uma quantidade de trabalho menor. 

Uma forma de avaliar a questão da estimativa é:

- Breve: poucas horas (1-2 horas)
- Pequeno: algumas horas (2-8 horas)
- Médio: poucos dias (1-2 dias)
- Grande: alguns dias (2+ dias)

Dessa forma os integrantes do time tem um melhor entendimento da quantidade de trabalho desenvolvido

## Valor

Define o valor revertido para o grupo de usuários impactados em relação a sua relevância.

Podem ser separados em 2 tipos de entrega de valor
- Baixo: entrega um valor pequeno para o 🌟 Valor ou 🏆 Épico associado
    - Sua conclusão tem um pequeno impacto
- Alto: entrega um valor alto para o 🌟 Valor ou 🏆 Épico associado
    - Sua conclusão tem um alto impacto

## Escala

Define de acordo com o valor e a estimativa a escala da hierarquia de prioridade da História. Essa escala é utilizada para priorizar as Histórias na hora de fazer o planejamento.
    
- Novo: ideia criada
- Refinando: definição inicial da história foi feita, sabemos o grupo impactado, o valor entregue e temos uma primeira estimativa, a partir desse momento essa história continua ser refinada para melhorar essas propriedades
- Curto: História totalmente refinada e pronta para desenvolvimento. Apresenta as seguintes propriedades
    - Valor alto e Estimativa Breve | Pequena | Média
    - Valor baixo e Estimativa Breve | Pequena
- Médio: História pode continuar a ser refinada para criar Histórias com mais valor ou menores estimativas.
    - Valor alto e Estimativa Grande
    - Valor baixo e Estimativa Médio
- Longo: História pode continuar a ser refinada para criar Histórias com mais valor ou menores estimativas.
    - Valor baixo e Estimativa Grande
- Caducou
    - História não faz mais sentido, o valor entregue não é relevante ou foi refinado em outras histórias

## Status

Estado atual da História.    
- A fazer
- Progresso
- Pausado
- Concluído 

# Tags

Tags são utilizadas para em poucas palavras definir o contexto que a História se aplicar.

Algumas tags também podem mudar o formato que a História é desenvolvido.

### Aprendizado

Histórias marcadas como tags de Aprendizado são relacionada a Histórias são utilizadas para que os Stakeholders aprendam mais sobre o projeto a fim de planejar melhor o projeto.

Quando uma tag é marcada como aprendizado algumas propriedades da História passam a ter algumas características específicas

- Estimativa: a estimativa passa a ser uma quantidade fixa de tempo que será desempenhado pelos responsáveis na História. Quando esse tempo se encerra é então levantado se todas as informações coletadas na História satisfazem os Critérios de Aceite.
- Valor: o valor passa a ser a importância da informação coletada para o projeto.

Toda História definida como Aprendizado deve ter Critérios de Aceitação bem definidos com os Stakeholders, de forma a consideração se as informações coletadas são suficientes para definir a História como pronta ou rejeitar a História. Quando uma História de Aprendizado é rejeitada deve ser definido junto ao Stakeholder se vale a pena continuar a investigação e então uma nova Estimativa é atribuída a História.

## Template de uma 🃏 História

Para facilitar a criação de Histórias dentro de um projeto é interessante utilizar um template. Esse template implementa uma estrutura que consolida os conceitos empregados pelo time a fim de auxiliar na discussão.

```markdown
# Título <Breve descrição do problema a ser solucionado>
 
> PARA **\<motivo do trabalho>**
> 
> COMO **\<persona>**
> 
> QUERO **\<problema a ser solucionado>**

## Critérios de aceite

Critério de aceito:
- Condição
Critério de aceito 2:
- Condição
Critério de aceito 3:
- Condição

```

# Referências

- [Everything You Need to Know About Acceptance Criteria by Scrum Alliance](https://resources.scrumalliance.org/Article/need-know-acceptance-criteria#:~:text=Acceptance%20criteria%20are%20defined%20as,re%20never%20only%20partially%20fulfilled.)
	- Bom texto sobre Acceptance Criteria, com uma definição concisa sobre o básico de seus conceitos e utilização.
- [User stories com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
- [Agile User Story Splitting by Non-Functional Requirements](https://corebts.com/blog/agile-user-story-splitting-non-functional-requirements/#:~:text=%E2%80%9CA%20type%20of%20requirement%20that,a%20solution%20as%20a%20whole.%E2%80%9D)
- [[_info|Fifty Quick Ideas to improve your User Stories]]

