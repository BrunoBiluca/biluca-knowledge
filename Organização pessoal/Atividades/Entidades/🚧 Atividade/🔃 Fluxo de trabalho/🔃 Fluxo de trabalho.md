# 🔃 Fluxo de trabalho

![[Diagrama - Fluxo de trabalho]]

O Fluxo de trabalho define o estado que a [[🚧 Atividade]] se encontra. É uma forma de entender que tipo de trabalho é necessário para aquela [[🚧 Atividade]] no momento, de realizar a própria execução até levantar requisitos ou contexto.

Uma [[🚧 Atividade]] é dividida em 3 estágios:

- **A fazer** - execução está sendo preparada para ser executada.
- **Em andamento** - execução está sendo executada
- **Finalizado** - execução não será mais executada

#### A fazer

- [[Atividade "Nova"]] - Execução foi criada, são necessários principalmente o contexto e objetivo.

- [[Atividade "Refinando"]] - Execução ainda precisa de definir demais informações

- [[Atividade "Bloqueada"]] - Execução depende de outra para ser realizada

- [[Atividade "Aberta"]] - Execução pronta para ser executada, estão definidos todos os elementos necessários sua realização de forma fluída.

- [[Atividade "Pausada"]] - Execução começou a ser executada e foi interrompida ou é uma atividade estava em aberta e não tem um impacto grande a curto prazo.

#### Em andamento

- [[Atividade "Elencada"]] - Execução está definida para ser realizada a qualquer momento disponível

- [[Atividade "Em progresso"]] - Execução está sendo realizada

#### Finalizado

- [[Atividade "Concluída"]] - Execução foi finalizada com todos os critérios de aceite concluídos.

- [[Atividade "Promovida"]] - Execução foi definida como mais do que apenas uma execução. Durante o processo de refinamento uma execução pode ser promovida a múltiplas execuções, um Épico ou um Valor.

- [[Atividade "Caducou"]] - Execução não faz mais sentido, não apresenta nenhum impacto e deve ser finalizada

## Rituais relacionados

- [[🔬 Refinamento]] é utilizado para transformar ideias em atividades prontas para serem executadas

- [[📆 Planejamento]] é utilizado para selecionar as atividades para entrar ou sair de andamento.