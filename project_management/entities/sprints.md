# 🎽 Sprint (Iteração)

A 🎽 Sprint é uma iteração de execuções de 🃏 Histórias que foram priorizadas com o objetivo de avançar na conclusão de 🎯 Metas e 🏆 Projetos ativos que por sua vez encurtam a distância para alcançar um 🌟 Valor.

### Propriedades de uma Sprint

> ---
> 🚧 Em construção
> 
> ---

### Durante a execução de uma 🎽 Sprint

> ---
> 🚧 Em construção
> 
> ---

### Priorização e planejamento de uma sprint

A prioridade das 🃏 Histórias deve levar em consideração os seguintes fatores

- Prioridade do 🌟 Valor, constitue a base da prioridade, já que o principal objetivo de organizar Sprints é definir metas a curto prazo para alcançar um 🌟 Valor.
- Prioridade da 🎯 Meta, a prioridade da meta pode substituir a prioridade do 🌟 Valor
- Dependência, caso o projeto seja uma dependência de outro, ele deve ter uma prioridade maior.
- Dependente, caso o projeto seja dependente de outro, ele deve ter a menor prioridade até o projeto que é dependente seja concluído

# Exemplo de planejamento de uma 🎽 Sprint

Para o planejamento precisamos principalmente levar em consideração as prioridades dos vários 🌟 Valores, 🎯 Metas e 🏆 Projetos.

Digamos que tenho o seguinte cenário

- 🌟 Valores
    - 💎  Platinar jogos - 🅿️ 1
    - 🏋️ Academia - 🅿️ 2
    - 🤼 Jogar jogos de luta - 🅿️ 3
    - 🕹️ Coleção de Consoles - 🅿️ 4
- 🎯 Metas
    - ⚔️ Platinar todos os jogos referentes a FF7
        - ⏳ 3 meses
    - 🌎 Levantar 200kg no Levantamento terra
        - ⏳ 6 meses
- 🏆 Projetos
    - 🏭 Final Fantasy 7 Remake
    - 🏭 Crisis Core: Final Fantasy
    - 🐺 Witcher 3
    - 🌎 Levantamento Terra até 200kg
    - 🥑 Chegar em 15% de BG
    - 🥊 Street Fighter 6
    - 🕹️ Comprar o PS5

```mermaid
graph TB

subgraph Valores
v1["💎  Platinar jogos - 🅿️ 1"]
v2["🏋️ Academia - 🅿️ 2"]
v3["🤼 Jogar jogos de luta - 🅿️ 3"]
v4["🕹️ Coleção de Consoles - 🅿️ 4"]
end

subgraph Metas
m1["⚔️ Platinar todos os jogos referentes a FF7"]
m2["🌎 Levantar 200kg no Levantamento terra"]
m3["🕹️ Comprar o PS5"]
end

v1 --> m1
v2 --> m2
v4 --> m3

subgraph Projetos
p1["🏭 Final Fantasy 7 Remake"]
p2["🏭 Crisis Core: Final Fantasy 7"]
p3["🐺 Witcher 3"]
p4["🌎 Levantamento Terra até 200kg"]
p5["🥑 Chegar em 15% de BG"]
p6["🕹️ Comprar o PS5"]
p7["🥊 Street Fighter 6"]
end

m1 --> p1
m1 --> p2
m1 --> p6
m2 --> p4
m3 --> p6

v1 --> p1
v1 --> p2
v1 --> p3
v2 --> p4
v2 --> p5
v3 --> p7
v4 --> p6
```

As sprints tem um tempo limitado para desempenhar as 🃏 Histórias. Essa quantidade de tempo deve ser determinada pela prioridade de cada 🃏 Histórias de maneira proporcional.

Como a sprint é organizada a partir desse exemplo:

