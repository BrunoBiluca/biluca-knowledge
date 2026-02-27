# 🚧 Atividade

> [!info] Definição
> As **atividades** quando realizadas avançamos na realização dos [[🌟 Valor|🌟 Valor]].

O estado das execuções são alterados pelos rituais de [[📆 Levantamento de atividades]] e [[🔬 Refinamento]].

## Campos

- **Data da realização** - Data da realização da execução. Não é a data limite é a data que deve ser executada.

- **Estado** - Estado da execução no fluxo de trabalho.
	- [[🔃 Fluxo de trabalho]] da [[🚧 Atividade]] define o que cada estado representa

- **Iniciado em** - Data do momento que a execução foi definida na primeira vez como "Em progresso".

- **Concluído em** - Data do momento que a execução foi definida como "Concluída"

- **Criado em** - Data de criação da execução.

## Propriedades

- **Prioridade** - A prioridade da execução é definida pela prioridade do Valor. 

- **Atrasado** - A data de realização é menor que a data atual

- **Ativo** - Execuções ativas são aquelas que podem ser "Elencadas".
	- A execução está ativa quando:
		- Não está encerrada
		- Não está congelada
		- Não está arquivada

- **Encerrado** - Quando a execução está em algum estado final ("Concluído", "Caducou", "Promovido")

- **Congelado** - Quando sua prioridade está congelada

- **Valor arquivado** - O Valor relacionado está arquivado

- **Idade** - Tempo decorrido desde a criação da Execução até um estado final
	- Definida em semanas
	- A idade de uma execução pode nos ajudar a entender coisas que estamos negligenciando, e até a repensar o impacto da execução, já que ele é contextual.

- **Ano/Mês de conclusão** - Formatação para a data de conclusão que é utilizada as visualizações históricas.

- **Pode elencar?**
	- Valor deve estar ativo
	- Estado da Atividade deve está Aberta
	- Se existir Valor, ele deve estar pronto para ter uma atividade elencada (propriedade do [[🏆 Épico]] `Pronto para puxar 🚧 Atividade`)

## Relações

- **Valor** - Toda execução está associada a apenas um valor.

- **Épico** - Uma execução pode estar associada a apenas um épico.

> [!warning] A fazer
> Uma coisa para pensar é como exibir Atividades que estão abertas, porém elas fazem parte de um Épico que está em refinamento.

## Conteúdo

O conteúdo de uma [[🚧 Atividade]] muda de acordo com o seu [[🍱 Tipos de Atividades]], principalmente dependendo do tipo de atividades temos um tratamento diferente para sua execução.

Para todas as atividades temos:

- **Objetivo** - Uma frase clara do que será executado e o por que será executado
	- Deve ficar claro qual o ganho em realizar essa atividade.

- **Conclusão** - Um pequeno texto para descrever resultados, aprendizados e considerações sobre a [[🚧 Atividade]]
	- Utilizado principalmente no rituais de [[🌀 Retrospectiva]] para entender o que foi feito
	- Também pode ser utilizado para criar novas [[🚧 Atividade]] dada as necessidades levantadas na conclusão.

- [[✅ Critérios de aceite|✅ Critérios de aceite]] - O que espero com a realização dessa execução? São os principais requisitos para definir essa execução como concluída.

- **Refinamento** - O que preciso antes da realização dessa execução?
	- Pode declarar que outra [[🚧 Atividade]] bloqueia o desenvolvimento desta
	- Utilizado principalmente quando em [[Atividade "Refinando"]]

- **Tarefas** - Subdivisão de tarefas, auxilia na realização da execução.

- **Contexto** - Apresentação do contexto em que a execução foi levantada.

- **Discussão** - Possibilidades de caminhos para a conclusão da execução.

## Automações

- Iniciar
- Concluir
- Promover
- Caducou
- Elencar