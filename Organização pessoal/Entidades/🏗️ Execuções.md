# 🏗️ Execuções

> [!info] Definição
> Execuções são as **atividades** que quando realizadas avançamos na realização dos [[Organização pessoal/Entidades/🌟 Valores]].

O estado das execuções são alterados pelos rituais de [[📆 Planejamento]] e [[🔬 Refinamento]].

#### Campos

- **Data da realização** - Data da realização da execução. Não é a data limite é a data que deve ser executada.
- **Tipo** - Define o tipo da execução que será realizada ([[#Tipos de execuções]])
- **Estado** - Estado da execução no fluxo de trabalho.
- **Impacto** - Nível do impacto que a execução quando realizada causa no Valor ou no Épico relacionado.
- **Iniciado em** - Data do momento que a execução foi definida na primeira vez como "Em progresso".
- **Concluído em** - Data do momento que a execução foi definida como "Concluída"
- **Criado em** - Data de criação da execução.

#### Relações

- **Valor** - Toda execução está associada a apenas um valor.
- **Épico** - Uma execução pode estar associada a apenas um épico.

#### Propriedades

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

## Conteúdo

- **Objetivo** - Por que será executado? Qual o ganho em realizar essa execução?
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
- **Refinando** - Execução precisa de definir demais informações
- **Bloqueado** - Execução depende de outra para ser realizada
- **Aberto** - Execução pronta para ser executada, estão definidos todos os elementos necessários para uma execução fluida.
- **Pausada** - Execução começou a ser executada e foi interrompida

**Em andamento** consiste nos seguintes estados:

- **Elencado** - Execução está definida para ser realizada a qualquer momento disponível
- **Em progresso** - Execução está sendo realizada

**Finalizado** consiste nos seguintes estados:

- **Concluído** - Execução foi finalizada com todos os critérios de aceite concluídos.
- **Promovido** - Execução foi definida como mais do que apenas uma execução. Durante o processo de refinamento uma execução pode ser promovida a múltiplas execuções, um Épico ou um Valor.
- **Caducou** - Execução não faz mais sentido, não apresenta nenhum impacto e deve ser finalizada


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

Exemplos

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

Exemplos

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