```mermaid
---
title: 🃏 Histórias
---
graph LR

subgraph pp1["🏭 Final Fantasy 7 Remake - 🅿️ 9 na 🎽 1 e 🅿️ 0 a partir 🎽 2 - Concluído 🎽 Sprint 3"]
t1["Troféu 1 - 🅿️ 9 - ⏳ 2"]
t2["Troféu 2 - 🅿️ 9 - ⏳ 2"]
t3["Troféu 3 - 🅿️ 9 - ⏳ 2"]
end

subgraph pp2["🏭 Crisis Core: Final Fantasy 7 - 🅿️ 9 na 🎽 1 e 🅿️ 0 a partir 🎽 2 - Concluído 🎽 Sprint 4"]
t4["Troféu 1 - 🅿️ 9 - ⏳ 2"]
t5["Troféu 2 - 🅿️ 9 - ⏳ 2"]
t6["Troféu 3 - 🅿️ 9 - ⏳ 2"]
end

subgraph pp3["🐺 Witcher 3- Concluído 🎽 Sprint 3"]
t7["Troféu 1 - 🅿️ 1 - ⏳ 2"]
t8["Troféu 2 - 🅿️ 1 - ⏳ 2"]
t9["Troféu 3 - 🅿️ 1 - ⏳ 2"]
end

subgraph pp4["🌎 Levantamento Terra até 200kg- Concluído 🎽 Sprint 4"]
t10["Treino 140kg - 🅿️ 1 - ⏳ 2"]
t11["Treino 160kg - 🅿️ 1 - ⏳ 2"]
t12["Treino 180kg - 🅿️ 1 - ⏳ 2"]
t13["Treino 200kg - 🅿️ 1 - ⏳ 2"]
end

subgraph pp5["🥑 Chegar em 15% de BG - Concluído 🎽 Sprint 1"]
t14["Marcar nutricionista - 🅿️ 2 - ⏳ 1"]
end

subgraph pp6["🕹️ Comprar o PS5 - Concluído 🎽 Sprint 1"]
t15["Pesquisar os preços - 🅿️ 0 - ⏳ 1"]
t16["Comprar o PS5 - 🅿️ 0 - ⏳ 1"]
end

subgraph pp7["🥊 Street Fighter 6- Concluído 🎽 Sprint 4"]
t17["Modo história parte 1 - 🅿️ 3 - ⏳ 1"]
t20["Modo história parte 2 - 🅿️ 3 - ⏳ 1"]
t18["Modo arcade - 🅿️ 3 - ⏳ 2"]
t19["Online - Bronze - 🅿️ 3 - ⏳ 2"]
end

subgraph Sprints
sprint1["🎽 Sprint 1 - (🅿️0 = ⏳2) (🅿️1 = ⏳2) (🅿️2 = ⏳3) (🅿️3 = ⏳1) (🅿️4 = ⏳0)"]
sprint1 --> t7
sprint1 --> t14
sprint1 --> t15
sprint1 --> t16
sprint1 --> t10
sprint1 --> t17

sprint2["🎽 Sprint 2 - (🅿️0 = ⏳4) (🅿️1 = ⏳2) (🅿️2 = ⏳2) (🅿️3 = ⏳1) (🅿️4 = ⏳0)"]
sprint2 --> t1
sprint2 --> t2
sprint2 --> t8
sprint2 --> t11
sprint2 --> t20

sprint3["🎽 Sprint 3 - (🅿️0 = ⏳4) (🅿️1 = ⏳2) (🅿️2 = ⏳2) (🅿️3 = ⏳2) (🅿️4 = ⏳0)"]
sprint3 --> t3
sprint3 --> t4
sprint3 --> t9
sprint3 --> t12
sprint3 --> t18

sprint4["🎽 Sprint 4 - (🅿️0 = ⏳4) (🅿️1 = ⏳2) (🅿️2 = ⏳2) (🅿️3 = ⏳2) (🅿️4 = ⏳0)"]
sprint4 --> t5
sprint4 --> t6
sprint4 --> t13
sprint4 --> t19
end

```