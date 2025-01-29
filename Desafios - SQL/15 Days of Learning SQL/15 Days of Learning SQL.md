# 15 Days of Learning SQL

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Problema: dado um conjunto de dados de submissões de exercícios, encontrar os hackers únicos que fizeram submissões todos os dias e o que mais fez submissão em cada dia.

--- end-column ---

> [!info] Principais referências
> - [HackerRank](https://www.hackerrank.com/challenges/15-days-of-learning-sql/problem?isFullScreen=true)

--- end-multi-column


#### Implementações

- [[15 Days of Learning SQL.sql]]

### Conceitos trabalhados

- **Consultas complexas:** relacionamento com vários elementos de tabelas diferentes.
### Solução

Para a solução adotada foi utilizado uma técnica de iterar sobre os dias e calcular cada um dos componentes que serão retornados para o dia em questão.

Pseudo-código

```sql
select
 data,
 (elemento 1 em relação a s1.data)
 (elemento 2 em relação a s1.data)
from
	submissions s1
```

Dessa forma já é possível concentrar a execução com uma espinha central que são as datas distintas de submissão.