#planejamento_de_projetos

> [!info] Definição de Épicos
> 🏆 Épicos são agrupamentos lógicos de elementos da 🏗️ Execução (como 🃏 Histórias ou ⚙️ Trabalho incidental) para a conclusão de 🎯 Metas e 🌟 Valores.

Não necessariamente um Épico apresenta todas as 🏗️ Execuções para a conclusão de um 🌟 Valor ou 🎯 Metas, mas define um avanço considerável pela soma do impacto das 🏗️ Execuções selecionadas. Ou seja, quando um Épico é definido o impacto total de sua conclusão é mais do que se cada Execução fosse feita independentemente, o que nos permite priorizar as 🏗️ Execuções desse épico sobre as demais com a consciência do impacto desse agrupamento no projeto como um todo.

- Épicos: Core Gameplay v1
- Épicos: Core Gameplay v2
- Épicos: Sistema XYZ auxiliar ao Gameplay

> [!tip] Refinamento de Épicos
> Um 🏆 Épico é bem definido quando este tem um resultado esperado que seja mensurável.
> 
> Assim, quando durante o refinamento está difícil de definir um resultado esperado para a conclusão de um Épico (resultado esperado é definido pela 🏗️ Execução selecionada), provavelmente esse Épico na verdade é um 🌟 Valor (que não precisa de um resultado esperado). Dessa forma podemos criar um 🌟 Valor com essa concepção, criar todas os elementos de sua 🏗️ Execução necessários e tentar agrupar esses elementos em Épicos com um resultado esperado claro.
> 
> Um exemplo de falta de definição de um Épico em um jogo é quando queremos criar um Épico que agrupa as execuções relacionadas a "Mecânicas do jogador" de forma geral. Esse tipo de Épico não tem um conclusão clara (ainda mais em momentos iniciais do projeto que a experimentação faz parte do jogo). Nesse caso podemos definir esse conceito de "Mecânicas do jogador" como um 🌟 Valor, criar todos os elementos para sua 🏗️ Execução e tentar identificar nesses elementos padrões lógicos que para agrupar em um Épico.


## Propriedades de um 🏆 Épico

Para se considerar um 🏆 Épico a estrutura possui as seguintes propriedades

| Propriedade     | Descrição                                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquivado       | Um projeto arquivado não é tratado como um projeto ativo e deve servir apenas como referência.<br> Um projeto pode ser arquivado quando concluído ou quando não faz mais sentido |
| Prioridade      | Define a relevância do Épico quando ele for selecionado para ser trabalhado                                                                                                      |
| Progresso       | Exibe a quantidade de 🃏 Histórias concluídas pelo total de 🃏 Histórias. Utilizado para melhorar a visibilidade do Épico e ajudar na tomada de decisões                         |
| ---             | ---                                                                                                                                                                              |
| Iniciado em     | Marca a data de início da primeira História relacionada                                                                                                                          |
| Completado em   | Marca a data de conclusão do Épico                                                                                                                                               |
| ---             | ---                                                                                                                                                                              |
| Estado          | Exibe o estado atual do Épico.<br> 💎 A fazer<br> 🌀 Em progresso<br> ⏸️ Pausado<br> ✅ Concluído                                                                                |
| 🌟 Valor        | Define o 🌟 Valor que esse Épico está tentando encurtar a distância de conclusão. Por meio do 🌟 Valor podemos definir a prioridade do Épico.                                    |
| 🎯 Meta         | Pode definir uma 🎯 Meta. Quando uma meta é definida sua prioridade é aumentada.                                                                                                 |
| ⬆️ Dependências | Pode definir um Épico para se ter como dependência                                                                                                                               |
| ⬇️ Dependentes  | Épicos dependentes a esse                                                                                                                                                        |


## Priorização de 🏆 Épicos

Como um produto pode ter vários Épicos onde equipes distintas estão simultaneamente resolvendo essas dependências é necessário organizar a priorização entre todos os Épicos de um projeto a fim de criar um sistema que selecione histórias mais relevantes para serem trabalhadas.

A prioridade de um Épico leva em consideração os seguintes fatores:

