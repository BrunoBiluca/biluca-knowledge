Uma 🃏 História é a unidade de ação que será executada.

> Resumo: Uma história do usuário é uma explicação informal e geral sobre um recurso de software escrita a partir da perspectiva do usuário final. Seu objetivo é articular como um recurso de software pode gerar valor para o cliente.

### Prioridade de um 🃏 História

A prioridade de qualquer 🃏 História será associada ao Épico relacionado. Isso é feito para garantir a entrega de valor seja consistente, ou seja, se um Épico define um valor a ser entregue no projeto é necessário que todas as histórias dentro do Épico tenham sido concluídas para que então o valor tenha sido entregue. Assim dentro de um Épico não há a necessidade de priorizar histórias.

# Template

```markdown
# Título <Breve descrição do problema a ser solucionado>
 
> PARA **\<motivo do trabalho>**
> 
> COMO **\<persona>**
> 
> QUERO **\<problema a ser solucionado>**

> ⚠️ [REMOVIVÉL] Descrição de uma dependência não bloqueante para a execução da história, história pode iniciar sem resolver essa pendencia

> 🚫 [REMOVIVÉL] Descrição de uma dependência bloqueante para a execução da história, história pode ser iniciada sem resolver essa pendencia

## Documentação auxiliar: 

> 📑 links para páginas do confluence
> 📑links de recursos adicionais

## Critérios de aceite

Critério de aceito:
- Condição
Critério de aceito 2:
- Condição
Critério de aceito 3:
- Condição

## Caso de teste

> DADO **\<contexto inicial>**
> 
> QUANDO **\<primeira ação do usuário>**
> 
> E **\<segunda ação do usuário>**
> 
> ENTÃO **\<comportamento esperado dada as ações>**

```

# Análise de Histórias

## Assertividade de conclusão de 🃏 Histórias

Essa análise visa entender a assertividade na conclusão de Histórias durante um período definido.

Quando mais histórias estão sendo concluídas no período desejado mais assertividade a equipe tem em entregar Histórias.

### Exemplo de análise

Histórias iniciadas no período da análise

|Histórias|Iniciado em|Concluído em|
|---|---|---|
|História 1|29/05/2023|29/05/2023|
|História 2|29/05/2023||

Período da análise: 01/05/2023 até 31/05/2023

|                                             | Quantidade | Porcentagem                                 | 
| ------------------------------------------- | ---------- | ------------------------------------------- |
| Histórias iniciadas no período              | 2          |                                             |
| Histórias iniciadas e concluídas no período | 1          |                                             |
| Acertividade do período                     | 1 História | 50% das história iniciadas foram concluídas |

### Exemplo de utilização dessa análise para a criação de uma 🎽 Sprint

Digamos que uma 🎽 Sprint é definida para um período de 15 dias, a quantidade de Histórias planejadas não deve passar da média dos últimos 4 períodos quinzenais. Essa média é definida para garantir que as histórias planejadas sejam realmente entregues naquele período.

Assim

- Período quinzenal anterior 1: média de 5 Histórias finalizadas
- Período quinzenal anterior 2: média de 6 Histórias finalizadas
- Período quinzenal anterior 3: média de 4 Histórias finalizadas
- Período quinzenal anterior 4: média de 5 Histórias finalizadas

A 🎽 Sprint pode ter uma capacidade de 5 Histórias.

# Referências

- [User stories com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
- [Agile User Story Splitting by Non-Functional Requirements](https://corebts.com/blog/agile-user-story-splitting-non-functional-requirements/#:~:text=%E2%80%9CA%20type%20of%20requirement%20that,a%20solution%20as%20a%20whole.%E2%80%9D)

