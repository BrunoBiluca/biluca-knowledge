# 🏆 Épicos (conjunto de 🃏 Histórias)

🏆 Épicos são conjuntos de 🃏 Histórias. Eles agrupam em relação lógica as ações necessárias para a conclusão de 🎯 Metas e 🌟 Valores.

São divididos em dois tipos:

- Épicos BASE: são conjuntos de Épicos logicamente relacionados. Geralmente um projeto BASE é utilizado para agrapar histórias grandes e que representam um mesmo valor, como o conjunto de funcionalidades do sistema. Esse tipo de organização auxilia na criação de um backlog não hierarquizado que futuramente deve ser refinado em Épicos menores.
- Épicos: são conjuntos de 🃏 Histórias com o propósito de definirem um resultado esperado. Não necessáriamente apresentam todas as 🃏 Histórias para a conclusão do projeto, porém o resultado final do projeto é definido e quando alcançado o projeto é finalizado.

Um exemplo para demonstrar a diferença entre Épicos BASE e Épicos é:

- Épicos BASE: Gameplay
- Épicos: Core Gameplay v1
- Épicos: Core Gameplay v2
- Épicos: Sistema XYZ auxiliar ao Gameplay

### Propriedades de um projeto

> ---
> 🚧 Em construção
> 
> ---

### Priorização de um Épicos

Como um produto pode ter vários Épicos e equipes distintas resolvendo essas dependências é necessário organizar a priorização de um Épicos a fim de criar um sistema consistente de quais tarefas são mais relevantes para o Épicos.

A prioridade dos deve levar em consideração os seguintes fatores

- Prioridade do 🌟 Valor associado constitue a base da prioridade, já que o principal objetivo de organizar Sprints é definir metas a curto prazo para alcançar um 🌟 Valor.
- Prioridade da 🎯 Meta associada, a prioridade da meta substitui a prioridade do 🌟 Valor, já que as metas são pensadas com um prazo estipulado, então mesmo que o Épicos seja associado a um 🌟 Valor mais prioritário se a sua 🎯 Meta associada é menos prioritária o Épicos é então menos prioritário na organização geral.
- Dependentes, caso o projeto seja uma dependência de outro, ele deve ter sua prioridade aumentada.
- Dependências, caso o projeto seja dependente de outro, ele deve ter a menor prioridade até o projeto que seja dependência para este seja concluído.

Assim a prioridade do projeto é dado pela fórmula: 

```
🅿️ = (🎯 || 🌟) + (-1 Se 🎯 existe) + (-1 Se ⬇️ existe) + (99 Se ⬆️ existe)

onde,
🎯 é a meta referente
🌟 é o valor referente
⬇️ são os dependentes do projeto
⬆️ são as depedências do projeto não concluídas
```

Para mais informações sobre as prioridades acesse o [link para 🌟 Valores](values.md).

### Exemplos de Épicos

- Projeto de Game 1 [BASE]
    - 🌟 Valor: 🌞 Épicos próprios
- Projeto de Game 2 [BASE]
    - 🌞 Épicos próprios
- Estudo de GameDesign [BASE]
    - 🌟 Valor: 🧩 Estudar Game Desing
    - Livro de Game Design 1
        - 🌟 Valor: 🧩 Estudar Game Desing
        - 🎯 Meta: Ler __ livros da área de Game Design
    - Livro de Game Design 2
        - 🌟 Valor: 🧩 Estudar Game Desing
        - 🎯 Meta: Ler __ livros da área de Game Design
- Curso iniciante de Mandarim [BASE]
    - 🌟 Valor: ㊗️ Estudar Mandarim