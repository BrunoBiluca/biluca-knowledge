# Execuções

> [!info] Definição
> Execuções são as **atividades** que quando realizadas avançamos na realização dos [[Valores]].

#### Propriedades

- **Data de realização** - Data de realização da execução. Não é a data limite é a data que deve ser executada.
- **Tipo** - 
- **Estado** - Estado da execução no fluxo de trabalho.
- **Categoria(s)** - 
- **Impacto** - Nível do impacto que a execução quando realizada causa no Valor ou no Épico relacionado.
- **Iniciado em** - Data do momento que a execução foi definida na primeira vez como "Em progresso".
- **Concluído em** - Data do momento que a execução foi definida como "Concluída"
- **Criado em** - Data de criação da execução.

#### Relações

- **Valor** - Toda execução está associada a apenas um valor.
- **Épico** - Uma execução pode estar associada a apenas um épico.

#### Fórmulas

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

#### Visualizações

- **Todos**
- **Em aberto**
- **Em refinamento**
- **Concluídos**
- **Calendário**
- **Backlog**

#### Conteúdo

- **Objetivo** - Por que será executado? Qual o ganho em realizar essa execução?
- **Critérios de aceite** - O que espero com a realização dessa execução? São os principais requisitos para definir essa execução como concluída.
- **Refinamento** - O que preciso antes da realização dessa execução?
- **Tarefas** - Subdivisão de tarefas, auxilia na realização da execução.
- **Contexto** - Apresentação do contexto em que a execução foi levantada.
- **Discussão** - Possibilidades de caminhos para a conclusão da execução.

### Fluxo de trabalho

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