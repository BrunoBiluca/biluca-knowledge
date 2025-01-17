# Placements

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

**Objetivo:** dados 3 tabelas, estudantes, amigos e salários, levantar os nomes dos estudantes que tem amigos que ganham mais que eles.

--- end-column ---

> [!info] Principais referências
> - [Hackerrank](https://www.hackerrank.com/challenges/placements/problem?isFullScreen=true)

--- end-multi-column

**Solução**

É um problema bem simples e direto. Para sua solução é necessário fazer as junções com cada tabela de forma direta, a única pegadinha fica por fazer a junção com os amigos que para isso é necessário criar uma consulta interna (pode ser uma tabela temporária também) para retornar tanto o nome quanto o salário do amigo.

#### Conceitos trabalhados

- Junções
- Consulta interna dinâmica na junção

#### Implementações

- [[Placements - mysql.sql]]