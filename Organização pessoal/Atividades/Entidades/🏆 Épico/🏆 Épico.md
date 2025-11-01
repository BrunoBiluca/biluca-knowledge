# 🏆 Épico

> [!info] Definição
> Épicos são agrupamentos de [[🚧 Atividade]] que apresentam um avanço grande na realização do [[🌟 Valor]] relacionado.
> 
> São a principal entidade para ter uma **visão macro** de evolução de um [[🌟 Valor]].

Os Épicos são parte fundamental do processo de organização por causa das suas características:

- **Objetivo** que é mais do que a soma individual das Execuções relacionadas
- **Escopo inicialmente delimitado** a fim de mitigar riscos
- **Período de Atividade** até sua conclusão

Os Épicos são principalmente definidos durante o ritual de [[🔬 Refinamento]], onde o objetivo, escopo, período de Atividade entre outras características são refinadas a fim de mitigar riscos e garantir fluidez durante sua execução. Durante o processo de refinamento também é importante ter um pensamento crítico em relação aos objetivos do Épico (já que durante sua execução aprendemos mais sobre ele e podemos nos atentar a coisas que durante o refinamento passaram), seja para adicionar ou remover [[🚧 Atividade|🚧 Atividades]] que não agregam ao objetivo ou também concluir o próprio Épico quando o objetivo foi alcançado antes de concluir todas as atividades.

O **escopo é possivelmente aberto** porque para se alcançar o objetivo de um Épico é necessário que a conclusão das suas [[🚧 Atividade|🚧 Atividades]] agregadas gerem o Valor desejado. Isso pode ocorrer com um escopo fechado caso o processo de refinamento inicial foi altamente exitoso ou durante as demais iterações e incrementos feitos durante o desenvolvimento do Épico.

- [[Exemplos de Épicos ruins]]
- [[Exemplos de Épicos bons]]
- [[🏆 Épico vs 🚧 Atividade]]

## Campos

- **Nome** - Nome que representa o conjunto de tarefas

- **Período** - Determina o período de execução das atividades
	- Por exemplo, Épicos de controle de contas, geralmente são criado por ano.

- **Criado em** - Data da criação do Épico

- **Estado** - Estado atual do Épico
	- Em refinamento
	- Aberto
	- Concluído
	- Caducou

- **Data de início** -  define a data de início da Atividade do Épico, quando o estado passa de aberto para em progresso

- **Completado em** - Data de finalização do Épico.

## Propriedades

- **Progresso tempo** - Quando definido o Período, a proporção de tempo do início até o término
	- Essa fórmula nos ajuda a ter uma maior noção de tempo.

- **Duração** - tempo decorrido da Data de início e hoje
	- Ajuda a ter uma noção de tempo.

- **Progresso** - Proporção das execuções concluídas pelo total. 
	- Muito útil para verificar o andamento do épico. 
	- Também se relaciona com o progresso de tempo que permite indicar se o Épico está atrasado ou não.

- **Prioridade** - Prioridade do Valor relacionado

- **Concluído** - Número de Execuções concluídas

- **Total** - Total de Execuções associadas

- **Em Atividade** - Épicos ativos são aquelas que estão sendo trabalhados, ou seja, alguma Atividade com estado "Em progresso" ou "Elencada"

## Relações

- [[🌟 Valor]] - Todo Épico deve estar associado a um Valor.

- [[🚧 Atividade]] - Todo Épico deve estar associado a mais de uma Atividade

### Conteúdo

- **Objetivo** - Definição clara de um avanço considerável na realização do Valor.

- **Conclusão** - Breve descrição dos resultados, aprendizados e considerações futuras sobre o 🏆 Épico

- **Contexto** - Elemento de discussão da necessidade da conclusão do objetivo.

- **Discussão** - Elemento de discussão da Atividade, como backlog desqualificado, notas gerais, lembretes que não são aplicados a uma Atividade específica e sim ao conjunto.

### Gestão

- **[[🚧 Atividade|🚧 Atividades]] por estado** - Lista de execuções em cada momento dos seus estados
	- Agrupamento: estados das execuções
	- Propriedades:
		- Nome
		- Impacto