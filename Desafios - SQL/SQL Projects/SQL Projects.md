# SQL Projects

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

**Objetivo:** determinar a data de início e término de todos os projetos ordenados pela projeto com menos tempo gasto até o maior.

Nesse contexto projetos são decompostos em tarefas contínuas, ou seja, um projeto sempre será um conjunto de tarefas feitas em dias consecutivos.

--- end-column ---

> [!info] Principais referências
> - [HackerRank](https://www.hackerrank.com/challenges/sql-projects/problem?isFullScreen=true)

--- end-multi-column
**Solução**

Criar duas [[Common Table Expressions (CTE)]]:

- A primeira CTE seleciona as tarefas que iniciam um projeto
- A segunda CTE seleciona as tarefas que finalizam um projeto

Como os projetos são sempre consecutivos, ou seja, um projeto só começa depois do outro, a solução é junta a primeira tarefa de início do projeto com a primeira tarefas de término do projeto, a segunda com a segunda e assim sucessivamente.

#### Implementações

- [[SQL Projects - mysql.sql]]