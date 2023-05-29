🏆 Épicos são conjuntos de 🃏 Histórias. Eles agrupam em relação lógica as ações necessárias para a conclusão de 🎯 Metas e 🌟 Valores.

São divididos em dois tipos:

- Épicos BASE: são conjuntos de Épicos logicamente relacionados. Geralmente um projeto BASE é utilizado para agrupar histórias grandes e que representam um mesmo valor, como o conjunto de funcionalidades do sistema. Esse tipo de organização auxilia na criação de um backlog não hierarquizado que futuramente deve ser refinado em Épicos menores.

- Épicos: são conjuntos de 🃏 Histórias com o propósito de definirem um resultado esperado. Não necessariamente apresentam todas as 🃏 Histórias para a conclusão do projeto, porém o resultado final do projeto é definido e quando alcançado o projeto é finalizado.

Um exemplo para demonstrar a diferença entre Épicos BASE e Épicos é:

- Épicos BASE: Core Gameplay
- Épicos: Core Gameplay v1
- Épicos: Core Gameplay v2
- Épicos: Sistema XYZ auxiliar ao Gameplay

> [!info] Dica
> Épicos BASE muito genéricos são um problema já que eles nunca são definitivamente concluídos. Um 🏆 Épicos bem definido deve ter um resultado esperado que seja mensurável.
> 
> Assim, quando durante o refinamento de um Épico está difícil de levantar um resultado esperado, provavelmente esse Épico na verdade é um 🌟 Valor. Dessa forma o 🌟 Valor deve ser definido e então é possível afunilar os Épicos desse valor até chegar na conclusão da definição de seus Épicos.

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
| ⬆️ Dependências | Pode definir um Épico para se ter como dependência                                                                                                                                                                                 |
| ⬇️ Dependentes  | Épicos dependentes a esse                                                                                                                                                                                 |
| 🏆 Épico BASE   | Pode definir um Épico BASE como Épico principal.                                                                                                                                 |


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

Para mais informações sobre as prioridades acesse o [link para 🌟 Valores](🌟%20Valores.md).

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
