# 🏗️ Execuções

> [!info] Definição
> Execuções são as **atividades** que quando realizadas avançamos na realização dos [[Organização pessoal/Entidades/🌟 Valores]].

O estado das execuções são alterados pelos rituais de [[📆 Planejamento]] e [[🔬 Refinamento]].

## Campos

- **Data da realização** - Data da realização da execução. Não é a data limite é a data que deve ser executada.
- **Tipo** - Define o tipo da execução que será realizada ([[#Tipos de execuções]])
- **Estimativa** - Define um valor aproximado de tempo possível para a realização da Execução ([[#Estimativa e UT]])
- **Estado** - Estado da execução no fluxo de trabalho.
- **Impacto** - Nível do impacto que a execução quando realizada causa no Valor relacionado. Essa é uma propriedade totalmente subjetiva e dependente do contexto e do momento que está sendo avaliado. O impacto é alterado sempre durando o ritual de [[📆 Planejamento]].
- **Iniciado em** - Data do momento que a execução foi definida na primeira vez como "Em progresso".
- **Concluído em** - Data do momento que a execução foi definida como "Concluída"
- **Unidades de trabalho (UT)** - Quantidade de unidades de trabalho utilizadas para a realização da Execução ([[#Estimativa e UT]]).
- **Criado em** - Data de criação da execução.

## Propriedades

- **Prioridade** - A prioridade da execução é definida pela prioridade do Épico primeiro (caso associada) e depois do Valor. 
- **Está atrasado** - A data de realização é menor que a data atual
- **Está ativo** - Execuções ativas são aquelas que podem ser "Elencadas".
	- A execução está ativa quando:
		- Não está encerrada
		- Não está congelada
		- Não está arquivada
- **Está encerrado** - Quando a execução está em algum estado final ("Concluído", "Caducou", "Promovido")
- **Está congelado** - Quando sua prioridade está congelada
- **Está arquivado** - O Valor relacionado está arquivado

## Relações

- **Valor** - Toda execução está associada a apenas um valor.
- **Épico** - Uma execução pode estar associada a apenas um épico.

## Conteúdo

- **Objetivo** - Uma frase clara do que será executado.
- **Impacto** - Por que será executado? Qual o ganho em realizar essa execução?
- **Critérios de aceite** - O que espero com a realização dessa execução? São os principais requisitos para definir essa execução como concluída.
- **Refinamento** - O que preciso antes da realização dessa execução?
- **Tarefas** - Subdivisão de tarefas, auxilia na realização da execução.
- **Contexto** - Apresentação do contexto em que a execução foi levantada.
- **Discussão** - Possibilidades de caminhos para a conclusão da execução.

### Critérios de aceite

Critérios de aceite são **condições que devem ser satisfeitas** a fim de que uma Execução seja aceita e dada como concluída. Cada CA deve ser expresso como uma conjunto de declarações que visam descrever o que será entregue como avanço no Valor, sem especificar como isso será alcançado.

É necessário que os CAs sejam bem definidos antes de dar a Execução como refinada para isso ele **devem ser**
- **concisos** - escrita curta
- **testáveis** - deve ser possível verificar a conclusão ou não do critério
- **claros** - direto ao ponto
- **focados no resultado** - estritamente relacionado com o objetivo

Os critérios de aceite variam de acordo com o tipo da execução, já que o que define uma execução concluída para um estudo é diferente de uma execução de desenvolvimento.

> [!tip]- Modelo baseado em cenário
> Um modelo recorrentemente utilizado na criação de casos de testes e critérios de aceite é imaginar um cenário e de acordo a uma ação ou acontecimento se espera um resultado. 
> 
> Pode se utilizar o formato **Dado tal ação; então tal resultado**.


Algumas dicas na hora de criar critérios de aceite:

- **Evitar CAs genéricos** como "espero ter uma documentação sobre todos os elementos".

#### Template

Por padrão definimos o seguinte template para auxiliar na criação dos CAs:

```
Como resultado espero (critérios de aceite):
- Que <dado tal coisa> teremos <tal resultado>
- (Ao final) Ter <tal resultado>
- (Ao final) Ter <tal coisa>
```

Os elementos em parênteses podem ser omitidos já que são implícitos.

#### Exemplos

Execução: Consolidar a organização pessoal e todos os seus processos, entidades e formatos no Conhecimento Biluca.
Critérios de aceite:
- **Mau exemplo:** Ter uma documentação sobre todos os elementos utilizados na organização pessoal
- **Bom exemplo:** Ter uma documentação sobre os elementos: Valores, Épicos, Execuções, Rituais, Visualizações
- **Justificativa:** O exemplo mau de CA não define nada e nem guia a execução para sua conclusão, com um pouco mais de refinamento já melhora bastante a clareza do CA.

Execução: Definição inicial do Databricks API (o próprio objetivo já num é muito bom)
- **Mau exemplo:** Definir os principais componentes
- **Bom exemplo:** Definir os componentes necessários para a prova de certificação: Use REST API to clone a job, trigger a run, and export the run output (isso está no guia do exame)
- **Justificativa:** O exemplo mau de CA deixa de maneira genérica os componentes que devem ser estudados, enquanto no exemplo bom temos uma noção muito clara de que endpoints precisamos utilizar.
# Fluxo de trabalho

![[Diagrama - Fluxo de trabalho]]

O Fluxo de trabalho define o estado que a Execução se encontra. É uma forma de entender que tipo de trabalho é necessário para aquela Execução no momento.

Cada momento da Execução necessita de um tipo de trabalho diferente, seja realizando a própria execução até levantando requisitos ou contexto.

Uma execução é dividida em 3 estágios:

- **A fazer** - execução está sendo preparada para ser executada.
- **Em andamento** - execução está sendo executada
- **Finalizado** - execução não será mais executada

**A fazer** consiste nos seguintes estados:

- **Novo** - Execução foi criada, são necessários principalmente o contexto e objetivo.
- **Refinando** - Execução ainda precisa de definir demais informações
- **Bloqueado** - Execução depende de outra para ser realizada
- **Aberto** - Execução pronta para ser executada, estão definidos todos os elementos necessários sua realização de forma fluída.
- **Pausada** - Execução começou a ser executada e foi interrompida

**Em andamento** consiste nos seguintes estados:

- **Elencado** - Execução está definida para ser realizada a qualquer momento disponível
- **Em progresso** - Execução está sendo realizada

**Finalizado** consiste nos seguintes estados:

- **Concluído** - Execução foi finalizada com todos os critérios de aceite concluídos.
- **Promovido** - Execução foi definida como mais do que apenas uma execução. Durante o processo de refinamento uma execução pode ser promovida a múltiplas execuções, um Épico ou um Valor.
- **Caducou** - Execução não faz mais sentido, não apresenta nenhum impacto e deve ser finalizada

### Execução considerada "Nova"

Qualquer nova ideia começa como uma Execução nova. Nesse momento ainda estamos juntando informações suficientes para definir seu objetivo, impacto e contexto. 

#### Informações necessárias

As informações para uma execução nova são as mais diversas, como aqui estamos falando de ideias sem muita restrições ela pode adotar vários formatos. Assim é importante tentar trazer o máximo de informação para então pensarmos com o que essa ideia se parece mais.

Caso a ideia tenha um objetivo muito amplo talvez estamos falando de um [[Organização pessoal/Entidades/🌟 Valores|🌟 Valores]].

Caso a ideia já seja tenha um Valor associado e tenha um prazo de execução ou tenha um escopo grande que não seja tão bem delimitado, talvez estamos falando de um [[Organização pessoal/Entidades/🏆 Épicos|🏆 Épicos]].

Caso a ideia já tenha uma Valor associado e um escopo fechado, que já defina qual tipo de atividade será realizada, então talvez estamos falando uma Execução que precisa ser refinada.

#### Caminhos

A partir de uma execução nova podemos:

- Avançar para o refinamento de execuções baseadas nos seus tipos (verificar [[#Execução considerada "Refinando"]])
- Promover a execução para um Épico ou um Valor completamente novo

Esse processo de construção das informações de uma execução é feito durante os rituais de [[🔬 Refinamento]].

### Execução considerada "Refinando"

Uma execução **Refinando** ainda precisa ter algumas informações preenchidas para elevar ao estado de Aberto. Este é um estado intermediário que ainda não temos muita certeza sobre os aspectos mais específicos da execução. Nesse estado temos mais informações sobre as necessidades da execução do que como ela será desenvolvida, ou seja, temos acesso as informações superficiais do que está sendo proposto.

#### Informações necessárias

Campos:

- Nome bem descritivo
- Tipo definido. 
	- Uma execução é refinada a partir do seu tipo, isso que irá definir os critérios de aceite necessários, como será dada as discussões, o tipo de contexto necessário para o seu desenvolvimento e assim por diante.
	- Por exemplo, uma execução de descoberta tem CAs muito diferentes de uma execução de desenvolvimento.

Conteúdo:

- Objetivo claro com a realização da Execução
- Impacto evidente da realização. Se não existisse um impacto para quê essa execução está sendo refinada?

#### Caminhos

Uma execução é trabalhada durante os rituais de [[🔬 Refinamento]] e pode seguir os seguintes caminhos:

- A partir da coleta das informações necessárias para que uma [[#Execução considerada "Aberta"]]
- Em caso da necessidade de outras atividades necessárias para avançar com a execução atual, bloqueamos a atual execução e priorizamos os processos das demais atividades.

### Execução considerada "Aberta"

Uma execução em **Aberto** significa que todas as informações necessárias já foram preenchidas e que ela já está pronta para ser executada.

#### Informações necessárias

Campos com descrições finais

- Nome
- Tipo
- Estimativa
- (Opcional) Data da realização

Conteúdo final, a partir daqui não devemos fazer alterações a essas informações:

- Objetivo
- Impacto
- Contexto
- Critérios de aceite
- Refinamento não deve ter nenhuma questão em aberto


# Tipos de execuções

Como definido as execuções são atividades, dessa forma podemos ter vários tipos de atividades desempenhadas para alcançar os [[Organização pessoal/Entidades/🌟 Valores]]. Cada tipo de execução pode ter conteúdos, critérios de aceite e tipos de refinamento diferentes.

É importante definir os tipos de execuções de forma a facilitar a criação do escopo. Uma execução de desenvolvimento tem como critérios de aceite implementações, enquanto uma execução de descoberta tem como resultado final a resposta de uma pergunta ou o levantamento de alguma questão.

Tipos

- **Tarefa**
- **Desenvolvimento**
- **Descoberta**
- **Estudo**

### Tarefa

**Tarefa** é o tipo mais simples de execução. Quando definimos uma tarefa a própria consequência de realizar a execução já é o objetivo final.

Uma tarefa precisa de pouco refinamento e deve ser destinada a execuções curtas e diretas.

#### Exemplos

- Controle de contas
	- A própria execução dessa tarefa já é o resultado esperado, que nesse caso é levantar os gastos e receitas do mês
- Controle de investimentos
	- A própria execução dessa tarefa já indica o resultado esperado, que nesse caso é fazer o controle dos investimentos

### Desenvolvimento

**Desenvolvimento** é um tipo de execução que foca na implementação de software de qualquer natureza. 

O refinamento de uma execução de desenvolvimento deve focar em definir o que será implementado utilizando vários casos de uso se necessário.

### Estudo

**Estudo** é um tipo de execução que foca no estudo de algum tema específico.

O refinamento desse tipo de execução deve focar em buscar um conjunto de conteúdos que deem conta de definir em relação aos critérios de aceite o tema.

### Descoberta

**Descoberta** é um tipo de execução que tem como objetivo verificar alguma questão que não se tem o conhecimento completo.

Execuções de descoberta não definem critérios de aceite como a entrega de algo concreto, os critérios de aceite nesses casos são mais relacionados a um relatório ou análise em relação ao tema. Também devem existir critérios de aceite como condições de parada na descoberta, já que um tópico levantado para descobrir pode desdobrar em muitos outros.

Bons critérios de aceite de Execuções de Descoberta são perguntas. Alguns exemplos são:
- Como seria o formato do escopo durante a criação de um Épico? (Documentação)

O refinamento de execuções de Descoberta foca em definir bem o objetivo proposto e os tipos de informações que precisamos levantar ao final. Um escopo fechado para esse tipo é muito importante para não executarmos indefinidamente a descoberta.

Execuções de descoberta podem ser utilizadas principalmente para mitigar o risco de executar outras atividades, como por exemplo:

- garantir o fechamento do escopo de outras execuções ou épicos
- garantir que o impacto seja realmente o que estamos pensando
- evitar perder tempo com execuções aparentemente fácies onde uma busca no google é possível verificar uma dificuldade de executá-las

#### Exemplos

- Levantamento de possibilidades para a v2 do Biluca Finanças
	- Essa execução de descoberta foca em entender que tipo de elementos são interessantes para uma segunda versão do Biluca Finanças. 
	- Posso chegar no final dessa execução e perceber que não temos nada interessante para uma segunda versão.
	- Além de fechar um escopo também nos evita perder tempo com execuções duvidosas ou não claras.

- Levantamento inicial da arquitetura do Biluca Finanças
	- Durante essa execução o foco era garantir uma arquitetura funcional e as tecnologias necessárias para a criação da aplicação Biluca Finanças
	- Como resultado foi entregue um documento com direcionamentos para a criação das demais execuções do projeto

- Assistências por IA no VSCode
	- Essa execução visava levantar uma possível ferramenta de IA generativa para auxiliar no desenvolvimento de código pelo VSCode
	- Após a avaliação de alguns tipos foi decidido a utilização de uma ferramenta específica

# Estimativa e UT

A estimativa deve ser definida quando a Execução é definida com o estado Aberto. 

> [!warning]- Estimativa não é prever o futuro
> Esse campo não é para ser utilizado como algo rígido e garantido, a ideia de utilizar uma estimativa é conseguir ter um mínimo de previsibilidade a curto prazo para aas atividades que serão executadas.
> 
> Isso facilita a tomada de decisão de quais atividades podem ser elencadas no curto prazo.

A estimativa utiliza o conceito de Unidade de Trabalho (UT). Como não devemos utilizar estimativa como algo garantido a UT é uma boa aproximação do tempo de trabalho de uma execução, além de ser fácil de ser preenchida. Isso nos ajuda a fazer comparações com outras execuções parecidas pela [[Tabela de referências de estimativas]].

Uma boa aproximação de valor de UT é aproximadamente 3 horas, ou seja, geralmente um turno de trabalho, como uma manhã ou uma tarde.

A estimativa assim pode adotar 3 valores distintos:

- **Pequeno:** até 2 UT
- **Médio:** algumas UT (+2~5 UT), aproximadamente uma semana de trabalho para uma prioridade principal
- **Grande:** muitas UT (+5 UT)
	- Nesse casos podemos pensar em quebrar a execução em execuções menores.
	- Também é importante pensarmos que algumas execuções são grandes mesmo e que talvez não tenha necessidade de serem repartidas.

Como a estimativa é algo pouco preciso, reduzir os valores de estimativas para esse modelo de pequeno, médio e grande ajuda a definir essas estimativas, tirando o foco da busca por uma estimativa perfeita para aproximações sem muito preocupação.