- Prioridade do 🌟 Valor associado. 
	- Constitui a base da prioridade.
	- Como Épicos são conjuntos de Histórias organizados logicamente para encurtar a distância da realização de um valor, a prioridade do Valor determina a base da prioridade do Épico.
- Prioridade da 🎯 Meta associada. 
	- Caso exista uma 🎯 Meta associada sua prioridade substitui a prioridade do 🌟 Valor.
	- As Metas substituem a prioridade do 🌟 Valor já que são planejamentos com um prazo em mente. Assim independente da prioridade do Valor a prioridade da Meta relacionada tem um peso maior ao Épico.
- Dependentes, caso o projeto seja uma dependência de outro, ele deve ter sua prioridade aumentada.
	- Isso garante que esse projeto irá ter prioridade sobre outros projetos.
- Dependências, caso o projeto seja dependente de outro, ele deve ter a menor prioridade até o projeto que seja dependência para este seja concluído.

Assim a prioridade do projeto é dado pela fórmula: 

```
🅿️ = (🎯 || 🌟) + (-1 Se 🎯 existe) + (-1 Se ⬇️ existe) + (99 Se ⬆️ existe)

onde,
🎯 representa a meta associada
🌟 representa o valor associado
⬇️ representam dependentes do Épico
⬆️ representam as depedências do Épico não concluídas
```

Para mais informações sobre as prioridades acesse o [link para 🌟 Valores](Gestão%20de%20projetos/Modelo%20de%20entidades/🌟%20Valores.md).

### Exemplo do cálculo de priorização de um 🏆 Épico


#### Priorização de um Épico sem meta associada

Vamos supor o seguinte cenário

- 🌟 Desenvolvimento de funcionalidades
	- Prioridade 2
- 🌟 Monetização
	- Prioridade 3
- 🌟 Aumento de base de jogadores
	- Prioridade 4
- 🏆 Core Gameplay
	- Associado a 🌟 Desenvolvimento de funcionalidades
- 🏆 Adição de publicidade remunerada
	- Associado a 🌟 Monetização
- 🏆 Propaganda na plataforma de publicação
	- Associado a 🌟 Aumento de base de jogadores
	- Depende de 🏆 Core Gameplay

Prioridade para 🏆 Core Gameplay

```
🅿️ = (🎯 || 🌟) + (-1 Se 🎯 existe) + (-1 Se ⬇️ existe) + (99 Se ⬆️ existe)
🅿️ = 2 + (-1 Se ⬇️ existe)
🅿️ = 1
```

Prioridade para 🏆 Adição de publicidade remunerada

```
🅿️ = (🎯 || 🌟) + (-1 Se 🎯 existe) + (-1 Se ⬇️ existe) + (99 Se ⬆️ existe)
🅿️ = 3
```

Prioridade para 🏆 Propaganda na plataforma de publicação

```
🅿️ = (🎯 || 🌟) + (-1 Se 🎯 existe) + (-1 Se ⬇️ existe) + (99 Se ⬆️ existe)
🅿️ = 4 + (99 Se ⬆️ existe)
🅿️ = 103
```

## Exemplos de Épicos

> [!warning] A fazer

### Templates

#### Componentes

- Por que esse projeto?

Definição da motivação do projeto, deve ser um pequeno texto que descreve a motivação da criação do Épico.

- Qual o foco desse projeto? Etapas:

Define o escopo desse Épico, por meio desse componente descrevemos as etapas de conclusão do Épico em alto nível.
As etapas ajuda a definir o processo de seleção das histórias dentro do Épico.

- Backlog

Define as histórias ainda não concluídas.

- Tarefas na sprint atual

Define as histórias que serão trabalhadas durante a Sprint corrente.

- Concluídas

Define as histórias que já foram concluídas

#### Componentes opcionais

- Descrição das tags

Um Épico pode criar tags específicas para a classificação de histórias.

As tags ajudam a definir em poucas palavras que tipo de trabalho será desenvolvido.

Assim se existem tags específicas de ter definido cada uma das tags no próprio Épico.
