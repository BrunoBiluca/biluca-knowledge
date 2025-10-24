# 🔃 Fluxo de trabalho

![[Diagrama - Fluxo de trabalho]]

O Fluxo de trabalho define o estado que a Execução se encontra. É uma forma de entender que tipo de trabalho é necessário para aquela Execução no momento.

Cada momento da Execução necessita de um tipo de trabalho diferente, seja realizando a própria execução até levantando requisitos ou contexto.

Uma execução é dividida em 3 estágios:

- **A fazer** - execução está sendo preparada para ser executada.
- **Em andamento** - execução está sendo executada
- **Finalizado** - execução não será mais executada

**A fazer** consiste nos seguintes estados:

- [[Atividade "Nova"]] - Execução foi criada, são necessários principalmente o contexto e objetivo.

- [[Atividade "Refinando"]] - Execução ainda precisa de definir demais informações

- **Bloqueado** - Execução depende de outra para ser realizada

- [[Atividade "Aberta"]] - Execução pronta para ser executada, estão definidos todos os elementos necessários sua realização de forma fluída.

- **Pausada** - Execução começou a ser executada e foi interrompida

**Em andamento** consiste nos seguintes estados:

- **Elencado** - Execução está definida para ser realizada a qualquer momento disponível

- **Em progresso** - Execução está sendo realizada

**Finalizado** consiste nos seguintes estados:

- **Concluído** - Execução foi finalizada com todos os critérios de aceite concluídos.

- **Promovido** - Execução foi definida como mais do que apenas uma execução. Durante o processo de refinamento uma execução pode ser promovida a múltiplas execuções, um Épico ou um Valor.

- **Caducou** - Execução não faz mais sentido, não apresenta nenhum impacto e deve ser finalizada